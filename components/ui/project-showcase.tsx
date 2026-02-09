
"use client"

import React, { useState, useCallback } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useLanguage } from "../LanguageContext"
import { ContainerScroll } from "./container-scroll-animation"
import { useCursor } from "../CursorContext"

interface InteractiveHoverProps {
  children: React.ReactNode;
  text: string;
  onHover: (text: string | null) => void;
}

const InteractiveHover: React.FC<InteractiveHoverProps> = ({ children, text, onHover }) => {
  return (
    <span 
      className="group relative inline-block"
      onMouseEnter={() => onHover(text)}
      onMouseLeave={() => onHover(null)}
    >
      <span className="relative z-10 text-white hover:text-[#a855f7] underline decoration-dotted decoration-[#8825ed] underline-offset-8 decoration-4 transition-all duration-300">
        {children}
      </span>
    </span>
  );
};

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  title: string
  description: string
  year: string
  link: string
  image: string
  category?: string
  metrics?: ProjectMetric[]
  isComingSoon?: boolean
  logo?: string
}

export const projects: Project[] = [
  {
    title: "Precise Calculation",
    description: "Enterprise kalkulační engine pro bleskové nacenění složitých zakázek.",
    year: "2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2532&auto=format&fit=crop",
    category: "Automation & Finance",
    metrics: [
      { label: "PŘESNOST", value: "100%" },
      { label: "RYCHLOST", value: "5 MIN" }
    ]
  },
  {
    title: "Brand Strategy AI",
    description: "Komunikační ekosystém pro budování značky a automatizovaný prodej.",
    year: "2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    category: "Strategy & AI",
    metrics: [
      { label: "Organický růst a virální šíření obsahu díky AI optimalizaci", value: "+120% DOSAH" },
      { label: "Automatizovaná tvorba a distribuce marketingových materiálů", value: "10X CONTENT" }
    ]
  },
  {
    title: "Naši chatbot asistenti",
    description: "Autonomní chatbot ekosystém s RAG architekturou nad firemními daty.",
    year: "2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=2070&auto=format&fit=crop",
    category: "AI Agents",
    metrics: [
      { label: "ÚSPORA", value: "75%" },
      { label: "CSAT", value: "98%" }
    ]
  },
  {
    title: "Elite Sales Engine",
    description: "Obchodní systém s behaviorálním scoringem a autonomním outreach.",
    year: "2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    category: "Enterprise AI",
    metrics: [
      { label: "KONVERZE", value: "+45%" },
      { label: "VÝKON", value: "24/7" }
    ]
  },
]


interface ProjectShowcaseProps {
  onProjectSelect: (project: Project) => void;
}

export function ProjectShowcase({ onProjectSelect }: ProjectShowcaseProps) {
  const { t } = useLanguage();
  const { setCursorText } = useCursor();

  return (
    <div className="w-full bg-black relative overflow-hidden py-32 -mt-32 rounded-t-[3rem] z-50 shadow-[0_-20px_60px_-15px_rgba(255,255,255,0.1)] border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-24">
          <span className="text-xs font-sans font-medium uppercase tracking-widest block mb-6 bg-gradient-to-r from-brand-purple to-[#a855f7] bg-clip-text text-transparent">
            {t('projects.title')}
          </span>
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight mb-8">
            Projekty, které <InteractiveHover text="Get Inspired" onHover={setCursorText}>inspirují</InteractiveHover>
          </h2>
        </div>

        {/* Projects List */}
        <div className="max-w-7xl mx-auto pb-32 relative z-10">
        
        {/* Projects List */}
        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative w-full"
            >
              <div 
                onClick={() => onProjectSelect(project)} 
                className="cursor-pointer block w-full"
              >
                  <div className="relative overflow-hidden rounded-[2rem] bg-[#050505] flex flex-col lg:flex-row min-h-[400px] lg:h-[420px] shadow-2xl border border-white/5 hover:border-white/10 transition-colors">
                      {/* Content Side (Left) */}
                      <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center relative z-10">
                          <div className="space-y-6">
                              <div className="flex items-center gap-3">
                                  {project.logo ? (
                                      <img src={project.logo} alt="brand" className="h-5 w-auto opacity-80" />
                                  ) : (
                                      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                          <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[10px]">R</div>
                                          {project.category?.split('&')[0].trim() || 'PROJECT'}
                                      </span>
                                  )}
                              </div>

                              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                  {project.title}
                              </h3>
                              
                              {/* Metrics */}
                              {project.metrics && (
                                  <div className="grid grid-cols-2 gap-8 pt-4">
                                      {project.metrics.map((metric, i) => (
                                          <div key={i}>
                                              <span className="block text-2xl font-bold text-white mb-1">
                                                  {metric.value}
                                              </span>
                                              <span className="block text-xs text-gray-500 font-medium">
                                                  {metric.label}
                                              </span>
                                          </div>
                                      ))}
                                  </div>
                              )}
                          </div>
                      </div>

                      {/* Image Side (Right) */}
                      <div className="relative w-full lg:w-[55%] h-[300px] lg:h-auto bg-[#050505]">
                          {/* Gradient overlay - shadow from side */}
                          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
                          
                          <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                          />
                      </div>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA (Optional, based on flow) */}
        <div className="mt-24 text-center">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 transition-all duration-300">
                <span>Všechny projekty</span>
                <ArrowUpRight className="w-4 h-4" />
            </button>
        </div>

      </div>
    </div>
  </div>
  )
}
