import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Container } from '../UI';
import { useCursor } from '../CursorContext';

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
    const { setIsHovering } = useCursor();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Filter out current post and limit to 8 posts
    const relatedPosts = posts.filter(post => post.id !== currentPostId).slice(0, 8);

    // Check scroll position
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, [relatedPosts]);

    // Arrow navigation
    const scrollBy = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const cardWidth = 424; // 400px card + 24px gap
        const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    if (relatedPosts.length === 0) return null;

    return (
        <div className="w-full bg-[#050505] py-24 overflow-hidden">
            <Container className="!max-w-[1600px] px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Header */}
                    <div className="md:col-span-3 lg:col-span-3 flex flex-col justify-between h-full">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                {language === 'cs' ? 'Mohlo by se vám líbit' : 'You might also like'}
                            </h2>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="hidden md:flex gap-3 mt-auto pt-12">
                            <button
                                onClick={() => scrollBy('left')}
                                disabled={!canScrollLeft}
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                    canScrollLeft 
                                        ? 'border-white/20 text-white hover:bg-brand-purple hover:border-brand-purple' 
                                        : 'border-white/10 text-white/30 cursor-not-allowed'
                                }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollBy('right')}
                                disabled={!canScrollRight}
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                    canScrollRight 
                                        ? 'border-white/20 text-white hover:bg-brand-purple hover:border-brand-purple' 
                                        : 'border-white/10 text-white/30 cursor-not-allowed'
                                }`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Carousel/List */}
                    <div className="md:col-span-9 lg:col-span-9">
                        <div
                            ref={scrollContainerRef}
                            className={`flex gap-6 overflow-x-auto pb-8 -mr-6 md:-mr-12 px-1 snap-x hide-scrollbar`}
                        >
                            {relatedPosts.map((post) => (
                                <article
                                    key={post.id}
                                    onClick={() => onSelectPost(post)}
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}
                                    className={`min-w-[300px] md:min-w-[400px] group snap-center flex flex-col bg-white/[0.02] rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.04] cursor-none relative`}
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-brand-purple/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10" />
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-out transform scale-[1.05] group-hover:-translate-y-2 will-change-transform"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-xs font-mono text-sky-400 uppercase tracking-wider shadow-lg group-hover:border-sky-400/50 group-hover:bg-black/70 transition-all duration-300">
                                                {post.category}
                                            </span>
                                        </div>

                                        {/* Author Hover Effect */}
                                        {post.authorImage && (
                                            <div className="absolute bottom-0 left-0 z-20">
                                                <div className="w-16 h-16 rounded-tr-2xl overflow-hidden border-t-[6px] border-r-[6px] border-[#0a0a0a] transform translate-y-full -translate-x-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform">
                                                    <img
                                                        src={post.authorImage}
                                                        alt={post.author || 'Author'}
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
                                                {post.readTime.replace('read', language === 'cs' ? 'čtení' : 'read')}
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
