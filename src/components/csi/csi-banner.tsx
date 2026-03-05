"use client";

import * as React from "react";

const CloseIcon = () => (
  <svg
    className="w-16 h-16 block text-core-alpha-40"
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

// Мобильная: w-216. Десктоп (md+): w-300, p-16, gap-12 — по Figma Gr1ERrSAzB6n2xWAV5ECiu.
const CONTAINER_CLASS =
  "w-216 md:w-300 bg-light-bg-primary rounded-tl-m rounded-tr-m rounded-br-m rounded-bl-m shadow-elevation overflow-hidden flex flex-col gap-8 md:gap-12 p-12 md:p-16 font-euclid";

const RATING_BUTTON_CLASS =
  "flex-1 min-w-0 flex items-center justify-center py-8 px-12 border-0 rounded-full bg-light-bg-pressed text-label-s font-semibold text-light-fg-muted cursor-pointer hover:bg-light-bg-accent-overlay hover:text-light-fg-tertiary font-euclid";

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
        ? "fixed left-16 right-16 bottom-16 w-[calc(100vw-32px)] md:left-auto md:right-24 md:bottom-24 md:w-300 md:max-w-[300px] z-40 pointer-events-auto"
        : "";

    return (
      <div
        ref={ref}
        className={`${CONTAINER_CLASS} ${positionClasses} ${className}`.trim()}
      >
        {/* По Figma: text_group (title+body) gap-4, close 16x16 */}
        <header className="relative flex items-start gap-8 md:gap-12 flex-shrink-0 rounded-tl-m rounded-tr-m pr-16">
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            <h2 className="text-title-m font-semibold text-light-fg-primary">
              Оцените нас
            </h2>
            <p className="text-body-m md:text-body-l font-regular text-light-fg-secondary">
              Насколько вам нравится сервис «Просебя»?
            </p>
          </div>
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="absolute top-0 right-0 w-16 h-16 p-0 border-0 bg-transparent cursor-pointer grid place-items-center rounded-full hover:bg-light-bg-accent-overlay shrink-0"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="flex flex-col">
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
                      ? "flex-1 min-w-0 flex items-center justify-center py-8 px-12 border-0 rounded-full bg-light-bg-accent text-label-s font-semibold text-light-fg-inverted-primary cursor-pointer font-euclid"
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
