import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/Branding/Growthspect_AI_white.png';

export const LoadingScreen: React.FC<{ onFinished: () => void; isFast?: boolean }> = ({ onFinished, isFast = false }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, isFast ? 200 : 600); 
          return 100;
        }
        // Organic increment
        const remaining = 100 - prev;
        let increment;
        
        if (isFast) {
            // Faster loading logic
            increment = Math.max(2, remaining * 0.15 + Math.random() * 5);
        } else {
            // Original slow loading
            increment = Math.max(0.5, remaining * 0.05 + Math.random() * 2);
        }
        
        return Math.min(prev + increment, 100);
      });
    }, isFast ? 20 : 50);

    return () => clearInterval(timer);
  }, [onFinished, isFast]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="flex flex-col items-center justify-center gap-8 md:gap-12 w-full max-w-md px-4">
        
        {/* Logo Container with Scan Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-48 md:w-64 h-auto"
        >
          {/* Base dimmed logo */}
          <img 
            src={logo} 
            alt="GrowthSpect" 
            className="w-full h-auto opacity-20"
          />

          {/* Scanned bright logo */}
          <motion.div
            className="absolute inset-0"
            initial={{ WebkitMaskPosition: '-150%' }}
            animate={{ WebkitMaskPosition: '150%' }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5, 
              ease: "linear",
              repeatDelay: 0.5 
            }}
            style={{
              maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,1) 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 50%, transparent 100%)',
              maskSize: '50% 100%',
              WebkitMaskSize: '50% 100%',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <img 
              src={logo} 
              alt="GrowthSpect" 
              className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
            />
          </motion.div>
        </motion.div>

        {/* Technical Progress Bar */}
        <div className="w-full relative flex flex-col gap-2">
          {/* Progress Line */}
          <div className="h-[1px] w-full bg-white/10 overflow-hidden relative rounded-full">
             <motion.div
              className="absolute left-0 top-0 bottom-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
            />
          </div>

          {/* Data output / Percentage */}
          <div className="flex justify-between text-[10px] md:text-xs text-white/40 font-mono tracking-widest uppercase">
            <span>System Initializing</span>
            <span>{Math.floor(progress)}%</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
