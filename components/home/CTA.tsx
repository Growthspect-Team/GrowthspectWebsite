import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Section, Container, FadeIn, Heading, Text, Button } from '../UI';
import { useLanguage } from '../LanguageContext';

export const CTA = () => {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
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
                  <input type="text" placeholder={t('cta.form.name')} className="bg-brand-black border border-white/10 p-4 text-white text-sm focus:border-brand-purple focus:outline-none transition-colors" required />
                  <input type="email" placeholder={t('cta.form.email')} className="bg-brand-black border border-white/10 p-4 text-white text-sm focus:border-brand-purple focus:outline-none transition-colors" required />
                </div>
                <textarea rows={3} placeholder={t('cta.form.description')} className="w-full bg-brand-black border border-white/10 p-4 text-white text-sm focus:border-brand-purple focus:outline-none transition-colors" required />
                <Button variant="primary">
                  <span className="w-full block text-center">{t('cta.form.submit')}</span>
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
