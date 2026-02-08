
import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, Code2, ShieldCheck, Activity, PenTool, 
  Phone, Users, ShoppingCart, Calendar, Megaphone, 
  Search, Cpu, TrendingUp, Layers, CheckCircle2, ArrowRight, Terminal,
  Play, X, CheckCircle, Loader2, Send, Target, BarChart3, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section, Button, FadeIn } from './UI';
import { useLenis } from './SmoothScroll';

interface ScalexPageProps {
  onBack: () => void;
}

// --- PROCESS DATA ---
const STEPS = [
  {
    id: 1,
    title: "Analýza & Audit",
    subtitle: "Fáze 1: Discovery",
    description: "Hloubkový audit vašich procesů. Identifikujeme úzká hrdla a neefektivity, které AI vyřeší.",
    icon: Search,
    color: "text-blue-400",
    bg: "bg-blue-400"
  },
  {
    id: 2,
    title: "Návrh Architektury",
    subtitle: "Fáze 2: Strategie",
    description: "Design modulární infrastruktury na míru. Výběr správných modulů (Blogia, Advertly) pro váš business.",
    icon: Layers,
    color: "text-yellow-400",
    bg: "bg-yellow-400"
  },
  {
    id: 3,
    title: "Implementace",
    subtitle: "Fáze 3: Integrace",
    description: "Nasazení agentů a technické propojení systémů. Trénink modelů na vašich datech.",
    icon: Cpu,
    color: "text-brand-purple",
    bg: "bg-brand-purple"
  },
  {
    id: 4,
    title: "Exponenciální Růst",
    subtitle: "Fáze 4: Škálování",
    description: "Celý ekosystém pracuje v synergii. Nejde jen o jednotlivé nástroje, ale o komplexní spolupráci, která autonomně zajišťuje škálování a exponenciální růst.",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-400"
  }
];

// --- MODULES DATA ---
const SCALEX_MODULES = [
  {
    id: 'advertly',
    title: 'Advertly',
    description: 'Autonomní marketingový agent. Tvoří, spouští a optimalizuje reklamní kampaně na Meta/Google Ads v reálném čase podle vašeho PNO.',
    icon: Megaphone,
    stats: 'ROI +300%',
    features: ['Meta Ads API', 'Google Ads', 'Creative Gen', 'Auto-bidding']
  },
  {
    id: 'blogia',
    title: 'Blogia AI',
    description: 'SEO Content Engine. Generuje vysoce odborné články, které budují autoritu domény a přivádí organickou návštěvnost bez zásahu člověka.',
    icon: PenTool,
    stats: 'Traffic +40%',
    features: ['Semantic SEO', 'NLP Generation', 'WordPress Sync', 'Auto-Interlinking']
  },
  {
    id: 'webkvik',
    title: 'Webkvik',
    description: 'Prémiové webovky a e-shopy s vysokou konverzí. Ultrarychlé načítání, dynamická personalizace a maximální prodejní výsledky.',
    icon: ShoppingCart,
    stats: 'Load < 0.5s',
    features: ['Next.js 14', 'Vercel Edge', 'Stripe Connect', 'AB Testing']
  },
  {
    id: 'sales-core',
    title: 'B2B Sales Core',
    description: 'Obchodní systém trénovaný elitami. Scoring CRM, autonomní prospecting a hyper-personalizovaný outreach.',
    icon: Activity,
    stats: 'Leads +50/mo',
    features: ['C-Level Discovery', 'Behavioral Scoring', 'Personalized Emails', 'Meeting Setter']
  },
  {
    id: 'assistants',
    title: 'AI Asistenti',
    description: 'Inteligentní support 24/7. Odbavuje tickety, řeší reklamace a odpovídá na technické dotazy s lidskou přesností.',
    icon: Users,
    stats: '24/7 Support',
    features: ['RAG Knowledge', 'Intercom Integ.', 'Multi-lang', 'Sentiment Analysis']
  },
  {
    id: 'booking',
    title: 'Smart Booking',
    description: 'Rezervační systém, který se sám plní. Komunikuje s klienty, potvrzuje termíny a eliminuje propadlé schůzky.',
    icon: Calendar,
    stats: 'No-show -80%',
    features: ['Google Calendar', 'SMS Gateway', 'Deposits', 'Auto-reschedule']
  }
];

