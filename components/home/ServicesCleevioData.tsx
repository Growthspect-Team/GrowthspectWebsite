
import React from 'react';
import { serviceIcons } from './service-icons';

export interface ServiceSubSection {
  title: string;
  items?: string[];
  techStack?: string[];
  icons?: React.ReactNode[];
}

export interface ServiceData {
  id: string;
  step: string;
  title: string | React.ReactNode;
  description: string;
  image: string;
  features?: string[];
  subSections?: ServiceSubSection[]; // For Engineering which has subsections
  primaryTechStack?: string[];
  primaryTechIcons?: React.ReactNode[];
  partnerImage?: string; // For Cloud google partner
}

export const servicesCleevioDataEn: ServiceData[] = [
  {
    id: 'ai',
    step: '1/4',
    title: <>Artificial<br />Intelligence</>,
    description: "We leverage advanced AI and autonomous agents to streamline development, reduce expenses, and build smarter systems. Our approach ensures your business stays agile and innovative in a rapidly evolving digital landscape.",
    image: "https://cdn.prod.website-files.com/68d84454a60cd6d3de1ce17b/68e1135d44741e06b2d20476_slu%CC%8Ad.avif",
    features: [
      "Generative AI Consulting",
      "Agents & AI Automation",
      "LLM Solutions",
      "Machine Learning",
      "Legacy System Modernization"
    ],
    primaryTechStack: ["Cursor, Claude Code, OpenAI Codex, ChatGPT, Gemini, Lovable"],
    primaryTechIcons: [
      serviceIcons.ai.cursor,
      serviceIcons.ai.openai,
      serviceIcons.ai.claude, 
      serviceIcons.ai.gemini
    ]
  },
  {
    id: 'design',
    step: '2/4',
    title: 'Design',
    description: "From initial concept validation to stunning UX/UI, our AI-enhanced process reveals your product's true potential and accelerates its journey to market.",
    image: "https://cdn.prod.website-files.com/68d84454a60cd6d3de1ce17b/68e117d84c9b7703e51fea8a_dskl.avif",
    features: [
      "Product Discovery",
      "MVP Design",
      "UX/UI Design",
      "Product Redesign",
      "UX Audits"
    ],
    primaryTechStack: [
      "Miro, Notion",
      "Figma, Sketch",
      "Framer, Webflow",
      "LottieLabs, After Effects, Hana",
      "Cinema4D, Spline, Figma",
      "AI, Framer, Midjourney, Nano Banana AI"
    ],
    primaryTechIcons: [
      serviceIcons.design.figma,
      serviceIcons.design.sketch, 
      serviceIcons.design.framer,
      serviceIcons.design.miro,
      serviceIcons.design.fl
    ]
  },
  {
    id: 'engineering',
    step: '3/4',
    title: 'Engineering',
    description: "Our expert full-stack team crafts high-performance native and hybrid apps, scalable backends, and intuitive frontends. We use AI automation to deliver robust solutions significantly faster without compromising quality.",
    image: "https://cdn.prod.website-files.com/68d84454a60cd6d3de1ce17b/68e119278d22b6af5afe865b_dslu%CC%8Av.avif",
    subSections: [
      {
        title: "Native Mobile Apps",
        items: [
           "iOS: Swift, SwiftUI, UIKit, MVVM-C, Combine, Alamofire",
           "Android: Kotlin, Jetpack Compose, Turn, Hilt, Coroutines, Retrofit"
        ],
        icons: [serviceIcons.engineering.ios, serviceIcons.engineering.android]
      },
      {
        title: "Hybrid Mobile Apps",
        techStack: ["React Native", "Kotlin Multiplatform", "Flutter", "PWA"],
        icons: [serviceIcons.engineering.reactNative, serviceIcons.engineering.flutter, serviceIcons.engineering.pwa]
      },
      {
        title: "Front-end Development",
        techStack: ["React, Next.js, Typescript", "RestAPI, React Query", "Storybook, Jest, Cypress", "Tailwind CSS, Emotion, Framer Motion"],
        icons: [serviceIcons.engineering.react, serviceIcons.engineering.nextjs, serviceIcons.engineering.typescript, serviceIcons.engineering.tailwind] 
      },
      {
         title: "Back-end Development",
         techStack: ["Java, Kotlin, PHP, Node.js", "Spring Boot, Symfony", "PostgreSQL, MySQL, MongoDB", "Redis, ElasticSearch, Kafka, RabbitMQ"],
         icons: [serviceIcons.engineering.java, serviceIcons.engineering.node, serviceIcons.engineering.php, serviceIcons.engineering.spring]
      },
      {
          title: "QA & Test Automation",
          techStack: ["Technical Testing", "Functional Testing", "Exploratory Testing", "Cross-Platform Testing", "Accessibility Testing", "Automated Testing", "Performance Testing"]
      }
    ]
  },
  {
    id: 'cloud',
    step: '4/4',
    title: <>Cloud<br />Technologies</>,
    description: "With extensive experience in cloud consulting, DevOps, and modernization, we provide seamless integration and engineered solutions across major platforms like Google Cloud, Azure, and AWS.",
    image: "https://cdn.prod.website-files.com/68d84454a60cd6d3de1ce17b/68e119106e340a7e2ea72f74_sdnkj.avif",
    features: [
      "Cloud Consulting",
      "Cloud Engineering",
      "DevOps Services",
      "Migration & Modernization",
      "Cloud Integration"
    ],
    primaryTechStack: [
      "GCP, Azure, AWS",
      "Terraform, Helm, Ansible",
      "Kubernetes, Highly",
      "Availability, Disaster Recovery"
    ],
    partnerImage: "https://cdn.prod.website-files.com/68d84454a60cd6d3de1ce17b/68e654fee54a3889862ffc9d_slkd.avif",
    primaryTechIcons: [
      serviceIcons.cloud.azure,
      serviceIcons.cloud.aws
    ]
  }
];

