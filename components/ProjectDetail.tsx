
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
    <div className="min-h-screen bg-brand-black pb-12">
      
      {/* Hero Header */}
      <div className="relative w-full h-[60vh] min-h-[500px] mb-16 overflow-hidden">
         <div className="absolute inset-0 bg-brand-black/40 z-10" />
         <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent z-10" />
         <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
         />
         
         {/* Back Button */}
         <div className="absolute top-28 left-0 right-0 z-30 pointer-events-none">
            <Container className="pointer-events-auto">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium uppercase tracking-wider">Zpět na přehled</span>
                </button>
            </Container>
         </div>

         <Container className="absolute bottom-0 left-0 right-0 z-20 pb-12">
             <FadeIn>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tighter">{project.title}</h1>
                <p className="text-xl text-gray-300 max-w-2xl font-light">{project.description}</p>
             </FadeIn>
         </Container>
      </div>

      {/* Content */}
      <Container>
         <div className="max-w-4xl mx-auto">
            
            {/* Main Content */}
            <div className="w-full">
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

         </div>
      </Container>
    </div>
  );
};
