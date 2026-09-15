"use client";

import { useState } from "react";
import ForgeCTA from "@/components/ForgeCTA";
import ForgeFooter from "@/components/ForgeFooter";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProblemStatementsFeature from "@/components/ProblemStatementsFeature";
import ProcessSection from "@/components/ProcessSection";
import FaqFeature from "@/components/FaqFeature";

import SharedOverlay from "@/components/SharedOverlay";
import ProblemStatementsList from "@/components/ProblemStatementsList";
import ProblemStatementDetail from "@/components/ProblemStatementDetail";
import ProcessContent from "@/components/ProcessContent";
import FaqContent from "@/components/FaqContent";

import { problemStatements, type ProblemStatement } from "@/data/problemStatements";

type ActiveView = null | "problem-list" | "problem-detail" | "process" | "faq";

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>(null);
  const [selectedProblem, setSelectedProblem] = useState<ProblemStatement | null>(null);

  const getOverlayTitle = () => {
    switch (activeView) {
      case "problem-list":
      case "problem-detail":
        return "PROBLEM STATEMENTS";
      case "process":
        return "ROAD TO IDEAFORGE";
      case "faq":
        return "FAQS";
      default:
        return "";
    }
  };

  return (
    <div className="forge-page" id="top">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemStatementsFeature 
          onOpen={() => setActiveView("problem-list")}
        />
        <ProcessSection 
          onOpen={() => setActiveView("process")}
        />
        <FaqFeature 
          onOpen={() => setActiveView("faq")}
        />
        <ForgeCTA />
      </main>
      <ForgeFooter />

      <SharedOverlay 
        isOpen={activeView !== null} 
        onClose={() => {
          setActiveView(null);
          setTimeout(() => setSelectedProblem(null), 300);
        }}
        title={getOverlayTitle()}
      >
        {activeView === "problem-list" && (
          <ProblemStatementsList 
            problemStatements={problemStatements}
            onSelect={(ps) => {
              setSelectedProblem(ps);
              setActiveView("problem-detail");
            }}
          />
        )}
        {activeView === "problem-detail" && selectedProblem && (
          <ProblemStatementDetail 
            problemStatement={selectedProblem}
            onBack={() => setActiveView("problem-list")}
          />
        )}
        {activeView === "process" && <ProcessContent />}
        {activeView === "faq" && <FaqContent onClose={() => setActiveView(null)} />}
      </SharedOverlay>
    </div>
  );
}
