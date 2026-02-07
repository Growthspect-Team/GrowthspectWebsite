import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import ParticleBackground from "../ParticleBackground";
import { SplineScene } from "./spline";
import { useLanguage } from "../LanguageContext";

interface HeroProps {
  onViewProjects?: () => void;
}

function Hero({ onViewProjects }: HeroProps) {
  const { t, language } = useLanguage();
  const [index, setIndex] = useState(0);

  const HERO_TITLES = language === 'cs' ? [
    "Tvoříme chytrá řešení",
    "digitální prostředí",
    "AI infrastruktury",
    "Aplikace a automatizace"
  ] : [
    "Building Smart Solutions",
    "Digital Ecosystems",
    "AI Infrastructure",
    "Apps & Automation"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % HERO_TITLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full relative overflow-hidden min-h-screen flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/40 to-brand-black z-10 pointer-events-none" />

      <div className="container mx-auto relative z-20 px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-20 lg:pt-0">

            {/* Main Title Area */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter font-display font-bold text-white leading-tight mb-6 max-w-4xl w-full">
              <div className="relative h-[4em] sm:h-[1.5em] w-full overflow-hidden flex justify-center lg:justify-start py-2">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={index}
                    initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -50, opacity: 0, filter: "blur(5px)" }}
                    transition={{
                      y: { type: "spring", stiffness: 100, damping: 20 },
                      opacity: { duration: 0.4 },
                      filter: { duration: 0.4 }
                    }}
                    className="absolute top-2 left-0 w-full text-center lg:text-left whitespace-normal sm:whitespace-nowrap"
                  >
                    {HERO_TITLES[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-gray-400 max-w-2xl mb-8">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 transition-all">
                {t('hero.cta.consult')} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 backdrop-blur-sm"
                onClick={onViewProjects}
              >
                {t('hero.cta.projects')}
              </Button>
            </div>
          </div>

          {/* Right Column: Robot/Spline */}
          <div className="relative h-[600px] lg:h-[870px] w-full hidden lg:block scale-[1.15] origin-center select-none">
            <div className="absolute inset-0 z-10 w-full h-full">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent pointer-events-none z-30" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
