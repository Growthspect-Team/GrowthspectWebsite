
import React, { useEffect, useState, createContext, useContext } from 'react';
import Lenis from 'lenis';

// Define context
const LenisContext = createContext<Lenis | null>(null);

// Custom hook to use Lenis instance
export const useLenis = () => useContext(LenisContext);

export const SmoothScroll = ({ children }: { children?: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Vypnout Lenis na mobilu - normální scroll
    if (isMobile) {
      return;
    }

    // Add required class for Lenis CSS
    document.documentElement.classList.add('lenis');

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    setLenis(lenisInstance);

    let rafId: number;

    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      document.documentElement.classList.remove('lenis');
      setLenis(null);
    };
  }, [isMobile]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};
