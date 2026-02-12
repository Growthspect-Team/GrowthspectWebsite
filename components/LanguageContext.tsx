
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

type Language = 'cs' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
    isTransitioning: boolean;
    finishTransition: () => void;
}

const translations: Record<Language, Record<string, string>> = {
    cs: {
        // Navigation
        'nav.home': 'Domů',
        'nav.services': 'Služby',
        'nav.projects': 'Projekty',
        'nav.blog': 'Blog',
        'nav.scalex': 'Scalex',
        'nav.contact': 'Kontakt',
        'nav.careers': 'Kariéra',
        'nav.inquiry': 'Domluvit mini audit',
        
        // Hero
        'hero.title.part1': 'Tvoříme budoucnost.',
        'hero.title.part2': 'Poháněnou AI.',
        'hero.subtitle': 'Propojujeme technologickou preciznost a rychlost umělé inteligence v produkty a řešení s podnikatelským přesahem.',
        'hero.cta.consult': 'Domluvit mini audit',
        'hero.cta.projects': 'Naše projekty',
        
        // About Section
        'about.label': 'KDO JSME?',
        'about.title.part1': 'Partner pro digitální',
        'about.title.part2': 'růst a AI.',
        'about.description': 'Měníme pravidla hry. Stavíme na moderních technologiích a využíváme sílu AI k tvorbě řešení, která promění vaše výzvy v konkurenční výhodu.',
        'about.card1.id': '01',
        'about.card1.title': 'Mindset Zakladatelů',
        'about.card1.description': 'Nestavíme jen software, budujeme byznys. K vašemu projektu přistupujeme se stejnou péčí, dravostí a smyslem pro detail, jako k našim vlastním startupům.',
        'about.card2.id': '02',
        'about.card2.title': 'Akcelerace pomocí AI',
        'about.card2.description': 'Využíváme nejnovější AI nástroje pro radikální zrychlení vývoje a snížení nákladů. Co jiným trvá měsíce, my dodáváme v řádu týdnů, aniž bychom slevili z kvality.',
        'about.card3.id': '03',
        'about.card3.title': 'Design, Build & Scale',
        'about.card3.description': 'Jsme s vámi od prvního nápadu až po globální expanzi. Navrhujeme, vyvíjíme a škálujeme robustní systémy, které jsou připraveny na nápor milionů uživatelů.',
        
        // Why Us Section
        'whyus.label': 'PROČ SI VYBRAT NÁS',
        'whyus.badge': 'ECOMMERCE GROWTH',
        'whyus.title': 'AI-First přístup',
        'whyus.description': 'Umělou inteligenci používáme k tomu, abychom postupovali rychleji, využívali zdroje efektivněji a dodávali kvalitnější výsledky. Díky zkušenostem se zakládáním vlastních startupů přinášíme do každého produktu rychlost, flexibilitu a inovaci.',
        'whyus.button': 'proč my',
        
        // Services
        'services.badge': 'Naše Služby',
        'services.main_title': 'Měníme nápady ve',
        'services.main_title_highlight': 'škálovatelná řešení.',
        'services.main_subtitle': 'Navrhujeme a stavíme digitální řešení, která doručují reálné výsledky.',
        'services.cta': 'Více o službách',
        'services.all': 'Všechny služby',
        
        // Projects/Work
        'projects.title': 'Naše Projekty',
        'projects.view': 'Zobrazit projekt',
        'projects.badge': 'Selected Work',
        'projects.hero.title.part1': 'Produkty,',
        'projects.hero.title.part2': 'které definují trh',
        'projects.hero.description': 'Nejsme jen vývojáři, jsme architekti vašeho růstu. Propojujeme moderní technologie a umělou inteligenci tak, abychom doručili řešení, která skutečně fungují a generují zisk.',
        'projects.hero.cta': 'Objevit úspěšné projekty',
        
        // Insights/Blog
        'insights.title': 'Insights',
        'insights.subtitle': 'Engineering Blog',
        'insights.description': 'Hluboké ponory do architektury, Rust optimalizací a designu AI systémů.',
        'insights.all': 'Všechny články',
        'insights.read': 'Číst článek',
        'insights.headline.part1': 'Nejnovější',
        'insights.headline.part2': 'blogové příspěvky?',
        'insights.read_blog': 'Přečtěte si náš blog',
        'insights.featured': 'Doporučený článek',
        'insights.search': 'Hledat články...',
        'insights.no_results': 'Nenalezeny žádné články',
        'insights.load_more': 'Načíst více',
        
        // Scalex
        'scalex.teaser.label': 'Partnership Program',
        'scalex.teaser.title': 'Infrastruktura pro Růst',
        'scalex.teaser.description': 'Nejedná se pouze o software. Scalex je kompletní ekosystém autonomních agentů a nástrojů, které integrujeme přímo do jádra vašeho byznysu pro zajištění exponenciálního škálování.',
        'scalex.teaser.cta': 'Objevit Ekosystém',
        'scalex.hero.back': 'Zpět na domů',
        'scalex.audience.title': 'Pro koho je Scalex',
        'scalex.audience.item1.title': 'Scale-ups & Enterprises',
        'scalex.audience.item1.description': 'Pro firmy, které už AI automatizaci mají, ale nemají kapacitu ji řešit interně.',
        'scalex.audience.item2.title': 'Stability First Teams',
        'scalex.audience.item2.description': 'Pro týmy, které chtějí stabilní systém, ne jednorázové řešení.',
        'scalex.audience.item3.title': 'Growth Leaders',
        'scalex.audience.item3.description': 'Pro podniky, které berou škálování vážně a potřebují robustní infrastrukturu.',
        
        // CTA Section
        'cta.title': 'Začněme stavět váš systém.',
        'cta.subtitle': 'Hledáme partnery pro dlouhodobou spolupráci na komplexních projektech. Konzultujte svůj záměr s našimi architekty.',
        'cta.form.name': 'Jméno',
        'cta.form.email': 'Email',
        'cta.form.description': 'Stručný popis projektu...',
        'cta.form.submit': 'Odeslat poptávku',
        'cta.success.title': 'Poptávka odeslána!',
        'cta.success.message': 'Ozveme se vám do 24 hodin s návrhem dalšího postupu.',
        
        // Contact Page
        'contact.title': 'Máte zajímavý nápad?',
        'contact.subtitle': 'Pro odeslání zprávy využijte formulář vpravo nebo se nám ozvěte na:',
        'contact.form.firstname': 'Křestní jméno',
        'contact.form.lastname': 'Příjmení',
        'contact.form.email': 'Email',
        'contact.form.company': 'Firma',
        'contact.form.position': 'Pozice',
        'contact.form.source': 'Odkud jste se o nás dozvěděli?',
        'contact.form.source.google': 'Google',
        'contact.form.source.linkedin': 'LinkedIn',
        'contact.form.source.social': 'Facebook / Instagram',
        'contact.form.source.recommendation': 'Doporučení',
        'contact.form.source.other': 'Jiné',
        'contact.form.message': 'Vaše zpráva',
        'contact.form.submit': 'Odeslat zprávu',
        'contact.form.sending': 'Odesílání...',
        'contact.form.consent': 'Kliknutím na tlačítko potvrzujete, že souhlasíte s našimi',
        'contact.form.privacy': 'Zásady ochrany osobních údajů',
        'contact.success.title': 'Zpráva odeslána!',
        'contact.success.message': 'Děkujeme za váš zájem. Ozveme se vám do 24 hodin.',
        'contact.error': 'Něco se pokazilo. Zkuste to prosím znovu.',
        'contact.copied': 'Zkopírováno',
        
        // Careers Page
        'careers.hero.title.part1': 'Kde technologie',
        'careers.hero.title.part2': 'mění byznys',
        'careers.hero.description': 'Hledáme výjimečné talenty, kteří chtějí stavět budoucnost s AI a Rustem.',
        'careers.hero.cta': "Let's talk",
        'careers.positions.badge': 'PŘIDEJTE SE K NÁM!',
        'careers.positions.title': 'Otevřené pozice',
        'careers.positions.description': 'Máme oči otevřené pro výjimečné talenty, kteří se nebojí výzev.',
        'careers.sidebar.title': 'Pokud máte chuť se potkat, napište nám email!',
        'careers.sidebar.description': 'Rádi si popovídáme o vašich zkušenostech a o tom, jak bychom mohli spolupracovat.',
        'careers.sidebar.cta': 'Napište nám',
        
        // Footer
        'footer.cta.title': 'Připraveni na váš',
        'footer.cta.subtitle': 'další velký projekt?',
        'footer.cta.button': 'Pojďme začít',
        'footer.explore': 'Prozkoumat',
        'footer.connect': 'Connect',
        'footer.rights': 'Všechna práva vyhrazena.',
        'footer.description': 'Navrhujeme a stavíme systémy, které definují budoucnost vašeho byznysu.',
        'footer.badge': 'Trusted Engineering Partner',
        'footer.privacy': 'Ochrana soukromí',
        'footer.terms': 'Obchodní podmínky',
        
        // Strategic Planning Section
        'strategic.label': 'STRATEGICKÉ PLÁNOVÁNÍ',
        'strategic.title.part1': 'Nastavte strategický',
        'strategic.title.part2': 'směr',
        'strategic.description': 'Sjednoťte svůj tým kolem jednotné vize. Plánujte, řiďte a sledujte všechny strategické iniciativy s naším vizuálním frameworkem.',
        'strategic.timeline.item1': 'Expanze na trh Fáze 1',
        'strategic.timeline.item2': 'Digitální transformace',
        'strategic.timeline.item3': 'Globální škálování',
        'strategic.artifacts.title.part1': 'Artefakty v reálném čase',
        'strategic.artifacts.title.part2': 'pro lepší rozhodování',
        'strategic.artifacts.doc': 'Kolaborativní Strategie',
        'strategic.artifacts.doc.desc': 'Živé úpravy a správa verzí pro všechny vaše strategické plány.',
        'strategic.artifacts.feedback': 'Inline zpětná vazba',
        'strategic.artifacts.kpi': 'Sledování KPI',
        'strategic.editor.draft': 'NÁVRH',
        'strategic.editor.title': 'Strategická Expanze 2.0',
        'strategic.editor.text.1': 'Nový',
        'strategic.editor.text.2': 'sync engine',
        'strategic.editor.text.3': 'umožňuje spolupráci napříč odděleními v reálném čase.',
        'strategic.editor.comment': 'Musíme zajistit, aby strategie řešení konfliktů upřednostňovala záměr uživatele.',
        'strategic.editor.list.obj': 'Klíčové cíle pro Q3:',
        'strategic.editor.list.1': 'Snížení latence o 50%',
        'strategic.editor.list.2': 'Integrace AI insightů',
        'strategic.editor.list.3': 'Expanze na asijské trhy',
        'strategic.editor.active': 'Aktivní diskuze',
        'strategic.editor.note': 'Poznámka',
        'strategic.editor.note.text': 'Nezapomeňte aktualizovat WebSocket protokol...',
        'strategic.status.changed': 'Změněn stav na',
        'strategic.status.completed': 'Dokončeno',
        
        // Cookie Banner
        'cookie.title': 'Používáme cookies',
        'cookie.description': 'Pro lepší uživatelský zážitek.',
        'cookie.policy': 'Ochrana soukromí',
        'cookie.preferences': 'Nastavení',
        'cookie.deny': 'Odmítnout',
        'cookie.accept': 'Přijmout',
        'cookie.preferences.title': 'Nastavení cookies',
        'cookie.preferences.necessary': 'Nezbytné (vždy aktivní)',
        'cookie.preferences.analytics': 'Analytické',
        'cookie.preferences.marketing': 'Marketingové',
        'cookie.preferences.save': 'Uložit nastavení',
        'cookie.preferences.success': 'Nastavení uloženo',
        
        // Misc
        'status': 'STATUS',
        'lang': 'CS',
        'loading': 'Načítání...',
        'back': 'Zpět',
        'view_all': 'Zobrazit vše',
        'read_more': 'Číst více',
        'coming_soon': 'Již brzy'
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.projects': 'Projects',
        'nav.blog': 'Blog',
        'nav.scalex': 'Scalex',
        'nav.contact': 'Contact',
        'nav.careers': 'Careers',
        'nav.inquiry': 'Book a Mini Audit',
        
        // Hero
        'hero.title.part1': 'Building the Future.',
        'hero.title.part2': 'Powered by AI.',
        'hero.subtitle': 'We connect technological precision with AI speed to deliver products and solutions with real business impact.',
        'hero.cta.consult': 'Book a Mini Audit',
        'hero.cta.projects': 'View Projects',
        
        // About Section
        'about.label': 'WHO WE ARE?',
        'about.title.part1': 'Your Partner for Digital',
        'about.title.part2': 'Growth & AI.',
        'about.description': 'We change the rules of the game. Building on modern technologies and leveraging AI to create solutions that turn your challenges into competitive advantages.',
        'about.card1.id': '01',
        'about.card1.title': 'Founder Mindset',
        'about.card1.description': "We don't just build software, we build businesses. We approach your project with the same care, drive, and attention to detail as our own startups.",
        'about.card2.id': '02',
        'about.card2.title': 'AI-Powered Acceleration',
        'about.card2.description': 'We use cutting-edge AI tools for radical development acceleration and cost reduction. What takes others months, we deliver in weeks without compromising quality.',
        'about.card3.id': '03',
        'about.card3.title': 'Design, Build & Scale',
        'about.card3.description': "We're with you from the first idea to global expansion. We design, develop, and scale robust systems ready for millions of users.",
        
        // Why Us Section
        'whyus.label': 'WHY CHOOSE US',
        'whyus.badge': 'ECOMMERCE GROWTH',
        'whyus.title': 'AI-First Approach',
        'whyus.description': 'We use artificial intelligence to move faster, use resources more efficiently, and deliver higher quality results. Thanks to our experience founding our own startups, we bring speed, flexibility, and innovation to every product.',
        'whyus.button': 'why us',
        
        // Services
        'services.badge': 'Our Services',
        'services.main_title': 'Transforming Ideas into',
        'services.main_title_highlight': 'Scalable Solutions.',
        'services.main_subtitle': 'We design and build digital solutions that deliver real results.',
        'services.cta': 'Learn more about services',
        'services.all': 'All services',
        
        // Projects/Work
        'projects.title': 'Our Projects',
        'projects.view': 'View Project',
        'projects.badge': 'Selected Work',
        'projects.hero.title.part1': 'Products,',
        'projects.hero.title.part2': 'Defining the Market',
        'projects.hero.description': "We're not just developers, we're architects of your growth. We connect modern technologies and AI to deliver solutions that actually work and generate profit.",
        'projects.hero.cta': 'Discover More',
        
        // Insights/Blog
        'insights.title': 'Insights',
        'insights.subtitle': 'Engineering Blog',
        'insights.description': 'Deep dives into architecture, Rust optimization, and AI system design.',
        'insights.all': 'All Articles',
        'insights.read': 'Read Article',
        'insights.headline.part1': "What's",
        'insights.headline.part2': 'New?',
        'insights.read_blog': 'Read our blog',
        'insights.featured': 'Featured Article',
        'insights.search': 'Search articles...',
        'insights.no_results': 'No articles found',
        'insights.load_more': 'Load more',
        
        // Scalex
        'scalex.teaser.label': 'Partnership Program',
        'scalex.teaser.title': 'Infrastructure for Growth',
        'scalex.teaser.description': "It's not just software. Scalex is a complete ecosystem of autonomous agents and tools that we integrate directly into your business core for exponential scaling.",
        'scalex.teaser.cta': 'Discover Ecosystem',
        'scalex.hero.back': 'Back to Home',
        'scalex.audience.title': 'Who is Scalex for?',
        'scalex.audience.item1.title': 'Scale-ups & Enterprises',
        'scalex.audience.item1.description': 'For companies that already have AI automation but lack the internal capacity to manage it.',
        'scalex.audience.item2.title': 'Stability First Teams',
        'scalex.audience.item2.description': 'For teams that want a stable system, not a one-time solution.',
        'scalex.audience.item3.title': 'Growth Leaders',
        'scalex.audience.item3.description': 'For businesses that take scaling seriously and need robust infrastructure.',
        
        // CTA Section
        'cta.title': "Let's start building your system.",
        'cta.subtitle': 'We are looking for long-term partners for complex projects. Consult your vision with our architects.',
        'cta.form.name': 'Name',
        'cta.form.email': 'Email',
        'cta.form.description': 'Brief project description...',
        'cta.form.submit': 'Send Inquiry',
        'cta.success.title': 'Inquiry Sent!',
        'cta.success.message': 'We will get back to you within 24 hours with a proposal.',
        
        // Contact Page
        'contact.title': 'Got a Great Idea?',
        'contact.subtitle': 'Fill out the form or reach out to us directly at:',
        'contact.form.firstname': 'First Name',
        'contact.form.lastname': 'Last Name',
        'contact.form.email': 'Email',
        'contact.form.company': 'Company',
        'contact.form.position': 'Position',
        'contact.form.source': 'How did you hear about us?',
        'contact.form.source.google': 'Google',
        'contact.form.source.linkedin': 'LinkedIn',
        'contact.form.source.social': 'Facebook / Instagram',
        'contact.form.source.recommendation': 'Recommendation',
        'contact.form.source.other': 'Other',
        'contact.form.message': 'Your message',
        'contact.form.submit': "Let's talk",
        'contact.form.sending': 'Sending...',
        'contact.form.consent': 'By clicking the button you agree to our',
        'contact.form.privacy': 'Privacy Policy',
        'contact.success.title': 'Message Sent!',
        'contact.success.message': 'Thank you for your interest. We will get back to you within 24 hours.',
        'contact.error': 'Something went wrong. Please try again.',
        'contact.copied': 'Copied',
        
        // Careers Page
        'careers.hero.title.part1': 'Where Technology',
        'careers.hero.title.part2': 'Changes Business',
        'careers.hero.description': "We're looking for exceptional talents who want to build the future with AI and Rust.",
        'careers.hero.cta': "Let's talk",
        'careers.positions.badge': 'JOIN US!',
        'careers.positions.title': 'Open Positions',
        'careers.positions.description': 'We have our eyes open for exceptional talents who are not afraid of challenges.',
        'careers.sidebar.title': 'Want to meet? Send us an email!',
        'careers.sidebar.description': "We'd love to chat about your experience and how we could work together.",
        'careers.sidebar.cta': 'Contact us',
        
        // Footer
        'footer.cta.title': 'Ready for your',
        'footer.cta.subtitle': 'next big project?',
        'footer.cta.button': "Let's go",
        'footer.explore': 'Explore',
        'footer.connect': 'Connect',
        'footer.rights': 'All rights reserved.',
        'footer.description': 'We design and build systems that define the future of your business.',
        'footer.badge': 'Trusted Engineering Partner',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        
        // Strategic Planning Section
        'strategic.label': 'STRATEGIC PLANNING',
        'strategic.title.part1': 'Set the strategic',
        'strategic.title.part2': 'direction',
        'strategic.description': 'Align your team around a unified vision. Plan, manage, and track all strategic initiatives with our visual framework.',
        'strategic.timeline.item1': 'Market Expansion Phase 1',
        'strategic.timeline.item2': 'Digital Transformation',
        'strategic.timeline.item3': 'Global Scalability',
        'strategic.artifacts.title.part1': 'Real-time artifacts',
        'strategic.artifacts.title.part2': 'for better decisions',
        'strategic.artifacts.doc': 'Collaborative Strategy',
        'strategic.artifacts.doc.desc': 'Live editing and version control for all your strategic plans.',
        'strategic.artifacts.feedback': 'Inline Feedback',
        'strategic.artifacts.kpi': 'KPI Tracking',
        'strategic.editor.draft': 'DRAFT',
        'strategic.editor.title': 'Strategic Expansion 2.0',
        'strategic.editor.text.1': 'The new',
        'strategic.editor.text.2': 'sync engine',
        'strategic.editor.text.3': 'enables real-time collaboration across departments.',
        'strategic.editor.comment': 'We need to ensure the conflict resolution strategy prioritizes user intent.',
        'strategic.editor.list.obj': 'Key objectives for Q3:',
        'strategic.editor.list.1': 'Reduce latency by 50%',
        'strategic.editor.list.2': 'Integrate AI insights',
        'strategic.editor.list.3': 'Expand to Asian markets',
        'strategic.editor.active': 'Active discussion',
        'strategic.editor.note': 'Note',
        'strategic.editor.note.text': 'Remember to update the WebSocket protocol...',
        'strategic.status.changed': 'Changed status to',
        'strategic.status.completed': 'Completed',
        
        // Cookie Banner
        'cookie.title': 'We use cookies',
        'cookie.description': 'To enhance your experience.',
        'cookie.policy': 'Privacy Policy',
        'cookie.preferences': 'Preferences',
        'cookie.deny': 'Deny',
        'cookie.accept': 'Accept',
        'cookie.preferences.title': 'Cookie Preferences',
        'cookie.preferences.necessary': 'Necessary (Always active)',
        'cookie.preferences.analytics': 'Analytics',
        'cookie.preferences.marketing': 'Marketing',
        'cookie.preferences.save': 'Save Preferences',
        'cookie.preferences.success': 'Preferences saved',
        
        // Misc
        'status': 'STATUS',
        'lang': 'EN',
        'loading': 'Loading...',
        'back': 'Back',
        'view_all': 'View all',
        'read_more': 'Read more',
        'coming_soon': 'Coming soon'
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        // Check localStorage first
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('language');
            if (saved === 'cs' || saved === 'en') {
                return saved;
            }
            // Detect browser language
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.includes('cs') || browserLang.includes('cz')) {
                return 'cs';
            }
            if (browserLang.startsWith('en')) {
                return 'en';
            }
        }
        return 'cs'; // Default
    });

    const [isTransitioning, setIsTransitioning] = useState(false);

    const setLanguage = useCallback((lang: Language) => {
        setIsTransitioning(true);
        setLanguageState(lang);
        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', lang);
        }
    }, []);

    const finishTransition = useCallback(() => {
        setIsTransitioning(false);
    }, []);

    const t = useCallback((key: string, params?: Record<string, string | number>) => {
        let text = translations[language][key] || key;
        
        // Replace parameters like {{name}} with actual values
        if (params) {
            Object.entries(params).forEach(([param, value]) => {
                text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
            });
        }
        
        return text;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isTransitioning, finishTransition }}>
            <Helmet>
                <html lang={language} />
            </Helmet>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

