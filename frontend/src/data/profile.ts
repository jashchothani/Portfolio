// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for portfolio content.
// Edit this file to update the site — nothing else needs to change.
// Keep backend/src/data/profile.ts in sync if you change facts the AI
// assistant should know about.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Jash Bharat Chothani",
  shortName: "Jash",
  initials: "JC",
  roles: [
    "Cybersecurity Analyst",
    "Full-Stack AI Engineer",
    "SOAR / XDR Builder",
    "Problem Solver",
    "Technology Creator",
  ],
  tagline:
    "I build intelligent, secure digital systems — from SOAR-XDR threat response platforms to full-stack AI products — at the intersection of software engineering, artificial intelligence, and cybersecurity.",
  location: "Mumbai, India",
  available: true,
  email: "jashthakkar77@gmail.com",
  phone: "+91 90049 76777",
  resumeUrl: "/Jash_Chothani_Resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/jashchothani", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jash-chothani-90422a316", icon: "linkedin" },
    { label: "Twitter", href: "https://twitter.com/jashchothani", icon: "twitter" },
  ],
};

export const about = {
  story: [
    "I got into technology the way most builders do — by taking things apart to see how they worked, then trying to make something better. That habit turned into a full pursuit of software engineering, applied AI, and the systems that keep both of them secure.",
    "I'm currently pursuing a Diploma in Computer Engineering at SVKM's Shri Bhagubhai Mafatlal Polytechnic in Mumbai (after graduating with 86.4% distinction in ICSE from Lakshdham High School). I serve as the Lead Full-Stack Developer for Swastik Chemical India (architecting their production enterprise platform at swastikchemindia.vercel.app), and I spent time as a Cyber Security Analyst Intern with DeepCytes Cyber Labs UK, working across SOC threat analysis, IOC investigation, and MITRE ATT&CK-based defense hardening.",
    "Today I split my attention between building end-to-end products — SOAR platforms, AI-driven forecasting engines, full-stack vehicle compliance ecosystems — and understanding how those products can be broken. That dual lens, creator and adversary, shapes how I design everything I ship.",
  ],
  focus: [
    {
      key: "cybersecurity",
      title: "Cybersecurity",
      description: "SOAR/XDR platform design, SOC threat analysis, MITRE ATT&CK-driven defense, and network intrusion detection built from first principles.",
    },
    {
      key: "ai",
      title: "AI Systems",
      description: "Designing systems around LLMs and applied ML — explainable forecasting, anomaly detection, and retrieval-grounded assistants that hold up in production.",
    },
    {
      key: "web",
      title: "Full-Stack Development",
      description: "Full-stack products built with Next.js, React, FastAPI, and well-structured APIs — fast, accessible, and maintainable.",
    },
    {
      key: "innovation",
      title: "Innovation",
      description: "Prototyping fast under hackathon deadlines, testing ideas against reality, and keeping only the ones that earn their place.",
    },
    {
      key: "problem-solving",
      title: "Problem Solving",
      description: "Breaking ambiguous problems into small, provable steps — then automating the boring parts.",
    },
  ],
};

export type SkillCategory =
  | "Languages"
  | "Cybersecurity"
  | "AI / Machine Learning"
  | "Backend / Cloud"
  | "Frontend / Data";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0–100, used for the constellation node size
  detail: string;
}

