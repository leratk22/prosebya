"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { ResultsPage } from "@/components/chat/ResultsPage";
import { Psychologist } from "@/data/psychologists";
import { Spinner } from "@/components/ui/spinner";

type View = "chat" | "loading" | "results";

export default function PrototypePage() {
  const [view, setView] = React.useState<View>("chat");
  const [results, setResults] = React.useState<Psychologist[]>([]);

  const handleShowResults = (psychologists: Psychologist[]) => {
    setResults(psychologists);
    // Показываем лоадер на 2 секунды
    setView("loading");
    setTimeout(() => {
      setView("results");
    }, 2000);
  };

  const handleBackToChat = () => {
    setView("chat");
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-[#EAEFF8] flex items-center justify-center">
      <div className="w-full max-w-[440px] h-screen relative">
        <AnimatePresence mode="wait">
          {view === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ChatInterface onShowResults={handleShowResults} />
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
              <ResultsPage psychologists={results} onBack={handleBackToChat} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
