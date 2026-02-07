import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section, Container, FadeIn, Heading, Text } from '../UI';
import { useLanguage } from '../LanguageContext';
import { useCursor } from '../CursorContext';
import { blogPosts } from '../../lib/data';

export const Insights = ({ onNavigate }: { onNavigate: () => void }) => {
  const { t } = useLanguage();
  const recentPosts = blogPosts.slice(0, 3);
  
  const { setIsHovering, setCursorText } = useCursor();

  return (
    <Section id="blog" className="bg-brand-black relative py-24 border-t border-white/5">
      <Container>
        <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 relative">
                <div className="max-w-3xl">
                   <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
                    {t('insights.headline.part1')} <span className="text-brand-purple">{t('insights.headline.part2')}</span>
                   </h2>
                </div>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {recentPosts.map((post, idx) => (
            <FadeIn key={post.id} delay={idx * 0.1}>
              <article 
                className="group flex flex-col h-full bg-white/[0.02] border border-white/5 hover:border-brand-purple/30 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.04] cursor-none relative" 
                onClick={onNavigate}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-brand-purple/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10" />
                    <img 
                        src={post.image} 
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out transform scale-[1.05] group-hover:-translate-y-2 will-change-transform"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-mono text-brand-purple">
                            {post.category}
                        </span>
                    </div>

                    {/* Author Hover Effect */}
                    {post.authorImage && (
                        <div className="absolute bottom-0 left-0 z-20">
                            <div className="w-16 h-16 rounded-tr-2xl overflow-hidden border-t-[6px] border-r-[6px] border-brand-black transform translate-y-full -translate-x-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform">
                                <img 
                                    src={post.authorImage} 
                                    alt={post.author} 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-oldschool">
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                        </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                    </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
             <div className="mt-16 flex justify-start">
                <button
                    onClick={onNavigate}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-brand-purple hover:bg-brand-purple/10 transition-all bg-white/5"
                >
                    <span className="text-white font-medium">{t('insights.read_blog')}</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
        </FadeIn>
      </Container>
    </Section>
  );
};
