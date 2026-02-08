
"use client"

import React, { useState, useCallback } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useLanguage } from "../LanguageContext"
import { ContainerScroll } from "./container-scroll-animation"

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

  return (
    <div className="w-full bg-black relative overflow-hidden py-32">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-24">
          <span className="text-xs font-sans font-medium uppercase tracking-widest block mb-6 text-brand-purple">
            {t('projects.title')}
          </span>
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight mb-8">
            Projekty, které <span className="text-gray-400">inspirují</span>
          </h2>
        </div>

        {/* Projects List */}
        <div className="max-w-7xl mx-auto pb-32 relative z-10">
        
        {/* Projects List */}
        <div className="space-y-16 md:space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="group relative w-full rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10"
            >
              {/* Card Container - Stacked on mobile, Side-by-side on desktop */}
              <div className="flex flex-col lg:flex-row min-h-[600px] lg:h-[650px]">
                
                {/* Content Side (Left) */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative z-10 bg-black/40 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
                  
                  {/* Top Content */}
                  <div>
                    <div className="mb-8">
                       {project.logo ? (
                          <img src={project.logo} alt="brand" className="h-6 w-auto" />
                        ) : (
                          <span className="text-xl font-bold text-white uppercase tracking-wider">
                            {project.category?.split('&')[0].trim() || 'GROWTHSPECT'}
                          </span>
                        )}
                    </div>

                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                      {project.title}
                    </h3>

                    {/* Description removed to match reference structure
                    <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10">
                      {project.description}
                    </p>
                    */}
                  </div>

                  {/* Bottom Content / Metrics */}
                  <div className="mt-auto">
                    
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                       {project.metrics?.map((metric, mIdx) => (
                        <div key={mIdx}>
                          <span className="block text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                            {metric.value}
                          </span>
                          <span className="block text-sm text-gray-400 font-medium leading-relaxed">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button removed to match reference */}
                  </div>
                </div>

                {/* Image Side (Right) - Absolute on mobile to act as background with overlay */}
                <div className="absolute inset-0 lg:relative lg:inset-auto lg:w-1/2 h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent lg:from-transparent lg:to-transparent z-0 lg:z-auto" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent lg:hidden z-0" />
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                   {/* Optional Decor overlay for desktop visual interest */}
                  <div className="hidden lg:block absolute inset-0 bg-gradient-to-l from-transparent to-black/80 w-32 -left-1" />
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
