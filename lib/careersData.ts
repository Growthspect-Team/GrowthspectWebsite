
import { ServiceItem, BlogPost, JobPosition } from '../types';

export const jobPositions: JobPosition[] = [
  {
    id: 'ai-engineer',
    title: 'Senior AI Engineer',
    type: 'Full-Time',
    location: 'Remote / Praha',
    description: 'Hledáme zkušeného inženýra pro vývoj autonomních AI agentů a integraci LLM.',
  },
  {
    id: 'rust-developer',
    title: 'Rust Backend Developer',
    type: 'Full-Time',
    location: 'Remote',
    description: 'Vývoj vysoce výkonných backend systémů a infrastruktury v Rustu.',
  },
  {
    id: 'data-engineer',
    title: 'Data Platform Engineer',
    type: 'Contract',
    location: 'Remote',
    description: 'Návrh a údržba datových pipelines a škálovatelných databází.',
  }
];
