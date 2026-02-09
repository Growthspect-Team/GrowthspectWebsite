import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface PipelineStep {
  number: string;
  title: string;
  description: string;
}

export interface Industry {
  title: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
}

export interface CaseStudy {
  title: string;
  category: string;
  metrics: { label: string; value: string }[];
  description: string;
}

export interface TechItem {
  category: string;
  tools: string[];
}

export interface JobPosition {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  authorRole: string;
  authorImage: string;
  content: string;
}

