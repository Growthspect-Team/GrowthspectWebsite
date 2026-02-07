
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'cs' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isTransitioning: boolean;
    finishTransition: () => void;
}

const translations = {
    cs: {
        'nav.services': 'Služby',
        'nav.blog': 'Blog',
        'nav.scalex': 'Scalex',
        'nav.contact': 'Kontakt',
        'nav.inquiry': 'Pojďme začít',
        'hero.title.part1': 'Přepisujeme DNA firem',
        'hero.title.part2': 'pro éru umělé inteligence.',
        'hero.subtitle': 'Navrhujeme a stavíme end-to-end řešení: AI agenti, automatizace, robustní aplikace a podnikové datové platformy.',
        'hero.cta.consult': 'Domluvit mini audit',
        'hero.cta.projects': 'Ukázky systémů',
        'insights.title': 'Insights',
        'insights.subtitle': 'Engineering Blog',
        'insights.description': 'Hluboké ponory do architektury, Rust optimalizací a designu AI systémů.',
        'insights.all': 'Všechny články',
        'insights.read': 'Číst článek',
        'insights.headline.part1': 'Pojďme mluvit',
        'insights.headline.part2': 'jako experti',
        'insights.read_blog': 'Přečtěte si náš blog',
        'scalex.teaser.label': 'Partnership Program',
        'scalex.teaser.title': 'Infrastruktura pro Růst',
        'scalex.teaser.description': 'Nejedná se pouze o software. Scalex je kompletní ekosystém autonomních agentů a nástrojů, které integrujeme přímo do jádra vašeho byznysu pro zajištění exponenciálního škálování.',
        'scalex.teaser.cta': 'Objevit Ekosystém',
        'cta.title': 'Začněme stavět váš systém.',
        'cta.subtitle': 'Hledáme partnery pro dlouhodobou spolupráci na komplexních projektech. Konzultujte svůj záměr s našimi architekty.',
        'cta.form.name': 'Jméno',
        'cta.form.email': 'Email',
        'cta.form.description': 'Stručný popis projektu...',
        'cta.form.submit': 'Odeslat poptávku',
        'cta.success.title': 'Poptávka odeslána!',
        'cta.success.message': 'Ozveme se vám do 24 hodin s návrhem dalšího postupu.',
        'footer.rights': 'Všechna práva vyhrazena.',
        'footer.description': 'Navrhujeme a stavíme systémy, které definují budoucnost vašeho byznysu.',
        'footer.badge': 'Trusted Engineering Partner',
        'projects.title': 'Vybrané reference',
        'projects.view': 'Zobrazit projekt',
        'status': 'STATUS',
        'lang': 'CS',
        'cookie.title': 'Používáme cookies',
        'cookie.description': 'Pro lepší uživatelský zážitek.',
        'cookie.policy': 'Ochrana soukromí',
        'cookie.preferences': 'Nastavení',
        'cookie.deny': 'Odmítnout',
        'cookie.accept': 'Přijmout',
        'whyus.label': 'PROČ SI VYBRAT NÁS',
        'whyus.title': 'AI-First přístup',
        'whyus.description': 'Umělou inteligenci používáme k tomu, abychom postupovali rychleji, využívali zdroje efektivněji a dodávali kvalitnější výsledky. Díky zkušenostem se zakládáním vlastních startupů přinášíme do každého produktu rychlost, flexibilitu a inovaci.',
        'whyus.button': 'proč my',
        'contact.title': 'Máte zajímavý projekt?',
        'contact.subtitle': 'Můžete buď vyplnit formulář vpravo nebo nás kontaktovat přímo na',
        'contact.form.firstname': 'Křestní jméno',
        'contact.form.lastname': 'Příjmení',
        'contact.form.email': 'Email',
        'contact.form.company': 'Firma',
        'contact.form.position': 'Pozice',
        'contact.form.message': 'Vaše zpráva',
        'contact.form.submit': "Let's talk",
        'contact.form.consent': 'Kliknutím na tlačítko potvrzujete, že souhlasíte s našimi',
        'contact.form.privacy': 'Zásady ochrany osobních údajů',
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
        'strategic.status.completed': 'Dokončeno'
    },
    en: {
        'nav.services': 'Services',
        'nav.blog': 'Blog',
        'nav.scalex': 'Scalex',
        'nav.contact': 'Contact',
        'nav.inquiry': 'Let\'s Start',
        'hero.title.part1': 'Rewriting Business DNA',
        'hero.title.part2': 'for the Era of AI.',
        'hero.subtitle': 'We design and build end-to-end solutions: AI agents, automation, robust applications, and enterprise data platforms.',
        'hero.cta.consult': 'Book a Mini Audit',
        'hero.cta.projects': 'View Systems',
        'insights.title': 'Insights',
        'insights.subtitle': 'Engineering Blog',
        'insights.description': 'Deep dives into architecture, Rust optimization, and AI system design.',
        'insights.all': 'All Articles',
        'insights.read': 'Read Article',
        'insights.headline.part1': 'Let\'s talk',
        'insights.headline.part2': 'expert to expert',
        'insights.read_blog': 'Read our blog',
        'scalex.teaser.label': 'Partnership Program',
        'scalex.teaser.title': 'Infrastructure for Growth',
        'scalex.teaser.description': 'It\'s not just software. Scalex is a complete ecosystem of autonomous agents and tools that we integrate directly into your business core for exponential scaling.',
        'scalex.teaser.cta': 'Discover Ecosystem',
        'cta.title': 'Let\'s start building your system.',
        'cta.subtitle': 'We are looking for long-term partners for complex projects. Consult your vision with our architects.',
        'cta.form.name': 'Name',
        'cta.form.email': 'Email',
        'cta.form.description': 'Brief project description...',
        'cta.form.submit': 'Send Inquiry',
        'cta.success.title': 'Inquiry Sent!',
        'cta.success.message': 'We will get back to you within 24 hours with a proposal.',
        'footer.rights': 'All rights reserved.',
        'footer.description': 'We design and build systems that define the future of your business.',
        'footer.badge': 'Trusted Engineering Partner',
        'projects.title': 'Selected Projects',
        'projects.view': 'View Project',
        'status': 'STATUS',
        'lang': 'EN',
        'cookie.title': 'We use cookies',
        'cookie.description': 'To enhance your experience.',
        'cookie.policy': 'Privacy Policy',
        'cookie.preferences': 'Preferences',
        'cookie.deny': 'Deny',
        'cookie.accept': 'Accept',
        'whyus.label': 'WHY CHOOSE US',
        'whyus.title': 'AI-First Approach',
        'whyus.description': 'We use artificial intelligence to move faster, use resources more efficiently, and deliver higher quality results. Thanks to our experience founding our own startups, we bring speed, flexibility, and innovation to every product.',
        'whyus.button': 'why us',
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
        'strategic.status.completed': 'Completed'
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>(() => {
        // Detect browser language
        if (typeof window !== 'undefined') {
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

    const handleSetLanguage = (lang: Language) => {
        setIsTransitioning(true);
        setLanguage(lang);
    };

    const finishTransition = () => {
        setIsTransitioning(false);
    };

    const t = (key: string) => {
        return (translations[language] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isTransitioning, finishTransition }}>
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
