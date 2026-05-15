"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { MyContentCard } from "./types";

export type ContentCardProps = {
  card: MyContentCard;
  variant: "carousel" | "list";
  onRemove: (id: string) => void;
  className?: string;
  /** В карусели: одна карточка на всю ширину трека (как в «Мои специалисты»). */
  fillWidth?: boolean;
  /** Список: поверхность без скругления и тени — внутри `SwipeDeleteListRow`. */
  listSwipeRowSurface?: boolean;
};

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "carousel" | "list";
}) {
  if (variant === "carousel") {
    return (
      <span className="inline-flex max-w-full items-center gap-4 rounded-full bg-light-bg-accent-overlay px-8 py-4 text-label-s font-medium text-light-fg-accent">
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex max-w-full items-center gap-4 rounded-full bg-light-bg-pressed px-8 py-4 text-label-s font-medium text-light-fg-secondary">
      {children}
    </span>
  );
}

const carouselPresenceTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 40,
};

export function ContentCard({
  card,
  variant,
  onRemove,
  className,
  fillWidth = false,
  listSwipeRowSurface = false,
}: ContentCardProps) {
  const footerLine = React.useMemo(() => {
    if (variant === "list") return null;
    const suffix = card.carouselFooter ?? "Недавно смотрели";
    if (card.meta) {
      return (
        <>
          <span>{card.meta}</span>
          <span className="size-4 shrink-0 rounded-full bg-light-fg-tertiary/40" aria-hidden />
          <span>{suffix}</span>
        </>
      );
    }
    return <span>{suffix}</span>;
  }, [card.carouselFooter, card.meta, variant]);

  const inner = (
    <>
      <div className="flex w-full items-start justify-between gap-8">
        <div className="flex min-w-0 flex-1 flex-wrap gap-4">
          <Badge variant={variant}>{card.category}</Badge>
          {variant === "list" && card.meta ? <Badge variant={variant}>{card.meta}</Badge> : null}
        </div>
        <button
          type="button"
          aria-label="Удалить из моего контента"
          className="flex size-20 shrink-0 items-center justify-center rounded-full text-light-fg-tertiary transition hover:bg-light-bg-pressed hover:text-light-fg-secondary"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(card.id);
          }}
        >
          <X className="size-16" strokeWidth={2} />
        </button>
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col justify-end gap-4">
        <p
          className={
            variant === "carousel"
              ? "line-clamp-2 text-body-xl font-medium text-light-fg-primary"
              : "text-body-xl text-light-fg-primary"
          }
        >
          {card.title}
        </p>
        {variant === "carousel" ? (
          <div className="flex flex-wrap items-center gap-8 text-body-m font-medium text-light-fg-tertiary">
            {footerLine}
          </div>
        ) : null}
      </div>
    </>
  );

  const listBoxClass = listSwipeRowSurface
    ? "flex w-full flex-col gap-8 overflow-hidden bg-light-bg-primary p-16"
    : "flex w-full flex-col gap-8 overflow-hidden rounded-m bg-light-bg-primary p-16 shadow-elevation";

  const boxClass =
    variant === "carousel"
      ? fillWidth
        ? "flex h-120 w-full min-w-0 flex-col justify-between rounded-m border border-light-border-button-tertiary bg-light-bg-primary p-16 shadow-elevation"
        : "flex h-120 w-[327px] min-w-[327px] shrink-0 flex-col justify-between rounded-m border border-light-border-button-tertiary bg-light-bg-primary p-16 shadow-elevation"
      : listBoxClass;

  if (variant === "list") {
    if (listSwipeRowSurface) {
      return <div className={boxClass}>{inner}</div>;
    }
    return (
      <div className={className}>
        <div className={boxClass}>{inner}</div>
      </div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={carouselPresenceTransition}
      className={className}
    >
      <div className={boxClass}>{inner}</div>
    </motion.div>
  );
}
