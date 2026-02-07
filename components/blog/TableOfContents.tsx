import React, { useEffect, useState } from 'react';
import { useLenis } from '../SmoothScroll';
import { BlogPostHeader } from './utils';
import { motion } from 'framer-motion';

interface TableOfContentsProps {
    headers: BlogPostHeader[];
    language: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headers, language }) => {
    const [activeId, setActiveId] = useState<string>('');
    const lenis = useLenis();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -35% 0px',
                threshold: 0
            }
        );

        headers.forEach((header) => {
            const element = document.getElementById(header.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headers]);

    const handleScroll = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(`#${id}`, { offset: -100 });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    if (headers.length === 0) return null;

    return (
        <div className="">
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6 border-l-2 border-brand-purple pl-3">
                {language === 'cs' ? 'Obsah' : 'Contents'}
            </h3>
            <nav className="relative">
                {/* Active Indicator Line which moves? Or just stick to simple styling first */}
                <ul className="space-y-4 border-l border-white/10 ml-0.5 pl-4">
                    {headers.map((header) => (
                        <li key={header.id} className="relative">
                            <a
                                href={`#${header.id}`}
                                onClick={(e) => handleScroll(header.id, e)}
                                className={`
                                    block text-sm transition-all duration-300 leading-relaxed
                                    ${activeId === header.id 
                                        ? 'text-brand-purple font-medium translate-x-1' 
                                        : 'text-gray-400 hover:text-white hover:translate-x-1'}
                                `}
                            >
                                {activeId === header.id && (
                                    <motion.span 
                                        layoutId="active-toc-indicator"
                                        className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-1 h-full max-h-[20px] bg-brand-purple rounded-r-full"
                                    />
                                )}
                                {header.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
