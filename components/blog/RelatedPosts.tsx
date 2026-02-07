import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Container } from '../UI';
import { FadeIn } from '../UI';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: string;
    authorRole?: string;
    authorImage?: string;
}

interface RelatedPostsProps {
    currentPostId: number;
    posts: BlogPost[];
    onSelectPost: (post: BlogPost) => void;
    onViewAll: () => void;
    language: 'cs' | 'en';
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ 
    currentPostId, 
    posts, 
    onSelectPost, 
    onViewAll,
    language 
}) => {
    // Filter out current post
    const relatedPosts = posts.filter(post => post.id !== currentPostId);

    if (relatedPosts.length === 0) return null;

    return (
        <div className="w-full bg-[#050505] py-24 overflow-hidden">
            <Container className="!max-w-[1600px] px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Header & Action */}
                    <div className="md:col-span-3 lg:col-span-3 flex flex-col justify-between h-full">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                {language === 'cs' ? 'Mohlo by se vám líbit' : 'You might also like'}
                            </h2>

                            <button 
                                onClick={onViewAll}
                                className="group flex items-center gap-2 px-6 py-3 bg-brand-purple text-white rounded-full font-medium hover:bg-brand-purple/90 transition-colors w-fit"
                            >
                                {language === 'cs' ? 'Zobrazit blog' : 'View our Blog'}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Navigation Arrows for Carousel could go here if implemented as a real slider */}
                        <div className="hidden md:flex gap-2 mt-auto pt-12">
                            {/* Placeholder for potential slider controls */}
                        </div>
                    </div>

                    {/* Right Column: Carousel/List */}
                    <div className="md:col-span-9 lg:col-span-9">
                        <div className="flex gap-6 overflow-x-auto pb-8 -mr-6 md:-mr-12 px-1 snap-x hide-scrollbar">
                            {relatedPosts.map((post, idx) => (
                                <div 
                                    key={post.id}
                                    onClick={() => onSelectPost(post)}
                                    className="min-w-[300px] md:min-w-[400px] group cursor-pointer snap-center"
                                >
                                    {/* Image Card */}
                                    <div className="relative aspect-[16/10] mb-6 rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-brand-purple/30 transition-colors">
                                        <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                        <img 
                                            src={post.image} 
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                                        />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-mono uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
                                            {post.readTime}
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors leading-tight">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
            
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};
