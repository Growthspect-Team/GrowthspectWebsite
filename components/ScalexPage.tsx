import React, { useRef } from 'react';
import { 
  ArrowLeft, ShieldCheck, Activity, TrendingUp, 
  Settings, Users, Zap, CheckCircle2, Server, Plus
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container, Section, Button, FadeIn } from './UI';
import { useLenis } from './SmoothScroll';
import scalexLogo from '../assets/Branding/Scalex White PNG.png';

interface ScalexPageProps {
  onBack: () => void;
}

export const ScalexPage: React.FC<ScalexPageProps> = ({ onBack }) => {
  useLenis();

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });
  
  // Smoother transition: start changing earlier and finish later
  // Previously: [0.5, 0.7] -> short range, fast animation
  // Now: [0.2, 0.8] -> long range, smooth animation
  
  const headingScale = useTransform(scrollYProgress, [0.2, 0.8], [1, 0.75]);
  const headingTranslateUp = useTransform(scrollYProgress, [0.2, 0.8], ["0vh", "-30vh"]);
  
  // Services fade in slower and smoother
  const servicesOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const servicesY = useTransform(scrollYProgress, [0.4, 0.8], ["10vh", "0vh"]);

  return (
    <div className="bg-brand-black min-h-screen text-white pb-20">
      
        {/* NEW HERO SECTION - LANES STYLE GRID */}
        <Section className="mb-32 pt-0 md:pt-0 relative h-screen flex items-center justify-center overflow-hidden w-full max-w-[100vw]" noPadding>
             
             {/* Back button absolute */}
             <div className="absolute top-28 left-6 md:left-12 z-50">
               <button 
                  onClick={onBack}
                  className="group flex items-center gap-2 text-sm text-white/60 hover:text-brand-purple transition-colors bg-brand-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 hover:bg-brand-black/40"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Zpět na domů
                </button>
             </div>

             {/* Angled Grid Container */}
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                   className="flex gap-4 md:gap-6 p-4 min-w-[120vw]"
                   initial={{ rotate: -12, scale: 1.1 }}
                   animate={{ rotate: -12 }} 
                >
                   {/* Column 1 - Downwards */}
                   <motion.div 
                      className="flex flex-col gap-4 md:gap-6 w-48 md:w-64 shrink-0"
                      initial={{ y: -120 }}
                      animate={{ y: -40 }}
                      transition={{ repeat: Infinity, repeatType: "mirror", duration: 8, ease: "easeInOut" }}
                   >
                      <div className="aspect-[3/4] rounded-[2.5rem] bg-zinc-900 border border-white/10 overflow-hidden relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40 opacity-60" />
                          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                      </div>
                      <div className="aspect-[3/4] rounded-[2.5rem] bg-brand-purple overflow-hidden flex flex-col items-center justify-center relative p-6">
                          <Activity className="w-16 h-16 text-white/90 mb-2" />
                          <div className="text-3xl font-bold text-white">99.9%</div>
                          <div className="text-xs text-white/70 uppercase tracking-widest mt-1">Uptime</div>
                      </div>
                      <div className="aspect-[3/4] rounded-[2.5rem] bg-zinc-800 border border-white/10 overflow-hidden flex flex-col p-6 justify-between">
                          <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                          </div>
                          <div className="space-y-3 font-mono text-[10px] md:text-xs text-white/50">
                              <div className="border-l-2 border-white/10 pl-2">
                                <span className="text-blue-400">const</span> status = <span className="text-green-400">true</span>;
                              </div>
                              <div className="border-l-2 border-white/10 pl-2">
                                await <span className="text-brand-purple">scale()</span>;
                              </div>
                          </div>
                      </div>
                   </motion.div>

                   {/* Column 2 - Upwards */}
                   <motion.div 
                      className="flex flex-col gap-4 md:gap-6 w-48 md:w-64 shrink-0"
                      initial={{ y: 0 }}
                      animate={{ y: -100 }}
                      transition={{ repeat: Infinity, repeatType: "mirror", duration: 12, ease: "easeInOut" }}
                   >
                      <div className="aspect-[3/4] rounded-[2.5rem] bg-gradient-to-b from-[#2d2d2d] to-black overflow-hidden relative flex items-center justify-center border border-white/10">
                          <Server className="w-24 h-24 text-white/20" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <p className="absolute bottom-8 text-white/50 font-mono text-sm">Server_Rack_01</p>
                      </div>
                      <div className="aspect-[3/4] rounded-[2.5rem] bg-zinc-900 border border-white/10 overflow-hidden relative p-8 flex items-end">
                           <div className="absolute top-0 right-0 p-6">
                              <Zap className="w-8 h-8 text-yellow-400" />
                           </div>
                           <div className="w-full">
                               <div className="text-4xl font-bold text-white mb-1">Fast</div>
                               <div className="text-sm text-white/50">Lightning response</div>
                           </div>
                      </div>
                      <div className="aspect-[3/4] rounded-[2.5rem] bg-gradient-to-tr from-blue-600 to-cyan-500 opacity-80" />
                   </motion.div>

                   {/* Column 3 - Downwards (Center-ish) */}
                   <motion.div 
                      className="flex flex-col gap-4 md:gap-6 w-48 md:w-64 shrink-0"
                      initial={{ y: -150 }}
                      animate={{ y: -50 }}
                      transition={{ repeat: Infinity, repeatType: "mirror", duration: 10, ease: "easeInOut" }}
                   >
                      <div className="aspect-[3/4] rounded-[2.5rem] bg-white text-black p-8 flex flex-col justify-between overflow-hidden">
                          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                              <ShieldCheck className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-3xl font-bold tracking-tighter leading-none">Secure<br/>Core</div>
                      </div>
                      <div className="aspect-[3/4] rounded-[2.5rem] bg-[#050505] border border-white/20 overflow-hidden flex items-center justify-center">
                          <div className="relative w-32 h-32">
                             <div className="absolute inset-0 rounded-full border border-dashed border-white/30 animate-[spin_10s_linear_infinite]" />
                             <div className="absolute inset-2 rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]" />
                             <div className="absolute inset-[40%] bg-brand-purple rounded-full blur-md" />
                          </div>
                      </div>
                   </motion.div>
                   
                   {/* Column 4 - Upwards (Right) */}
                   <motion.div 
                      className="flex flex-col gap-4 md:gap-6 w-48 md:w-64 shrink-0"
                      initial={{ y: 50 }}
                      animate={{ y: -40 }}
                      transition={{ repeat: Infinity, repeatType: "mirror", duration: 14, ease: "easeInOut" }}
                   >
                      <div className="aspect-[3/4] rounded-[2.5rem] bg-zinc-900 p-6 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden">
                           <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-purple/20 to-transparent" />
                           <h3 className="text-2xl font-bold text-center z-10">Scale<br/><span className="text-white/40">Ready</span></h3>
                      </div>
                      <div className="aspect-[3/4] rounded-[2.5rem] bg-gradient-to-bl from-pink-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm" />
                       <div className="aspect-[3/4] rounded-[2.5rem] bg-black border border-white/10 p-6">
                          <div className="h-full w-full bg-grid-white/5 rounded-2xl border border-white/5" />
                       </div>
                   </motion.div>

                </motion.div>
             </div>

             {/* Vignette Overlays */}
             <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-brand-black via-transparent to-brand-black/90" />
             <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-brand-black/50 via-transparent to-brand-black/50" />

             {/* Main Text Content */}
             <div className="relative z-20 text-center max-w-7xl mx-auto px-6 w-full flex flex-col items-center justify-center h-full pt-20">
                 <motion.img 
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    src={scalexLogo} 
                    alt="Scalex" 
                    className="w-full max-w-[280px] md:max-w-[500px] lg:max-w-[700px] h-auto object-contain mb-10 select-none drop-shadow-2xl"
                 />
             </div>
             
             {/* Subtitle - moved to bottom */}
            <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center px-6">
                 <motion.p 
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="text-lg md:text-2xl text-white/90 font-light tracking-wide text-center max-w-2xl text-shadow-sm"
                 >
                    Infrastruktura navržená pro nekonečný růst.
                 </motion.p>
             </div>

        </Section>
        
        <Container>
        {/* Problem Definition */}
        <Section className="mb-16">
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/5 p-8 md:p-12 rounded-3xl">
              <div>
                <h2 className="text-3xl font-bold mb-6">Realita ve firmách</h2>
                <p className="text-lg text-secondary leading-relaxed mb-4">
                  Firmy často narazí na stejný problém: systémy a automatizace jsou nasazené, ale nikdo je aktivně neřídí. 
                </p>
                <div className="flex gap-4 items-start p-4 bg-red-500/10 rounded-xl">
                   <Activity className="w-6 h-6 text-red-400 mt-1 shrink-0" />
                   <p className="text-red-200">
                     Výsledkem jsou chyby, zastaralé procesy a nevyužitý potenciál. Scalex tento problém řeší.
                   </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-brand-black/50 p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-mono text-sm text-white/60">System Status</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand-purple"
                      initial={{ width: "40%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                    />
                  </div>
                </div>
                <div className="bg-brand-black/50 p-6 rounded-2xl border border-white/5 flex gap-4 items-center">
                    <Server className="w-8 h-8 text-brand-purple" />
                    <div>
                        <div className="text-sm text-white/60">Uptime</div>
                        <div className="text-xl font-bold">99.9% guaranteed</div>
                    </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Section>

        {/* What Scalex Does */}
        </Container>
        <div ref={sectionRef} className="relative" style={{ height: '110vh' }}>
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-brand-black">
            <Container>
                <motion.div
                  style={{ scale: headingScale, translateY: headingTranslateUp }}
                  className="flex flex-col items-center text-center"
                >
                  <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">Co Scalex reálně dělá</h2>
                  <p className="text-lg md:text-xl text-white/50 mt-6 max-w-xl">Komplexní správa, kterou byste jinak potřebovali celý tým.</p>
                </motion.div>
            </Container>
          </div>
        </div>

        <motion.div style={{ opacity: servicesOpacity, y: servicesY, marginTop: '-55vh', position: 'relative', zIndex: 20 }} className="flex flex-col border-t border-white/10 bg-brand-black">
              {[
                {
                  category: "Správa a dohled",
                  items: [
                    "Pravidelný monitoring 24/7",
                    "Správa AI automatizací",
                    "Dohled nad systémy",
                    "Instantní řešení incidentů"
                  ]
                },
                {
                  category: "Optimalizace",
                  items: [
                    "Analýza výkonu aplikací",
                    "Data-driven úpravy",
                    "Monitoring chování uživatelů",
                    "Load balancing infrastruktury"
                  ]
                },
                {
                  category: "Růst firmy",
                  items: [
                    "Škálování infrastruktury",
                    "Procesní adaptace na růst",
                    "Rozšiřování technických kapacit",
                    "Konzultace tech-stacku"
                  ]
                },
                {
                  category: "Prevence",
                  items: [
                    "Predikce systémových výpadků",
                    "Zero-trust security modely",
                    "Automatické zálohování",
                    "Eliminace technického dluhu"
                  ]
                }
              ].map((row, idx) => (

                <div 
                  key={idx} 
                  className="group w-full border-b border-white/10 transition-all duration-500 hover:bg-white/[0.02]"
                >
                  <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-20">
                    {/* Left Column - Category */}
                    <div className="flex items-center">
                        <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                        {row.category}
                        </h3>
                    </div>

                    {/* Right Column - Items Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 content-center">
                        {row.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-3">
                            <Plus className="w-4 h-4 text-white/40 shrink-0" strokeWidth={1.5} />
                            <span className="text-base text-white font-bold">
                                {item}
                            </span>
                        </div>
                        ))}
                    </div>
                    </div>
                  </Container>
                </div>
              ))}
        </motion.div>
        <Container>

        {/* Target Audience */}
        <Section className="mb-20 py-16" noPadding>
          <FadeIn delay={0.3}>
            <div>
              <h2 className="text-4xl font-bold mb-12">Pro koho je Scalex</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    text: "Pro firmy, které už AI automatizaci mají, ale nemají kapacitu ji řešit interně",
                    icon: Users
                  },
                  {
                    text: "Pro týmy, které chtějí stabilní systém, ne jednorázové řešení",
                    icon: ShieldCheck
                  },
                  {
                    text: "Pro podniky, které berou škálování vážně",
                    icon: TrendingUp
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-purple/50 transition-colors duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 flex items-center justify-center mb-6 text-brand-purple group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <p className="text-lg font-medium text-white/90 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Section>

        {/* Why Scalex (Bento Grid) */}
        <Section>
          <FadeIn delay={0.4}>
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Nedodáváme jen kód. <br className="hidden md:block" />
                <span className="text-brand-purple">Dodáváme stabilitu.</span>
              </h2>
              <p className="text-xl text-secondary max-w-3xl leading-relaxed">
                Automatizace bez správy je jen dočasná úspora. Scalex z ní dělá dlouhodobý konkurenční nástroj, který vám dává jistotu pro další růst.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
                
                {/* Card 1: Graph - Wide */}
                <div className="md:col-span-2 bg-white/5 rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Exponenciální růst</h3>
                        <p className="text-secondary max-w-sm">Systémy, které se nezpomalují s přibývajícími daty.</p>
                    </div>
                    
                    {/* Visual: Bar chart */}
                    <div className="absolute bottom-0 right-0 left-0 h-[60%] flex items-end justify-between px-8 md:px-16 pb-0 gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                        {[35, 45, 40, 60, 55, 75, 70, 90, 85, 100].map((h, i) => (
                            <motion.div key={i} 
                                initial={{ height: "10%" }}
                                whileInView={{ height: `${h}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 1, ease: "easeOut" }}
                                className="w-full bg-brand-purple rounded-t-sm shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                            />
                        ))}
                    </div>
                </div>

                {/* Card 2: Metric - Square */}
                <div className="bg-white/5 rounded-3xl p-8 flex flex-col justify-between group">
                    <div className="w-14 h-14 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300">
                         <Activity className="w-7 h-7" />
                    </div>
                    <div>
                         <div className="text-5xl font-bold mb-2 tracking-tight">24/7</div>
                         <p className="text-base text-secondary">Nepřetržitý monitoring a správa vašich systémů.</p>
                    </div>
                </div>

                {/* Card 3: Metric - Square */}
                <div className="bg-white/5 rounded-3xl p-8 flex flex-col justify-between group">
                    <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                         <Zap className="w-7 h-7" />
                    </div>
                    <div>
                         <div className="text-5xl font-bold mb-2 tracking-tight">3x</div>
                         <p className="text-base text-secondary">Rychlejší řešení incidentů a prevence výpadků.</p>
                    </div>
                </div>

                {/* Card 4: CTA - Wide */}
                <div className="md:col-span-2 relative overflow-hidden bg-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-center items-start group">
                     {/* Background Glow */}
                     <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-purple/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                     
                     <div className="relative z-10 w-full">
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                            <div className="max-w-lg">
                                <h3 className="text-3xl font-bold mb-4">Přestaňte hasit problémy</h3>
                                <p className="text-lg text-secondary">
                                    Převezmeme starost o technickou stránku vašeho byznysu. Vy se věnujte strategii, my zajistíme, že systémy budou fungovat.
                                </p>
                            </div>
                            <Button 
                                variant="primary" 
                                onClick={() => window.open("https://cal.com/growthspect/30min", "_blank")}
                                className="shrink-0 rounded-full"
                            >
                                Konzultovat správu
                            </Button>
                        </div>
                     </div>
                </div>

            </div>
          </FadeIn>
        </Section>

      </Container>
    </div>
  );
};
