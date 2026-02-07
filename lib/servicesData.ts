import { Bot, Workflow, Code2, Server, Database } from 'lucide-react';
import { ServiceItem } from '../types';

export const services: ServiceItem[] = [
  {
    id: 'ai-agents',
    title: 'Autonomní AI Agenti',
    description: 'Specializovaní agenti pro analýzu, zákaznickou péči a interní procesy. 24/7 operace s lidskou přesností.',
    icon: Bot
  },
  {
    id: 'automation',
    title: 'Enterprise Automatizace',
    description: 'End-to-end orchestrace workflow. Od scrapingu dat po komplexní integrace a reporting.',
    icon: Workflow
  },
  {
    id: 'software',
    title: 'Custom Software',
    description: 'Webové aplikace a interní nástroje. Výkonné, škálovatelné a bezpečné řešení na míru.',
    icon: Code2
  },
  {
    id: 'rust',
    title: 'Infrastruktura',
    description: 'Backend systémy s maximálním výkonem a paměťovou bezpečností. Mission-critical standard.',
    icon: Server
  },
  {
    id: 'data',
    title: 'Datové Platformy',
    description: 'Pokročilé datové pipelines, unifikace zdrojů a API architektury pro real-time přístup.',
    icon: Database
  }
];
