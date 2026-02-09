import React, { useEffect, useRef } from 'react';
import { useCursor } from '../CursorContext';
import { useLanguage } from '../LanguageContext';

export const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const { cursorText, isHovering } = useCursor();
    const { language } = useLanguage();

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                 cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <div 
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block will-change-transform"
        >
             <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                <div 
                    className={`
                        flex items-center justify-center backdrop-blur-md bg-[linear-gradient(90deg,#8825ed,#ae1fed)]
                        transition-[transform,opacity,background-color,border-color,box-shadow,width,height,padding,border-radius] duration-300 ease-out origin-center
                        ${cursorText 
                            ? 'bg-brand-purple text-white scale-100 opacity-100 px-4 py-2 rounded-full shadow-lg' 
                            : isHovering
                                ? 'bg-brand-purple/90 text-white scale-100 opacity-100 border border-white/20 shadow-2xl w-24 h-24 rounded-full'
                                : 'bg-transparent scale-0 opacity-0 border-transparent shadow-none w-24 h-24 rounded-full'}
                    `}
                >
                    <span className={`font-bold tracking-widest text-xs uppercase whitespace-nowrap ${(cursorText || isHovering) ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 delay-100`}>
                        {cursorText || (language === 'cs' ? 'Číst' : 'Read')}
                    </span>
                </div>
            </div>
        </div>
    );
};
