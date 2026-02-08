
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects, Project } from './ui/project-showcase';
import { useLanguage } from './LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { SplineScene } from "./ui/spline";
import { Card } from "./ui/card";

const WorkHero = () => {
    const { language } = useLanguage();
    
    return (
        <section className="relative w-full py-20 lg:py-32 px-4 md:px-8 bg-background overflow-hidden">
             {/* Vertical Text - Hidden on mobile */}
             <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block mix-blend-difference z-20 pointer-events-none">
                <div className="text-xs font-bold tracking-[0.3em] text-white/40 -rotate-90 whitespace-nowrap origin-center">
                    SUCCESS STORIES
                </div>
            </div>

             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
                            <span className="text-sm font-medium text-brand-purple uppercase tracking-widest">
                                {language === 'cs' ? 'Selected Work' : 'Selected Work'}
                            </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                            {language === 'cs' ? (
                                <>
                                    Digitální produkty, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                                        které definují trh
                                    </span>
                                </>
                            ) : (
                                <>
                                    Digital Products, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                                        Defining the Market
                                    </span>
                                </>
                            )}
                        </h1>

                        <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                            {language === 'cs' 
                                ? "Nejsme jen vývojáři, jsme architekti vašeho růstu. Propojujeme moderní technologie a umělou inteligenci tak, abychom doručili řešení, která skutečně fungují a generují zisk."
                                : "We aren't just developers, we are architects of your growth. We bridge modern technology and AI to deliver solutions that actually work and generate measurable profit."}
                        </p>

                        <div className="flex items-center gap-4">
                            <Link to="/contact" className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-water-flow rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                                <Button size="lg" className="relative rounded-full px-8 bg-black hover:bg-black text-white border border-white/10 shadow-2xl overflow-hidden">
                                     <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <span className="relative z-10 flex items-center">
                                        {language === 'cs' ? 'Pojďme to probrat' : 'Let\'s Discuss'}
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </Link>
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

const WorkCard = ({ project, index }: { project: Project, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative w-full"
        >
            <Link to={project.link === '#' ? `/project/${encodeURIComponent(project.title)}` : project.link} className="block w-full">
                <div className="relative overflow-hidden rounded-[2rem] bg-[#050505] flex flex-col lg:flex-row min-h-[400px] lg:h-[420px] shadow-2xl">
                    {/* Content Side (Left) */}
                    <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center relative z-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                {project.logo ? (
                                    <img src={project.logo} alt="brand" className="h-5 w-auto opacity-80" />
                                ) : (
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[10px]">R</div>
                                        {project.category?.split('&')[0].trim() || 'PROJECT'}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                {project.title}
                            </h3>
                            
                            {/* Metrics */}
                            {project.metrics && (
                                <div className="grid grid-cols-2 gap-8 pt-4">
                                    {project.metrics.map((metric, i) => (
                                        <div key={i}>
                                            <span className="block text-2xl font-bold text-white mb-1">
                                                {metric.value}
                                            </span>
                                            <span className="block text-xs text-gray-500 font-medium">
                                                {metric.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Image Side (Right) */}
                    <div className="relative w-full lg:w-[55%] h-[300px] lg:h-auto bg-[#050505]">
                        {/* Gradient overlay - shadow from side */}
                        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
                        
                        <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export const WorkPage = () => {
    const { language } = useLanguage();

    return (
        <main className="min-h-screen bg-background">
            <WorkHero />
            
            <section className="px-4 md:px-8 pb-32">
                <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
                    {projects.map((project, index) => (
                        <WorkCard key={index} project={project} index={index} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default WorkPage;
