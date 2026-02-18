"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrototypeV3Interface from "@/components/chat/PrototypeV3Interface";
import type { PsychologistWithDisplayTags } from "@/components/chat/PrototypeV3Interface";
import ResultsPage from "@/components/chat/ResultsPage";
import Spinner from "@/components/ui/spinner";

type View = "interface" | "loading" | "results";

export default function PrototypeV3Page() {
  const [view, setView] = React.useState<View>("interface");
  const [results, setResults] = React.useState<PsychologistWithDisplayTags[]>([]);

  const handleShowResults = (psychologists: PsychologistWithDisplayTags[]) => {
    setResults(psychologists);
    setView("loading");
    setTimeout(() => {
      setView("results");
    }, 2000);
  };

  const handleBackToInterface = () => {
    setView("interface");
    setResults([]);
  };

  return (
    <div className="min-h-[100dvh] h-[100dvh] bg-[#EAEFF8] flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[440px] h-full max-h-[100dvh] relative flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {view === "interface" && (
            <motion.div
              key="interface"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col min-h-0"
            >
              <PrototypeV3Interface onShowResults={handleShowResults} />
            </motion.div>
          )}

          {view === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-[#EAEFF8] z-50"
            >
              <div className="flex flex-col items-center gap-16">
                <Spinner size={24} />
                <p className="text-16 text-core-alpha-80">Подбираем специалистов...</p>
              </div>
            </motion.div>
          )}

          {view === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ResultsPage psychologists={results} onBack={handleBackToInterface} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
