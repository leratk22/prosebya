"use client";

import * as React from "react";
import { withRussianQuotes } from "@/lib/russian-quotes";

export interface ContentRecommendationCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Подпись (Caption/S, uppercase), например «ВИДЕОТРЕНИРОВКА», «Практика»
   */
  caption?: string;
  /**
   * Заголовок карточки
   */
  title: string;
  /**
   * Описание (опционально)
   */
  description?: string;
  /**
   * Обработчик клика
   */
  onClick?: () => void;
}

/**
 * Карточка контентной рекомендации по макету из Figma.
 * Использует токены: bg-primary, border-button-tertiary, rounded-m,
 * типографика title-s, body-l, caption-s.
 */
export const ContentRecommendationCard = React.forwardRef<
  HTMLDivElement,
  ContentRecommendationCardProps
>(
  (
    {
      caption,
      title,
      description,
      onClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        className={[
          "flex flex-col gap-[8px] min-w-[280px] max-w-[320px] shrink-0",
          "p-16 pl-20 rounded-m",
          "bg-light-bg-primary dark:bg-dark-bg-primary",
          "border border-light-border-button-tertiary dark:border-dark-border-button-tertiary",
          "text-left",
          onClick &&
            "cursor-pointer transition-colors hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {caption && (
          <p className="text-caption-s font-medium uppercase tracking-caption-s text-light-fg-secondary dark:text-dark-fg-secondary">
            {withRussianQuotes(caption)}
          </p>
        )}
        <h3 className="text-title-m font-semibold text-light-fg-primary dark:text-dark-fg-primary line-clamp-2">
          {withRussianQuotes(title)}
        </h3>
        {description && (
          <p className="text-body-l font-regular text-light-fg-tertiary dark:text-dark-fg-tertiary line-clamp-2">
            {withRussianQuotes(description)}
          </p>
        )}
      </div>
    );
  },
);

ContentRecommendationCard.displayName = "ContentRecommendationCard";

/**
 * По value из contentBySymptom (например "Проблема с питанием__fast_practices")
 * возвращает подпись для карточки.
 */
export function getContentTypeCaption(value: string): string {
  const key = value.includes("__") ? value.split("__")[1] : "";
  const map: Record<string, string> = {
    fast_practices: "Практика",
    meditations: "Медитация",
    longreads: "Лонгрид",
    courses: "ВИДЕОТРЕНИРОВКА",
  };
  return map[key] ?? "";
}
