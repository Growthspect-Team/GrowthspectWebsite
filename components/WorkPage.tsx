
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects, Project } from './ui/project-showcase';
import { useLanguage } from './LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { SplineScene } from "./ui/spline";
import { Card } from "./ui/card";
import { useCursor } from './CursorContext';

const WorkHero = () => {
    const { language } = useLanguage();
    
    return (
        <section className="relative w-full pt-32 lg:pt-52 pb-20 lg:pb-32 px-4 md:px-8 bg-background overflow-hidden">
             {/* Vertical Text - Hidden on mobile */}
            

             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center mb-10">
                            <span className="text-sm font-medium text-brand-purple uppercase tracking-widest">
                                {language === 'cs' ? 'Selected Work' : 'Selected Work'}
                            </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 leading-[1.1]">
                            {language === 'cs' ? (
                                <>
                                    Produkty, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                                        které definují trh
                                    </span>
                                </>
                            ) : (
                                <>
                                    Products, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                                        Defining the Market
                                    </span>
                                </>
                            )}
                        </h1>

                        <p className="text-[22px] text-muted-foreground mb-8 max-w-xl leading-relaxed">
                            {language === 'cs' 
                                ? "Nejsme jen vývojáři, jsme architekti vašeho růstu. Propojujeme moderní technologie a umělou inteligenci tak, abychom doručili řešení, která skutečně fungují a generují zisk."
                                : "We aren't just developers, we are architects of your growth. We bridge modern technology and AI to deliver solutions that actually work and generate measurable profit."}
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-water-flow rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                                <Button onClick={() => document.querySelector('#work-projects')?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="relative rounded-full px-8 bg-black hover:bg-black text-white border border-white/10 shadow-2xl overflow-hidden">
                                     <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <span className="relative z-10 flex items-center">
                                        {language === 'cs' ? 'Objevit úspěšné projekty' : 'Discover More'}
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                         className="relative hidden lg:block h-[500px]"
                    >
                        {/* Abstract visual representation of work/metrics */}
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-purple-500/20 rounded-3xl backdrop-blur-3xl border border-white/10 p-8 flex flex-col justify-between overflow-hidden">
                             <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
                             
                             <div className="space-y-6 relative z-10 p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <div className="h-2 w-24 bg-white/20 rounded-full" />
                                        <div className="h-2 w-16 bg-white/20 rounded-full" />
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <div className="h-4 w-4 bg-sky-400 rounded-full animate-pulse" />
                                    </div>
                                </div>
                                <div className="h-32 w-full bg-white/5 rounded-xl border border-white/10 backdrop-blur-md" />
                                <div className="space-y-3">
                                    <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                                    <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                                </div>
                             </div>

                             {/* Decorative circles */}
                             <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/30 rounded-full blur-2xl" />
                             <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/30 rounded-full blur-2xl" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

interface WorkCardProps {
    project: Project;
    index: number;
}

const WorkCard: React.FC<WorkCardProps> = ({ project, index }) => {
    const { setCursorText } = useCursor();
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative w-full"
        >
            <Link 
                to={project.link === '#' ? `/project/${encodeURIComponent(project.title)}` : project.link} 
                className="block w-full cursor-none"
                onClick={() => setCursorText(null)}
                onMouseEnter={() => setCursorText('Zobrazit projekt')}
                onMouseLeave={() => setCursorText(null)}
            >
                <div className="relative overflow-hidden rounded-[2rem] bg-[#0a0a0a] shadow-2xl transition-colors min-h-[420px] md:min-h-[500px]">
                    {/* Full-bleed Image */}
                    <img 
                        src={project.image} 
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] from-30% via-[#0a0a0a]/90 via-60% to-transparent pointer-events-none" />

                    {/* Content overlaying at bottom */}
                    <div className="absolute inset-x-0 bottom-0 px-8 md:px-10 pb-8 md:pb-10 pt-4 z-10">
                        <div className="flex items-center gap-3 mb-3">
                            {project.logo ? (
                                <img src={project.logo} alt="brand" className="h-5 w-auto opacity-80" />
                            ) : (
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[10px]">R</div>
                                    {project.category?.split('&')[0].trim() || 'PROJECT'}
                                </span>
                            )}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                            {project.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-400 max-w-lg leading-relaxed mb-6">
                            {project.description}
                        </p>

                        {/* Metrics */}
                        {project.metrics && project.metrics.length > 0 && (
                            <div className="flex gap-12 pt-2">
                                {project.metrics.map((metric, i) => (
                                    <div key={i}>
                                        <span className="block text-xl md:text-2xl font-bold text-white mb-1">
                                            {metric.value}
                                        </span>
                                        <span className="block text-xs text-gray-500 font-medium leading-snug max-w-[180px]">
                                            {metric.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

import { Insights } from './home/Insights';

export const WorkPage = () => {
    const { language } = useLanguage();

    return (
        <main className="min-h-screen bg-background">
            <WorkHero />
            
            <section id="work-projects" className="px-4 md:px-8 pb-32">
                <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
                    {projects.map((project, index) => (
                        <WorkCard key={index} project={project} index={index} />
                    ))}
                </div>
            </section>
            
            <Insights onNavigate={() => window.location.href = '/blog'} />
        </main>
    );
};

export default WorkPage;
