
import React, { useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle2, Bot, Workflow, Code2, Server, Database, 
  Zap, ShieldCheck, Cpu, Globe, BarChart3, Lock, Terminal
} from 'lucide-react';
import { Container, Section, Button, FadeIn, Heading, Text } from './UI';
import { useLenis } from './SmoothScroll';

interface ServiceDetailProps {
  serviceId: string;
  onBack: () => void;
}

// --- RICH SEO CONTENT DATA ---
const SERVICE_CONTENT: Record<string, any> = {
  'ai-agents': {
    title: "Autonomní AI Agenti",
    subtitle: "Digital Workforce",
    icon: Bot,
    heroText: "Inteligentní pracovní síla, která nikdy nespí.",
    description: "Proměňte vaši zákaznickou podporu v nejvýkonnější prodejní kanál. Naši AI agenti zastanou roli špičkových technických specialistů – během vteřin vyřeší složité požadavky klientů – ale tím nekončí. Každou interakci strategicky využívají k profilování zákazníka a sběru klíčových dat. Výsledkem je automatická konverze běžného návštěvníka na horký lead připravený pro váš obchodní tým.",
    benefits: [
      { title: "24/7 Dostupnost", desc: "Okamžité reakce na požadavky klientů v jakoukoliv denní dobu, bez front a čekání." },
      { title: "Kontextová Paměť", desc: "Agenti si pamatují historii konverzací a chápou nuance vašeho byznysu díky napojení na interní knowledge base." },
      { title: "Škálovatelnost", desc: "Systém zvládne tisíce souběžných konverzací bez ztráty kvality nebo nutnosti nabírat nové zaměstnance." },
      { title: "Multilingvální Podpora", desc: "Automatická komunikace ve více než 50 jazycích na nativní úrovni." }
    ],
    techStack: ["OpenAI GPT-4o", "LangChain", "Pinecone Vector DB", "Python", "FastAPI"],
    processTitle: "Jak nasazujeme agenty",
    processSteps: [
        "Analýza komunikačních toků a datových zdrojů.",
        "Trénink a fine-tuning modelů na vašich datech.",
        "Integrace s komunikačními kanály (Web, WhatsApp, Email).",
        "Testovací provoz a optimalizace odpovědí."
    ]
  },
  'automation': {
    title: "Enterprise Automatizace",
    subtitle: "Process Orchestration",
    icon: Workflow,
    heroText: "Eliminujte manuální rutinu. Nechte stroje pracovat.",
    description: "Propojujeme izolované systémy do jednoho funkčního organismu. Naše automatizační workflow přenášejí data mezi vaším ERP, CRM, marketingovými nástroji a komunikačními platformami v reálném čase. Snižujeme chybovost lidského faktoru na nulu a uvolňujeme kapacity vašeho týmu pro kreativní a strategickou práci.",
    benefits: [
      { title: "Úspora Nákladů", desc: "Dramatické snížení operativních nákladů díky automatizaci opakujících se úloh." },
      { title: "Zero-Error Rate", desc: "Eliminace překlepů, zapomenutých úkolů a chyb při přepisování dat." },
      { title: "Real-time Synchronizace", desc: "Všechny vaše systémy mají vždy aktuální data ve stejném okamžiku." },
      { title: "Auditovatelnost", desc: "Každý automatizovaný krok je zaznamenán pro zpětnou kontrolu a compliance." }
    ],
    techStack: ["n8n", "Make.com", "Python Scripting", "Webhooks", "REST/GraphQL API"],
    processTitle: "Cesta k automatizaci",
    processSteps: [
        "Mapování procesů a identifikace úzkých hrdel.",
        "Návrh architektury datových toků.",
        "Vývoj a implementace integračních skriptů.",
        "Monitoring a maintenance workflow."
    ]
  },
  'software': {
    title: "Custom Software",
    subtitle: "Mission Critical Apps",
    icon: Code2,
    heroText: "Aplikace, které definují váš digitální produkt.",
    description: "Vyvíjíme webové a mobilní aplikace na míru s důrazem na výkon, bezpečnost a uživatelský zážitek. Nepoužíváme šablonová řešení. Stavíme na moderním technologickém stacku, který zajišťuje dlouhodobou udržitelnost, snadnou rozšiřitelnost a bleskovou rychlost načítání. Od klientských portálů po složité interní systémy.",
    benefits: [
      { title: "Moderní Architektura", desc: "Využíváme React, Next.js a serverless technologie pro maximální efektivitu." },
      { title: "Bezpečnost by Design", desc: "Implementace pokročilých bezpečnostních standardů a ochrany dat od prvního řádku kódu." },
      { title: "UX/UI na Míru", desc: "Design, který vede uživatele k cíli a zvyšuje konverzní poměry." },
      { title: "Žádný Vendor-Lock", desc: "Čistý kód a otevřené standardy. Aplikace je plně ve vašem vlastnictví." }
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    processTitle: "Vývojový cyklus",
    processSteps: [
        "Product Discovery a definice MVP.",
        "UX/UI Design a prototypování.",
        "Agilní vývoj a průběžné testování.",
        "Nasazení do produkce a škálování."
    ]
  },
  'rust': {
    title: "High-Performance Infrastruktura",
    subtitle: "Rust Backend Engineering",
    icon: Server,
    heroText: "Výkon bez kompromisů. Bezpečnost bez garbage collection.",
    description: "Pro systémy, kde záleží na každé milisekundě. Specializujeme se na vývoj backendových služeb v jazyce Rust. Tento přístup nám umožňuje dosáhnout extrémní propustnosti dat a paměťové bezpečnosti, kterou jiné jazyky nemohou garantovat. Ideální pro fintech, real-time analytiku, IoT a vysoce zatížené API služby.",
    benefits: [
      { title: "Extrémní Výkon", desc: "Zpracování milionů requestů s minimální latencí a spotřebou zdrojů." },
      { title: "Memory Safety", desc: "Rust garantuje bezpečnost paměti při kompilaci, což eliminuje celou třídu bezpečnostních chyb." },
      { title: "Úspora Cloud Nákladů", desc: "Efektivnější kód znamená menší nároky na hardware a nižší faktury za servery." },
      { title: "Spolehlivost", desc: "Systémy, které běží měsíce bez nutnosti restartu nebo údržby." }
    ],
    techStack: ["Rust", "Tokio", "Axum", "Actix Web", "gRPC"],
    processTitle: "Inženýrský proces",
    processSteps: [
        "Audit stávající infrastruktury a identifikace bottlenecků.",
        "Návrh mikroservisní architektury v Rustu.",
        "Přepis kritických komponent a zátěžové testy.",
        "Deployment s nulovým downtime."
    ]
  },
  'data': {
    title: "Datové Platformy",
    subtitle: "Unified Intelligence",
    icon: Database,
    heroText: "Data jako strategické aktivum pro vaše rozhodování.",
    description: "Transformujeme chaos roztříštěných dat na jasné informace. Stavíme moderní datové sklady (Data Warehouses) a ETL/ELT pipelines, které konsolidují data z různých zdrojů do jedné 'pravdy'. Poskytujeme infrastrukturu pro real-time reporting, business intelligence a pokročilou analytiku, která pohání růst vaší firmy.",
    benefits: [
      { title: "Single Source of Truth", desc: "Všechna firemní data na jednom místě, vyčištěná a připravená k analýze." },
      { title: "Real-time Insight", desc: "Sledujte klíčové metriky (KPIs) v reálném čase, ne s týdenním zpožděním." },
      { title: "Data Quality", desc: "Automatizované procesy pro kontrolu kvality a konzistence dat." },
      { title: "AI Readiness", desc: "Strukturovaná data připravená pro trénink AI modelů a prediktivní analytiku." }
    ],
    techStack: ["PostgreSQL", "Snowflake", "dbt", "Apache Airflow", "Kafka"],
    processTitle: "Datová strategie",
    processSteps: [
        "Datový audit a definice zdrojů.",
        "Návrh datového modelu a warehouse architektury.",
        "Implementace ETL pipelines a transformací.",
        "Vizualizace v BI nástrojích."
    ]
  }
};

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, onBack }) => {
  const lenis = useLenis();
  const content = SERVICE_CONTENT[serviceId];

  // Scroll to top on mount
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis, serviceId]);

  if (!content) return null;

  return (
    <div className="min-h-screen bg-brand-black relative">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-brand-purple/10 to-transparent pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <Section className="relative z-10 pt-12 pb-24">
        <Container>
          {/* Back Navigation */}
          <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-16 group uppercase text-xs tracking-widest font-medium"
          >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Zpět na přehled
          </button>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
             <div className="lg:col-span-7">
                <FadeIn>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                            {React.createElement(content.icon, { className: "w-6 h-6 text-brand-purple" })}
                        </div>
                        <span className="text-brand-purple font-sans font-medium text-sm uppercase tracking-widest">
                            {content.subtitle}
                        </span>
                    </div>
                    
                    <Heading level="h1" className="mb-8 leading-tight">
                        {content.title}
                    </Heading>
                    
                    <h2 className="text-2xl md:text-3xl text-gray-200 font-light mb-8 leading-snug">
                        {content.heroText}
                    </h2>
                    
                    <div className="prose prose-invert prose-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
                        <p>{content.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button variant="primary" className="rounded-full">
                            Konzultovat řešení
                        </Button>
                        <Button variant="outline" className="rounded-full">
                            Technická dokumentace
                        </Button>
                    </div>
                </FadeIn>
             </div>
             
             {/* Visual / Tech Stack */}
             <div className="lg:col-span-5 relative">
                 <FadeIn delay={0.2}>
                    <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-gray-500" />
                            Technologický Stack
                        </h3>
                        
                        <div className="space-y-4">
                            {content.techStack.map((tech: string, i: number) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-lg group-hover:border-brand-purple/20 transition-colors">
                                    <span className="text-gray-300 font-mono text-sm">{tech}</span>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                             <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                                 <span>KOMPATIBILITA</span>
                                 <span className="text-brand-purple">ENTERPRISE GRADE</span>
                             </div>
                        </div>
                    </div>
                 </FadeIn>
             </div>
          </div>

          {/* Benefits Grid */}
          <div className="mb-32">
             <FadeIn>
                 <Heading level="h2" className="mb-12 text-center md:text-left">Klíčové Výhody</Heading>
             </FadeIn>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {content.benefits.map((benefit: any, idx: number) => (
                     <FadeIn key={idx} delay={idx * 0.1}>
                         <div className="h-full bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:bg-white/[0.04] hover:border-brand-purple/30 transition-all duration-300 group">
                             <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                 {idx === 0 && <Zap className="w-5 h-5 text-brand-purple" />}
                                 {idx === 1 && <ShieldCheck className="w-5 h-5 text-brand-purple" />}
                                 {idx === 2 && <Globe className="w-5 h-5 text-brand-purple" />}
                                 {idx === 3 && <BarChart3 className="w-5 h-5 text-brand-purple" />}
                             </div>
                             <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                             <p className="text-sm text-gray-400 leading-relaxed">{benefit.desc}</p>
                         </div>
                     </FadeIn>
                 ))}
             </div>
          </div>

          {/* Process Section */}
          <Section noPadding className="border-t border-white/10 pt-24">
             <FadeIn>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                     <div>
                         <h2 className="text-sm font-mono text-brand-purple mb-2 uppercase tracking-widest">Workflow</h2>
                         <Heading level="h2">{content.processTitle}</Heading>
                         <Text className="mb-8">
                             Transparentní a agilní přístup k implementaci. Od prvního auditu až po plné nasazení do produkce.
                         </Text>
                     </div>
                     <div className="space-y-6">
                         {content.processSteps.map((step: string, idx: number) => (
                             <div key={idx} className="flex gap-6 group">
                                 <div className="flex flex-col items-center">
                                     <div className="w-8 h-8 rounded-full border border-brand-purple/30 bg-brand-purple/10 flex items-center justify-center text-sm font-mono text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                                         {idx + 1}
                                     </div>
                                     {idx !== content.processSteps.length - 1 && (
                                         <div className="w-px h-full bg-white/10 my-2 group-hover:bg-brand-purple/30 transition-colors" />
                                     )}
                                 </div>
                                 <div className="pb-8">
                                     <h4 className="text-xl font-bold text-white mb-2 group-hover:text-brand-purple transition-colors">{step}</h4>
                                     <p className="text-sm text-gray-500">Fáze {idx + 1} implementačního plánu.</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             </FadeIn>
          </Section>

        </Container>
      </Section>
    </div>
  );
};
