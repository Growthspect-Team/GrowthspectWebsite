import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * GET /api/callback
 *
 * GitHub redirects here after the user authorizes.
 * We exchange the temporary `code` for an access token,
 * then send the token back to the Decap CMS popup window
 * via postMessage.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const code = req.query.code as string | undefined;

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'GitHub OAuth credentials are not configured' });
  }

  try {
    // Exchange the code for an access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      return res.status(400).json({ error: data.error_description || data.error });
    }

    const token = data.access_token;

    // Send the token back to the Decap CMS popup via postMessage
    const html = `
<!DOCTYPE html>
<html>
<head><title>Authorizing...</title></head>
<body>
  <script>
    (function() {
      function receiveMessage(e) {
        console.log("receiveMessage %o", e);
        // send message to main window with the token
        window.opener.postMessage(
          'authorization:github:success:{"token":"${token}","provider":"github"}',
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      // Let the opener know we're ready
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err: any) {
    console.error('OAuth callback error:', err);
    res.status(500).json({ error: 'Failed to exchange code for token' });
  }
}
