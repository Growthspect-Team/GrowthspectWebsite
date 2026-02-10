
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  X,
  CheckCircle,
  Loader2,
  Send
} from 'lucide-react';
import { Container, Section, Button, FadeIn } from './UI';
import ParticleBackground from './ParticleBackground';
import { useLenis } from './SmoothScroll';
import { ServicesCleevio } from './home/ServicesCleevio';
import { Insights } from './home/Insights';

interface ServicesPageProps {
  onBack: () => void;
}

// --- CONTACT MODAL COMPONENT ---

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Reset state on open
  useEffect(() => {
    if (isOpen) setFormState('idle');
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-[#0B0B0C] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                <h3 className="font-display text-xl font-bold text-white">
                  {formState === 'success' ? 'Odesláno' : 'Technický Audit'}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 overflow-y-auto">
                {formState === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-brand-purple/20 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="w-8 h-8 text-brand-purple" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-white mb-2">Poptávka přijata</h4>
                    <p className="text-gray-400 max-w-xs mx-auto mb-8">
                      Děkujeme za zájem. Náš tým architektů se vám ozve do 24 hodin s návrhem termínu.
                    </p>
                    <Button onClick={onClose} className="w-full">Zavřít okno</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      Vyplňte krátký formulář. Probereme vaši aktuální infrastrukturu a navrhneme kroky k optimalizaci.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Jméno</label>
                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all placeholder:text-gray-600" placeholder="Jan Novák" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Firma</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all placeholder:text-gray-600" placeholder="Firma s.r.o." />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Email</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all placeholder:text-gray-600" placeholder="jan@firma.cz" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Zpráva (volitelné)</label>
                      <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all resize-none placeholder:text-gray-600" placeholder="Popište stručně váš use-case..." />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        {formState === 'submitting' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Odesílání...
                          </>
                        ) : (
                          <>
                            Odeslat poptávku <Send className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                      <p className="text-[10px] text-gray-600 text-center mt-3">
                        Odesláním souhlasíte se zpracováním osobních údajů pro účely komunikace.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  return (
    <div className="min-h-screen bg-brand-black relative">
      {/* Background */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <ParticleBackground />
      </div>



      <ServicesCleevio />

      <Insights onNavigate={() => window.location.href = '/blog'} />

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};