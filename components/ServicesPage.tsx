
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Workflow,
  Code2,
  Server,
  Database,
  ArrowLeft,
  ArrowRight,
  Terminal,
  Zap,
  X,
  CheckCircle,
  Loader2,
  Send
} from 'lucide-react';
import { Container, Section, Heading, Text, Button, FadeIn } from './UI';
import ParticleBackground from './ParticleBackground';
import { useLenis } from './SmoothScroll';

interface ServicesPageProps {
  onBack: () => void;
}

const detailedServices = [
  {
    id: 'ai-agents',
    icon: Bot,
    title: 'Autonomní AI Agenti',
    subtitle: 'Intelligent Workforce',
    description: 'Nejedná se o chatboty, ale o autonomní agenty schopné vykonávat komplexní sekvence úkolů. Využíváme RAG (Retrieval-Augmented Generation) nad vašimi firemními daty pro maximální kontextovou přesnost.',
    features: ['Custom LLM Fine-tuning', 'Multi-Agent Orchestration', 'Context-aware Memory', 'Self-correcting loops'],
    tech: ['OpenAI', 'LangChain', 'Pinecone', 'Python']
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Enterprise Automatizace',
    subtitle: 'Process Orchestration',
    description: 'Eliminujeme manuální datové vstupy a rutinní procesy. Stavíme robustní integrační mosty mezi izolovanými systémy (ERP, CRM, Slack, Email) s důrazem na error-handling a auditabilitu.',
    features: ['End-to-end Workflow Design', 'API Integration Strategy', 'Automated Reporting', 'Event-driven Architecture'],
    tech: ['n8n', 'Make', 'Kafka', 'Webhooks']
  },
  {
    id: 'software',
    icon: Code2,
    title: 'Custom Software',
    subtitle: 'Mission Critical Apps',
    description: 'Vývoj interních nástrojů a zákaznických portálů na míru. Zaměřujeme se na výkon, bezpečnost a dlouhodobou udržitelnost kódu. Žádný vendor-lock, čistá architektura.',
    features: ['Scalable Frontend Architecture', 'Secure Auth & RBAC', 'Real-time Dashboards', 'PWA capabilities'],
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind']
  },
  {
    id: 'rust',
    icon: Server,
    title: 'Rust Infrastruktura',
    subtitle: 'High-Performance Backend',
    description: 'Pro systémy, kde záleží na každé milisekundě. Přepisujeme kritické backendové služby do Rustu pro dosažení maximální propustnosti, paměťové bezpečnosti a minimalizaci nákladů na cloud.',
    features: ['Memory Safety Guarantee', 'Zero-cost Abstractions', 'Concurrency without Data Races', 'WASM support'],
    tech: ['Rust', 'Tokio', 'Axum', 'Actix']
  },
  {
    id: 'data',
    icon: Database,
    title: 'Datové Platformy',
    subtitle: 'Unified Intelligence',
    description: 'Konsolidace dat z roztříštěných zdrojů do jedné "Source of Truth". Navrhujeme moderní datové sklady a pipelines, které krmí vaše AI modely a BI reporty v reálném čase.',
    features: ['ETL/ELT Pipelines', 'Data Warehousing', 'Data Governance', 'Real-time Analytics'],
    tech: ['PostgreSQL', 'Snowflake', 'dbt', 'Airflow']
  }
];

