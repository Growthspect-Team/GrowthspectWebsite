
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
    <div className="w-full bg-black relative overflow-hidden py-20 sm:py-32 border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="mb-14 sm:mb-24">
          <span className="text-xs font-sans font-medium uppercase tracking-widest block mb-4 sm:mb-6 bg-gradient-to-r from-brand-purple to-[#a855f7] bg-clip-text text-transparent">
            {t('projects.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-sans font-bold text-white tracking-tight mb-6 sm:mb-8">
            Projekty, které <InteractiveHover text="Get Inspired" onHover={setCursorText}>inspirují</InteractiveHover>
          </h2>
        </div>

        {/* Projects List */}
        <div className="max-w-7xl mx-auto pb-16 sm:pb-32 relative z-10">
        
        {/* Projects List */}
        <div className="space-y-10 sm:space-y-16 md:space-y-24">
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
                onClick={() => {
                    onProjectSelect(project);
                    setCursorText(null);
                }} 
                className="cursor-none block w-full"
                onMouseEnter={() => setCursorText('Zobrazit projekt')}
                onMouseLeave={() => setCursorText(null)}
              >
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-[#0a0a0a] shadow-2xl transition-colors min-h-[320px] sm:min-h-[420px] md:min-h-[500px]">
                      {/* Full-bleed Image */}
                      <img 
                          src={project.image} 
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover object-center opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] from-30% via-[#0a0a0a]/90 via-60% to-transparent pointer-events-none" />

                      {/* Content overlaying at bottom */}
                      <div className="absolute inset-x-0 bottom-0 px-5 sm:px-8 md:px-10 pb-5 sm:pb-8 md:pb-10 pt-4 z-10">
                          <div className="flex items-center gap-3 mb-3">
                              {project.logo ? (
                                  <img src={project.logo} alt="brand" className="h-5 w-auto opacity-80" />
                              ) : (
                                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                      <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[10px]">R</div>
                                      {project.category?.split('&')[0].trim() || 'PROJECT'}
                                  </span>
                              )}
                          </div>

                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                              {project.title}
                          </h3>
                          <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-lg leading-relaxed mb-4 sm:mb-6">
                              {project.description}
                          </p>

                          {/* Metrics */}
                          {project.metrics && project.metrics.length > 0 && (
                              <div className="flex flex-wrap gap-6 sm:gap-12 pt-2">
                                  {project.metrics.map((metric, i) => (
                                      <div key={i}>
                                          <span className="block text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
                                              {metric.value}
                                          </span>
                                          <span className="block text-[10px] sm:text-xs text-gray-500 font-medium leading-snug max-w-[140px] sm:max-w-[180px]">
                                              {metric.label}
                                          </span>
                                      </div>
                                  ))}
                              </div>
                          )}
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
