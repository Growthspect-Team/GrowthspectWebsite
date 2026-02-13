import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// ── Email Templates ──
// All styles use solid hex colors for maximum email client compatibility (no rgba).

function getClientConfirmationEmail({ firstName, fullName, email, company, position, message }: {
  firstName: string; fullName: string; email: string; company: string; position: string; message: string;
}): string {
  const year = new Date().getFullYear();
  const escapedMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<!DOCTYPE html>
<html lang="cs" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Potvrzení zprávy — GrowthSpect</title>
  <!--[if mso]><style>body,table,td{font-family:Arial,Helvetica,sans-serif!important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#000000;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

<!-- Preheader text (hidden, shows in inbox preview) -->
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
  Děkujeme za vaši zprávu, ${firstName}! Ozveme se vám do 24 hodin.
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#000000;">
<tr><td align="center" style="padding:0;">

<!-- Outer container -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;margin:0 auto;">
<tr><td style="padding:40px 24px 0 24px;">

  <!-- ═══════════════════════════ HEADER ═══════════════════════════ -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding:0 0 32px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="padding-right:12px;vertical-align:middle;">
          <!-- Purple dot logo mark -->
          <div style="width:36px;height:36px;background-color:#8825ed;border-radius:10px;">&nbsp;</div>
        </td>
        <td style="vertical-align:middle;">
          <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Growthspect</span>
        </td>
      </tr></table>
    </td>
  </tr>
  </table>

  <!-- ═══════════════════════ HERO SECTION ═══════════════════════ -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0d0d0f;border:1px solid #1a1a1e;border-radius:20px;">
  <tr><td style="padding:48px 36px 44px 36px;">

    <!-- Purple accent bar -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="padding:0 0 28px 0;">
      <div style="width:48px;height:4px;background-color:#8825ed;border-radius:4px;"></div>
    </td></tr>
    </table>

    <h1 style="margin:0 0 16px 0;font-size:32px;font-weight:700;color:#ffffff;line-height:1.25;letter-spacing:-0.5px;">
      Děkujeme, ${firstName}!
    </h1>
    <p style="margin:0;font-size:16px;color:#9ca3af;line-height:1.7;">
      Vaše zpráva k nám úspěšně dorazila. Náš tým si&nbsp;ji právě pročítá a ozveme se vám
      <strong style="color:#ffffff;">do&nbsp;24&nbsp;hodin</strong> s&nbsp;návrhem dalšího postupu.
    </p>

  </td></tr>
  </table>

  <!-- Spacer -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="height:16px;"></td></tr></table>

  <!-- ═══════════════════ SUBMITTED DATA CARD ═══════════════════ -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0d0d0f;border:1px solid #1a1a1e;border-radius:20px;">
  <tr><td style="padding:36px;">

    <p style="margin:0 0 20px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#8825ed;">
      Shrnutí vaší zprávy
    </p>

    <!-- Info rows -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

      <!-- Name -->
      <tr>
        <td width="110" style="padding:10px 0;vertical-align:top;">
          <span style="font-size:13px;color:#6b7280;">Jméno</span>
        </td>
        <td style="padding:10px 0;vertical-align:top;">
          <span style="font-size:14px;color:#ffffff;font-weight:600;">${fullName}</span>
        </td>
      </tr>

      <!-- Email -->
      <tr>
        <td style="padding:10px 0;border-top:1px solid #1a1a1e;vertical-align:top;">
          <span style="font-size:13px;color:#6b7280;">Email</span>
        </td>
        <td style="padding:10px 0;border-top:1px solid #1a1a1e;vertical-align:top;">
          <span style="font-size:14px;color:#a78bfa;">${email}</span>
        </td>
      </tr>

      <!-- Company (if provided) -->
      ${company && company !== '—' ? `<tr>
        <td style="padding:10px 0;border-top:1px solid #1a1a1e;vertical-align:top;">
          <span style="font-size:13px;color:#6b7280;">Firma</span>
        </td>
        <td style="padding:10px 0;border-top:1px solid #1a1a1e;vertical-align:top;">
          <span style="font-size:14px;color:#d1d5db;">${company}</span>
        </td>
      </tr>` : ''}

      <!-- Position (if provided) -->
      ${position && position !== '—' ? `<tr>
        <td style="padding:10px 0;border-top:1px solid #1a1a1e;vertical-align:top;">
          <span style="font-size:13px;color:#6b7280;">Pozice</span>
        </td>
        <td style="padding:10px 0;border-top:1px solid #1a1a1e;vertical-align:top;">
          <span style="font-size:14px;color:#d1d5db;">${position}</span>
        </td>
      </tr>` : ''}

    </table>

    <!-- Divider -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="height:20px;border-bottom:1px solid #1a1a1e;"></td></tr></table>

    <!-- Message -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="padding:20px 0 0 0;">
      <p style="margin:0 0 8px 0;font-size:13px;color:#6b7280;">Vaše zpráva</p>
      <div style="background-color:#111114;border:1px solid #1a1a1e;border-radius:12px;padding:20px;">
        <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.75;white-space:pre-wrap;">${escapedMessage}</p>
      </div>
    </td></tr>
    </table>

  </td></tr>
  </table>

  <!-- Spacer -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="height:16px;"></td></tr></table>

  <!-- ═══════════════════ NEXT STEPS SECTION ═══════════════════ -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0d0d0f;border:1px solid #1a1a1e;border-radius:20px;">
  <tr><td style="padding:36px;">

    <p style="margin:0 0 24px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#8825ed;">
      Co bude následovat
    </p>

    <!-- Step 1 -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td width="44" style="vertical-align:top;padding:0 16px 20px 0;">
        <div style="width:36px;height:36px;background-color:#8825ed;border-radius:10px;text-align:center;line-height:36px;font-size:15px;font-weight:700;color:#ffffff;">1</div>
      </td>
      <td style="vertical-align:top;padding:0 0 20px 0;">
        <p style="margin:0 0 4px 0;font-size:15px;font-weight:700;color:#ffffff;">Analýza</p>
        <p style="margin:0;font-size:14px;color:#9ca3af;line-height:1.6;">Prostudujeme vaši zprávu a připravíme relevantní podklady.</p>
      </td>
    </tr>
    </table>

    <!-- Step 2 -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td width="44" style="vertical-align:top;padding:0 16px 20px 0;">
        <div style="width:36px;height:36px;background-color:#6d28d9;border-radius:10px;text-align:center;line-height:36px;font-size:15px;font-weight:700;color:#ffffff;">2</div>
      </td>
      <td style="vertical-align:top;padding:0 0 20px 0;">
        <p style="margin:0 0 4px 0;font-size:15px;font-weight:700;color:#ffffff;">Konzultace</p>
        <p style="margin:0;font-size:14px;color:#9ca3af;line-height:1.6;">Navrhneme krátký call, kde společně probereme váš záměr.</p>
      </td>
    </tr>
    </table>

    <!-- Step 3 -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td width="44" style="vertical-align:top;padding:0 16px 0 0;">
        <div style="width:36px;height:36px;background-color:#5b21b6;border-radius:10px;text-align:center;line-height:36px;font-size:15px;font-weight:700;color:#ffffff;">3</div>
      </td>
      <td style="vertical-align:top;padding:0;">
        <p style="margin:0 0 4px 0;font-size:15px;font-weight:700;color:#ffffff;">Návrh řešení</p>
        <p style="margin:0;font-size:14px;color:#9ca3af;line-height:1.6;">Předložíme konkrétní plán, harmonogram a transparentní rozpočet.</p>
      </td>
    </tr>
    </table>

  </td></tr>
  </table>

  <!-- Spacer -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="height:16px;"></td></tr></table>

  <!-- ═══════════════════ CTA BUTTON ═══════════════════ -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0d0d0f;border:1px solid #1a1a1e;border-radius:20px;">
  <tr><td align="center" style="padding:32px 36px;">
    <p style="margin:0 0 16px 0;font-size:15px;color:#9ca3af;">Máte další otázky? Neváhejte se ozvat.</p>
    <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="mailto:team@growthspect.com" style="height:48px;v-text-anchor:middle;width:220px;" arcsize="50%" fillcolor="#8825ed">
    <w:anchorlock/><center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Napište nám &rarr;</center>
    </v:roundrect>
    <![endif]-->
    <!--[if !mso]><!-->
    <a href="mailto:team@growthspect.com" style="display:inline-block;background-color:#8825ed;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 32px;border-radius:50px;mso-hide:all;">
      Napište nám &rarr;
    </a>
    <!--<![endif]-->
  </td></tr>
  </table>

  <!-- ═══════════════════ FOOTER ═══════════════════ -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td style="padding:32px 0 40px 0;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding:0 0 12px 0;">
        <span style="font-size:16px;font-weight:700;color:#ffffff;">Growth<span style="color:#8825ed;">Spect</span></span>
      </td>
    </tr>
    <tr>
      <td style="padding:0 0 16px 0;">
        <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">Enterprise AI &amp; Systems Studio</p>
      </td>
    </tr>
    <tr>
      <td>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="padding-right:16px;">
            <a href="https://growthspect.com" style="font-size:12px;color:#8825ed;text-decoration:none;">growthspect.com</a>
          </td>
          <td style="padding-right:16px;color:#333333;">|</td>
          <td>
            <a href="https://linkedin.com/company/growthspect" style="font-size:12px;color:#8825ed;text-decoration:none;">LinkedIn</a>
          </td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding-top:20px;">
        <p style="margin:0;font-size:11px;color:#4b5563;">&copy; ${year} GrowthSpect s.r.o. V&scaron;echna pr&aacute;va vyhrazena.</p>
      </td>
    </tr>
    </table>

  </td></tr>
  </table>

</td></tr>
</table>
<!-- /Outer container -->

</td></tr>
</table>
</body>
</html>`;
}

function getTeamNotificationEmail({ firstName, lastName, email, company, position, source, message }: {
  firstName: string; lastName: string; email: string; company: string; position: string; source: string; message: string;
}): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString('cs-CZ', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const escapedMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<!DOCTYPE html>
<html lang="cs"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Nov&aacute; popt&aacute;vka</title></head>
<body style="margin:0;padding:0;background-color:#000000;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#000000;">
<tr><td align="center" style="padding:40px 24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

  <!-- Header -->
  <tr><td style="padding:0 0 24px 0;">
    <span style="font-size:22px;font-weight:700;color:#ffffff;">Growth<span style="color:#8825ed;">Spect</span></span>
    <span style="font-size:12px;color:#6b7280;padding-left:12px;">Internal</span>
  </td></tr>

  <!-- Badge -->
  <tr><td style="padding:0 0 20px 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="background-color:#8825ed;border-radius:8px;padding:8px 16px;">
        <span style="font-size:13px;font-weight:700;color:#ffffff;">&#x1F4E9; NOV&Aacute; POPT&Aacute;VKA</span>
      </td>
      <td style="padding-left:12px;"><span style="font-size:13px;color:#6b7280;">${dateStr}</span></td>
    </tr></table>
  </td></tr>

  <!-- Contact card -->
  <tr><td style="padding:0 0 16px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0d0d0f;border:1px solid #1a1a1e;border-radius:16px;">
    <tr><td style="padding:24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="50%" style="padding:0 8px 14px 0;"><p style="margin:0 0 3px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8825ed;font-weight:700;">Jm&eacute;no</p><p style="margin:0;font-size:15px;color:#ffffff;font-weight:600;">${firstName} ${lastName}</p></td>
          <td width="50%" style="padding:0 0 14px 8px;"><p style="margin:0 0 3px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8825ed;font-weight:700;">Email</p><p style="margin:0;font-size:15px;"><a href="mailto:${email}" style="color:#a78bfa;text-decoration:none;">${email}</a></p></td>
        </tr>
        <tr>
          <td style="padding:0 8px 14px 0;"><p style="margin:0 0 3px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8825ed;font-weight:700;">Firma</p><p style="margin:0;font-size:15px;color:#d1d5db;">${company}</p></td>
          <td style="padding:0 0 14px 8px;"><p style="margin:0 0 3px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8825ed;font-weight:700;">Pozice</p><p style="margin:0;font-size:15px;color:#d1d5db;">${position}</p></td>
        </tr>
        <tr><td colspan="2"><p style="margin:0 0 3px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8825ed;font-weight:700;">Zdroj</p><p style="margin:0;font-size:15px;color:#d1d5db;">${source}</p></td></tr>
      </table>
    </td></tr></table>
  </td></tr>

  <!-- Message -->
  <tr><td style="padding:0 0 24px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0d0d0f;border:1px solid #1a1a1e;border-radius:16px;">
    <tr><td style="padding:24px;">
      <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8825ed;font-weight:700;">Zpr&aacute;va</p>
      <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.8;white-space:pre-wrap;">${escapedMessage}</p>
    </td></tr></table>
  </td></tr>

  <!-- Reply CTA -->
  <tr><td style="padding:0 0 32px 0;">
    <a href="mailto:${email}?subject=Re: Va%C5%A1e%20popt%C3%A1vka%20%E2%80%94%20GrowthSpect&body=Dobr%C3%BD%20den%20${encodeURIComponent(firstName)}%2C%0D%0A%0D%0AD%C4%9Bkujeme%20za%20v%C3%A1%C5%A1%20z%C3%A1jem." style="display:inline-block;background-color:#8825ed;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 24px;border-radius:10px;">&#x21A9; Odpov&#x11B;d&#x11B;t klientovi</a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="border-top:1px solid #1a1a1e;padding-top:16px;"><p style="margin:0;font-size:11px;color:#4b5563;">Automatick&aacute; notifikace z webu growthspect.com</p></td></tr>
</table>
</td></tr></table>
</body></html>`;
}

// ── Rate limiting (in-memory, resets per cold start) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 15 * 60 * 1000; // 15 min
  const maxRequests = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window });
    return false;
  }
  entry.count++;
  return entry.count > maxRequests;
}