export const servicesCleevioDataCs: ServiceData[] = [
  {
    id: 'ai',
    step: '1/4',
    title: <>Umělá<br />Inteligence</>,
    description: "Využíváme pokročilou AI a autonomní agenty pro zefektivnění vývoje, snížení nákladů a tvorbu chytrých systémů. Náš přístup zajišťuje, že vaše podnikání zůstane agilní a inovativní v rychle se vyvíjejícím digitálním světě.",
    image: "https://cdn.prod.website-files.com/68d84454a60cd6d3de1ce17b/68e1135d44741e06b2d20476_slu%CC%8Ad.avif",
    features: [
      "Konzultace Generativní AI",
      "Agenti a AI Automatizace",
      "LLM řešení",
      "Strojové učení",
      "Modernizace Legacy systémů"
    ],
    primaryTechStack: ["Cursor, Claude Code, OpenAI Codex, ChatGPT, Gemini, Lovable"],
    primaryTechIcons: [
      serviceIcons.ai.cursor,
      serviceIcons.ai.openai,
      serviceIcons.ai.claude, 
      serviceIcons.ai.gemini
    ]
  },
  {
    id: 'design',
    step: '2/4',
    title: 'Design',
    description: "Od prvotní validace konceptu po ohromující UX/UI, náš proces vylepšený o AI odhaluje skutečný potenciál vašeho produktu a urychluje jeho vstup na trh.",
    image: "https://cdn.prod.website-files.com/68d84454a60cd6d3de1ce17b/68e117d84c9b7703e51fea8a_dskl.avif",
    features: [
      "Product Discovery",
      "MVP Design",
      "UX/UI Design",
      "Redesign produktu",
      "UX Audit"
    ],
    primaryTechStack: [
      "Miro, Notion",
      "Figma, Sketch",
      "Framer, Webflow",
      "LottieLabs, After Effects, Hana",
      "Cinema4D, Spline, Figma",
      "AI, Framer, Midjourney, Nano Banana AI"
    ],
    primaryTechIcons: [
      serviceIcons.design.figma,
      serviceIcons.design.sketch, 
      serviceIcons.design.framer,
      serviceIcons.design.miro,
      serviceIcons.design.fl
    ]
  },
  {
    id: 'engineering',
    step: '3/4',
    title: 'Engineering',
    description: "Náš expertní full-stack tým tvoří výkonné nativní i hybridní aplikace, škálovatelné backendy a intuitivní frontendy. Využíváme AI automatizaci pro dodání robustních řešení výrazně rychleji, bez kompromisů v kvalitě.",
    image: "https://cdn.prod.website-files.com/68d84454a60cd6d3de1ce17b/68e119278d22b6af5afe865b_dslu%CC%8Av.avif",
    subSections: [
      {
        title: "Nativní mobilní aplikace",
        items: [
           "iOS: Swift, SwiftUI, UIKit, MVVM-C, Combine, Alamofire",
           "Android: Kotlin, Jetpack Compose, Turn, Hilt, Coroutines, Retrofit"
        ],
        icons: [serviceIcons.engineering.ios, serviceIcons.engineering.android]
      },
      {
        title: "Hybridní mobilní aplikace",
        techStack: ["React Native", "Kotlin Multiplatform", "Flutter", "PWA"],
        icons: [serviceIcons.engineering.reactNative, serviceIcons.engineering.flutter, serviceIcons.engineering.pwa]
      },
      {
        title: "Front-end Vývoj",
        techStack: ["React, Next.js, Typescript", "RestAPI, React Query", "Storybook, Jest, Cypress", "Tailwind CSS, Emotion, Framer Motion"],
        icons: [serviceIcons.engineering.react, serviceIcons.engineering.nextjs, serviceIcons.engineering.typescript, serviceIcons.engineering.tailwind] 
      },
      {
         title: "Back-end Vývoj",
         techStack: ["Java, Kotlin, PHP, Node.js", "Spring Boot, Symfony", "PostgreSQL, MySQL, MongoDB", "Redis, ElasticSearch, Kafka, RabbitMQ"],
         icons: [serviceIcons.engineering.java, serviceIcons.engineering.node, serviceIcons.engineering.php, serviceIcons.engineering.spring]
      },
      {
          title: "QA a Test Automation",
          techStack: ["Technické testování", "Funkční testování", "Exploratorní testování", "Cross-Platform testování", "Testování přístupnosti", "Automatizované testování", "Výkonnostní testování"]
      }
    ]
  },
  {
    id: 'cloud',
    step: '4/4',
    title: <>Cloudové<br />Technologie</>,
    description: "S bohatými zkušenostmi v oblasti cloudového poradenství, DevOps a modernizace poskytujeme bezproblémovou integraci a technická řešení napříč hlavními platformami jako Google Cloud, Azure a AWS.",
    image: "https://cdn.prod.website-files.com/68d84454a60cd6d3de1ce17b/68e119106e340a7e2ea72f74_sdnkj.avif",
    features: [
      "Cloudové poradenství",
      "Cloud Engineering",
      "DevOps Služby",
      "Migrace a modernizace",
      "Cloudové integrace"
    ],
    primaryTechStack: [
      "GCP, Azure, AWS",
      "Terraform, Helm, Ansible",
      "Kubernetes, Highly",
      "Availability, Disaster Recovery"
    ],
    partnerImage: "https://cdn.prod.website-files.com/68d84454a60cd6d3de1ce17b/68e654fee54a3889862ffc9d_slkd.avif",
    primaryTechIcons: [
      serviceIcons.cloud.azure,
      serviceIcons.cloud.aws
    ]
  }
];

export const servicesCleevioData = servicesCleevioDataEn;
