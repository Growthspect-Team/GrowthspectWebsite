
import React, { useEffect } from 'react';
import { Project } from './ui/project-showcase';
import { Container, Section, Heading, Text, Button, FadeIn } from './UI';
import { ArrowLeft, CheckCircle2, Server, Code2, Cpu, Timer, Download } from 'lucide-react';
import { useLenis } from './SmoothScroll';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const lenis = useLenis();

  // Scroll to top on mount
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  return (
    <div className="min-h-screen bg-brand-black pt-24 pb-12">
      
      {/* Back Button */}
      <Container>
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium uppercase tracking-wider">Zpět na přehled</span>
        </button>
      </Container>

      {/* Hero Header */}
      <div className="relative w-full h-[50vh] min-h-[400px] mb-16 overflow-hidden">
         <div className="absolute inset-0 bg-brand-black/40 z-10" />
         <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent z-10" />
         <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
         />
         <Container className="absolute bottom-0 left-0 right-0 z-20 pb-12">
             <FadeIn>
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs font-mono rounded">
                        {project.year}
                    </span>
                    <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-mono rounded">
                        {project.category || "Enterprise"}
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tighter">{project.title}</h1>
                <p className="text-xl text-gray-300 max-w-2xl font-light">{project.description}</p>
             </FadeIn>
         </Container>
      </div>

      {/* Content */}
      <Container>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
                <FadeIn delay={0.2}>
                    <div className="mb-12">
                        <h4 className="text-gray-500 text-xs font-mono uppercase tracking-[0.3em] mb-4">Reference Detail</h4>
                        <Heading level="h2" className="text-white mb-8">O Projektu</Heading>
                        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed text-lg space-y-6">
                            <p>{project.fullDescription || project.description}</p>
                            <p className="border-l-2 border-white/10 pl-6 italic text-gray-500">
                                Cílem bylo vytvořit řešení, které je nejen robustní a škálovatelné, ale také plně připravené na budoucí rozvoj AI technologií v rámci celé firmy.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl group transition-colors">
                            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-6 transition-colors">
                                <Server className="w-5 h-5 text-gray-400" />
                            </div>
                            <h4 className="text-white font-bold mb-4 text-xl">Výzva</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Integrace fragmentovaných datových zdrojů do jednoho koherentního pipeline systému s minimální latencí pro real-time rozhodování.
                            </p>
                        </div>
                        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl group transition-colors">
                             <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-6 transition-colors">
                                <Cpu className="w-5 h-5 text-gray-400" />
                            </div>
                            <h4 className="text-white font-bold mb-4 text-xl">Řešení</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Nasazení multi-agentní architektury běžící na Rust backendu pro zajištění maximální propustnosti a bezpečnosti dat.
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
                <FadeIn delay={0.4}>
                    <div className="bg-[#0B0B0C] border border-white/10 p-8 rounded-2xl sticky top-32 shadow-2xl">
                        <h4 className="text-white font-bold mb-8 text-[10px] uppercase tracking-[0.2em] opacity-40">TECHNOLOGIE</h4>
                        
                        <div className="space-y-4 mb-12">
                            {['Rust', 'TypeScript', 'TensorFlow', 'Kubernetes', 'PostgreSQL'].map((tech) => (
                                <div key={tech} className="flex items-center gap-3">
                                    <Code2 className="w-3.5 h-3.5 text-gray-600" />
                                    <span className="text-gray-300 text-sm font-medium">{tech}</span>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-white/5 w-full my-10" />

                        <h4 className="text-white font-bold mb-8 text-[10px] uppercase tracking-[0.2em] opacity-40">VÝSLEDKY</h4>
                        <div className="space-y-8">
                            {project.metrics ? (
                                project.metrics.map((metric, idx) => (
                                    <div key={idx} className="flex items-end justify-between border-b border-white/5 pb-4">
                                        <div>
                                            <div className="text-3xl font-display font-bold text-white uppercase">{metric.value}</div>
                                            <div className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mt-1">
                                                {metric.label} {metric.subValue && <span className="opacity-50 ml-1">/ {metric.subValue}</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-gray-600 font-mono italic">Žádná dostupná data</div>
                            )}
                        </div>

                        <div className="mt-12">
                            <div className="flex items-center gap-4">
                                <Button 
                                    variant="primary" 
                                    onClick={() => {}} 
                                    className="flex-grow flex items-center justify-center gap-3 bg-brand-purple hover:bg-brand-purple/90 border-none px-6 py-4"
                                >
                                    <span className="text-center font-bold tracking-widest text-xs">STÁHNOUT CASE STUDY</span>
                                </Button>
                                <div className="shrink-0">
                                    <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest block transform -rotate-90 origin-center">připravujeme</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>

         </div>
      </Container>
    </div>
  );
};
