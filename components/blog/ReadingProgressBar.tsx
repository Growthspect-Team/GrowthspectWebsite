import React, { RefObject } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ReadingProgressBarProps {
    language?: string;
    targetRef?: RefObject<HTMLElement>;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ language = 'en', targetRef }) => {
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="w-full">
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 border-l-2 border-brand-purple pl-3">
                {language === 'cs' ? 'Průběh čtení' : 'Reading Progress'}
            </h3>
            <div className="pl-4">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-brand-purple origin-left"
                        style={{ scaleX }}
                    />
                </div>
            </div>
        </div>
    );
};
