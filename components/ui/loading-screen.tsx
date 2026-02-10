import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/Branding/Growthspect_AI_white.png';

export const LoadingScreen: React.FC<{ onFinished: () => void; isFast?: boolean }> = ({ onFinished, isFast = false }) => {
  useEffect(() => {
    // Premium cinematic feel needs a moment to establish presence
    const duration = isFast ? 1000 : 2500;
    
    const timer = setTimeout(() => {
      onFinished();
    }, duration);

    return () => clearTimeout(timer);
  }, [onFinished, isFast]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
    >
        {/* Ambient Background Glow */}
        <motion.div 
            className="absolute w-[500px] h-[500px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none will-change-[opacity,transform]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Logo Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} 
                className="relative w-64 md:w-80 h-auto px-4 will-change-[opacity,transform,filter]"
            >
                <img 
                    src={logo}  
                    alt="GrowthSpect" 
                    width={320}
                    height={80}
                    className="w-full h-full object-contain" 
                />
                
                {/* Shimmer Effect */}
                <motion.div
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 will-change-[transform,opacity]"
                    initial={{ x: '-150%', opacity: 0 }}
                    animate={{ x: '150%', opacity: 1 }}
                    transition={{ 
                        duration: 1.8, 
                        ease: "easeInOut", 
                        repeat: Infinity, 
                        repeatDelay: 0.2,
                        delay: 0.5
                    }}
                />
            </motion.div>

            {/* Cinematic Line Decorator */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100px", opacity: 0.6 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-brand-purple to-transparent mt-8"
            />
        </div>
    </motion.div>
  );
};
