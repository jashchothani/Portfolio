import { useState, useEffect } from "react";
import { useLenis } from "./hooks/useLenis";
import { Navbar } from "./components/Navbar";
import { AIChat } from "./components/AIChat";
import { TechStackModal } from "./components/TechStackModal";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Experience } from "./sections/Experience";
import { Achievements } from "./sections/Achievements";
import { Certifications } from "./sections/Certifications";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { GlobalParticles } from "./three/GlobalParticles";
import { API_URL } from "./lib/utils";

export default function App() {
  useLenis();
  const [techStackOpen, setTechStackOpen] = useState(false);

  // Pre-warm backend container in background so contact form & AI chat are instant
  useEffect(() => {
    fetch(`${API_URL}/api/health`, { method: "GET" }).catch(() => {
      // Non-blocking silent wake-up
    });
  }, []);

  useEffect(() => {
    function checkHash() {
      if (window.location.hash === "#tech-stack") {
        setTechStackOpen(true);
      }
    }
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  function handleOpenTechStack() {
    setTechStackOpen(true);
    window.location.hash = "tech-stack";
  }

  function handleCloseTechStack() {
    setTechStackOpen(false);
    if (window.location.hash === "#tech-stack") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FAFAFC]">
      {/* Global continuous living aurora gradient that spans the entire website */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="aurora-flow-bg" />
        <div className="gradient-orb-1 absolute -top-24 left-[10%] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.13)_0%,rgba(125,211,252,0.04)_45%,transparent_70%)] blur-[75px]" />
        <div className="gradient-orb-2 absolute top-[26%] right-[4%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.11)_0%,rgba(196,181,253,0.03)_45%,transparent_70%)] blur-[80px]" />
        <div className="gradient-orb-3 absolute top-[56%] left-[6%] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.10)_0%,rgba(153,246,228,0.03)_45%,transparent_70%)] blur-[75px]" />
        <div className="gradient-orb-4 absolute bottom-[6%] right-[10%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(251,113,133,0.08)_0%,rgba(254,205,211,0.02)_45%,transparent_70%)] blur-[70px]" />
        <div className="absolute inset-0 bg-grid-faint opacity-20" />
      </div>

      {/* Global 3D Interactive Particle Universe spanning the entire portfolio */}
      <GlobalParticles />

      <Navbar onOpenTechStack={handleOpenTechStack} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ErrorBoundary>
        <AIChat />
      </ErrorBoundary>
      <TechStackModal
        isOpen={techStackOpen}
        onClose={handleCloseTechStack}
        onOpenChat={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
      />
    </div>
  );
}
