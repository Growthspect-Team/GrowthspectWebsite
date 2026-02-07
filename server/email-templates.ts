interface ClientEmailData {
  firstName: string;
  fullName: string;
  message: string;
}

interface TeamEmailData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
  source: string;
  message: string;
}

export function getClientConfirmationEmail({ firstName, fullName, message }: ClientEmailData): string {
  return `
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Děkujeme za vaši zprávu</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          
          <!-- Logo / Brand Header -->
          <tr>
            <td style="padding: 0 0 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Growth<span style="color: #8825ed;">Spect</span>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Purple accent line -->
          <tr>
            <td style="padding: 0 0 40px 0;">
              <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #8825ed, #a855f7); border-radius: 2px;"></div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 0 0 32px 0;">
              <h1 style="margin: 0 0 24px 0; font-size: 36px; font-weight: 700; color: #ffffff; line-height: 1.2; letter-spacing: -1px;">
                Děkujeme, ${firstName}!
              </h1>
              <p style="margin: 0 0 20px 0; font-size: 17px; color: #9ca3af; line-height: 1.7;">
                Vaše zpráva k nám úspěšně dorazila. Náš tým si ji právě pročítá a ozveme se vám
                <strong style="color: #ffffff;">nejpozději do 24 hodin</strong> s návrhem dalšího postupu.
              </p>
            </td>
          </tr>

          <!-- Message recap card -->
          <tr>
            <td style="padding: 0 0 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;">
                <tr>
                  <td style="padding: 28px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #8825ed; font-weight: 600;">
                      Vaše zpráva
                    </p>
                    <p style="margin: 0; font-size: 15px; color: #d1d5db; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's next section -->
          <tr>
            <td style="padding: 0 0 40px 0;">
              <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                Co bude následovat?
              </h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;">
                          <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #8825ed, #a855f7); border-radius: 10px; text-align: center; line-height: 32px; font-size: 14px; font-weight: 700; color: white;">1</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-size: 15px; color: #d1d5db; line-height: 1.5;">
                            <strong style="color: #ffffff;">Analýza</strong> — Prostudujeme vaši zprávu a připravíme relevantní podklady.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;">
                          <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #8825ed, #a855f7); border-radius: 10px; text-align: center; line-height: 32px; font-size: 14px; font-weight: 700; color: white;">2</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-size: 15px; color: #d1d5db; line-height: 1.5;">
                            <strong style="color: #ffffff;">Konzultace</strong> — Navrhneme krátký call, kde probereme váš záměr.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;">
                          <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #8825ed, #a855f7); border-radius: 10px; text-align: center; line-height: 32px; font-size: 14px; font-weight: 700; color: white;">3</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-size: 15px; color: #d1d5db; line-height: 1.5;">
                            <strong style="color: #ffffff;">Návrh</strong> — Předložíme konkrétní plán a postup spolupráce.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 0 32px 0;">
              <div style="width: 100%; height: 1px; background-color: rgba(255,255,255,0.08);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 16px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">
                      Growth<span style="color: #8825ed;">Spect</span>
                    </span>
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #6b7280; line-height: 1.5;">
                      Architekti digitální budoucnosti.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <p style="margin: 0; font-size: 12px; color: #4b5563;">
                      © ${new Date().getFullYear()} GrowthSpect. Všechna práva vyhrazena.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function getTeamNotificationEmail({ firstName, lastName, email, company, position, source, message }: TeamEmailData): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString('cs-CZ', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return `
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nová poptávka</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 0 0 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Growth<span style="color: #8825ed;">Spect</span>
                    </span>
                    <span style="font-size: 13px; color: #6b7280; margin-left: 12px;">Internal Notification</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Alert Badge -->
          <tr>
            <td style="padding: 0 0 24px 0;">
              <div style="display: inline-block; background: linear-gradient(135deg, #8825ed, #a855f7); border-radius: 8px; padding: 8px 16px;">
                <span style="font-size: 13px; font-weight: 600; color: #ffffff; letter-spacing: 0.5px;">📩 NOVÁ POPTÁVKA</span>
              </div>
              <span style="font-size: 13px; color: #6b7280; margin-left: 12px;">${dateStr}</span>
            </td>
          </tr>

          <!-- Contact Info Grid -->
          <tr>
            <td style="padding: 0 0 24px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <!-- Row 1: Name & Email -->
                      <tr>
                        <td width="50%" style="padding: 0 12px 16px 0; vertical-align: top;">
                          <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8825ed; font-weight: 600;">Jméno</p>
                          <p style="margin: 0; font-size: 16px; color: #ffffff; font-weight: 600;">${firstName} ${lastName}</p>
                        </td>
                        <td width="50%" style="padding: 0 0 16px 12px; vertical-align: top;">
                          <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8825ed; font-weight: 600;">Email</p>
                          <p style="margin: 0; font-size: 16px; color: #ffffff;">
                            <a href="mailto:${email}" style="color: #a855f7; text-decoration: none;">${email}</a>
                          </p>
                        </td>
                      </tr>
                      <!-- Row 2: Company & Position -->
                      <tr>
                        <td width="50%" style="padding: 0 12px 16px 0; vertical-align: top;">
                          <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8825ed; font-weight: 600;">Firma</p>
                          <p style="margin: 0; font-size: 16px; color: #d1d5db;">${company}</p>
                        </td>
                        <td width="50%" style="padding: 0 0 16px 12px; vertical-align: top;">
                          <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8825ed; font-weight: 600;">Pozice</p>
                          <p style="margin: 0; font-size: 16px; color: #d1d5db;">${position}</p>
                        </td>
                      </tr>
                      <!-- Row 3: Source -->
                      <tr>
                        <td colspan="2" style="padding: 0; vertical-align: top;">
                          <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8825ed; font-weight: 600;">Zdroj</p>
                          <p style="margin: 0; font-size: 16px; color: #d1d5db;">${source}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 0 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8825ed; font-weight: 600;">Zpráva</p>
                    <p style="margin: 0; font-size: 15px; color: #d1d5db; line-height: 1.8; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Reply CTA -->
          <tr>
            <td style="padding: 0 0 40px 0;">
              <a href="mailto:${email}?subject=Re: Vaše poptávka — GrowthSpect&body=Dobrý den ${firstName},%0D%0A%0D%0ADěkujeme za váš zájem." 
                 style="display: inline-block; background: linear-gradient(135deg, #8825ed, #a855f7); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 14px 28px; border-radius: 12px; letter-spacing: -0.2px;">
                ↩ Odpovědět klientovi
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td>
              <div style="width: 100%; height: 1px; background-color: rgba(255,255,255,0.08); margin-bottom: 20px;"></div>
              <p style="margin: 0; font-size: 12px; color: #4b5563;">
                Automatická notifikace z webu growthspect.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
