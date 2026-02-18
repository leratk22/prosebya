"use client";

import * as React from "react";
import { Icon } from "@/components/icons";

/* ─────────────────────── Types ─────────────────────── */

export interface SkillCourseCarouselItem {
  /** Заголовок практики (line-clamp-3) */
  title: string;
  /** Подпись: количество («8 практик») или прогресс («Далее: упражнение 23») */
  subtitle?: string;
  /** Состояние карточки: default (количество) или in-progress (прогресс) */
  state?: "default" | "in-progress";
  /** URL готового изображения (стек + кнопка Play уже в картинке) */
  imageUrl?: string;
  /** Alt текст для обложки */
  imageAlt?: string;
  /** Обработчик клика на карточку */
  onClick?: () => void;
}

export interface SkillCourseCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Заголовок секции */
  title: string;
  /** Массив карточек */
  items: SkillCourseCarouselItem[];
  /** Показать карточку «Смотреть ещё» (по умолчанию true) */
  showSeeMore?: boolean;
  /** Текст карточки «Смотреть ещё» (default: «Смотреть еще») */
  seeMoreText?: string;
  /** Обработчик клика «Смотреть ещё» */
  onSeeMore?: () => void;
}

/* ─────────────── Card Image (internal) ─────────────── */

const DEFAULT_CARD_IMAGE = "/images/carousel/practice-card-2x.png";

