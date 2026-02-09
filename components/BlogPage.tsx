
import React, { useEffect, useState, useRef } from 'react';
import { Container, Section, Heading, Text, FadeIn, Button } from './UI';
import { ArrowLeft, Calendar, Clock, ArrowRight, Mail, Send, Zap, Brain, TrendingUp, Search, Linkedin, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import { useLenis } from './SmoothScroll';
import { useLanguage } from './LanguageContext';
import { useCursor } from './CursorContext';
import { ReadingProgressBar } from './blog/ReadingProgressBar';
import { TableOfContents } from './blog/TableOfContents';
import { extractHeaders } from './blog/utils';
import { RelatedPosts } from './blog/RelatedPosts';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    content?: string;
    author?: string;
    authorRole?: string;
    authorImage?: string;
}

interface BlogPageProps {
    onBack: () => void;
    posts: BlogPost[];
    selectedPostId?: number | null;
    onSelectPost?: (id: number | null) => void;
}

const InteractiveHover = ({ children, text, onHover }: { children: React.ReactNode; text: string; onHover: (text: string | null) => void }) => {
    return (
        <span 
            className="group relative inline-block"
            onMouseEnter={() => onHover(text)}
            onMouseLeave={() => onHover(null)}
        >
            <span className="relative z-10 text-white hover:text-[#a855f7] underline decoration-dotted decoration-[#8825ed] underline-offset-8 decoration-4 transition-all duration-300">
                {children}
            </span>
        </span>
    );
};

