import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container, FadeIn, Button } from './UI';
import { JobPosition } from '../types';
import { jobPositions } from '../lib/careersData';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Footer } from './layout/Footer';

const CareerHero = () => {
  return (
    <Section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background - mimicking video or abstract tech feel */}
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[#0B0B0C]" />
             {/* Abstract animated shapes or gradients can go here */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
             <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-20" />
        </div>

        <Container className="relative z-10 text-center">
            <FadeIn>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                    Kde technologie <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        mění byznys
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                    Hledáme výjimečné talenty, kteří chtějí stavět budoucnost s AI a Rustem.
                </p>
                <Button variant="primary" className="text-lg px-8 py-4">
                    Let's talk <ArrowRight className="ml-2 w-5 h-5"/>
                </Button>
            </FadeIn>
        </Container>
    </Section>
  );
};

const JobListing: React.FC<{ job: JobPosition }> = ({ job }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group border-t border-white/10 py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-white/[0.02] transition-colors"
        >
            <div className="space-y-2">
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">GROWTHSPECT</div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {job.title}
                </h3>
                <div className="flex gap-3 mt-2">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/5">{job.type}</span>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/5">{job.location}</span>
                </div>
            </div>
            <ArrowUpRight className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.div>
    );
};

export const CareersPage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <CareerHero />
      
      <Section className="py-24">
          <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
                     {/* Left Sidebar / Card */}
                     <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <FadeIn>
                             <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                                 {/* Decorative elements */}
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
                                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -ml-10 -mb-10" />
                                 
                                 {/* Abstract spheres illustration (css simulation) */}
                                 <div className="h-40 relative mb-8 flex items-center justify-center">
                                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 shadow-lg absolute left-10 top-0 opacity-80" />
                                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-white to-gray-300 shadow-2xl absolute left-24 top-8 z-10" />
                                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-800 to-black border border-white/10 shadow-lg absolute left-48 top-4" />
                                 </div>

                                 <h3 className="text-2xl font-bold mb-4 text-white">
                                     Pokud máte chuť se potkat, napište nám email!
                                 </h3>
                                 <p className="text-gray-400 mb-8">
                                     Rádi si popovídáme o vašich zkušenostech a o tom, jak bychom mohli spolupracovat.
                                 </p>
                                 
                                 <Button 
                                    className="w-full justify-center bg-white text-black hover:bg-gray-200"
                                    onClick={() => window.location.href = 'mailto:team@growthspect.com'}
                                 >
                                     Napište nám
                                 </Button>
                             </div>
                        </FadeIn>
                     </div>

                     {/* Right Listing */}
                     <div className="lg:col-span-8">
                         <FadeIn>
                             <div className="mb-16">
                                 <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 block">PŘIDEJTE SE K NÁM!</span>
                                 <h2 className="text-5xl md:text-6xl font-bold mb-6">Otevřené pozice</h2>
                                 <p className="text-xl text-gray-400 max-w-xl">
                                     Máme oči otevřené pro výjimečné talenty, kteří se nebojí výzev.
                                 </p>
                             </div>
                            
                             <div className="space-y-2">
                                 {jobPositions.map((job) => (
                                     <JobListing key={job.id} job={job} />
                                 ))}
                             </div>
                         </FadeIn>
                     </div>
                </div>
          </Container>
      </Section>
      
      <Footer />
    </div>
  );
};
