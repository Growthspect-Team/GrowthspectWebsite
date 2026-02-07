import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export const Section: React.FC<{ 
  children: ReactNode; 
  className?: string; 
  id?: string;
  noPadding?: boolean;
}> = ({ children, className = "", id, noPadding = false }) => {
  return (
    <section id={id} className={`relative w-full ${noPadding ? '' : 'py-24 lg:py-32'} ${className}`}>
      {children}
    </section>
  );
};

export const Container: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export const Button: React.FC<{ 
  children: ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline'; 
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}> = ({ children, variant = 'primary', onClick, className = "", type = "button", disabled = false }) => {
  const baseStyles = "px-8 py-4 text-sm font-medium transition-all duration-300 ease-out border backdrop-blur-sm relative overflow-hidden group";
  
  const variants = {
    primary: "bg-brand-purple border-brand-purple text-white hover:bg-opacity-90 hover:shadow-[0_0_20px_rgba(76,46,255,0.4)]",
    secondary: "bg-white text-black border-white hover:bg-gray-200",
    outline: "bg-transparent border-white/20 text-white hover:border-brand-purple hover:text-brand-purple"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      type={type}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center gap-2 justify-center">{children}</span>
      {/* Ripple/Shine effect could go here */}
    </button>
  );
};

export const FadeIn: React.FC<{ 
  children: ReactNode; 
  delay?: number; 
  direction?: 'up' | 'down' | 'none';
  className?: string;
}> = ({ children, delay = 0, direction = 'up', className = "" }) => {
  const directionOffset = direction === 'up' ? 30 : direction === 'down' ? -30 : 0;
  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: directionOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export const Heading: React.FC<{ children: ReactNode; level?: 'h1' | 'h2' | 'h3'; className?: string }> = ({ children, level = 'h2', className = "" }) => {
  if (level === 'h1') {
    return <h1 className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter text-white ${className}`}>{children}</h1>;
  }
  if (level === 'h2') {
    return <h2 className={`font-display text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-white mb-8 ${className}`}>{children}</h2>;
  }
  return <h3 className={`font-display text-xl md:text-2xl font-medium text-white mb-4 ${className}`}>{children}</h3>;
};

export const Text: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => {
  return <p className={`font-sans text-base md:text-lg text-gray-400 leading-relaxed ${className}`}>{children}</p>;
};