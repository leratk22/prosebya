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

export interface LongreadCardOldWebProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Заголовок карточки (максимум 2 строки)
   */
  title: string;
  /**
   * Текст для badge тэга (обязательный)
   */
  tag: string;
  /**
   * Время в формате MM:SS (обязательное)
   */
  time: string;
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
 * Компонент LongreadCardOldWeb
 *
 * Карточка для отображения контента:
 * - Desktop: ширина 756px, высота 200px (фиксированная)
 * - Mobile: ширина подстраивается под экран, высота 200px (фиксированная)
 * - Фоновое изображение (опционально)
 * - Заголовок максимум 2 строки с обрезкой
 * - Один обязательный тэг (Badge)
 * - Время в формате MM:SS (обязательное)
 */
export const LongreadCardOldWeb = React.forwardRef<
  HTMLDivElement,
  LongreadCardOldWebProps
>(
  (
    {
      title,
      tag,
      time,
      backgroundImageUrl,
      backgroundImageAlt,
      onClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
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

    // Стили для badges контейнера
    // В Figma: alignSelf: stretch, justifyContent: space-between
    const badgesClasses = [
      "flex flex-row justify-between", // row, justify-content: space-between
      "w-full",
      "self-stretch", // alignSelf: stretch из Figma
    ]
      .filter(Boolean)
      .join(" ");

    // Рендер контента
    const renderContent = () => {
      return (
        <div 
          className={contentClasses}
          style={contentStyle}
        >
          {/* Badges: тэг и время */}
          {/* Используем стили Badge: default для светлой, invert для темной через dark: */} 
          {/* В Figma: badges frame имеет alignSelf: stretch, justifyContent: space-between */}
          <div className={`${badgesClasses} relative z-10`}>
            <Badge 
              variant="default" 
              className="dark:bg-core-inverted-alpha-10 dark:text-core-inverted shrink-0"
            >
              {tag}
            </Badge>
            <Badge 
              variant="default" 
              className="dark:bg-core-inverted-alpha-10 dark:text-core-inverted shrink-0"
            >
              {time}
            </Badge>
          </div>
          
          {/* Заголовок */}
          {/* Mobile: MVP2.0/Title/M (20px, lineHeight: 1.2em, letterSpacing: -1%) */}
          {/* Desktop: MVP2.0/Title/L (24px, lineHeight: 1.3333333333333333em, letterSpacing: -1.5%) */}
          {/* Светлая тема: #344079, Темная тема: #FFFFFF */}
          {/* textAlignVertical: BOTTOM из Figma - текст выровнен по нижнему краю */}
          {/* В Figma заголовок имеет horizontal: fill, vertical: hug, alignSelf: stretch */}
          <h3 className="longread-card-old-title w-full font-medium font-euclid text-[#344079] dark:text-[#FFFFFF] line-clamp-2 relative z-10">
            {title}
          </h3>
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
        {/* Контент с фоновым изображением внутри */}
        {renderContent()}
      </div>
    );
  },
);

LongreadCardOldWeb.displayName = "LongreadCardOldWeb";
