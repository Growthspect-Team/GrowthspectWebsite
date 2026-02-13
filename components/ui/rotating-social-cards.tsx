import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link as LinkIcon, Zap, Brain } from 'lucide-react';
import SocialPostCard from './social-post-card';

const cards = [
  {
    author: {
      name: "Jakub Novák",
      username: "jakub_novak",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100",
      timeAgo: "2h",
    },
    content: {
      text: "Právě jsme spustili novou datovou platformu pro klienta z fintech sektoru. Výsledky předčily všechna očekávání 🚀",
      link: {
        title: "Case Study: Fintech Data Platform",
        description: "Jak jsme zrychlili rozhodování o 300 %",
        icon: <Zap className="w-5 h-5 text-yellow-500" />,
      },
    },
    engagement: {
      likes: 234,
      comments: 45,
      shares: 67,
      isLiked: true,
      isBookmarked: false,
    },
  },
  {
    author: {
      name: "Petra Svobodová",
      username: "petra_data",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=100&h=100",
      timeAgo: "5h",
    },
    content: {
      text: "AI v enterprise prostředí není budoucnost — je to přítomnost. Nový článek o tom, jak správně začít s ML pipelines 🧠",
      link: {
        title: "ML Pipelines Guide",
        description: "Od prototypu k produkci za 4 týdny",
        icon: <Brain className="w-5 h-5 text-purple-500" />,
      },
    },
    engagement: {
      likes: 189,
      comments: 28,
      shares: 41,
      isLiked: false,
      isBookmarked: true,
    },
  },
  {
    author: {
      name: "Martin Dvořák",
      username: "martin_dev",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=100&h=100",
      timeAgo: "1d",
    },
    content: {
      text: "Rust v enterprise? Absolutně. Po 6 měsících migrace z Pythonu vidíme 10x nižší latenci a nulové runtime chyby ⚡",
      link: {
        title: "Rust vs Python: Enterprise srovnání",
        description: "Reálná čísla z produkčního nasazení",
        icon: <LinkIcon className="w-5 h-5 text-orange-500" />,
      },
    },
    engagement: {
      likes: 312,
      comments: 56,
      shares: 89,
      isLiked: false,
      isBookmarked: false,
    },
  },
];

export default function RotatingSocialCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md h-[320px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <SocialPostCard {...cards[activeIndex]} />
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-6 bg-gradient-to-r from-sky-400 to-purple-500'
                : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
