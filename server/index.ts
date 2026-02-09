import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { getClientConfirmationEmail, getTeamNotificationEmail } from './email-templates.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ 
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173',
    'https://growthspect.com',
    'https://www.growthspect.com',
    process.env.CLIENT_URL || ''
  ].filter(Boolean)
}));

// Rate Limiter
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { success: false, error: 'Příliš mnoho žádostí. Zkuste to prosím znovu za chvíli.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());

// SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.privateemail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  },
});

// Verify connection on startup
transporter.verify().then(() => {
  console.log('✅ SMTP connection verified');
}).catch((err) => {
  console.error('❌ SMTP connection failed:', err);
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, company, position, source, message } = req.body;

    // Validation
    if (!firstName || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Vyplňte prosím povinná pole (jméno, email, zpráva).' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Zadejte prosím platnou emailovou adresu.' 
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

    // 1. Send confirmation to client
    await transporter.sendMail({
      from: `"GrowthSpect" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: `Děkujeme za vaši zprávu, ${firstName}! | GrowthSpect`,
      html: getClientConfirmationEmail({ firstName, fullName, message }),
    });

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
    res.json({ success: true, message: 'Zpráva byla úspěšně odeslána.' });

  } catch (error: any) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.' 
    });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 GrowthSpect API running on http://localhost:${PORT}`);
});
