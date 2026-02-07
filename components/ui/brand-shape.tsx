import React from 'react';
import { motion } from 'framer-motion';

interface BrandShapeProps {
    className?: string;
    variant?: 'sphere' | 'prism' | 'glow';
    delay?: number;
}

export function BrandShape({ className = "", variant = 'sphere', delay = 0 }: BrandShapeProps) {
    if (variant === 'glow') {
        return (
            <div className={`absolute pointer-events-none ${className}`}>
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute w-[300px] h-[300px] bg-brand-purple/40 rounded-full blur-[60px]" />
                </div>
            </div>
        );
    }

    if (variant === 'prism') {
        return (
            <motion.div
                initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ 
                    duration: 2, 
                    delay,
                    ease: [0.22, 1, 0.36, 1],
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 2
                }}
                className={`relative w-40 h-40 ${className}`}
            >
                {/* Abstract Glass Prism Shape CSS */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_0_40px_rgba(136,37,237,0.3)] transform rotate-45">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 to-transparent rounded-2xl" />
                </div>
                <div className="absolute inset-4 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-lg border border-white/30 rounded-xl shadow-inner transform -rotate-12"></div>
            </motion.div>
        );
    }

    // Default Sphere
    return (
        <motion.div 
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
            className={`relative w-64 h-64 ${className}`}
        >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-purple to-[#4c1d95] shadow-[0_0_60px_rgba(136,37,237,0.5)] opacity-90">
                {/* Highligts for 3D effect */}
                <div className="absolute top-4 left-8 w-16 h-8 bg-white/20 blur-xl rounded-[100%] transform -rotate-45"></div>
                <div className="absolute bottom-8 right-8 w-32 h-32 bg-black/40 blur-2xl rounded-full"></div>
                
                {/* Inner core */}
                <div className="absolute inset-10 rounded-full border border-white/10 bg-gradient-to-tr from-transparent to-white/5 backdrop-blur-sm"></div>
            </div>
        </motion.div>
    );
}