function CardImage({
  imageUrl,
  imageAlt,
}: {
  imageUrl?: string;
  imageAlt?: string;
}) {
  const [imageError, setImageError] = React.useState(false);
  const hasImage = imageUrl && !imageError;

  React.useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  if (!hasImage) {
    return (
      <div className="shrink-0 w-[160px] h-[160px] flex items-center justify-center">
        <img
          src="/horizontal-placeholder.svg"
          alt={imageAlt || "Card placeholder"}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="shrink-0 h-full flex items-center justify-center">
      <img
        src={imageUrl}
        alt={imageAlt || ""}
        className="h-full w-auto object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

/* ──────────── See More Card (internal) ──────────── */

function SeeMoreCard({
  text = "Смотреть еще",
  onClick,
}: {
  text?: string;
  onClick?: () => void;
}) {
  return (
    <div
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
        "shrink-0 w-[294px] h-[160px] snap-start",
        "flex flex-col items-center justify-center",
        "border border-light-border-secondary dark:border-dark-border-secondary",
        "rounded-m overflow-hidden",
        onClick &&
          "cursor-pointer hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col items-center gap-16 p-16">
        <p className="font-medium font-euclid text-body-xl text-light-fg-primary dark:text-dark-fg-primary text-center">
          {text}
        </p>
        <div className="bg-core-inverted rounded-full px-16 py-8 flex items-center justify-center">
          <Icon
            name="chevron-right"
            size={24}
            className="text-light-fg-primary dark:text-dark-fg-primary"
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Practice Card (internal) ─────────────── */

function PracticeCard({
  item,
}: {
  item: SkillCourseCarouselItem;
}) {
  const handleClick = item.onClick;

  return (
    <div
      role={handleClick ? "button" : undefined}
      tabIndex={handleClick ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={
        handleClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      className={[
        "shrink-0 w-[294px] h-[160px] flex items-start snap-start",
        "bg-light-bg-primary dark:bg-dark-bg-primary",
        "border border-light-border-button-tertiary dark:border-dark-border-button-tertiary",
        "rounded-m overflow-hidden",
        "shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]",
        handleClick && "cursor-pointer hover:opacity-90 transition-opacity",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Text content */}
      <div className="flex-1 flex flex-col justify-between self-stretch min-w-0 pl-16 py-16">
        <p className="font-medium font-euclid text-body-xl text-light-fg-primary dark:text-dark-fg-primary line-clamp-3 break-words">
          {item.title}
        </p>
        {item.subtitle && (
          <p className="font-medium font-euclid text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary line-clamp-2 mt-4">
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Card image — pre-composed stack with play button */}
      <CardImage imageUrl={item.imageUrl} imageAlt={item.imageAlt} />
    </div>
  );
}

/* ─────────── SkillCourseCarousel (main) ─────────── */

/**
 * Карусель навыков/практик — секция с горизонтально прокручиваемыми карточками.
 *
 * **Figma Desktop:** [node 6960:16476](https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv?node-id=6960-16476)
 * **Figma Mobile:** [node 7048:48793](https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv?node-id=7048-48793)
 *
 * Адаптивность (брейкпоинт md = 441px):
 * - **Mobile**: прозрачный фон, px-16 py-12, заголовок и карточки выравнены по левому краю (pl-0 header, pl-16 у контента карусели), без стрелок; карусель во всю ширину viewport, 20px peek соседней карточки, scroll-snap
 * - **Desktop**: bg-tertiary (#F4F6FA), p-20, rounded-m, стрелки навигации
 *
 * Карточка practice:
 * - Размеры: 294px × 160px
 * - Горизонтальный layout: текст слева + готовое изображение справа (на всю высоту)
 * - Изображение приходит целиком (стек + Play уже в картинке), привязано к правому краю
 * - Title: text-body-xl, text-light-fg-primary, line-clamp-3
 * - Subtitle: text-body-s, text-light-fg-tertiary, line-clamp-2
 *
 * Два состояния карточки:
 * - **default**: подпись-количество (напр. «8 практик»)
 * - **in-progress**: подпись-прогресс (напр. «Далее: упражнение 23»)
 */
export const SkillCourseCarousel = React.forwardRef<
  HTMLDivElement,
  SkillCourseCarouselProps
>(
  (
    {
      title,
      items,
      showSeeMore = true,
      seeMoreText,
      onSeeMore,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      if (!scrollRef.current) return;
      const amount = 302; // ~294px card + 8px gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    };

    return (
      <div
        ref={ref}
        className={[
          "w-full md:max-w-[756px]",
          // Mobile: no bg, section padding; desktop: bg-tertiary, p-20
          "px-16 py-12 rounded-m md:bg-light-bg-tertiary md:dark:bg-dark-bg-tertiary md:p-20",
          "flex flex-col gap-8 md:gap-28",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between h-[56px] md:h-auto -ml-16 md:ml-0">
          <h2 className="font-semibold font-euclid text-title-xl text-light-fg-primary dark:text-dark-fg-primary flex-1 min-w-0">
            {title}
          </h2>

          {/* Navigation arrows — desktop only */}
          <div className="hidden md:flex items-center gap-8 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-[36px] h-[36px] rounded-full flex items-center justify-center border border-light-border-button-secondary dark:border-dark-border-button-secondary"
              aria-label="Прокрутить влево"
            >
              <Icon
                name="chevron-left"
                size={20}
                className="text-light-fg-accent dark:text-dark-fg-accent"
              />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-[36px] h-[36px] rounded-full flex items-center justify-center border border-light-border-button-secondary dark:border-dark-border-button-secondary"
              aria-label="Прокрутить вправо"
            >
              <Icon
                name="chevron-right"
                size={20}
                className="text-light-fg-accent dark:text-dark-fg-accent"
              />
            </button>
          </div>
        </div>

        {/* ── Scrollable cards row ── */}
        <div
          ref={scrollRef}
          className={[
            "flex gap-8 overflow-x-auto scrollbar-hide",
            "snap-x snap-mandatory overscroll-x-contain",
            // Mobile: full viewport width (break out of px-16), pl-16 first card, pr-20 for 20px peek of next
            "w-[calc(100%+32px)] -ml-16 md:w-full md:ml-0 pl-16 pr-20 md:pl-0 md:pr-0",
          ].join(" ")}
        >
          {items.map((item, index) => (
            <PracticeCard key={index} item={item} />
          ))}

          {showSeeMore && (
            <SeeMoreCard text={seeMoreText} onClick={onSeeMore} />
          )}
        </div>
      </div>
    );
  },
);

SkillCourseCarousel.displayName = "SkillCourseCarousel";