const FeaturedPost = ({ post, onClick, onMouseEnter, onMouseLeave, featuredLabel, language }: { 
    post: BlogPost; 
    onClick: (post: BlogPost) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    featuredLabel: string;
    language: string;
}) => {
    return (
        <FadeIn>
            <div className="mb-6 flex items-center gap-3">
                 <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8825ed] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8825ed]"></span>
                  </span>
                 <span className="text-xs font-mono text-[#8825ed] uppercase tracking-widest font-bold">
                    {featuredLabel}
                 </span>
            </div>

            <div 
                onClick={() => onClick(post)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="group relative grid lg:grid-cols-2 gap-0 overflow-hidden bg-white/[0.02] rounded-3xl cursor-none transition-all duration-500 hover:bg-white/[0.04] mb-20"
            >
                {/* Image Section */}
                <div className="relative h-[300px] lg:h-auto overflow-hidden">
                    <div className="absolute inset-0 bg-brand-purple/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10" />
                    <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                    <div className="hidden lg:flex items-center gap-4 mb-6">
                         <span className="px-3 py-1 bg-[#8825ed]/20 border border-[#8825ed]/30 rounded-full text-xs font-mono text-[#8825ed] uppercase tracking-wider">
                            {post.category}
                         </span>
                         <span className="flex items-center gap-1.5 text-gray-500 text-xs font-oldschool">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime.replace('read', language === 'cs' ? 'čtení' : 'read')}
                         </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-brand-purple transition-colors duration-300">
                        {post.title}
                    </h2>

                    <p className="text-gray-400 text-base leading-relaxed mb-8 line-clamp-3 lg:line-clamp-4">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 mt-8">
                        {post.authorImage && (
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div>
                           <div className="text-sm font-bold text-white">{post.author}</div>
                           <div className="text-xs text-gray-500">{post.authorRole}</div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
};

export const BlogPage: React.FC<BlogPageProps> = ({ onBack, posts, selectedPostId, onSelectPost }) => {
    const [email, setEmail] = useState('');
    const lenis = useLenis();
    const contentRef = useRef<HTMLDivElement>(null);
    const { t, language } = useLanguage();
    
    const [internalSelectedPost, setInternalSelectedPost] = useState<BlogPost | null>(null);

    const selectedPost = selectedPostId !== undefined
        ? (selectedPostId ? posts.find(p => p.id === selectedPostId) || null : null)
        : internalSelectedPost;

    const setSelectedPost = (post: BlogPost | null) => {
        if (onSelectPost) {
            onSelectPost(post ? post.id : null);
        } else {
            setInternalSelectedPost(post);
        }
    };

    // Custom Cursor Logic
    const { setCursorText: setCustomCursorText, setIsHovering: setIsHoveringCard } = useCursor();
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const handleShare = (platform: 'linkedin' | 'twitter' | 'facebook') => {
        const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
        const text = selectedPost ? encodeURIComponent(selectedPost.title) : '';
        
        let shareUrl = '';
        
        switch (platform) {
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    // Reset hover state when post is selected/deselected
    useEffect(() => {
        setIsHoveringCard(false);
        setCustomCursorText(null);
    }, [selectedPost]);

    // Get unique categories from posts
    const categories = ["All", ...new Set(posts.map(p => p.category))];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 12;

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [lenis, selectedPost, currentPage]);

    // Reset pagination when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    const filteredPosts = posts.filter((post, index) => {
        // Always skip first post (it's featured)
        if (index === 0) return false;

        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    // Pagination logic
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    // If no posts, show empty state
    if (posts.length === 0) {
        return (
            <div className="min-h-screen bg-brand-black relative">
                <Section className="relative z-10 pt-24 pb-24">
                    <Container>
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-16 group uppercase text-xs tracking-widest font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            {language === 'cs' ? 'Zpět na hlavní stranu' : 'Back to home'}
                        </button>

                        <div className="text-center py-20">
                            <Heading level="h2" className="mb-4">
                                {language === 'cs' ? 'Žádné články' : 'No articles yet'}
                            </Heading>
                            <Text className="text-gray-400">
                                {language === 'cs' ? 'Připravujeme pro vás nový obsah.' : 'New content coming soon.'}
                            </Text>
                        </div>
                    </Container>
                </Section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-black relative">
            {selectedPost ? (
                <div className="min-h-screen bg-[#050505] relative z-10 pt-32 pb-24">
                   
                   {/* Back Button Container */}
                   <Container className="!max-w-[1600px] px-6 md:px-12 mb-12">
                        <button
                            onClick={() => setSelectedPost(null)}
                            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group uppercase text-xs tracking-widest font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            {language === 'cs' ? 'Zpět na blog' : 'Back to blog'}
                        </button>
                   </Container>

                   <FadeIn>
                        {/* HERO SECTION - Full Width Layout */}
                        <div className="relative w-full mb-32">
                             {/* Background Image - Pinned to Right Edge */}
                             <div className="lg:absolute lg:top-0 lg:right-0 lg:w-[60%] lg:h-full h-[500px] z-0">
                                 <div className="relative h-full w-full lg:rounded-l-[4rem] overflow-hidden border-y border-l border-white/10">
                                     <div className="absolute inset-0 bg-black/20 z-10" />
                                     <img
                                        src={selectedPost.image}
                                        alt={selectedPost.title}
                                        className="w-full h-full object-cover"
                                     />
                                </div>
                             </div>
                            
                            {/* Content - Contained */}
                            <Container className="!max-w-[1600px] px-6 md:px-12 relative z-10 pointer-events-none">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[600px]">
                                    <div className="lg:col-span-8 pointer-events-auto">
                                        {/* Text Card Overlay */}
                                        <div className="relative bg-[#050505] p-6 md:p-12 rounded-[30px] lg:pr-24 lg:-mr-24">
                                             {/* Read time pill */}
                                            <div className="flex items-center gap-4 mb-8">
                                                 <span className="flex items-center gap-2 text-white/80 text-sm font-medium px-3 py-1  rounded-full ">
                                                    <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse"/>
                                                    {selectedPost.readTime.replace('read', language === 'cs' ? 'čtení' : 'read')}
                                                 </span>
                                            </div>
                                            
                                            {/* Title */}
                                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 leading-[1.25] tracking-tighter mix-blend-normal">
                                                {selectedPost.title}
                                            </h1>

                                            {/* Author Box */}
                                            <div className="flex items-center gap-4 p-2 pr-6 rounded-2xl w-fit">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                                                    <img 
                                                        src={selectedPost.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=100&h=100"} 
                                                        alt={selectedPost.author} 
                                                        className="w-full h-full object-cover" 
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-white font-bold text-sm">
                                                        {language === 'cs' ? '' : 'Written by '}{selectedPost.author || 'GrowthSpect Team'}
                                                    </div>
                                                    <div className="text-gray-400 text-xs">
                                                        {selectedPost.authorRole || 'Editor'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>

                        {/* CONTENT GRID */}
                        <Container className="!max-w-[1600px] px-6 md:px-12">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                                {/* LEFT SIDEBAR: CONTENTS */}
                                <div className="hidden lg:block lg:col-span-3">
                                    <div className="sticky top-32 space-y-12">
                                        <TableOfContents 
                                            headers={selectedPost.content ? extractHeaders(selectedPost.content) : []} 
                                            language={language}
                                        />
                                        <div className="pt-8 border-t border-white/5">
                                            <ReadingProgressBar language={language} targetRef={contentRef} />
                                        </div>
                                    </div>
                                </div>

                                {/* MAIN CONTENT */}
                                <div ref={contentRef} className="lg:col-span-7">
                                    {/* Updated Pill */}
                                  
                                    <div className="prose prose-invert prose-lg max-w-none">
                                         {/* Excerpt as Intro */}
                                         <p className="text-xl md:text-2xl text-white leading-relaxed font-medium mb-12 not-prose">
                                            {selectedPost.excerpt}
                                         </p>

                                        {selectedPost.content ? (
                                            <div className="text-gray-300 leading-relaxed space-y-8">
                                                {(() => {
                                                    let headerIndex = 0;
                                                    return selectedPost.content.split('\n\n').map((paragraph, idx) => {
                                                        if (paragraph.startsWith('## ')) {
                                                            const id = `section-${headerIndex}`;
                                                            headerIndex++;
                                                            return (
                                                                <h2 id={id} key={idx} className="text-3xl font-bold text-white mt-16 mb-6 scroll-mt-32">
                                                                    {paragraph.replace('## ', '')}
                                                                </h2>
                                                            );
                                                        }
                                                        return (
                                                            <p key={idx} className="text-gray-400 text-lg leading-7 font-light">
                                                                {paragraph}
                                                            </p>
                                                        );
                                                    });
                                                })()}
                                            </div>
                                        ) : null}
                                    </div>
                                    
                                     {/* Back to articles footer */}
                                    <div className="mt-20 pt-10">
                                        <button
                                            onClick={() => setSelectedPost(null)}
                                            className="flex items-center gap-2 text-brand-purple hover:text-white transition-colors group"
                                        >
                                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                            {language === 'cs' ? 'Zpět na přehled' : 'Back to overview'}
                                        </button>
                                    </div>
                                </div>

                                {/* RIGHT SIDEBAR: SHARE */}
                                <div className="hidden lg:block lg:col-span-2">
                                     <div className="sticky top-32 flex flex-col gap-6 items-end">
                                        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Share</span>
                                        <button onClick={() => handleShare('linkedin')} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300 group">
                                            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        </button>
                                        <button onClick={() => handleShare('twitter')} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white hover:border-white/20 transition-all duration-300 group">
                                            <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        </button>
                                        <button onClick={() => handleShare('facebook')} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 group">
                                            <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        </button>
                                        <div className="flex flex-col items-center gap-2">
                                            <button 
                                                onClick={handleCopyLink}
                                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 group ${
                                                    isCopied 
                                                    ? "bg-green-500 border-green-500 text-white" 
                                                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-brand-purple hover:text-white hover:border-brand-purple"
                                                }`}
                                            >
                                                <LinkIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            </button>
                                            {isCopied && (
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-green-500 animate-in fade-in slide-in-from-top-1">
                                                    Copied!
                                                </span>
                                            )}
                                        </div>
                                     </div>
                                </div>
                            </div>
                        
                        {/* END CONTENT GRID */}
                        </Container>
                   </FadeIn>

                   <RelatedPosts 
                        currentPostId={selectedPost.id}
                        posts={posts}
                        onSelectPost={setSelectedPost}
                        onViewAll={() => setSelectedPost(null)}
                        language={language}
                   />
                </div>
            ) : (
                <>
                <Section className="relative z-10 pt-24 pb-24">
                <Container className="!max-w-[1440px]">
                    {/* Header */}
                    <div className="mb-20 mt-12 relative">
                        <FadeIn>
                            <div className="flex justify-between items-stretch">
                                <div className="w-full">
                                    <h1 className="text-4xl  md:text-6xl lg:text-7xl font-bold text-white leading-[1.25] tracking-normal bg" style={{ lineHeight: 1.25 }}>
                                        {language === 'cs' ? (
                                            <>
                                                <InteractiveHover text="Inspirujte se" onHover={setCustomCursorText}>
                                                    Technologie
                                                </InteractiveHover>
                                                {' '}a vize, které mění pravidla digitálního byznysu
                                            </>
                                        ) : (
                                            <>
                                                <InteractiveHover text="Get Inspired" onHover={setCustomCursorText}>
                                                    Technologies
                                                </InteractiveHover>
                                                {' '}and vision
                                                <br />
                                                changing the rules of your business
                                            </>
                                        )}
                                    </h1>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Featured Post */}
                    {posts.length > 0 && (
                        <FeaturedPost 
                            post={posts[0]} 
                            onClick={setSelectedPost} 
                            onMouseEnter={() => setIsHoveringCard(true)} 
                            onMouseLeave={() => setIsHoveringCard(false)}
                            featuredLabel={language === 'cs' ? 'Doporučujeme' : 'Featured Story'}
                            language={language}
                        />
                    )}

                    {/* Categories and Search */}
                    <FadeIn delay={0.2}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-white/10 pb-8">
                            <div className="flex flex-wrap gap-4">
                                {categories.length > 2 && categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === cat
                                                ? 'bg-brand-purple text-white border-brand-purple'
                                                : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Search Field */}
                            <div className="group min-w-[250px] flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-brand-purple/50 focus-within:bg-white/10 transition-all">
                                <Search className="w-4 h-4 text-gray-500 group-focus-within:text-brand-purple transition-colors flex-shrink-0 mr-3" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={language === 'cs' ? 'Hledat články...' : 'Search articles...'}
                                    className="bg-transparent border-none text-sm text-white placeholder:text-gray-500 focus:outline-none w-full font-sans p-0"
                                />
                            </div>
                        </div>
                    </FadeIn>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentPosts.map((post, idx) => (
                            <FadeIn key={post.id} delay={idx * 0.1}>
                                <article
                                    onClick={() => setSelectedPost(post)}
                                    onMouseEnter={() => setIsHoveringCard(true)}
                                    onMouseLeave={() => setIsHoveringCard(false)}
                                    className="group flex flex-col h-full bg-white/[0.02] rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.04] cursor-none relative"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <div className="absolute inset-0 bg-brand-purple/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10" />
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-out transform scale-[1.05] group-hover:-translate-y-2 will-change-transform"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-brand-purple/20 backdrop-blur-md border border-brand-purple/30 rounded-full text-xs font-mono text-brand-purple uppercase tracking-wider shadow-[0_0_10px_rgba(139,92,246,0.15)]">
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
                            </FadeIn>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-20">
                            <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-full p-2 px-4 backdrop-blur-md">
                                <button 
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full text-white transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10'}`}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>
                                
                                {(() => {
                                    const pages = [];
                                    if (totalPages <= 7) {
                                        for (let i = 1; i <= totalPages; i++) pages.push(i);
                                    } else {
                                        if (currentPage <= 4) {
                                            pages.push(1, 2, 3, 4, 5, '...', totalPages);
                                        } else if (currentPage >= totalPages - 3) {
                                            pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                                        } else {
                                            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                                        }
                                    }
                                    return pages.map((page, i) => (
                                        typeof page === 'number' ? (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                                                    currentPage === page
                                                        ? 'bg-white/20 text-white'
                                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ) : (
                                            <span key={i} className="text-gray-600 px-1 select-none">...</span>
                                        )
                                    ));
                                })()}

                                <button 
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full text-white transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10'}`}
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Newsletter Section */}
                    <FadeIn>
                        <div className="relative rounded-[2rem] overflow-hidden bg-[#050505] border border-white/10 p-8 md:p-12 lg:p-16 isolate mt-20">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                                {/* Left Content */}
                                <div>
                                    <div className="flex items-center mb-6 text-brand-purple">
                                        <span className="text-xs font-mono uppercase tracking-widest">
                                            {language === 'cs' ? 'GrowthSpect Newsletter' : 'GrowthSpect Newsletter'}
                                        </span>
                                    </div>
                                    
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                        {language === 'cs' 
                                            ? 'Dostávejte nejnovější insighty a strategie přímo do inboxu'
                                            : 'Receive the most up to date insights & strategies'
                                        }
                                    </h2>

                                    <form className="flex flex-col sm:flex-row gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
                                        <input 
                                            type="email" 
                                            placeholder={language === 'cs' ? 'Váš email' : 'Your work email'}
                                            className="flex-grow px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all font-sans"
                                        />
                                        <button 
                                            className="px-6 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                                        >
                                            {language === 'cs' ? 'Odebírat' : 'Subscribe'}
                                            <Send className="w-4 h-4 ml-1" />
                                        </button>
                                    </form>
                                </div>

                                {/* Right Content - Visual Blocks */}
                                <div className="relative hidden lg:block">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-to-l from-brand-black/50 to-transparent z-10 pointer-events-none" />
                                    
                                    <div className="relative grid grid-cols-2 gap-4 opacity-80 mask-image-linear-gradient-to-r">
                                        <div className="space-y-4 pt-8">
                                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-sm transform hover:-translate-y-1 transition-transform duration-500">
                                                <Brain className="w-8 h-8 text-brand-purple mb-3" />
                                                <div className="h-2 w-20 bg-white/10 rounded-full mb-2" />
                                                <div className="h-2 w-12 bg-white/5 rounded-full" />
                                            </div>
                                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-sm transform hover:-translate-y-1 transition-transform duration-500 transition-delay-100">
                                                <Zap className="w-8 h-8 text-yellow-400 mb-3" />
                                                <div className="h-2 w-16 bg-white/10 rounded-full mb-2" />
                                                <div className="h-2 w-24 bg-white/5 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-sm transform hover:-translate-y-1 transition-transform duration-500 transition-delay-200">
                                                <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
                                                <div className="h-2 w-14 bg-white/10 rounded-full mb-2" />
                                                <div className="h-2 w-20 bg-white/5 rounded-full" />
                                            </div>
                                            <div className="bg-brand-purple/20 border border-brand-purple/30 p-4 rounded-2xl backdrop-blur-sm transform hover:-translate-y-1 transition-transform duration-500 transition-delay-300">
                                                <div className="w-8 h-8 rounded-full bg-brand-purple mb-3 flex items-center justify-center text-white font-bold">G</div>
                                                <div className="h-2 w-24 bg-white/20 rounded-full mb-2" />
                                                <div className="h-2 w-16 bg-white/10 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                </Container>
            </Section>
            </>
            )}
        </div>
    );
}
