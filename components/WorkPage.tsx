
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
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-sky-100/80 uppercase tracking-widest">
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
                            <Link to="/contact">
                                <Button size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 transition-all">
                                    {language === 'cs' ? 'Pojďme to probrat' : 'Let\'s Discuss'}
                                    <ArrowRight className="ml-2 w-4 h-4" />
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
                <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/10 aspect-[16/10] md:aspect-[21/9]">
                    {/* Background Image with Gradient */}
                    <div className="absolute inset-0">
                         <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16">
                        <div className="max-w-2xl">
                            {/* Tags */}
                            <div className="flex gap-3 mb-6">
                                {project.category && (
                                    <span className="px-4 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-xs font-medium tracking-wider text-white">
                                        {project.category.toUpperCase()}
                                    </span>
                                )}
                                <span className="px-4 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-xs font-medium tracking-wider text-white">
                                    {project.year}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-sky-400 transition-colors">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-lg text-zinc-300 line-clamp-2 md:line-clamp-none max-w-xl mb-8">
                                {project.description}
                            </p>

                            {/* Metrics */}
                            {project.metrics && (
                                <div className="grid grid-cols-2 gap-8 md:flex md:gap-16 border-t border-white/10 pt-8">
                                    {project.metrics.map((metric, i) => (
                                        <div key={i}>
                                            <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                                {metric.value}
                                            </div>
                                            <div className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                                                {metric.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Hover Arrow */}
                    <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <ArrowUpRight className="w-8 h-8 text-white" />
                        </div>
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