// ── CORS headers ──
const ALLOWED_ORIGINS = [
  'https://growthspect.com',
  'https://www.growthspect.com',
  'http://localhost:3000',
  'http://localhost:5173',
];

function setCorsHeaders(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ── Handler ──
export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ success: false, error: 'Příliš mnoho žádostí. Zkuste to prosím znovu za chvíli.' });
  }

  try {
    const { firstName, lastName, email, company, position, source, message } = req.body;

    // Validation
    if (!firstName || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Vyplňte prosím povinná pole (jméno, email, zpráva).',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Zadejte prosím platnou emailovou adresu.',
      });
    }

    const fullName = `${firstName} ${lastName || ''}`.trim();
    const sourceLabels: Record<string, string> = {
      google: 'Google',
      linkedin: 'LinkedIn',
      social: 'Facebook / Instagram',
      recommendation: 'Doporučení',
      other: 'Jiné',
    };

    // SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.privateemail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Log env state for debugging (no secrets)
    console.log(`📧 SMTP config: host=${process.env.SMTP_HOST || 'mail.privateemail.com'}, port=${process.env.SMTP_PORT || 465}, user=${process.env.SMTP_USER ? '✓' : '✗'}, pass=${process.env.SMTP_PASS ? '✓' : '✗'}, from=${process.env.SMTP_FROM || '✗'}`);

    // 1. Send confirmation to client
    console.log(`📤 Sending client confirmation to: ${email}`);
    await transporter.sendMail({
      from: `"GrowthSpect" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: `Děkujeme za vaši zprávu, ${firstName}! | GrowthSpect`,
      html: getClientConfirmationEmail({
        firstName,
        fullName,
        email,
        company: company || '',
        position: position || '',
        message,
      }),
    });
    console.log(`✅ Client confirmation sent to: ${email}`);

    // 2. Send notification to team
    await transporter.sendMail({
      from: `"GrowthSpect Web" <${process.env.SMTP_FROM}>`,
      to: process.env.NOTIFY_EMAIL || 'team@growthspect.com',
      subject: `📩 Nová poptávka od ${fullName} — ${company || 'Bez firmy'}`,
      replyTo: email,
      html: getTeamNotificationEmail({
        firstName,
        lastName: lastName || '',
        email,
        company: company || '—',
        position: position || '—',
        source: sourceLabels[source] || source || '—',
        message,
      }),
    });

    console.log(`✅ Contact form submitted: ${fullName} <${email}>`);
    return res.json({ success: true, message: 'Zpráva byla úspěšně odeslána.' });

  } catch (error: any) {
    console.error('❌ Contact form error:', error);
    return res.status(500).json({
      success: false,
      error: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.',
    });
  }
}
