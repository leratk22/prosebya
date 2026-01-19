"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

export interface PracticeCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Подзаголовок (например, "Практика")
   * На desktop отображается как текст, на mobile как badge
   */
  subtitle: string;
  /**
   * Заголовок карточки
   */
  title: string;
  /**
   * Текстовая метка под заголовком (например, "Помочь себе за 2 минуты")
   */
  label?: string;
  /**
   * URL изображения для правой части (3x)
   */
  imageUrl?: string;
  /**
   * Alt текст для изображения
   */
  imageAlt?: string;
  /**
   * Длительность в формате "MM:SS" (отображается в Badge на изображении)
   */
  duration?: string;
  /**
   * Обработчик клика на карточку
   */
  onClick?: () => void;
}

/**
 * Компонент PracticeCard
 *
 * Горизонтальная карточка для отображения практик/контента:
 * - Desktop: текст слева, изображение справа (gap 48px)
 * - Mobile: текст слева, изображение справа (gap 0px, фиксированная ширина изображения 136px)
 * - Декоративный SVG элемент на фоне (только desktop)
 * - Badge с длительностью на изображении
 * - Subtitle на desktop как текст, на mobile как badge
 * - Поддержка светлой и темной темы
 */
export const PracticeCard = React.forwardRef<
  HTMLDivElement,
  PracticeCardProps
>(
  (
    {
      subtitle,
      title,
      label,
      imageUrl,
      imageAlt = "Practice image",
      duration,
      onClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    // Стили для основного контейнера
    const containerClasses = [
      "relative",
      "flex flex-row items-stretch",
      "gap-16 md:gap-48", // gap: mobile 16px, desktop 48px
      "p-16 md:p-20", // padding: mobile 16px, desktop 20px
      "bg-light-bg-primary dark:bg-dark-bg-primary", // адаптивный фон
      "rounded-m", // borderRadius: 16px
      "border border-light-border-secondary dark:border-dark-border-secondary", // адаптивная граница
      "shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]", // Elevation
      "overflow-hidden", // скрываем содержимое за скругленными углами
      "box-border",
      // Фиксированная высота: mobile 243px (211px изображение + 16px padding сверху + 16px padding снизу), desktop 251px
      "h-[243px] md:h-[251px]",
      // Максимальная ширина на desktop: 756px
      "md:max-w-[756px]",
      onClick && "cursor-pointer transition-opacity hover:opacity-90",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Декоративный SVG элемент - под всем контентом (только на desktop)
    // Прикреплен к правому краю карточки без отступов
    // Поддержка светлой и темной темы
    const renderDecorativeVector = () => {
      return (
        <div
          className="hidden md:block absolute pointer-events-none overflow-hidden"
          style={{
            opacity: 0.7,
            zIndex: 0,
            right: 0,
            top: "-30px",
            width: "460px",
            height: "333px",
          }}
        >
          <svg
            viewBox="0 0 521 251"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path
              opacity="0.7"
              d="M490.004 -0.962709C418.443 216.817 187.676 49.1193 224.29 -17.3762C260.904 -83.8717 448.887 131.647 294.385 180.048C165.493 220.425 145.695 72.7285 208.044 132.61C252.052 174.876 240.222 250.827 187.676 280.121C142.29 305.423 75.2997 313.962 30.0039 283.751"
              stroke="#22263B"
              strokeOpacity="0.1"
              className="practice-card-decorative-path"
              strokeWidth="40"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    };

    // Левая часть - текст
    const renderTextSection = () => {
      return (
        <div className="flex flex-col justify-between flex-1 relative z-10 gap-24 md:gap-8 md:py-8">
          {/* Desktop: subtitle как текст, Mobile: subtitle как badge */}
          <div className="flex flex-col gap-20 md:gap-8">
            {/* Mobile: Subtitle как badge */}
            <div className="md:hidden">
              <Badge 
                variant="default"
                className="dark:bg-core-inverted-alpha-10 dark:text-core-inverted"
              >
                {subtitle.charAt(0).toUpperCase() + subtitle.slice(1).toLowerCase()}
              </Badge>
            </div>
            
            {/* Desktop: Subtitle как текст */}
            <div className="hidden md:block">
              <p 
                className="font-medium font-euclid text-light-fg-secondary dark:text-dark-fg-secondary"
                style={{
                  fontSize: "12px", // MVP2.0/Caption/S
                  lineHeight: "1.3333333333333333em",
                  letterSpacing: "0.1em", // 10%
                  textTransform: "uppercase",
                }}
              >
                {subtitle}
              </p>
            </div>
            
            {/* Title */}
            <h3 
              className="font-medium font-euclid text-light-fg-primary dark:text-dark-fg-primary text-[20px] leading-[1.2em] tracking-[-0.01em] md:text-[24px] md:leading-[1.3333333333333333em] md:tracking-[-0.015em] line-clamp-3"
            >
              {title}
            </h3>
          </div>
          
          {/* Label */}
          {label && (
            <p 
              className="font-medium font-euclid text-[12px] leading-[1.3333333333333333em] text-light-fg-tertiary dark:text-dark-fg-tertiary md:text-[14px] md:leading-[1.4285714285714286em] line-clamp-1"
            >
              {label}
            </p>
          )}
        </div>
      );
    };

    // Правая часть - изображение с Badge
    const renderImageSection = () => {
      const [imageError, setImageError] = React.useState(false);
      
      return (
        <div 
          className="practice-card-image relative shrink-0 z-10 w-[120px] md:w-[120px]"
          style={{
            height: "211px",
          }}
        >
          <div 
            className="w-full h-full relative"
          >
            {imageUrl && !imageError ? (
              <img
                src={imageUrl}
                alt={imageAlt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  borderRadius: "0px 16px 16px 0px", // Скругление только справа
                }}
                onError={() => {
                  // Если изображение не загрузилось, показываем SVG заглушку
                  setImageError(true);
                }}
              />
            ) : (
              <img
                src="/practice-image-placeholder.svg"
                alt={imageAlt || "Practice placeholder"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  borderRadius: "0px 16px 16px 0px", // Скругление только справа
                }}
              />
            )}
            {/* Badge с длительностью внизу */}
            {duration && (
              <div className="absolute bottom-16 left-0 right-0 flex justify-center">
                <div 
                  className="inline-flex items-center gap-4 rounded-full font-medium font-euclid bg-[rgba(34,38,59,0.6)] dark:bg-[rgba(255,255,255,0.6)] text-[#FFFFFF] dark:text-[#22263B] px-8 py-4 text-label-s"
                >
                  {duration}
                </div>
              </div>
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
        className={containerClasses}
        onClick={handleClick}
        {...restProps}
      >
        {renderDecorativeVector()}
        {renderTextSection()}
        {renderImageSection()}
      </div>
    );
  },
);

PracticeCard.displayName = "PracticeCard";
