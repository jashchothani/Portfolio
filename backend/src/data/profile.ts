// ─────────────────────────────────────────────────────────────────────────
// Structured knowledge base for "Ask Jash", the portfolio AI assistant.
// This is the single source of truth the system prompt is built from.
// Update this file (not the prompt-building code) to change what the
// assistant knows. Keep frontend/src/data/profile.ts in sync for display.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Jash Bharat Chothani",
  shortName: "Jash",
  location: "Mumbai, India",
  email: "jashthakkar77@gmail.com",
  phone: "+91 90049 76777",
  availableForWork: true,
  bio:
    "Jash is a Computer Engineering diploma student, cybersecurity analyst, and full-stack AI " +
    "engineer. He interned as a Cyber Security Analyst at DeepCytes Cyber Labs UK, doing SOC " +
    "threat analysis, IOC investigation, and MITRE ATT&CK-based defense hardening. He builds " +
    "SOAR/XDR platforms, ML-driven security tooling, and full-stack AI products with a " +
    "security-first mindset.",
  education: [
    {
      school: "SVKM's Shri Bhagubhai Mafatlal Polytechnic, Mumbai",
      program: "Diploma in Computer Engineering",
      period: "2024 — Present",
    },
    {
      school: "Lakshdham High School, Mumbai",
      program: "ICSE — Aggregate 86.4%",
      period: "Completed 2024",
    },
  ],
  focusAreas: [
    "SOAR / XDR platform architecture and automated incident response",
    "Applied AI and ML for security and finance (anomaly detection, explainable forecasting)",
    "Full-stack web development (Next.js, React, FastAPI, TypeScript)",
    "Network security — packet analysis, intrusion detection, firewall automation",
    "Rapid prototyping under hackathon deadlines",
  ],
  skills: {
    Languages: ["Python", "TypeScript", "JavaScript", "Java", "C", "SQL", "HTML5", "CSS3"],
    Cybersecurity: [
      "SOAR", "XDR", "MITRE ATT&CK", "SIEM", "Scapy", "Nmap",
      "Packet Inspection", "Windows Firewall API",
    ],
    "AI / Machine Learning": [
      "Scikit-learn", "XGBoost", "LightGBM", "SHAP", "Isolation Forest",
      "dlib", "OpenCV", "VADER NLP", "Gemini AI",
    ],
    "Backend / Cloud": ["FastAPI", "Flask", "Django", "Node.js", "Express.js", "AWS", "Docker", "REST APIs"],
    "Frontend / Data": [
      "Next.js", "React", "WebSockets", "WebRTC", "Tailwind CSS",
      "PostgreSQL", "Redis", "MySQL", "MongoDB", "SQLite",
    ],
  },
  projects: [
    {
      name: "Swastik Chemical India — Enterprise B2B Chemical Trading & Client Portal",
      summary:
        "A live full-stack digital chemical enterprise platform with real-time product catalogs, client GST billing, and supplier quote generation — active in production at https://swastikchemindia.vercel.app/.",
      stack: ["React", "Node.js", "Vercel", "Tailwind CSS", "WebRTC", "Express"],
      link: "https://swastikchemindia.vercel.app/",
    },
    {
      name: "KAVACH — SOAR-XDR Threat Response Platform",
      summary:
        "Architected a Security Orchestration, Automation & Response platform with XDR telemetry: " +
        "16 collectors (Sysmon, DNS, registry, process, USB), dynamic correlation scoring, 5 " +
        "automated playbooks with rollback, and 30+ JWT-secured REST/WebSocket APIs.",
      stack: ["Python", "FastAPI", "Gemini AI", "SQLite", "WebSockets"],
      link: "https://github.com/jashchothani/KAVACH",
    },
    {
      name: "NetSentinel — AI Network Security & Firewall Defense",
      summary:
        "A real-time network defense engine integrating Scapy packet sniffing, Nmap device " +
        "profiling, and an Isolation Forest model for zero-day anomaly detection, with automated " +
        "Windows Firewall isolation and a full-stack dashboard (OTP 2FA, traffic analytics).",
      stack: ["Python", "Flask", "Scikit-learn", "Scapy", "Nmap"],
      link: "https://github.com/jashchothani/NetSentinel",
    },
    {
      name: "BankSight AI — Explainable Financial Forecasting Engine",
      summary:
        "Predicts 1/5/7-day returns for top banking equities via XGBoost/LightGBM ensembles with " +
        "anti-leakage walk-forward validation, SHAP feature attribution, sentiment scoring, and " +
        "historical crash similarity matching.",
      stack: ["Python", "Flask", "XGBoost", "LightGBM", "SHAP", "NLP"],
      link: "https://github.com/jashchothani/BankSight-AI",
    },
    {
      name: "DriveVerse — AI Vehicle Compliance & Fleet Ecosystem",
      summary:
        "Full-stack platform with a multilingual Astra AI assistant (Gemini 2.5), AES-256 " +
        "encrypted document vault, EasyOCR challan parser, and geofenced alerts. Selected for the " +
        "National Road Safety Hackathon 2026 (BIMSTEC International Track), organized by IIT " +
        "Madras, BIMSTEC, and the Ministry of External Affairs, Government of India.",
      stack: ["Next.js 15", "FastAPI", "PostgreSQL", "Redis", "Gemini AI"],
    },
    {
      name: "CareerMitra — Multilingual AI Career & Scholarship Companion",
      summary:
        "A hackathon-built AI companion for Maharashtra's rural students featuring Mitra Tai (multilingual AI counselor in Marathi, Hindi, English), RIASEC career assessment, college discovery, and government scholarship mapping.",
      stack: ["JavaScript", "PWA", "Python", "Multilingual NLP", "Leaflet Maps"],
      link: "https://aarambh-two.vercel.app/",
    },
    {
      name: "AI Face Recognition",
      summary: "dlib ResNet-128d embedding pipeline with SVM classification, confidence metrics, and data augmentation.",
      stack: ["Python", "dlib", "OpenCV", "SVM"],
    },
    {
      name: "PresenterLink & Enterprise ERP",
      summary: "LAN WebRTC screen sharing tool plus a live client GST billing suite.",
      stack: ["WebRTC", "Node.js", "React"],
    },
    {
      name: "Ask Jash — AI Portfolio Assistant",
      summary:
        "The AI chat assistant embedded in this portfolio. Answers questions about Jash's " +
        "work using this structured knowledge base, via a backend that calls NVIDIA NIM.",
      stack: ["React", "TypeScript", "Express", "NVIDIA NIM"],
    },
  ],
  experience: [
    {
      title: "Lead Full-Stack Developer & ERP Solutions Architect",
      org: "Swastik Chemical India (Mumbai, India)",
      period: "2025",
      description:
        "Architected, developed, and deployed the production enterprise digital platform for Swastik Chemical India (live at https://swastikchemindia.vercel.app/). Built real-time chemical trading catalogs, client GST billing engines, automated supplier quote generation, and high-security customer order portals.",
    },
    {
      title: "Cyber Security Analyst Intern",
      org: "DeepCytes Cyber Labs UK (Remote, United Kingdom)",
      period: "May 2026 — Jun 2026",
      description:
        "Conducted SOC threat analysis and incident triage across enterprise telemetry; " +
        "investigated IOCs and applied MITRE ATT&CK matrices to assess attack surfaces and " +
        "harden defenses. Researched emerging threat vectors and SIEM correlation workflows, " +
        "delivering threat intelligence and remediation reports for UK enterprise stakeholders. " +
        "Fellowship Award ID: F0007F.",
    },
  ],
  achievements: [
    "National Road Safety Hackathon 2026 (Jan 2026) — BIMSTEC International Track finalist with " +
      "DriveVerse, honored by IIT Madras, BIMSTEC & the Ministry of External Affairs, Govt. of India.",
    "Hack4Us National Hackathon (Nov 2025) — Ranked 6th of 553 participants at Maharaja Surajmal " +
      "Institute, New Delhi.",
    "Ignite IT 7.0 (Sep 2025) — District-level hackathon finalist and awardee at SVKM's Shri " +
      "Bhagubhai Mafatlal Polytechnic.",
    "Code PRISM @ Spectrum 4.0 (2025) — Certificate of Excellence for competitive programming.",
  ],
  certifications: [
    "JPMorgan Chase & Co. — Software Engineering Job Simulation (Forage, Jan 2026)",
    "BCG X — GenAI Job Simulation (Forage, Sep 2026)",
    "Johnson & Johnson MedTech — Robotics and Controls Job Simulation (Forage, Sep 2026)",
    "Anthropic — Claude 101 & Claude Code 101",
    "DeepCytes Fellowship Program — Cyber Analyst (Fellowship ID F0007F)",
  ],
  languages: [
    "English (Professional)",
    "Hindi (Fluent)",
    "Gujarati (Native)",
    "Marathi (Working proficiency)",
  ],
  interests: [
    "SOAR/XDR automation and making incident response faster than attackers",
    "Explainable AI for high-stakes decisions (finance, security)",
    "Application security and secure-by-default design",
    "Building small, focused tools that solve one problem well",
  ],
  contact: {
    email: "jashthakkar77@gmail.com",
    phone: "+91 90049 76777",
    github: "https://github.com/jashchothani",
    linkedin: "https://www.linkedin.com/in/jash-chothani-90422a316",
  },
};

export type Profile = typeof profile;