export const skills: Skill[] = [
  { name: "Python", category: "Languages", level: 92, detail: "Primary language for AI, security tooling, and backend services." },
  { name: "TypeScript", category: "Languages", level: 85, detail: "Typed application code across full-stack projects." },
  { name: "JavaScript", category: "Languages", level: 87, detail: "The language underneath everything I ship on the web." },
  { name: "Java", category: "Languages", level: 72, detail: "Core coursework and data-structure-heavy problem solving." },
  { name: "SQL", category: "Languages", level: 80, detail: "Relational schema design and query optimization." },

  { name: "SOAR / XDR", category: "Cybersecurity", level: 90, detail: "Architected KAVACH — automated playbooks, telemetry collectors, and correlation scoring." },
  { name: "MITRE ATT&CK", category: "Cybersecurity", level: 85, detail: "Applied to assess attack surfaces and harden defenses at DeepCytes Cyber Labs UK." },
  { name: "SIEM & IOC Triage", category: "Cybersecurity", level: 82, detail: "SOC threat analysis, log correlation, and incident triage across enterprise telemetry." },
  { name: "Scapy / Nmap", category: "Cybersecurity", level: 85, detail: "Packet sniffing, device profiling, and network intrusion detection in NetSentinel." },
  { name: "Windows Firewall API", category: "Cybersecurity", level: 78, detail: "Automated real-time firewall rule injection for active threat isolation." },

  { name: "Scikit-learn / XGBoost", category: "AI / Machine Learning", level: 85, detail: "Isolation Forest anomaly detection and ensemble return forecasting." },
  { name: "SHAP Explainability", category: "AI / Machine Learning", level: 80, detail: "Feature attribution for interpretable financial forecasting in BankSight AI." },
  { name: "dlib / OpenCV", category: "AI / Machine Learning", level: 78, detail: "ResNet-128d face recognition pipeline with SVM classification." },
  { name: "Gemini AI", category: "AI / Machine Learning", level: 82, detail: "Multilingual AI assistants and correlation scoring across KAVACH and DriveVerse." },
  { name: "NLP / VADER", category: "AI / Machine Learning", level: 75, detail: "Real-time market sentiment scoring with a custom lexicon." },

  { name: "FastAPI", category: "Backend / Cloud", level: 88, detail: "REST/WebSocket APIs with JWT role-based access control." },
  { name: "Flask & Django", category: "Backend / Cloud", level: 84, detail: "Full-stack dashboards, auth flows, and ML-serving backends." },
  { name: "Node.js / Express", category: "Backend / Cloud", level: 80, detail: "Lightweight, structured backend services." },
  { name: "AWS (Lambda, API GW)", category: "Backend / Cloud", level: 74, detail: "Serverless functions and managed API infrastructure." },
  { name: "Docker", category: "Backend / Cloud", level: 76, detail: "Containerized services for consistent deployment." },

  { name: "Next.js / React", category: "Frontend / Data", level: 90, detail: "Component architecture, hooks, and performance-minded rendering." },
  { name: "WebSockets / WebRTC", category: "Frontend / Data", level: 82, detail: "Real-time telemetry, alerting pipelines, and LAN screen sharing." },
  { name: "Tailwind CSS", category: "Frontend / Data", level: 86, detail: "Design-system-driven styling, fast iteration, consistent UI." },
  { name: "PostgreSQL / Redis", category: "Frontend / Data", level: 78, detail: "Structured storage and caching for production-grade services." },
  { name: "MySQL / MongoDB / SQLite", category: "Frontend / Data", level: 80, detail: "Relational and document storage across projects." },
];

export interface Project {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  architecture: string;
  featured: boolean;
  github?: string;
  demo?: string;
  accent: "blue" | "violet" | "cyan";
}

