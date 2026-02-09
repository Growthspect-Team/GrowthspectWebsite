import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Loader2, ArrowRight } from 'lucide-react';
import { Section, Container, FadeIn, Heading, Text, Button } from '../UI';
import { useLanguage } from '../LanguageContext';

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

export const CTA = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.get('name'),
          lastName: '',
          email: formData.get('email'),
          company: '',
          position: '',
          source: 'homepage-cta',
          message: formData.get('description'),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" className="relative py-32 overflow-hidden bg-black">
      <Container className="relative z-10 text-center">
        <FadeIn>
          <Heading level="h2" className="text-4xl md:text-6xl mb-8">
            {t('cta.title')}
          </Heading>
          <Text className="max-w-xl mx-auto mb-12">
            {t('cta.subtitle')}
          </Text>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-md mx-auto space-y-4 mb-12"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="name" placeholder={t('cta.form.name')} className="bg-brand-black border border-white/10 p-4 text-white text-sm focus:border-brand-purple focus:outline-none transition-colors" required />
                  <input type="email" name="email" placeholder={t('cta.form.email')} className="bg-brand-black border border-white/10 p-4 text-white text-sm focus:border-brand-purple focus:outline-none transition-colors" required />
                </div>
                <textarea rows={3} name="description" placeholder={t('cta.form.description')} className="w-full bg-brand-black border border-white/10 p-4 text-white text-sm focus:border-brand-purple focus:outline-none transition-colors" required />
                <Button 
                    disabled={loading}
                    className="group bg-[linear-gradient(90deg,#8825ed,#ae1fed)] hover:opacity-90 text-white rounded-full px-8 py-4 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] border-none tracking-normal overflow-hidden mt-2 cursor-pointer"
                    variant="primary"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Odesílám...</span>
                  ) : (
                    <>
                    <span className="relative z-10">{t('cta.form.submit')}</span>
                     <div className="relative w-4 h-4 ml-1 overflow-hidden">
                        <ArrowRight className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:translate-x-[150%]" />
                         <ArrowRight className="absolute inset-0 w-full h-full -translate-x-[150%] transition-transform duration-300 group-hover:translate-x-0" />
                    </div>
                    </>
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto mb-12 p-8 border border-brand-purple/30 bg-brand-purple/5 rounded-xl text-center"
              >
                <div className="w-12 h-12 bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t('cta.success.title')}</h3>
                <p className="text-sm text-gray-400">{t('cta.success.message')}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors border-b border-gray-800 pb-0.5">
            Prohlédnout portfolio systémů
          </a>
        </FadeIn>
      </Container>
    </Section>
  );
};
