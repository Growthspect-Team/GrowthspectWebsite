import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './UI';
import { useLanguage } from './LanguageContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
  source: string;
  message: string;
}

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

export const ContactPage: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [copied, setCopied] = React.useState(false);
    const [formData, setFormData] = React.useState<FormData>({
      firstName: '', lastName: '', email: '', company: '', position: '', source: '', message: ''
    });
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('loading');
      setErrorMessage('');
      try {
        const res = await fetch(`${API_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Něco se pokazilo.');
        }
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', company: '', position: '', source: '', message: '' });
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.message || 'Nepodařilo se odeslat zprávu.');
      }
    };

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText('team@growthspect.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header Section */}
        <div className="mb-16 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-white relative inline-block"
          >
             <span dangerouslySetInnerHTML={{ __html: t('contact.title').replace(' ', '<br/>') }} />
             
             <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-brand-purple rounded-full ml-4 align-middle transform rotate-45 hover:scale-105 hover:bg-opacity-90 transition-all cursor-pointer"
             >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white w-8 h-8 md:w-12 md:h-12">
                   <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </button>
          </motion.h1>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-16 md:mb-24" />

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Text & Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:pr-12"
        >
          <div className="mb-12 max-w-lg">
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-6">
              {t('contact.subtitle')}
            </p>
            <div className="relative inline-block group">
              <a 
                href="mailto:team@growthspect.com" 
                onClick={handleCopy}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white hover:text-brand-purple transition-all duration-300 cursor-pointer block tracking-tight"
              >
                team@growthspect.com
              </a>
              {copied && (
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 -top-10 px-3 py-1 bg-brand-purple text-white rounded-md text-sm whitespace-nowrap shadow-lg z-10"
                >
                  Zkopírováno
                </motion.span>
              )}
            </div>
          </div>
          
          <div className="relative w-32 h-32 hidden lg:block mt-12">
             {/* Abstract arrow decoration calling back to original design */}
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
          className="w-full"
          id="contact-form"
        >
          <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center text-center py-16 px-8"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-purple to-[#a855f7] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(136,37,237,0.4)]">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Zpráva odeslána!</h3>
              <p className="text-gray-400 text-lg max-w-md mb-8">Děkujeme za vaši zprávu. Potvrzení jsme vám poslali na email. Ozveme se vám do 24 hodin.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-brand-purple hover:text-white transition-colors text-sm font-medium"
              >
                ← Odeslat další zprávu
              </button>
            </motion.div>
          ) : (
          <motion.form key="form" className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="sr-only">{t('contact.form.firstname')}</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-purple focus:bg-white/10 transition-all"
                  placeholder={t('contact.form.firstname')}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">{t('contact.form.lastname')}</label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-purple focus:bg-white/10 transition-all"
                  placeholder={t('contact.form.lastname')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="sr-only">{t('contact.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-purple focus:bg-white/10 transition-all"
                  placeholder={t('contact.form.email')}
                />
              </div>
              <div>
                <label htmlFor="company" className="sr-only">{t('contact.form.company')}</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-purple focus:bg-white/10 transition-all"
                  placeholder={t('contact.form.company')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="position" className="sr-only">{t('contact.form.position')}</label>
                <input
                  type="text"
                  id="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-purple focus:bg-white/10 transition-all"
                  placeholder={t('contact.form.position')}
                />
              </div>

              <div>
                <label htmlFor="source" className="sr-only">{t('contact.form.source')}</label>
                <div className="relative">
                  <select
                    id="source"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-purple focus:bg-white/10 transition-all appearance-none"
                    value={formData.source}
                    onChange={handleChange}
                  >
                    <option value="" disabled className="text-gray-500 bg-brand-black">{t('contact.form.source')}</option>
                    <option value="google" className="bg-brand-black">Google</option>
                    <option value="linkedin" className="bg-brand-black">LinkedIn</option>
                    <option value="social" className="bg-brand-black">Facebook / Instagram</option>
                    <option value="recommendation" className="bg-brand-black">Doporučení</option>
                    <option value="other" className="bg-brand-black">Jiné</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="sr-only">{t('contact.form.message')}</label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-purple focus:bg-white/10 transition-all resize-none"
                placeholder={t('contact.form.message')}
              ></textarea>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <p className="text-xs text-gray-500 text-left">
                {t('contact.form.consent')}{' '}
                <a 
                  href="/privacy-policy" 
                  onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); }} 
                  className="underline hover:text-gray-300"
                >
                  {t('contact.form.privacy')}
                </a>.
              </p>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-2"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                </motion.div>
              )}
              <Button 
                className="group bg-gradient-to-r from-brand-purple to-[#a855f7] hover:opacity-90 text-white rounded-full px-8 py-4 font-semibold text-base flex items-center gap-3 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] border-none !normal-case tracking-normal overflow-hidden w-full md:w-auto self-start disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                variant="primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="relative z-10">Odesílám...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">{t('contact.form.submit')}</span>
                    <div className="relative w-5 h-5 ml-1 overflow-hidden">
                      <ArrowRight className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:translate-x-[150%]" />
                      <ArrowRight className="absolute inset-0 w-full h-full -translate-x-[150%] transition-transform duration-300 group-hover:translate-x-0" />
                    </div>
                  </>
                )}
              </Button>
            </div>
          </motion.form>
          )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
    </div>
  );
};
