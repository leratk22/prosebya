"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ContentRemovedToast,
  INITIAL_MY_CONTENT_CARDS,
  MyContentListScreen,
  TodayTabScreen,
} from "@/components/today-my-content-prototype";

const TOAST_VISIBLE_MS = 1750;

export default function TodayMyContentPrototypePage() {
  const [cards, setCards] = React.useState(INITIAL_MY_CONTENT_CARDS);
  const [view, setView] = React.useState<"home" | "list">("home");
  const [toastOpen, setToastOpen] = React.useState(false);
  const toastHideRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const removeCard = React.useCallback((id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    if (toastHideRef.current) {
      clearTimeout(toastHideRef.current);
    }
    setToastOpen(true);
    toastHideRef.current = setTimeout(() => {
      setToastOpen(false);
      toastHideRef.current = null;
    }, TOAST_VISIBLE_MS);
  }, []);

  React.useEffect(() => {
    return () => {
      if (toastHideRef.current) {
        clearTimeout(toastHideRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (cards.length === 0 && view === "list") {
      setView("home");
    }
  }, [cards.length, view]);

  const openList = React.useCallback(() => {
    if (cards.length > 4) {
      setView("list");
    }
  }, [cards.length]);

  return (
    <div
      className={`flex h-[100dvh] min-h-[100dvh] w-full min-w-0 flex-col overflow-hidden ${
        view === "list" ? "bg-light-bg-secondary" : "bg-light-bg-primary"
      }`}
    >
      <div className="relative flex min-h-0 flex-1 flex-col">
        <ContentRemovedToast open={toastOpen} />
        <AnimatePresence mode="wait" initial={false}>
          {view === "home" ? (
            <motion.div
              key="home"
              className="flex min-h-0 flex-1 flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <TodayTabScreen cards={cards} onRemove={removeCard} onOpenMyContentList={openList} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="flex min-h-0 flex-1 flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <MyContentListScreen
                cards={cards}
                onBack={() => setView("home")}
                onRemove={removeCard}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