export const projects: Project[] = [
  {
    slug: "swastik-chemical-india",
    title: "Swastik Chemical India — Enterprise B2B Chemical Trading & Client Portal",
    summary:
      "A live full-stack digital chemical enterprise platform with real-time product catalogs, client GST billing, and supplier quote generation — active in production.",
    problem:
      "Chemical distribution workflows rely heavily on manual spreadsheets, offline GST calculations, and fragmented inquiry tracking across client tiers.",
    solution:
      "Built an end-to-end B2B platform with automated multi-tier GST tax calculation, PDF invoice dispatch, dynamic chemical catalog, and secure client communication portal deployed on Vercel.",
    features: [
      "Live production deployment at https://swastikchemindia.vercel.app/",
      "Automated GST billing, tax tier breakdown, and PDF invoice generation",
      "Interactive chemical product catalog with technical specs and SDS documentation",
      "Direct client inquiry dispatch with automated WhatsApp and email routing",
      "Enterprise-grade performance with sub-second page loads on Vercel Cloud",
    ],
    stack: ["React", "Node.js", "Vercel", "Tailwind CSS", "WebRTC", "Express"],
    architecture: "React + Tailwind frontend deployed on Vercel Cloud, connecting to Node.js backend services with automated GST calculations and secure document dispatch.",
    featured: true,
    demo: "https://swastikchemindia.vercel.app/",
    github: "https://github.com/jashchothani",
    accent: "blue",
  },
  {
    slug: "kavach",
    title: "KAVACH — SOAR-XDR Threat Response Platform",
    summary:
      "A Security Orchestration, Automation & Response platform with XDR telemetry — 16 collectors, correlation scoring, and automated incident playbooks.",
    problem:
      "Security teams drown in disconnected alerts from endpoints, DNS, registry, and process telemetry, with no automated way to correlate and respond before damage spreads.",
    solution:
      "A unified SOAR-XDR platform that collects telemetry across 16 sources, scores incidents dynamically, and executes automated playbooks — with rollback — for ransomware, brute-force, and credential-theft scenarios.",
    features: [
      "16 telemetry collectors: Sysmon, DNS, registry, process, USB",
      "Dynamic correlation scoring across data sources",
      "5 automated playbooks with rollback capability",
      "30+ REST/WebSocket APIs with JWT role-based access (SOC vs. user tier)",
      "Gemini AI-assisted incident analysis",
    ],
    stack: ["Python", "FastAPI", "Gemini AI", "SQLite", "WebSockets"],
    architecture: "FastAPI backend orchestrating 16 telemetry collectors → correlation engine → automated playbook executor, exposed via 30+ JWT-secured REST/WebSocket APIs.",
    featured: true,
    github: "https://github.com/jashchothani/KAVACH",
    accent: "blue",
  },
  {
    slug: "netsentinel",
    title: "NetSentinel — AI Network Security & Firewall Defense",
    summary:
      "A real-time network defense engine combining packet sniffing, device profiling, and an Isolation Forest model for zero-day intrusion detection.",
    problem:
      "Small and mid-size networks rarely have active defense — anomalous traffic and unauthorized devices go unnoticed until real damage is done.",
    solution:
      "A full-stack network defense engine that sniffs live traffic with Scapy, profiles devices with Nmap, and flags zero-day anomalies with an Isolation Forest model — then automatically isolates threats via the Windows Firewall API.",
    features: [
      "Real-time packet sniffing with Scapy",
      "Nmap-based device profiling",
      "Isolation Forest ML model for anomaly and intrusion detection",
      "Automated Windows Firewall rule injection for instant isolation",
      "Full-stack dashboard with OTP-based 2FA, traffic analytics, and alerting",
    ],
    stack: ["Python", "Flask", "Scikit-learn", "Scapy", "Nmap"],
    architecture: "Scapy/Nmap sensors feed a Flask backend and Isolation Forest model; detected threats trigger automated Windows Firewall isolation and dashboard alerts.",
    featured: true,
    github: "https://github.com/jashchothani/NetSentinel",
    accent: "cyan",
  },
  {
    slug: "banksight-ai",
    title: "BankSight AI — Explainable Financial Forecasting Engine",
    summary:
      "An explainable AI system forecasting 1, 5, and 7-day returns for top banking equities, with SHAP-driven feature attribution and sentiment scoring.",
    problem:
      "Financial forecasting models are often black boxes — traders and analysts can't trust or act on predictions they can't interpret.",
    solution:
      "An XGBoost/LightGBM ensemble with anti-leakage walk-forward validation, made explainable via SHAP feature attribution, real-time sentiment scoring, and historical crash similarity matching.",
    features: [
      "1-day, 5-day, and 7-day return forecasts via XGBoost/LightGBM ensembles",
      "Anti-leakage walk-forward time-series validation",
      "SHAP feature attribution for interpretable predictions",
      "Real-time market sentiment scoring (VADER + custom lexicon)",
      "Historical crash similarity matching via cosine similarity",
    ],
    stack: ["Python", "Flask", "XGBoost", "LightGBM", "SHAP", "NLP"],
    architecture: "Flask API serving XGBoost/LightGBM ensembles with a SHAP explainability layer and a VADER-based sentiment pipeline for market-aware forecasting.",
    featured: true,
    github: "https://github.com/jashchothani/BankSight-AI",
    accent: "violet",
  },
  {
    slug: "driveverse",
    title: "DriveVerse — AI Vehicle Compliance & Fleet Ecosystem",
    summary:
      "A full-stack platform with a multilingual AI assistant, encrypted document vault, OCR challan parser, and geofenced fleet alerting — selected for a national hackathon under IIT Madras, BIMSTEC & the Government of India.",
    problem:
      "Vehicle owners and fleets juggle compliance documents, challans, and speed/zone regulations across fragmented, non-digital workflows.",
    solution:
      "A unified Next.js and FastAPI platform with a Gemini-powered multilingual assistant (Astra AI), AES-256 encrypted document storage, EasyOCR-based challan parsing, and geofenced speed/zone alerting.",
    features: [
      "Multilingual Astra AI assistant powered by Gemini 2.5",
      "AES-256 encrypted document vault",
      "EasyOCR-based automated challan parsing",
      "Geofenced speed and zone alert telemetry",
      "Selected for the National Road Safety Hackathon 2026 (BIMSTEC International Track)",
    ],
    stack: ["Next.js 15", "FastAPI", "PostgreSQL", "Redis", "Gemini AI"],
    architecture: "Next.js 15 frontend → FastAPI backend → PostgreSQL/Redis, with an EasyOCR pipeline and Gemini 2.5-powered multilingual assistant layered on top.",
    featured: true,
    github: "https://github.com/jashchothani",
    accent: "blue",
  },
  {
    slug: "career-mitra",
    title: "CareerMitra — Multilingual AI Career & Scholarship Companion",
    summary:
      "A hackathon-built AI companion for Maharashtra's rural students featuring Mitra Tai (AI mentor in Marathi, Hindi & English), RIASEC career assessment, college discovery, and government scholarship mapping.",
    problem:
      "Rural students often lack access to quality career counseling, unaware of scholarships, nearby colleges, and realistic higher education costs in their native language.",
    solution:
      "A lightweight PWA with offline support, an AI guidance mentor (Mitra Tai) supporting Marathi, Hindi, and English, smart education cost forecasting ('Smart Kharcha'), and a directory of 35+ institutions and 11+ government schemes.",
    features: [
      "Mitra Tai: Multilingual AI career counselor (Marathi, Hindi, English)",
      "RIASEC-based 3-minute career personality assessment",
      "Interactive directory of Maharashtra colleges & 11+ scholarship schemes",
      "Smart Kharcha: realistic higher education budgeting calculator",
      "PWA offline support built for low-connectivity rural environments",
      "Built for a competitive innovation hackathon with live deployment",
    ],
    stack: ["JavaScript", "PWA", "Python", "Multilingual NLP", "Leaflet Maps"],
    architecture: "Lightweight mobile-first PWA frontend with multilingual i18n and offline caching, integrated with an AI guidance pipeline and district-level educational data.",
    featured: true,
    github: "https://github.com/jashchothani",
    demo: "https://aarambh-two.vercel.app/",
    accent: "cyan",
  },
  {
    slug: "ai-face-recognition",
    title: "AI Face Recognition",
    summary: "A dlib ResNet-128d face recognition pipeline with SVM classification, confidence metrics, and data augmentation.",
    problem: "Reliable face recognition needs robust embeddings and a classifier that reports confidence, not just a match.",
    solution: "A dlib ResNet-128d embedding pipeline paired with an SVM classifier, tuned with data augmentation for robustness across lighting and angle variance.",
    features: [
      "ResNet-128d facial embeddings via dlib",
      "SVM classification with confidence scoring",
      "Data augmentation for robustness",
    ],
    stack: ["Python", "dlib", "OpenCV", "SVM"],
    architecture: "Image input → dlib ResNet-128d embedding extraction → SVM classifier with confidence-scored output.",
    featured: false,
    github: "https://github.com/jashchothani",
    accent: "cyan",
  },
  {
    slug: "presenterlink-erp",
    title: "PresenterLink & Enterprise ERP",
    summary: "A LAN WebRTC screen-sharing tool and a live client GST billing suite built for a real business.",
    problem: "Small businesses need lightweight, LAN-only screen sharing and a straightforward GST-compliant billing workflow without expensive enterprise software.",
    solution: "PresenterLink delivers WebRTC-based LAN screen sharing, while the companion ERP module provides a full GST billing suite, deployed live for a client.",
    features: [
      "LAN-based WebRTC screen sharing",
      "Client GST billing and invoicing suite",
      "Deployed and used in production",
    ],
    stack: ["WebRTC", "Node.js", "React", "Cloud Systems"],
    architecture: "WebRTC peer connections for LAN screen sharing; a separate React/Node ERP module handles GST billing, deployed as a live client portal.",
    featured: false,
    github: "https://github.com/jashchothani",
    accent: "violet",
  },
  {
    slug: "ask-jash-ai",
    title: "Ask Jash — AI Portfolio Assistant",
    summary:
      "The AI assistant embedded in this very site — answers questions about my work using a structured knowledge base and NVIDIA NIM inference.",
    problem:
      "Portfolios are static. Visitors have specific questions — about stack choices, project depth, or availability — that a page of text can't adapt to.",
    solution:
      "A backend-mediated chat feature that grounds an LLM in a structured, editable profile of my work, so answers stay accurate and on-brand instead of improvised.",
    features: [
      "Streaming-style chat UI with suggested questions",
      "Backend-only API key handling via NVIDIA NIM",
      "Rate-limited, validated chat endpoint",
      "Editable knowledge base decoupled from the UI",
    ],
    stack: ["React", "TypeScript", "Express", "NVIDIA NIM", "Tailwind CSS"],
    architecture: "React frontend → Express API → NVIDIA NIM inference, with the system prompt built from a structured profile module.",
    featured: false,
    github: "https://github.com/jashchothani",
    accent: "blue",
  },
];

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  org: string;
  description: string;
  type: "experience" | "education" | "achievement" | "event";
  link?: string;
  badge?: string;
  score?: string;
}

