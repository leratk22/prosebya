"use client";

import * as React from "react";

const CloseIcon = () => (
  <svg
    className="w-18 h-18 block text-core-alpha-40"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export interface CsiBannerProps {
  /** Выбранная оценка (1–5), null если не выбрана */
  selectedRating?: number | null;
  /** Колбэк при выборе оценки */
  onRatingSelect?: (rating: number) => void;
  /** Колбэк при клике на закрытие */
  onClose?: () => void;
  /** Дополнительные классы контейнера */
  className?: string;
  /** Позиционирование: inline — в потоке, fixed — фиксированно в углу */
  variant?: "inline" | "fixed";
}

// Только дизайн-токены: spacing (4,8,12), radius (l,full), colors (light-*), fontSize (title-m, body-m, label-s)
const CONTAINER_CLASS =
  "w-216 bg-light-bg-primary rounded-tl-m rounded-tr-m rounded-br-m rounded-bl-m shadow-elevation overflow-hidden flex flex-col pb-8 font-euclid";

const RATING_BUTTON_CLASS =
  "flex-1 min-w-0 flex items-center justify-center py-8 border-0 rounded-full bg-light-bg-pressed text-label-s font-semibold text-light-fg-muted cursor-pointer hover:bg-light-bg-accent-overlay hover:text-light-fg-tertiary font-euclid";

export const CsiBanner = React.forwardRef<HTMLDivElement, CsiBannerProps>(
  (
    {
      selectedRating = null,
      onRatingSelect,
      onClose,
      className = "",
      variant = "fixed",
    },
    ref
  ) => {
    const positionClasses =
      variant === "fixed"
        ? "fixed bottom-24 right-24 z-40 pointer-events-auto"
        : "";

    return (
      <div
        ref={ref}
        className={`${CONTAINER_CLASS} ${positionClasses} ${className}`.trim()}
      >
        <header className="relative flex items-center gap-4 pt-12 pb-8 pl-12 pr-0 flex-shrink-0 rounded-tl-m rounded-tr-m">
          <h2 className="flex-1 min-w-0 text-title-m font-semibold text-light-fg-primary">
            Оцените нас
          </h2>
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="absolute top-4 right-4 w-36 h-36 p-6 border-0 bg-transparent cursor-pointer grid place-items-center rounded-full"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="flex flex-col gap-8 pb-4 px-12">
          <p className="py-4 text-body-m font-regular text-light-fg-secondary">
            Насколько вам нравится сервис «Просебя»?
          </p>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((rating) => {
              const isSelected = selectedRating === rating;
              return (
                <button
                  key={rating}
                  type="button"
                  onClick={() => onRatingSelect?.(rating)}
                  className={
                    isSelected
                      ? "flex-1 min-w-0 flex items-center justify-center py-8 border-0 rounded-full bg-light-bg-accent text-label-s font-semibold text-light-fg-inverted-primary cursor-pointer font-euclid"
                      : RATING_BUTTON_CLASS
                  }
                  aria-pressed={isSelected}
                >
                  {rating}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

CsiBanner.displayName = "CsiBanner";
