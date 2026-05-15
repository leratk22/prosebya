"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ContentCard } from "./ContentCard";
import { MoreCard } from "./MoreCard";
import type { MyContentCard } from "./types";

export type MyContentSectionProps = {
  cards: MyContentCard[];
  onRemove: (id: string) => void;
  /** Открыть разводящий экран (показывается только при cards.length > 4) */
  onOpenMore: () => void;
};

export function MyContentSection({ cards, onRemove, onOpenMore }: MyContentSectionProps) {
  if (cards.length === 0) return null;

  const showMore = cards.length > 4;
  const carouselCards = showMore ? cards.slice(0, 4) : cards;
  const isSingle = carouselCards.length === 1;

  const trackClassName = isSingle
    ? "grid grid-cols-1 gap-12 pb-32 pt-0"
    : "flex flex-nowrap items-start gap-12 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory scroll-pl-16 pb-32 pt-0 [&::-webkit-scrollbar]:hidden";

  return (
    <div className="w-full px-16 pt-24 pb-0">
      <h2 className="mb-12 text-title-l font-semibold text-light-fg-primary">Мой контент</h2>
      <div className="relative -mx-16 px-16">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key="my-content-carousel-track"
            layout
            className={trackClassName}
            data-testid="my-content-carousel"
          >
            {carouselCards.map((card) => (
              <ContentCard
                key={card.id}
                card={card}
                variant="carousel"
                fillWidth={isSingle}
                onRemove={onRemove}
                className={isSingle ? undefined : "snap-start"}
              />
            ))}
            {showMore ? (
              <MoreCard key="my-content-see-more" onOpen={onOpenMore} className="snap-start" />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
