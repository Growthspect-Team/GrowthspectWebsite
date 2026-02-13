import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * GET /api/auth
 *
 * Redirects the user to GitHub's OAuth authorization page.
 * Decap CMS opens this URL in a popup when the user clicks "Login with GitHub".
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    return res.status(500).json({ error: 'GITHUB_OAUTH_CLIENT_ID is not configured' });
  }

  const scope = 'repo,user';
  const authUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&scope=${scope}`;

  res.redirect(authUrl);
}
