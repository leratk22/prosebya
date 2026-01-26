"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

// Пути к фоновым изображениям для разных тем и разрешений
const BACKGROUND_IMAGE_PATHS = {
  light: {
    "1x": "/images/longread-card-old/light-1x.png",
    "2x": "/images/longread-card-old/light-2x.png",
  },
  dark: {
    "1x": "/images/longread-card-old/dark-1x.png",
    "2x": "/images/longread-card-old/dark-2x.png",
  },
};

export interface WormCardWebProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Заголовок карточки (максимум 2 строки)
   */
  title: string;
  /**
   * Текст для badge тэга (опционально)
   */
  tagLeft?: string;
  /**
   * Текст для badge тэга (опционально), обычно это время в формате MM:SS (опционально)
   */
  tagRight?: string;
  /**
   * URL фонового изображения (опционально, если не указано, используется автоматический выбор по теме)
   */
  backgroundImageUrl?: string;
  /**
   * Alt текст для фонового изображения
   */
  backgroundImageAlt?: string;
  /**
   * Обработчик клика на карточку
   */
  onClick?: () => void;
}

/**
 * Компонент WormCardWeb
 *
 * Карточка для отображения контента:
 * - Desktop: ширина 756px, высота 200px (фиксированная)
 * - Mobile: ширина подстраивается под экран, высота 200px (фиксированная)
 * - Фоновое изображение (опционально)
 * - Заголовок максимум 2 строки с обрезкой
 * - Два тэга (Badges, оба опциональные). Каждый тэг может занимать 50% ширины контейнера с учетом обязательного отступа между ними. Если текст не помещается в тэг, то текст обрезается в многоточие
 * - Поддержка светлой и темной темы
 */
export const WormCardWeb = React.forwardRef<
  HTMLDivElement,
  WormCardWebProps
>(
  (
    {
      title,
      tagLeft,
      tagRight,
      backgroundImageUrl,
      backgroundImageAlt,
      onClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    // Исключаем onClick из rest, так как он уже обработан отдельно
    type RestProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title' | 'tagLeft' | 'tagRight' | 'backgroundImageUrl' | 'backgroundImageAlt' | 'className'>;
    const restProps = rest as RestProps;
    // Стили для основного контейнера
    const containerClasses = [
      "relative",
      "flex flex-col", // column layout
      "bg-light-bg-primary dark:bg-dark-bg-primary", // адаптивный фон
      "rounded-m", // borderRadius: 16px
      "border border-[rgba(52,64,121,0.14)] dark:border-[rgba(255,255,255,0.14)]", // border: 1px
      "shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]", // Elevation
      "overflow-hidden", // скрываем содержимое за скругленными углами
      "box-border",
      // Фиксированная высота: 200px для всех размеров
      "h-[200px]",
      // Максимальная ширина на desktop: 756px
      "w-full md:max-w-[756px]",
      onClick && "cursor-pointer transition-opacity hover:opacity-90",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Определяем фоновое изображение
    // Если указан явный URL, используем его, иначе используем CSS класс для автоматического выбора
    const backgroundImageUrlFinal = backgroundImageUrl;

    // Стили для контентного контейнера
    // Фоновое изображение должно быть в этом контейнере как background
    // Используем CSS класс для автоматического выбора изображения по теме
    const contentClasses = [
      "relative z-10",
      "flex flex-col justify-between", // column, justify-content: space-between
      "gap-16", // gap: 16px
      "p-16 md:p-20", // padding: mobile 16px, desktop 20px
      "h-full",
      "min-w-0 overflow-hidden", // для корректной обрезки тэгов
      // Фоновое изображение через CSS класс для автоматического выбора по теме
      !backgroundImageUrl && "longread-card-old-bg",
    ]
      .filter(Boolean)
      .join(" ");

    // Стили для фонового изображения (если указан явный URL)
    const contentStyle = backgroundImageUrlFinal
      ? {
          backgroundImage: `url(${backgroundImageUrlFinal})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : undefined;

    // Проверяем, есть ли хотя бы один бейдж для отображения
    const hasBadges = tagLeft || tagRight;

    // Рендер контента
    const renderContent = () => {
      return (
        <div 
          className={contentClasses}
          style={contentStyle}
        >
          {/* Badges: тэг и время (опционально) */}
          {/* Используем стили Badge: default для светлой, invert для темной через dark: */} 
          {/* В Figma: badges frame имеет alignSelf: stretch, justifyContent: space-between */}
          {hasBadges && (
            <div className="flex flex-row justify-between w-full self-stretch relative z-10 min-w-0 overflow-hidden gap-4 flex-shrink-0">
              {tagLeft && (
                <div className="flex min-w-0 max-w-[calc(50%-8px)]">
                  <Badge 
                    variant="default" 
                    className="dark:bg-core-inverted-alpha-10 dark:text-core-inverted max-w-full min-w-0"
                  >
                    {tagLeft}
                  </Badge>
                </div>
              )}
              {tagRight && (
                <div className={`flex min-w-0 ${tagLeft ? 'max-w-[calc(50%-8px)] ml-auto' : 'max-w-full'}`}>
                  <Badge 
                    variant="default" 
                    className="dark:bg-core-inverted-alpha-10 dark:text-core-inverted max-w-full min-w-0"
                  >
                    {tagRight}
                  </Badge>
                </div>
              )}
            </div>
          )}
          
          {/* Заголовок - всегда внизу */}
          {/* Mobile: MVP2.0/Title/M (20px, lineHeight: 1.2em, letterSpacing: -1%) */}
          {/* Desktop: MVP2.0/Title/L (24px, lineHeight: 1.3333333333333333em, letterSpacing: -1.5%) */}
          {/* Светлая тема: #344079, Темная тема: #FFFFFF */}
          {/* textAlignVertical: BOTTOM из Figma - текст выровнен по нижнему краю */}
          {/* В Figma заголовок имеет horizontal: fill, vertical: hug, alignSelf: stretch */}
          <h3 className="longread-card-old-title w-full font-medium font-euclid text-[#344079] dark:text-[#FFFFFF] line-clamp-2 relative z-10 mt-auto">
            {title}
          </h3>
        </div>
      );
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        className={containerClasses}
        onClick={handleClick}
        {...restProps}
      >
        {/* Контент с фоновым изображением внутри */}
        {renderContent()}
      </div>
    );
  },
);

WormCardWeb.displayName = "WormCardWeb";
