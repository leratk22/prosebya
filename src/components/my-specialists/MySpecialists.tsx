"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Specialist {
  id: string;
  name: string;
  profession: string;
  imageUrl?: string;
  appointmentInfo: string;
}

export interface MySpecialistsProps {
  specialists: Specialist[];
  onRemove?: (id: string) => void;
  onCardClick?: (id: string) => void;
}

export const MySpecialists: React.FC<MySpecialistsProps> = ({
  specialists,
  onRemove,
  onCardClick,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [maxScroll, setMaxScroll] = React.useState(0);

  React.useEffect(() => {
    if (scrollRef.current && specialists.length > 2) {
      const updateMaxScroll = () => {
        if (scrollRef.current) {
          const max = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
          setMaxScroll(max);
        }
      };
      updateMaxScroll();
      window.addEventListener("resize", updateMaxScroll);
      return () => window.removeEventListener("resize", updateMaxScroll);
    }
  }, [specialists.length]);

  if (specialists.length === 0) {
    return null;
  }

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 327;
    const scrollAmount = cardWidth + 8;
    const currentScroll = scrollRef.current.scrollLeft;
    const newScroll =
      direction === "left"
        ? Math.max(0, currentScroll - scrollAmount)
        : Math.min(maxScroll, currentScroll + scrollAmount);
    scrollRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
  };

  const handleScrollUpdate = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const showArrows = specialists.length > 2;
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollPosition < maxScroll - 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="bg-light-bg-secondary rounded-[24px] p-16 overflow-hidden"
    >
      {/* Заголовок с кнопками навигации */}
      <motion.div layout="position" className="flex items-center gap-8 mb-12">
        <h2 className="flex-1 text-title-xl font-semibold text-light-fg-primary leading-8 tracking-[-0.01em]">
          Мои специалисты
        </h2>
        {showArrows && (
          <div className="flex items-center gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: canScrollLeft ? 1 : 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="m"
                fullWidth={false}
                leftIconName="chevron-left"
                iconSize={20}
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                className="w-36 h-36 p-0"
                aria-label="Прокрутить влево"
              >
                {""}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: canScrollRight ? 1 : 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="m"
                fullWidth={false}
                rightIconName="chevron-right"
                iconSize={20}
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                className="w-36 h-36 p-0"
                aria-label="Прокрутить вправо"
              >
                {""}
              </Button>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Контейнер с карточками */}
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key="grid-container"
            ref={scrollRef}
            onScroll={handleScrollUpdate}
            layout
            className={`
              ${
                specialists.length <= 2
                  ? "grid gap-8"
                  : "flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              }
              ${specialists.length === 1 ? "grid-cols-1" : ""}
              ${specialists.length === 2 ? "grid-cols-2" : ""}
            `}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {specialists.map((specialist, index) => (
              <SpecialistCard
                key={specialist.id}
                specialist={specialist}
                index={index}
                totalCount={specialists.length}
                onRemove={onRemove}
                onClick={onCardClick}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface SpecialistCardProps {
  specialist: Specialist;
  index: number;
  totalCount: number;
  onRemove?: (id: string) => void;
  onClick?: (id: string) => void;
}

const SpecialistCard: React.FC<SpecialistCardProps> = ({
  specialist,
  index,
  totalCount,
  onRemove,
  onClick,
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.(specialist.id);
  };

  const handleClick = () => {
    onClick?.(specialist.id);
  };

  const cardWidthClass =
    totalCount === 1
      ? "w-full"
      : totalCount === 2
      ? "w-full"
      : "w-[327px] min-w-[327px] shrink-0 snap-start";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      onClick={handleClick}
      className={`
        ${cardWidthClass}
        bg-light-bg-primary rounded-m border relative
        ${onClick ? "cursor-pointer" : ""}
        overflow-hidden flex flex-col items-start justify-end py-0 px-16 gap-0
      `}
      style={{
        boxShadow: "0px 12px 24px -4px rgba(34, 38, 59, 0.05)",
        borderColor: "rgba(52, 64, 121, 0.2)",
      }}
    >
      {/* Верхняя часть карточки */}
      <div className="self-stretch h-fit flex items-start justify-center py-16 px-0 gap-16">
        <div className="w-80 h-80 rounded-full bg-gray-muted shrink-0 overflow-hidden">
          {specialist.imageUrl ? (
            <img
              src={specialist.imageUrl}
              alt={specialist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-light-fg-muted text-16 font-semibold">
              {specialist.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1 flex items-start gap-1 shrink-0 min-w-0">
          <div className="flex-1 flex flex-col items-start gap-1 min-w-0">
            <h3
              className="self-stretch text-title-l font-semibold text-light-fg-primary leading-6 line-clamp-2 [display:-webkit-inline-box] [-webkit-box-orient:vertical]"
              style={{ letterSpacing: "-0.2px" }}
            >
              {specialist.name}
            </h3>
            <p className="self-stretch text-body-l font-regular text-light-fg-tertiary leading-5">
              {specialist.profession}
            </p>
          </div>
          {onRemove && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              className="w-24 h-24 rounded-full bg-gray-muted flex items-center justify-center shrink-0"
              aria-label={`Удалить ${specialist.name}`}
            >
              <X className="w-16 h-16 text-light-fg-primary" />
            </motion.button>
          )}
        </div>
      </div>

      <div className="self-stretch h-px" style={{ backgroundColor: "rgba(34, 38, 59, 0.1)" }} />

      <div className="self-stretch flex items-center py-16 px-0 gap-3">
        <p className="flex-1 text-body-l font-regular text-light-fg-tertiary leading-5">
          {specialist.appointmentInfo}
        </p>
        <ChevronRight className="w-5 h-5 shrink-0" strokeWidth={1.5} style={{ opacity: 0.4, color: "rgba(34, 38, 59, 0.6)" }} />
      </div>
    </motion.div>
  );
};