// --- CONTACT MODAL COMPONENT ---

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Reset state on open
  useEffect(() => {
    if (isOpen) setFormState('idle');
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-[#0B0B0C] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                <h3 className="font-display text-xl font-bold text-white">
                  {formState === 'success' ? 'Odesláno' : 'Technický Audit'}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 overflow-y-auto">
                {formState === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-brand-purple/20 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="w-8 h-8 text-brand-purple" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-white mb-2">Poptávka přijata</h4>
                    <p className="text-gray-400 max-w-xs mx-auto mb-8">
                      Děkujeme za zájem. Náš tým architektů se vám ozve do 24 hodin s návrhem termínu.
                    </p>
                    <Button onClick={onClose} className="w-full">Zavřít okno</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      Vyplňte krátký formulář. Probereme vaši aktuální infrastrukturu a navrhneme kroky k optimalizaci.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Jméno</label>
                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all placeholder:text-gray-600" placeholder="Jan Novák" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Firma</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all placeholder:text-gray-600" placeholder="Firma s.r.o." />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Email</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all placeholder:text-gray-600" placeholder="jan@firma.cz" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Zpráva (volitelné)</label>
                      <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all resize-none placeholder:text-gray-600" placeholder="Popište stručně váš use-case..." />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        {formState === 'submitting' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Odesílání...
                          </>
                        ) : (
                          <>
                            Odeslat poptávku <Send className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                      <p className="text-[10px] text-gray-600 text-center mt-3">
                        Odesláním souhlasíte se zpracováním osobních údajů pro účely komunikace.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  return (
    <div className="min-h-screen bg-brand-black relative">
      {/* Background */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <ParticleBackground />
      </div>

      <Section className="relative z-10 pt-24 pb-12">
        <Container>
          {/* Header */}
          <div className="mb-16">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium uppercase tracking-wider">Zpět na přehled</span>
            </button>

            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-brand-purple w-12" />
                <span className="text-brand-purple font-mono uppercase tracking-widest text-sm">Capabilities</span>
              </div>
              <Heading level="h1" className="mb-6">Technologické Služby</Heading>
              <Text className="max-w-3xl text-xl">
                Nenabízíme krabicová řešení. Stavíme digitální infrastrukturu na míru,
                která kombinuje sílu moderního AI s nekompromisním výkonem nízkoúrovňových jazyků.
              </Text>
            </FadeIn>
          </div>

          {/* Services List */}
          <div className="flex flex-col">
            {detailedServices.map((service, idx) => (
              <FadeIn key={service.id} delay={idx * 0.1}>
                {/* Cleevio-style Section: Top Border Separator */}
                <div className="border-t border-white/10 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  
                  {/* Left Column: Description & Sub-services */}
                  <div className="flex flex-col">
                    <div className="mb-6">
                       <span className="text-xs font-mono text-brand-purple uppercase tracking-widest">{service.subtitle}</span>
                       <h3 className="mt-3 text-4xl md:text-5xl font-display font-bold text-white tracking-tight">{service.title}</h3>
                    </div>
                    
                    <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
                      {service.description}
                    </p>

                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-brand-purple rounded-full" />
                        Co nabízíme
                      </h4>
                      <ul className="space-y-4">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-3 group/item">
                             <ArrowRight className="w-4 h-4 text-gray-600 group-hover/item:text-brand-purple transition-colors" />
                             <span className="text-gray-300 font-medium group-hover/item:text-white transition-colors">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10 pt-8">
                       <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-white border-b border-brand-purple pb-0.5 hover:text-brand-purple transition-colors inline-flex items-center gap-2 font-medium"
                      >
                        Poptávka řešení <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Tech Stack & Visual */}
                  <div className="lg:pl-10 flex flex-col justify-between">
                     {/* Icon / Abstract Visual */}
                     <div className="mb-12 opacity-50 hidden lg:block">
                        <service.icon className="w-16 h-16 text-gray-700" strokeWidth={1} />
                     </div>

                     <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                          Tech Stack
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {service.tech.map((t, i) => (
                            <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                              {/* Placeholder for tech icons if we had them mapped, using generic dot for now */}
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                              <span className="text-sm text-gray-300 font-mono">{t}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-32 text-center">
            <FadeIn>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Nejste si jistí, co potřebujete?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Navrhneme architekturu přesně pro vaši situaci. Začínáme technickým auditem a návrhem MVP.
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                Sjednat technický audit
              </Button>
            </FadeIn>
          </div>

        </Container>
      </Section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};