export const timeline: TimelineItem[] = [
  {
    id: "edu-lakshdham",
    date: "Completed 2024",
    title: "ICSE Examination — 86.4%",
    org: "Lakshdham High School, Mumbai",
    description:
      "Completed ICSE board examinations with an 86.4% aggregate distinction across Mathematics, Science, and Computer Applications at Lakshdham High School, Mumbai.",
    type: "education",
    score: "86.4% Aggregate",
    badge: "ICSE Board Distinction",
  },
  {
    id: "edu-sbmp",
    date: "2024 — Present",
    title: "Diploma in Computer Engineering",
    org: "SVKM's Shri Bhagubhai Mafatlal Polytechnic, Mumbai",
    description:
      "Pursuing a rigorous Diploma in Computer Engineering with focus on Computer Architecture, Operating Systems, Data Structures, and Cybersecurity.",
    type: "education",
    badge: "Higher Technical Education",
  },
  {
    id: "t6",
    date: "2025",
    title: "Code PRISM @ Spectrum 4.0 — Certificate of Excellence",
    org: "SVKM's Shri Bhagubhai Mafatlal Polytechnic",
    description:
      "Awarded a Certificate of Excellence for participation in Code PRISM, a competitive programming event at the Spectrum 4.0 technical fest.",
    type: "event",
    badge: "Excellence Award",
  },
  {
    id: "t5",
    date: "Sep 2025",
    title: "Ignite IT 7.0 — Hackathon Finalist & Awardee",
    org: "SVKM's Shri Bhagubhai Mafatlal Polytechnic",
    description:
      "Reached the finals of the Ignite IT 7.0 district-level hackathon fest, held 16–17 September 2025, organized by the Information Technology Department.",
    type: "event",
    badge: "Finalist & Awardee",
  },
  {
    id: "t4",
    date: "Nov 2025",
    title: "Hack4Us National Hackathon — Rank 6 of 553",
    org: "Maharaja Surajmal Institute, New Delhi",
    description:
      "Secured Rank 6 nationally out of 553 participants at Hack4Us, competing as Team rishikjariwala54 in the prototype and code submission track.",
    type: "achievement",
    badge: "Top 1% Nationally",
  },
  {
    id: "exp-swastik",
    date: "2025",
    title: "Lead Full-Stack Developer & ERP Solutions Architect",
    org: "Swastik Chemical India (Mumbai, India)",
    description:
      "Architected, developed, and deployed the production digital web application and client ERP platform (https://swastikchemindia.vercel.app/). Implemented automated GST invoice generation, real-time product catalogs, and high-volume client communications.",
    type: "experience",
    link: "https://swastikchemindia.vercel.app/",
    badge: "Live Production Platform",
  },
  {
    id: "t3",
    date: "Jan 2026",
    title: "National Road Safety Hackathon 2026 — BIMSTEC Track Finalist",
    org: "IIT Madras, BIMSTEC & Ministry of External Affairs, Govt. of India",
    description:
      "DriveVerse selected for the BIMSTEC International Track, honored by IIT Madras, BIMSTEC, and the Government of India for innovation in road-safety technology.",
    type: "achievement",
    badge: "National Finalist",
  },
  {
    id: "exp-deepcytes",
    date: "May 2026 — Jun 2026",
    title: "Cyber Security Analyst Intern",
    org: "DeepCytes Cyber Labs UK (Remote, United Kingdom)",
    description:
      "Conducted SOC threat analysis and incident triage across enterprise telemetry; investigated IOCs and applied MITRE ATT&CK matrices to assess attack surfaces and harden defense mechanisms. Delivered threat intelligence and remediation reports for UK enterprise stakeholders. Fellowship Award ID: F0007F.",
    type: "experience",
    badge: "UK Fellowship F0007F",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Certifications & Hackathon Credentials
// Every entry has a real certificate image the visitor can open full-size.
// ─────────────────────────────────────────────────────────────────────────

export type CredentialType = "certification" | "hackathon";

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: CredentialType;
  description: string;
  image: string;
  highlight?: string;
}

export const credentials: Credential[] = [
  {
    id: "ignite-it-7",
    title: "Ignite IT 7.0 — Hackathon",
    issuer: "SVKM's Shri Bhagubhai Mafatlal Polytechnic — IT Department",
    date: "Sep 2025",
    type: "hackathon",
    description:
      "Competed in the district-level Ignite IT 7.0 hackathon held 16–17 September 2025, reaching the finals and receiving an award for the submission.",
    image: "/certificates/ignite-it-7-hackathon.jpg",
    highlight: "Finalist & Awardee",
  },
  {
    id: "road-safety-hackathon",
    title: "National Road Safety Hackathon 2026 — BIMSTEC Track",
    issuer: "IIT Madras · BIMSTEC · Ministry of External Affairs, Govt. of India",
    date: "Jan 2026",
    type: "hackathon",
    description:
      "Participated in the BIMSTEC International Track of the National Road Safety Hackathon with DriveVerse, an AI vehicle compliance platform.",
    image: "/certificates/iit-madras-road-safety-hackathon.jpg",
    highlight: "BIMSTEC Track Finalist",
  },
  {
    id: "hack4us-participation",
    title: "Hack4Us National Hackathon",
    issuer: "Maharaja Surajmal Institute, New Delhi (via Unstop)",
    date: "Nov 2025",
    type: "hackathon",
    description: "Competed nationally at Hack4Us, finishing 6th out of 553 participants.",
    image: "/certificates/hack4us-participation.jpg",
    highlight: "Rank 6 of 553",
  },
  {
    id: "hack4us-prototype",
    title: "Hack4Us — Prototype / Code Submission",
    issuer: "Maharaja Surajmal Institute, New Delhi (via Unstop)",
    date: "Nov 2025",
    type: "hackathon",
    description: "Submitted a working prototype and codebase as Team rishikjariwala54 during Hack4Us.",
    image: "/certificates/hack4us-prototype-submission.jpg",
  },
  {
    id: "code-prism",
    title: "Code PRISM @ Spectrum 4.0",
    issuer: "SVKM's Shri Bhagubhai Mafatlal Polytechnic",
    date: "2025",
    type: "hackathon",
    description: "Certificate of Excellence for competitive programming performance at the Spectrum 4.0 technical fest.",
    image: "/certificates/code-prism-spectrum4.jpg",
    highlight: "Certificate of Excellence",
  },
  {
    id: "deepcytes-fellowship",
    title: "DeepCytes Fellowship Program — Cyber Analyst",
    issuer: "DeepCytes Cyber Labs UK",
    date: "Jun 2026",
    type: "certification",
    description: "Successfully completed the DeepCytes Fellowship, working across digital trust, privacy, resilience, and secure system design.",
    image: "/certificates/deepcytes-fellowship.jpg",
    highlight: "Fellowship ID F0007F",
  },
  {
    id: "jpmorgan-swe",
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co. (via Forage)",
    date: "Jan 2026",
    type: "certification",
    description: "Completed practical tasks in project setup, Kafka integration, and REST API design and controllers.",
    image: "/certificates/jpmorgan-swe-simulation.jpg",
  },
  {
    id: "bcg-genai",
    title: "GenAI Job Simulation",
    issuer: "BCG X (via Forage)",
    date: "Sep 2026",
    type: "certification",
    description: "Completed practical tasks in data extraction, initial analysis, and developing an AI-powered financial chatbot.",
    image: "/certificates/bcg-genai-simulation.jpg",
  },
  {
    id: "jnj-robotics",
    title: "Robotics and Controls Job Simulation",
    issuer: "Johnson & Johnson MedTech (via Forage)",
    date: "Sep 2026",
    type: "certification",
    description: "Completed practical tasks diagnosing and resolving delays in surgical robot arms and optimizing for enhanced responsiveness.",
    image: "/certificates/jnj-robotics-simulation.jpg",
  },
  {
    id: "claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    date: "2026",
    type: "certification",
    description: "Completed Anthropic's foundational course on working with Claude.",
    image: "/certificates/claude-101.jpg",
  },
  {
    id: "claude-code-101",
    title: "Claude Code 101",
    issuer: "Anthropic",
    date: "2026",
    type: "certification",
    description: "Completed Anthropic's course on agentic development workflows with Claude Code.",
    image: "/certificates/claude-code-101.jpg",
  },
];

export const education = [
  {
    school: "SVKM's Shri Bhagubhai Mafatlal Polytechnic",
    location: "Mumbai, India",
    program: "Diploma in Computer Engineering",
    period: "2024 — Present",
  },
  {
    school: "Lakshdham High School",
    location: "Mumbai, India",
    program: "ICSE — Aggregate 86.4%",
    period: "Completed 2024",
  },
];

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Hindi", level: "Fluent" },
  { name: "Gujarati", level: "Native" },
  { name: "Marathi", level: "Working proficiency" },
];
