"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ContentCard } from "./ContentCard";
import { SwipeDeleteListRow } from "./SwipeDeleteListRow";
import type { MyContentCard } from "./types";

export type MyContentListScreenProps = {
  cards: MyContentCard[];
  onBack: () => void;
  onRemove: (id: string) => void;
};

export function MyContentListScreen({ cards, onBack, onRemove }: MyContentListScreenProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-light-bg-secondary">
      <header className="shrink-0">
        <div className="flex h-44 items-center justify-between px-24 pt-8">
          <span className="flex-1 text-center text-[15px] font-semibold leading-20 text-system-black">9:41</span>
          <span className="flex-1" aria-hidden />
        </div>
        <div className="relative flex h-56 items-center justify-center px-16">
          <button
            type="button"
            aria-label="Назад"
            className="absolute left-16 top-1/2 flex size-24 -translate-y-1/2 items-center justify-center rounded-full text-light-fg-primary hover:bg-light-bg-pressed"
            onClick={onBack}
          >
            <ChevronLeft className="size-24" strokeWidth={2} />
          </button>
          <h1 className="text-center text-title-l font-semibold text-light-fg-primary">Мой контент</h1>
        </div>
      </header>

      <p className="mb-12 shrink-0 px-32 text-center text-body-xl text-light-fg-primary">
        Контент, который вам понравился
        <br />
        или вы недавно просматривали
      </p>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-16 pb-24 pt-0">
        <div className="flex w-full min-w-0 flex-col gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {cards.map((card) => (
              <motion.div
                key={card.id}
                layout
                className="w-full min-w-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              >
                <SwipeDeleteListRow onDelete={() => onRemove(card.id)}>
                  <ContentCard
                    card={card}
                    variant="list"
                    listSwipeRowSurface
                    onRemove={onRemove}
                  />
                </SwipeDeleteListRow>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex shrink-0 justify-center bg-light-bg-secondary pb-8 pt-4">
        <div className="h-5 w-[134px] rounded-full bg-system-black" aria-hidden />
      </div>
    </div>
  );
}
