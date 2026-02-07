import React, { useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { Container, FadeIn } from './UI';
import { TableOfContents } from './blog/TableOfContents';
import { BlogPostHeader } from './blog/utils';

export const PrivacyPolicyPage: React.FC = () => {
    const { language } = useLanguage();
    const contentRef = useRef<HTMLDivElement>(null);

    const sections = [
        {
            id: 'intro',
            title: language === 'cs' ? '1. Úvodní ustanovení' : '1. Introduction',
            content: (
                <>
                    <p>
                        {language === 'cs' 
                            ? 'Vaše soukromí je pro nás klíčové. Tyto zásady ochrany osobních údajů vysvětlují, jak GrowthSpect (dále jen "my", "nás" nebo "naše") shromažďuje, používá a chrání informace, které nám poskytnete při používání našich webových stránek a služeb.'
                            : 'Your privacy is crucial to us. This Privacy Policy explains how GrowthSpect ("we", "us", or "our") collects, uses, and safeguards the information you provide when using our website and services.'}
                    </p>
                    <p>
                        {language === 'cs'
                            ? 'Používáním našich stránek souhlasíte se shromažďováním a používáním informací v souladu s těmito zásadami.'
                            : 'By using our website, you agree to the collection and use of information in accordance with this policy.'}
                    </p>
                </>
            )
        },
        {
            id: 'collection',
            title: language === 'cs' ? '2. Jaké údaje shromažďujeme' : '2. Information We Collect',
            content: (
                <>
                    <p>{language === 'cs' ? 'Můžeme shromažďovat následující typy informací:' : 'We may collect the following types of information:'}</p>
                    <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-400">
                        <li>
                            <strong className="text-white">{language === 'cs' ? 'Osobní údaje:' : 'Personal Data:'}</strong>{' '}
                            {language === 'cs' 
                                ? 'Jméno, e-mailová adresa, telefonní číslo a další kontaktní údaje, které nám dobrovolně poskytnete přes kontaktní formuláře.'
                                : 'Name, email address, phone number, and other contact details you voluntarily provide via contact forms.'}
                        </li>
                        <li>
                            <strong className="text-white">{language === 'cs' ? 'Technické údaje:' : 'Technical Data:'}</strong>{' '}
                            {language === 'cs'
                                ? 'IP adresa, typ prohlížeče, informace o zařízení, operační systém a údaje o používání webu (cookies, analytika).'
                                : 'IP address, browser type, device information, operating system, and usage data (cookies, analytics).'}
                        </li>
                    </ul>
                </>
            )
        },
        {
            id: 'usage',
            title: language === 'cs' ? '3. Jak údaje využíváme' : '3. How We Use Data',
            content: (
                <>
                    <p>{language === 'cs' ? 'Získané údaje používáme k následujícím účelům:' : 'We use the collected data for the following purposes:'}</p>
                    <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-400">
                        {[
                            { cs: "Poskytování, provozování a údržba našich služeb.", en: "Providing, operating, and maintaining our services." },
                            { cs: "Zlepšování a personalizace obsahu webových stránek.", en: "Improving and personalizing website content." },
                            { cs: "Porozumění tomu, jak uživatelé využívají naše služby.", en: "Understanding how users use our services." },
                            { cs: "Vývoj nových produktů, služeb a funkcí.", en: "Developing new products, services, and features." },
                            { cs: "Komunikace s vámi, včetně zákaznické podpory a zasílání aktualizací.", en: "Communicating with you, including customer support and updates." }
                        ].map((item, i) => (
                            <li key={i}>{language === 'cs' ? item.cs : item.en}</li>
                        ))}
                    </ul>
                </>
            )
        },
        {
            id: 'sharing',
            title: language === 'cs' ? '4. Sdílení údajů třetím stranám' : '4. Sharing Data',
            content: (
                <p>
                    {language === 'cs'
                        ? 'Vaše osobní údaje neprodáváme ani nepronajímáme třetím stranám. Můžeme sdílet informace s důvěryhodnými partnery, kteří nám pomáhají provozovat webové stránky a provádět naše obchodní činnosti (např. hosting, analytické nástroje), pokud se tito partneři zavážou k zachování důvěrnosti.'
                        : 'We do not sell or rent your personal data to third parties. We may share information with trusted partners who help us operate our website and conduct our business (e.g., hosting, analytics tools), provided these partners agree to keep this information confidential.'}
                </p>
            )
        },
        {
            id: 'rights',
            title: language === 'cs' ? '5. Vaše práva' : '5. Your Rights',
            content: (
                <>
                    <p>{language === 'cs' ? 'Podle GDPR máte následující práva:' : 'Under GDPR, you have the following rights:'}</p>
                    <ul className="list-disc pl-5 space-y-2 mt-4 mb-6 text-gray-400">
                        {[
                            { cs: "Právo na přístup k vašim osobním údajům.", en: "Right to access your personal data." },
                            { cs: "Právo na opravu nepřesných údajů.", en: "Right to rectify inaccurate data." },
                            { cs: "Právo na výmaz (právo „být zapomenut“).", en: "Right to erasure ('right to be forgotten')." },
                            { cs: "Právo na omezení zpracování.", en: "Right to restrict processing." },
                            { cs: "Právo vznést námitku proti zpracování.", en: "Right to object to processing." },
                            { cs: "Právo na přenositelnost údajů.", en: "Right to data portability." }
                        ].map((item, i) => (
                            <li key={i}>{language === 'cs' ? item.cs : item.en}</li>
                        ))}
                    </ul>
                    <p>
                        {language === 'cs' ? 'Pokud chcete uplatnit kterékoli z těchto práv, kontaktujte nás na ' : 'To exercise any of these rights, please contact us at '}
                        <a href="mailto:team@growthspect.com" className="text-brand-purple hover:text-white transition-colors">team@growthspect.com</a>.
                    </p>
                </>
            )
        },
        {
            id: 'security',
            title: language === 'cs' ? '6. Zabezpečení' : '6. Security',
            content: (
                <p>
                    {language === 'cs'
                        ? 'Bezpečnost vašich údajů je pro nás prioritou, ale mějte na paměti, že žádný způsob přenosu přes Internet nebo elektronické úložiště není 100% bezpečný. I když se snažíme používat komerčně přijatelné prostředky k ochraně vašich osobních údajů, nemůžeme zaručit jejich absolutní bezpečnost.'
                        : 'The security of your data is a priority for us, but please remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.'}
                </p>
            )
        },
        {
            id: 'cookies',
            title: language === 'cs' ? '7. Cookies a Analytika' : '7. Cookies & Analytics',
            content: (
                <>
                    <p>
                        {language === 'cs'
                            ? 'Webové stránky používají soubory cookies a podobné sledovací technologie (např. Google Analytics) ke zlepšení uživatelského zážitku a analýze návštěvnosti.'
                            : 'Our website uses cookies and similar tracking technologies (e.g., Google Analytics) to improve user experience and analyze traffic.'}
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-400">
                        <li>
                            <strong className="text-white">{language === 'cs' ? 'Nezbytné cookies:' : 'Essential Cookies:'}</strong>{' '}
                            {language === 'cs' 
                                ? 'Nutné pro správné fungování webu.'
                                : 'Necessary for the website to function properly.'}
                        </li>
                        <li>
                            <strong className="text-white">{language === 'cs' ? 'Analytické cookies:' : 'Analytics Cookies:'}</strong>{' '}
                            {language === 'cs'
                                ? 'Pomáhají nám pochopit, jak návštěvníci web používají (např. Google Analytics).'
                                : 'Help us understand how visitors use the website (e.g., Google Analytics).'}
                        </li>
                    </ul>
                    <p className="mt-4">
                        {language === 'cs'
                            ? 'Předvolby cookies můžete kdykoli změnit v nastavení vašeho prohlížeče nebo prostřednictvím naší lišty cookie.'
                            : 'You can change your cookie preferences at any time in your browser settings or via our cookie banner.'}
                    </p>
                </>
            )
        },
        {
            id: 'contact',
            title: language === 'cs' ? '8. Kontakt' : '8. Contact',
            content: (
                <p>
                    {language === 'cs' ? 'Máte-li jakékoli dotazy týkající se těchto Zásad ochrany osobních údajů, kontaktujte nás na e-mailu: ' : 'If you have any questions about this Privacy Policy, please contact us at: '}
                    <a href="mailto:team@growthspect.com" className="text-brand-purple hover:text-white transition-colors">team@growthspect.com</a>.
                </p>
            )
        }
    ];

    const headers: BlogPostHeader[] = sections.map(s => ({
        id: s.id,
        text: s.title,
        level: 2
    }));

    return (
        <div className="min-h-screen bg-brand-black relative">
            <div className="min-h-screen bg-[#050505] relative z-10 pt-32 pb-24">
                <Container className="!max-w-[1600px] px-6 md:px-12">
                     <FadeIn>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-20 leading-[1.25] tracking-tighter max-w-4xl">
                            {language === 'cs' ? 'Ochrana osobních údajů' : 'Privacy Policy'}
                        </h1>
                     </FadeIn>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* LEFT SIDEBAR */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-32 space-y-12">
                                <TableOfContents headers={headers} language={language} />
                            </div>
                        </div>

                        {/* MAIN CONTENT */}
                        <div ref={contentRef} className="lg:col-span-7">
                            <div className="prose prose-invert prose-lg max-w-none">
                                {sections.map((section, idx) => (
                                    <div key={section.id} id={section.id} className="mb-20 scroll-mt-32 border-b border-white/5 pb-12 last:border-0">
                                        <FadeIn delay={idx * 0.1}>
                                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                                                {section.title}
                                            </h2>
                                            <div className="text-gray-400 font-light leading-relaxed space-y-6 text-lg">
                                                {section.content}
                                            </div>
                                        </FadeIn>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};
