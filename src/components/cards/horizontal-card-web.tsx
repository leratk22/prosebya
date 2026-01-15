"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

export interface HorizontalCardWebProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Заголовок карточки (максимум 2 строки)
   */
  title: string;
  /**
   * Описание под заголовком (опционально)
   */
  description?: string;
  /**
   * Массив badges для отображения (обязательно минимум 1, максимум 2)
   */
  badges: string[];
  /**
   * URL изображения для левой части (1x)
   */
  imageUrl?: string;
  /**
   * URL изображения для левой части (2x, retina)
   */
  imageUrl2x?: string;
  /**
   * Alt текст для изображения
   */
  imageAlt?: string;
  /**
   * Обработчик клика на карточку
   */
  onClick?: () => void;
}

/**
 * Компонент HorizontalCardWeb
 *
 * Горизонтальная карточка для отображения контента:
 * - Desktop: изображение слева (186px), текст справа, ширина 756px, высота 210px
 * - Mobile: изображение слева (124px), текст справа, ширина 343px, высота 140px
 * - Badges обязательны (минимум 1, максимум 2)
 * - На mobile: badges перед заголовком
 * - На desktop: badges внизу
 * - Заголовок максимум 2 строки с обрезкой
 * - Описание опционально
 */
export const HorizontalCardWeb = React.forwardRef<
  HTMLDivElement,
  HorizontalCardWebProps
>(
  (
    {
      title,
      description,
      badges,
      imageUrl,
      imageUrl2x,
      imageAlt = "Card image",
      onClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    // Стили для основного контейнера
    const containerClasses = [
      "relative",
      "flex flex-row items-center", // items-center как в Figma
      "gap-16", // gap между изображением и текстом: 16px
      "bg-light-bg-primary dark:bg-dark-bg-primary", // адаптивный фон
      "rounded-m", // borderRadius: 16px
      "border", // border: 1px
      "shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]", // Elevation
      "overflow-hidden", // скрываем содержимое за скругленными углами
      "box-border",
      // Фиксированная высота: mobile 140px, desktop 210px
      "h-[140px] md:h-[210px]",
      // Максимальная ширина на desktop: 756px
      "md:max-w-[756px]",
      onClick && "cursor-pointer transition-opacity hover:opacity-90",
      className,
    ]
      .filter(Boolean)
      .join(" ");


    // Левая часть - изображение
    // Desktop: 186px width, 210px height
    // Mobile: 124px width, 140px height
    const renderImageSection = () => {
      const [imageError, setImageError] = React.useState(false);

      return (
        <div 
          className="horizontal-card-image relative shrink-0 z-10 h-full"
        >
          <div className="w-full h-full overflow-hidden relative">
            {imageUrl && !imageError ? (
              <img
                src={imageUrl}
                srcSet={imageUrl2x ? `${imageUrl} 1x, ${imageUrl2x} 2x` : undefined}
                alt={imageAlt}
                className="w-full h-full object-cover"
                onError={() => {
                  setImageError(true);
                }}
              />
            ) : (
              <img
                src="/horizontal-placeholder.svg"
                alt={imageAlt || "Card placeholder"}
                className="w-full h-full"
              />
            )}
          </div>
        </div>
      );
    };

    // Правая часть - текст с badges
    // Структура из Figma: justify-content: space-between
    // Desktop: paddingTop: 32, paddingBottom: 32, paddingRight: 64
    // Mobile: padding: 16px
    // На mobile: badges ПЕРЕД заголовком (внутри text блока, gap: 4)
    // На desktop: badges ВНИЗУ (отдельный блок, gap: 8)
    // Верхний блок: badges (mobile) + заголовок + описание (gap: 4 на desktop, gap: 8 на mobile)
    // Нижний блок: badges (desktop, gap: 8)
    const renderTextSection = () => {
      // Badges для светлой темы: variant="default" (brand-blue-alpha-10 фон, brand-blue текст)
      // Badges для темной темы: нужно использовать variant="invert" или переопределить через dark:
      // Используем variant="default" и переопределяем через dark: классы
      
      return (
        <div 
          className="flex flex-col justify-between flex-1 relative z-10 self-stretch py-16 pr-16 md:py-32 md:pr-64 md:pl-0"
        >
          {/* Верхний блок: badges (mobile) + заголовок + описание (desktop) */}
          <div className="flex flex-col gap-8 md:gap-4 self-stretch">
            {/* Badges на mobile - перед заголовком */}
            <div className="flex flex-row gap-4 md:hidden self-stretch min-w-0 overflow-hidden">
              {badges.map((badge, index) => (
                <Badge 
                  key={index} 
                  variant="default"
                  className="dark:bg-core-inverted-alpha-10 dark:text-core-inverted shrink-0"
                >
                  {badge}
                </Badge>
              ))}
            </div>
            {/* Title */}
            <h3 
              className="practice-card-title font-medium md:font-semibold font-euclid text-light-fg-primary dark:text-dark-fg-primary line-clamp-2 self-stretch min-w-0"
            >
              {title}
            </h3>
            {/* Description - только для desktop, в мобильной версии будет внизу */}
            {description && (
              <p
                className="hidden md:block font-medium font-euclid text-light-fg-tertiary dark:text-dark-fg-tertiary line-clamp-1 self-stretch min-w-0"
                style={{
                  fontSize: "12px",
                  lineHeight: "16px", // 1.3333333333333333em
                }}
              >
                {description}
              </p>
            )}
          </div>
          {/* Нижний блок: badges на desktop, описание на mobile */}
          <div className="flex flex-col md:flex-row gap-8 self-stretch min-w-0 overflow-hidden">
            {/* Badges на desktop */}
            <div className="hidden md:flex flex-row gap-8 self-stretch min-w-0 overflow-hidden">
              {badges.map((badge, index) => (
                <Badge 
                  key={index} 
                  variant="default"
                  className="dark:bg-core-inverted-alpha-10 dark:text-core-inverted shrink-0"
                >
                  {badge}
                </Badge>
              ))}
            </div>
            {/* Description на mobile - всегда внизу */}
            {description && (
              <p
                className="md:hidden font-medium font-euclid text-light-fg-tertiary dark:text-dark-fg-tertiary line-clamp-1 self-stretch min-w-0"
                style={{
                  fontSize: "12px",
                  lineHeight: "16px", // 1.3333333333333333em
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      );
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick();
      }
      if (rest.onClick) {
        rest.onClick(e);
      }
    };

    // Убираем onClick из rest, чтобы избежать дублирования
    const { onClick: _, ...restProps } = rest;

      return (
        <div
          ref={ref}
          className={`${containerClasses} horizontal-card-border`}
          onClick={handleClick}
          {...restProps}
        >
          {renderImageSection()}
          {renderTextSection()}
        </div>
      );
  },
);

HorizontalCardWeb.displayName = "HorizontalCardWeb";
