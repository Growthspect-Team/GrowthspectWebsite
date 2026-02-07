import React from 'react';
import { Section, Container, FadeIn } from '../UI';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, BarChart2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const StrategicPlanning = () => {
  const { t } = useLanguage();
  return (
    <Section className="bg-brand-black py-24 border-t border-white/10">
      <Container>
        {/* Section 1: Strategic Direction (Timeline) */}
        <div className="mb-32">
          <FadeIn>
             <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <span className="text-green-500 text-xs font-mono tracking-widest uppercase">{t('strategic.label')}</span>
             </div>
             
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight mb-8 leading-[0.9]">
               {t('strategic.title.part1')} <br />
               <span className="text-gray-500">{t('strategic.title.part2')}</span>
             </h2>
             
             <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-16 leading-relaxed">
               {t('strategic.description')}
             </p>
          </FadeIn>

          {/* Timeline Visual */}
          <FadeIn delay={0.2} className="relative w-full h-[300px] md:h-[500px] bg-white/5 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm">
             {/* Grid Lines */}
             <div className="absolute inset-0 grid grid-cols-6 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border-r border-white/5 h-full relative">
                     <span className="absolute top-4 left-4 text-[10px] text-gray-600 font-mono">Q{i + 1}</span>
                  </div>
                ))}
             </div>

             {/* Timeline Items */}
             <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center gap-8 md:gap-12">
                {/* Item 1 */}
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: "40%", opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="h-12 md:h-16 rounded-full bg-gradient-to-r from-green-900/40 to-green-500/20 border border-green-500/30 flex items-center px-6 relative group overflow-hidden"
                >
                   <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors duration-500" />
                   <div className="w-2 h-2 rounded-full bg-green-400 mr-4 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                   <span className="text-green-100 font-mono text-xs md:text-sm tracking-wide whitespace-nowrap">{t('strategic.timeline.item1')}</span>
                   <div className="absolute right-4 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-4 h-4 rounded-full" />
                   </div>
                </motion.div>

                {/* Item 2 */}
                <motion.div 
                  initial={{ width: 0, opacity: 0, x: 100 }}
                  whileInView={{ width: "60%", opacity: 1, x: "20%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="h-12 md:h-16 rounded-full bg-gradient-to-r from-brand-purple/20 to-brand-purple/10 border border-brand-purple/30 flex items-center px-6 relative group ml-[20%]"
                >
                   <div className="absolute inset-0 bg-brand-purple/5 group-hover:bg-brand-purple/10 transition-colors duration-500" />
                   <div className="w-2 h-2 rounded-full bg-brand-purple mr-4 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                   <span className="text-purple-100 font-mono text-xs md:text-sm tracking-wide whitespace-nowrap">{t('strategic.timeline.item2')}</span>
                </motion.div>
                
                 {/* Item 3 */}
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: "35%", opacity: 1, x: "55%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="h-12 md:h-16 rounded-full bg-gradient-to-r from-blue-900/40 to-blue-500/20 border border-blue-500/30 flex items-center px-6 relative group"
                >
                   <div className="w-2 h-2 rounded-full bg-blue-400 mr-4 shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
                   <span className="text-blue-100 font-mono text-xs md:text-sm tracking-wide whitespace-nowrap">{t('strategic.timeline.item3')}</span>
                </motion.div>

             </div>

             {/* Decorative Background Glows */}
             <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
             <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />
          </FadeIn>
        </div>

        {/* Section 2: Artifacts / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
                <div className="mb-10">
                  <h3 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6">
                    {t('strategic.artifacts.title.part1')} <br/>
                    <span className="text-gray-500">{t('strategic.artifacts.title.part2')}</span>
                  </h3>
                   
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border-l-2 border-brand-purple cursor-pointer hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-3 text-white font-medium mb-1">
                            <FileText size={18} className="text-brand-purple" />
                            {t('strategic.artifacts.doc')}
                        </div>
                        <p className="text-sm text-gray-500 pl-8">{t('strategic.artifacts.doc.desc')}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-transparent border-l-2 border-transparent cursor-pointer hover:bg-white/5 transition-all text-gray-400 hover:text-white">
                        <div className="flex items-center gap-3 font-medium mb-1">
                            <MessageSquare size={18} />
                            {t('strategic.artifacts.feedback')}
                        </div>
                    </div>
                     <div className="p-4 rounded-xl bg-transparent border-l-2 border-transparent cursor-pointer hover:bg-white/5 transition-all text-gray-400 hover:text-white">
                        <div className="flex items-center gap-3 font-medium mb-1">
                            <BarChart2 size={18} />
                            {t('strategic.artifacts.kpi')}
                        </div>
                    </div>
                  </div>
                </div>
            </FadeIn>

            {/* Document Visual */}
            <FadeIn delay={0.2} className="relative">
                <div className="relative rounded-xl bg-[#0A0A0A] border border-white/10 p-1 md:p-2 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#111] rounded-t-lg">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                        </div>
                        <div className="text-[10px] text-gray-600 font-mono">strategy_v2.md</div>
                        <div className="w-4"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 md:p-8 min-h-[400px] font-mono text-sm relative overflow-hidden">
                        <div className="text-green-500 text-[10px] mb-4 font-bold tracking-widest uppercase">{t('strategic.editor.draft')}</div>
                        <h4 className="text-2xl text-white font-sans font-bold mb-6">{t('strategic.editor.title')}</h4>
                        
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>{t('strategic.editor.text.1')} <span className="text-green-400 bg-green-400/10 px-1 rounded">{t('strategic.editor.text.2')}</span> {t('strategic.editor.text.3')}</p>
                            
                            <div className="pl-4 border-l-2 border-brand-purple/50 my-6">
                                <span className="bg-brand-purple/20 text-brand-purple px-1.5 py-0.5 rounded text-[10px] font-bold mb-1 inline-block">CEO</span>
                                <p className="text-gray-300 italic">{t('strategic.editor.comment')}</p>
                            </div>
                            
                            <p>{t('strategic.editor.list.obj')}</p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-500">
                                <li>{t('strategic.editor.list.1')}</li>
                                <li>{t('strategic.editor.list.2')}</li>
                                <li className="text-white relative">
                                    {t('strategic.editor.list.3')}
                                    <span className="absolute -left-7 top-1 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                    <div className="absolute left-[100%] top-0 ml-4 bg-gray-800 text-[10px] px-2 py-1 rounded border border-white/10 whitespace-nowrap hidden md:block">
                                        {t('strategic.editor.active')}
                                    </div>
                                </li>
                            </ul>

                             <div className="mt-8 p-4 rounded bg-yellow-500/5 border border-yellow-500/10">
                                <div className="text-yellow-500 text-[10px] font-bold mb-1 uppercase">{t('strategic.editor.note')}</div>
                                <p className="text-xs text-yellow-200/70">{t('strategic.editor.note.text')}</p>
                             </div>
                        </div>
                    </div>
                </div>
                
                {/* Float elements */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 md:right-[-20px] bg-[#151515] p-4 rounded-xl border border-white/10 shadow-2xl z-20 hidden md:block"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-xs">A</div>
                        <div>
                            <div className="text-xs text-gray-400">{t('strategic.status.changed')}</div>
                            <div className="text-sm text-green-400 font-medium">{t('strategic.status.completed')}</div>
                        </div>
                    </div>
                </motion.div>
            </FadeIn>
        </div>

      </Container>
    </Section>
  )
}