// --- CONTACT MODAL ---
const ContactModal = ({ isOpen, onClose, moduleName }: { isOpen: boolean; onClose: () => void; moduleName: string | null }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
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
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                <div>
                   <h3 className="font-display text-xl font-bold text-white">
                      {formState === 'success' ? 'Žádost odeslána' : 'Aktivace Modulu'}
                   </h3>
                   {moduleName && formState !== 'success' && (
                     <p className="text-xs text-brand-purple font-mono mt-1">Selected: {moduleName}</p>
                   )}
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

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
                    <h4 className="text-2xl font-bold text-white mb-2">Požadavek přijat</h4>
                    <p className="text-gray-400 max-w-xs mx-auto mb-8">
                      Naši specialisté vás budou kontaktovat ohledně integrace modulu <strong>{moduleName}</strong> do 24 hodin.
                    </p>
                    <Button onClick={onClose} className="w-full">Zavřít</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Pro aktivaci modulu do vaší infrastruktury potřebujeme ověřit kompatibilitu. Vyplňte prosím kontaktní údaje.
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
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Poznámka</label>
                        <textarea 
                            rows={4} 
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all resize-none placeholder:text-gray-600" 
                            defaultValue={`Dobrý den, mám zájem o aktivaci a demo modulu: ${moduleName || ''}.`}
                        />
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

export const ScalexPage: React.FC<ScalexPageProps> = ({ onBack }) => {
  const lenis = useLenis();
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const CYCLE_DURATION = 8000;
  
  // State for Contact Modal
  const [contactModule, setContactModule] = useState<string | null>(null);

  // Auto-cycle through steps
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setActiveStep(prev => (prev === STEPS.length ? 1 : prev + 1));
    }, CYCLE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  return (
    <div className="min-h-screen bg-[#050505] relative selection:bg-brand-purple selection:text-white overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed -top-[20%] -right-[10%] w-[1000px] h-[1000px] bg-brand-purple/10 blur-[150px] rounded-full pointer-events-none" />

      <Section className="relative z-10 pt-12 pb-12">
        <Container>
          {/* Back Navigation */}
          <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-16 group uppercase text-xs tracking-widest font-medium"
          >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              ZPĚT NA HLAVNÍ STRANU
          </button>

          {/* HERO GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-32">
            <div className="lg:col-span-5 flex flex-col justify-center relative">
               <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-purple/50 via-brand-purple/10 to-transparent hidden xl:block" />
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                   <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
                    </div>
                  <span className="text-brand-purple font-sans font-medium text-xs uppercase tracking-[0.2em]">Internal Project</span>
                </div>
                <h1 className="text-8xl md:text-[8rem] font-display font-bold text-white tracking-tighter mb-8 leading-[0.85] -ml-1 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-gray-500">
                  Scalex
                </h1>
                <div className="prose prose-invert prose-lg mb-10 max-w-xl">
                   <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                    Scalex je náš exkluzivní program spolupráce. Nejedná se pouze o software, ale o kompletní 
                    partnerství, kde implementujeme autonomní systémy přímo do jádra vašeho podnikání.
                   </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-5 mb-16">
                  <Button variant="primary" className="group px-8 py-4 bg-brand-purple hover:bg-brand-purple/90 border-none text-white font-bold tracking-wider rounded-none shadow-[0_0_20px_-5px_rgba(136,37,237,0.5)]">
                    DOKUMENTACE
                  </Button>
                  <Button variant="outline" className="group px-8 py-4 border-white/10 hover:bg-white/5 uppercase tracking-wider text-sm font-bold rounded-none">
                    LIVE DEMO
                  </Button>
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 relative">
               <FadeIn delay={0.2}>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl group cursor-pointer hover:border-brand-purple/50 transition-colors duration-500">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity duration-500 scale-105 group-hover:scale-100 transform" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-purple/90 group-hover:border-brand-purple transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                           <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </div>
                     </div>
                     <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-center gap-3 mb-3">
                           <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/20 border border-brand-purple/30 rounded-full text-brand-purple text-xs font-sans font-medium uppercase tracking-wider">
                              <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
                              VSL
                           </span>
                           <span className="text-gray-400 text-xs font-mono bg-black/50 px-2 py-1 rounded border border-white/10">02:14</span>
                        </div>
                        <h3 className="text-2xl font-display font-bold text-white mb-2">Představení Scalex Metodiky</h3>
                        <p className="text-gray-300 text-sm max-w-md">Zjistěte během dvou minut, jak naše autonomní systémy generují exponenciální růst pro vaše podnikání.</p>
                     </div>
                  </div>
               </FadeIn>
            </div>
          </div>

          {/* PROCESS BOARD SECTION */}
          <div className="mb-32 scroll-mt-24" id="process-board">
             <FadeIn>
                <div className="flex flex-col items-center text-center mb-16">
                   <h2 className="text-sm font-sans font-medium text-brand-purple mb-2 uppercase tracking-widest">Roadmapa</h2>
                   <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Průběh Spolupráce</h3>
                </div>
             </FadeIn>
             <FadeIn delay={0.2} className="h-full">
                <div 
                  className="relative w-full min-h-[600px] lg:h-[700px] rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl flex flex-col"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-4 select-none shrink-0 z-20 relative">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden mx-4">
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={activeStep}
                                    initial={{ width: "0%" }}
                                    animate={{ width: isPaused ? undefined : "100%" }}
                                    transition={{ duration: isPaused ? 0 : CYCLE_DURATION / 1000, ease: "linear" }}
                                    className="h-full bg-brand-purple"
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row h-full relative z-10">
                        <div className="w-full md:w-1/3 border-r border-white/5 bg-black/20 p-6 flex flex-col gap-2 overflow-y-auto relative">
                            <AnimatePresence>
                                {STEPS.map((step) => {
                                    const isActive = activeStep === step.id;
                                    return (
                                        <button
                                            key={step.id}
                                            onClick={() => setActiveStep(step.id)}
                                            className={`relative text-left p-4 rounded-lg transition-all duration-300 border overflow-hidden ${isActive ? 'border-brand-purple/50' : 'bg-transparent border-transparent hover:bg-white/[0.02]'}`}
                                        >
                                            {isActive && (
                                                <motion.div 
                                                    layoutId="activeStepBg"
                                                    className="absolute inset-0 bg-white/5 z-0"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                            <div className="flex items-center gap-3 mb-2 relative z-10">
                                                <motion.div 
                                                    animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0.5 }}
                                                    className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${isActive ? 'bg-brand-purple text-white' : 'bg-white/10 text-gray-500'}`}
                                                >
                                                    {step.id}
                                                </motion.div>
                                                <span className={`text-[10px] font-bold font-display uppercase tracking-widest ${isActive ? 'text-brand-purple' : 'text-gray-500'}`}>{step.subtitle}</span>
                                            </div>
                                            <div className={`text-sm font-bold mb-1 relative z-10 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>{step.title}</div>
                                        </button>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                        <div className="w-full md:w-2/3 bg-black/40 relative overflow-hidden flex items-center justify-center p-8 lg:p-12">
                             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
                             <AnimatePresence mode="wait">
                                 <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    className="relative z-10 w-full max-w-md"
                                 >
                                      <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 lg:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden group">
                                          <motion.div 
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex justify-center mb-8"
                                          >
                                              <div className={`w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative`}>
                                                  <div className={`absolute inset-0 ${STEPS[activeStep-1].bg} blur-[40px] opacity-20`} />
                                                  {React.createElement(STEPS[activeStep-1].icon, { className: `w-10 h-10 ${STEPS[activeStep-1].color}` })}
                                              </div>
                                          </motion.div>
                                          <div className="text-center relative z-10">
                                              <motion.h2 
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-3xl font-display font-bold text-white mb-4"
                                              >
                                                {STEPS[activeStep-1].title}
                                              </motion.h2>
                                              <motion.p 
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-gray-400 text-base leading-relaxed"
                                              >
                                                {STEPS[activeStep-1].description}
                                              </motion.p>
                                          </div>
                                          
                                          {/* Decorative corner accent */}
                                          <div className={`absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-br from-transparent to-brand-purple/20 blur-xl`} />
                                      </div>
                                 </motion.div>
                             </AnimatePresence>
                        </div>
                    </div>
                </div>
             </FadeIn>
          </div>

          {/* MODULES GRID */}
          <Section noPadding className="border-t border-white/10 pt-24">
             <FadeIn>
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <h2 className="text-sm font-sans font-medium text-brand-purple mb-2 uppercase tracking-widest">Ekosystém</h2>
                        <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Ostatní Moduly</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SCALEX_MODULES.map((module, idx) => (
                        <FadeIn key={module.id} delay={idx * 0.05}>
                            <motion.div 
                                layout
                                className="group relative h-full bg-[#0A0A0A] border border-white/10 hover:border-brand-purple/50 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.02] overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(136,37,237,0.3)] flex flex-col justify-between"
                            >
                                 <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                 <div>
                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-brand-purple group-hover:scale-110 transition-all duration-300 shadow-inner group-hover:shadow-brand-purple/20">
                                            <module.icon className="w-6 h-6 text-brand-purple group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-emerald-400 border border-white/5 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
                                            {module.stats}
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors relative z-10">{module.title}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 relative z-10">{module.description}</p>
                                 </div>
                                 <div className="relative z-10 mt-auto">
                                    <button onClick={() => setContactModule(module.title)} className="w-full py-3 rounded-lg border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-gray-300 group-hover:bg-brand-purple group-hover:text-white group-hover:border-brand-purple transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-brand-purple/20">
                                        <span>Aktivovat Modul</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                 </div>
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>
             </FadeIn>
          </Section>
        </Container>
      </Section>
      <ContactModal isOpen={!!contactModule} onClose={() => setContactModule(null)} moduleName={contactModule} />
    </div>
  );
};
