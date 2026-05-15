"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export type MoreCardProps = {
  onOpen: () => void;
  className?: string;
};

const moreCardMotionTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 40,
};

/** Карточка «Смотреть еще» в карусели — те же габариты, что и у контентной карточки в ленте. */
export function MoreCard({ onOpen, className }: MoreCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={moreCardMotionTransition}
      className={`shrink-0 snap-start ${className ?? ""}`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex h-120 w-[327px] min-w-[327px] flex-col items-center justify-center gap-16 rounded-m border border-light-border-primary bg-core-inverted-alpha-60 p-16 text-center shadow-elevation backdrop-blur-sm transition hover:bg-core-inverted-alpha-80"
      >
        <span className="text-body-xl font-medium text-light-fg-primary">Смотреть еще</span>
        <span className="flex size-40 items-center justify-center rounded-full bg-core-inverted shadow-elevation ring-1 ring-light-border-primary">
          <ChevronRight className="size-20 text-light-fg-accent" aria-hidden />
        </span>
      </button>
    </motion.div>
  );
}
