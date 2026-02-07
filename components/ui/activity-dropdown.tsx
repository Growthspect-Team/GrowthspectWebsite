
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  ChevronDown,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';

export const ActivityDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!isOpen) {
        setIsOpen(true);
        setHasNotification(false);
    } else {
        setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={toggleDropdown}
        className="group flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-brand-purple/30 transition-all duration-300 relative"
      >
        <AnimatePresence>
          {hasNotification && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 z-10"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border-2 border-black"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-blue-500 blur-[4px] opacity-40"></div>
        </div>
        <span className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors tracking-wide">
            STATUS
        </span>
        <ChevronDown 
            className={`w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 8, scale: 0.96, filter: "blur(2px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute right-0 top-full mt-3 w-80 bg-[#0B0B0C]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50"
          >
             {/* Header */}
             <div className="p-4 border-b border-white/5 bg-gradient-to-r from-white/[0.03] to-transparent">
                <div className="flex items-center gap-3 mb-3">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-purple to-blue-600 flex items-center justify-center shadow-lg shadow-brand-purple/20">
                      <span className="font-bold text-white text-sm">GS</span>
                   </div>
                   <div>
                      <div className="text-sm font-semibold text-white tracking-tight">Enterprise Console</div>
                      <div className="text-[10px] text-gray-500 font-mono">ID: GS-8829-X</div>
                   </div>
                </div>
                <div className="flex items-center justify-between px-2 py-1.5 bg-black/40 rounded border border-white/5">
                   <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">System Status</span>
                   <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                     OPERATIONAL
                   </span>
                </div>
             </div>

             {/* Activity List */}
             <div className="p-2">
                <div className="px-2 py-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Live Feed</div>
                <div className="space-y-0.5">
                   
                   {/* New Blog Post Item */}
                   <div className="flex items-start gap-3 px-3 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg transition-colors cursor-pointer group mb-1">
                      <FileText className="w-3.5 h-3.5 text-blue-400 mt-0.5" />
                      <div>
                         <div className="text-xs font-bold text-blue-100 group-hover:text-white transition-colors">Nový článek: Why we chose Rust</div>
                         <div className="text-[10px] text-blue-400/70 mt-0.5">Engineering Blog • Now</div>
                      </div>
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                   </div>

                   <div className="flex items-start gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
                      <TrendingUp className="w-3.5 h-3.5 text-yellow-500 mt-0.5" />
                      <div>
                         <div className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors">Nový obchodní scoring systém</div>
                         <div className="text-[10px] text-gray-500 mt-0.5">AI Sales • 2m ago</div>
                      </div>
                   </div>
                   <div className="flex items-start gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
                      <Users className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
                      <div>
                         <div className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors">Komunita vedena daty</div>
                         <div className="text-[10px] text-gray-500 mt-0.5">Growth • 1h ago</div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Footer */}
             <div className="p-2 border-t border-white/5 bg-black/20">
                <button className="w-full flex items-center justify-between px-3 py-2 hover:bg-red-500/10 rounded-lg transition-colors group">
                   <span className="text-xs font-medium text-gray-500 group-hover:text-red-400 transition-colors">Sign out</span>
                   <LogOut className="w-3.5 h-3.5 text-gray-600 group-hover:text-red-400 transition-colors" />
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
