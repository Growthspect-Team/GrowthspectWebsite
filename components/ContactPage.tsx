import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './UI';
import { useLanguage } from './LanguageContext';

export const ContactPage: React.FC = () => {
    const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle grid pattern matching other sections */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Decorative background elements */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-brand-purple/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative z-10">
        
        {/* Left Column: Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:pt-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
             <span dangerouslySetInnerHTML={{ __html: t('contact.title').replace(' ', '<br/>') }} />
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-lg">
            {t('contact.subtitle')}{' '}
            <a href="mailto:hello@growthspect.com" className="text-white font-semibold underline decoration-brand-purple decoration-2 underline-offset-4 hover:decoration-white transition-colors">
              hello@growthspect.com
            </a>
            .
          </p>
          
          <div className="relative w-32 h-32 hidden lg:block">
             {/* Abstract arrow decoration - simplified SVG shape */}
             <div className="absolute top-0 left-0 text-brand-purple transform -rotate-12 opacity-80">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 50 C 30 20, 70 20, 90 50" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                    <path d="M90 50 L 80 40 M 90 50 L 80 60" stroke="currentColor" strokeWidth="2" />
                </svg>
             </div>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-400">
                  {t('contact.form.firstname')}
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-brand-purple transition-colors"
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-400">
                  {t('contact.form.lastname')}
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-brand-purple transition-colors"
                  placeholder=""
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-brand-purple transition-colors"
                placeholder=""
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-medium text-gray-400">
                {t('contact.form.company')}
              </label>
              <input
                type="text"
                id="company"
                className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-brand-purple transition-colors"
                placeholder=""
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="position" className="block text-sm font-medium text-gray-400">
                {t('contact.form.position')}
              </label>
              <input
                type="text"
                id="position"
                className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-brand-purple transition-colors"
                placeholder=""
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-400">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-brand-purple transition-colors resize-none"
                placeholder=""
              ></textarea>
            </div>

            <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
              <Button 
                variant="primary"
                className="rounded-full px-8 py-3 w-full md:w-auto"
                onClick={() => {}} // Handle form submission here or attach to form onSubmit in real app
                type="submit"
              >
                {t('contact.form.submit')}
              </Button>
              <p className="text-xs text-gray-500 max-w-xs text-center md:text-right">
                {t('contact.form.consent')}{' '}
                <a href="#" className="underline hover:text-gray-300">{t('contact.form.privacy')}</a>.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
