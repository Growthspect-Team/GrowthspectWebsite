import { Bot, Workflow, Code2, Server, Database } from 'lucide-react';
import { ServiceItem } from '../types';

export const services: ServiceItem[] = [
  {
    id: 'ai-agents',
    title: 'Autonomní AI Systémy',
    description: 'Vytváříme pokročilé AI agenty, kteří automatizují komplexní kognitivní úlohy. Od zákaznické podpory po analýzu dat – naše řešení pracují 24/7 s precizností a rychlostí, kterou lidský tým nemůže dosáhnout.',
    icon: Bot,
    features: [
        "Vlastní LLM modely a integrace",
        "Inteligentní RAG systémy",
        "Autonomní rozhodovací procesy",
        "Multimodální interakce"
    ]
  },
  {
    id: 'automation',
    title: 'Procesní Automatizace',
    description: 'Eliminujeme neefektivitu a manuální práci. Propojujeme vaše stávající nástroje do jednoho funkčního ekosystému, který šetří stovky hodin měsíčně a minimalizuje chybovost.',
    icon: Workflow,
    features: [
        "End-to-end workflow orchestrace",
        "Inteligentní zpracování dokumentů",
        "Automatizovaný sběr dat",
        "Systémové integrace na míru"
    ]
  },
  {
    id: 'software',
    title: 'Vývoj Softwaru na Míru',
    description: 'Stavíme robustní webové a mobilní aplikace připravené na globální škálování. Důraz klademe na bezpečnost, rychlost a bezchybnou uživatelskou zkušenost, která podporuje váš brand.',
    icon: Code2,
    features: [
        "Moderní React & Next.js stack",
        "Cloud-native architektura",
        "PWA a mobilní řešení",
        "Enterprise-grade zabezpečení"
    ]
  },
  {
    id: 'rust',
    title: 'Výkonná Infrastruktura',
    description: 'Navrhujeme softwarovou architekturu, která vás nebude brzdit. Využíváme nízkoúrovňové optimalizace a moderní cloudové technologie pro maximální výkon a stabilitu vašich systémů.',
    icon: Server,
    features: [
        "High-performance backendy (Rust/Go)",
        "Mikroslužby a kontejnerizace",
        "Optimalizace pro nízkou latenci",
        "Real-time zpracování dat"
    ]
  },
  {
    id: 'data',
    title: 'Datové Platformy',
    description: 'Pokročilé datové pipelines, unifikace zdrojů a API architektury pro real-time přístup.',
    icon: Database,
    features: [
        "Robustní ETL Pipelines",
        "Data Warehousing & Lakes",
        "Real-time analytika a dashboardy",
        "Datová governance a kvalita"
    ]
  }
];
