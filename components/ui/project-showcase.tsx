
"use client"

import React, { useState, useCallback } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useLanguage } from "../LanguageContext"

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
      { label: "DOSAH", value: "+120%" },
      { label: "CONTENT", value: "10X" }
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { t } = useLanguage();

  const nextProject = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const prevProject = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  const goToProject = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  const activeProject = projects[activeIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const contentVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full bg-black relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-3 block">
              {t('projects.title')}
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
              Projekty, které
              <span className="text-gray-400"> inspirují</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm font-mono mr-4">
              {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <button
              onClick={prevProject}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextProject}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main Showcase Area */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="relative">
          {/* Image Container - Full Width Hero Style */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/5">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="absolute inset-0"
              >
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover grayscale-[0.3]"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="max-w-2xl"
                >
                  {/* Category & Year Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gray-300 text-[10px] font-mono tracking-wider uppercase">
                      {activeProject.category}
                    </span>
                    <span className="text-gray-500 text-xs font-mono">{activeProject.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                    {activeProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                    {activeProject.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex gap-10 mb-8">
                    {activeProject.metrics?.map((metric, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />
                        <span className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] block mb-1">
                          {metric.label}
                        </span>
                        <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button - Purple accent here */}
                  <button
                    onClick={() => onProjectSelect(activeProject)}
                    className="group inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-brand-purple/20 hover:border-brand-purple/50 transition-all duration-300"
                  >
                    <span className="text-sm font-medium text-white group-hover:text-brand-purple transition-colors">
                      {t('projects.view')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={cn(
                  "relative flex-shrink-0 w-32 md:w-40 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-300",
                  index === activeIndex
                    ? "border-brand-purple ring-2 ring-brand-purple/30 scale-105"
                    : "border-white/10 hover:border-white/30 opacity-50 hover:opacity-80 grayscale hover:grayscale-0"
                )}
              >
                <img
                  loading="lazy"
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />

                {/* Active indicator - Purple accent */}
                {index === activeIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-brand-purple"
                  />
                )}

                {/* Project number */}
                <span className={cn(
                  "absolute top-2 left-2 text-[10px] font-mono",
                  index === activeIndex ? "text-white" : "text-white/50"
                )}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar - Purple accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
        <motion.div
          className="h-full bg-brand-purple"
          initial={{ width: "0%" }}
          animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}
