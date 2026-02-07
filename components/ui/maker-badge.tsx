import React from 'react';
import { motion } from 'framer-motion';
import { PenTool } from 'lucide-react';

export const MakerBadge = ({ className }: { className?: string }) => {
    return (
        <motion.div 
            className={`relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 cursor-pointer ${className}`}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
        >
             {/* Rotating Background & Text */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                variants={{
                    hover: { scale: 1.1 },
                    initial: { scale: 1 }
                }}
                className="w-full h-full absolute inset-0 bg-brand-purple rounded-full flex items-center justify-center overflow-hidden shadow-lg shadow-brand-purple/30 border border-white/10"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full p-1">
                    <defs>
                        <path
                            id="circlePath"
                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        />
                    </defs>
                    <text className="text-[11.5px] font-bold uppercase fill-white">
                        <textPath href="#circlePath" startOffset="0%" textLength="230">
                           GrowthSpect • Insights • GrowthSpect • Insights •
                        </textPath>
                    </text>
                </svg>
            </motion.div>
            
            {/* Center Icon */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                variants={{
                    hover: { rotate: 15, scale: 1.2 },
                    initial: { rotate: 0, scale: 1 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
                 <PenTool className="w-6 h-6 md:w-8 md:h-8 text-white fill-white/10" />
            </motion.div>
        </motion.div>
    );
};
