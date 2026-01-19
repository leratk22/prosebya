"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

export type LongreadCardBackgroundColor = 
  | "yellow"   // #FFE699
  | "orange"   // #FFB899
  | "red"      // #FF9999
  | "blue"     // #A6C1F2
  | "white";   // #FFFFFF

export interface LongreadCardWebProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Заголовок карточки (максимум 3 строки)
   */
  title: string;
  /**
   * Текст для badge (обязательный)
   */
  tag: string;
  /**
   * Цвет фона карточки
   */
  backgroundColor?: LongreadCardBackgroundColor;
  /**
   * URL изображения (опционально, если не указано, используется изображение по цвету фона)
   */
  imageUrl?: string;
  /**
   * Alt текст для изображения
   */
  imageAlt?: string;
  /**
   * URL SVG заглушки (если изображение не пришло, по умолчанию используется стандартная заглушка)
   */
  placeholderSvgUrl?: string;
  /**
   * Обработчик клика на карточку
   */
  onClick?: () => void;
}

const BACKGROUND_COLORS: Record<LongreadCardBackgroundColor, string> = {
  yellow: "#FFE699",
  orange: "#FFB899",
  red: "#FF9999",
  blue: "#A6C1F2",
  white: "#FFFFFF",
};

// Пути к изображениям для каждого цвета фона (только 3x)
const IMAGE_PATHS: Record<LongreadCardBackgroundColor, string> = {
  yellow: "/images/longread/longread-yellow-3x.png",
  orange: "/images/longread/longread-orange-3x.png",
  red: "/images/longread/longread-red-3x.png",
  blue: "/images/longread/longread-blue-3x.png",
};

// Путь к SVG заглушке по умолчанию
const DEFAULT_PLACEHOLDER_SVG = "/icons/longread-placeholder.svg";

/**
 * Компонент LongreadCardWeb
 *
 * Карточка для отображения лонгрида:
 * - Desktop: ширина 756px, высота 235px (фиксированная)
 * - Mobile: ширина растягивается, высота 235px (фиксированная)
 * - Цвет фона: один из 5 (желтый, оранжевый, красный, голубой, белый)
 * - Для белого фона автоматически используется иллюстрация из желтой карточки
 * - Изображение автоматически выбирается по цвету фона (если imageUrl не указан)
 * - Используется одно изображение 3x для всех дисплеев
 * - Изображение справа, текст слева
 * - В десктопе изображение масштабируется на 150%
 * - Один обязательный тег
 * - Заголовок максимум 3 строки с обрезкой
 * - SVG заглушка если изображение не загрузилось
 */
export const LongreadCardWeb = React.forwardRef<
  HTMLDivElement,
  LongreadCardWebProps
>(
  (
    {
      title,
      tag,
      backgroundColor = "yellow",
      imageUrl,
      imageAlt = "Longread card image",
      placeholderSvgUrl,
      onClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const [imageError, setImageError] = React.useState(false);

    // Определяем, какое изображение использовать
    // Если imageUrl не передан, используем изображение по цвету фона
    // Для белого фона используется изображение из желтой карточки
    const defaultImagePath = backgroundColor === "white" 
      ? IMAGE_PATHS.yellow 
      : IMAGE_PATHS[backgroundColor as Exclude<LongreadCardBackgroundColor, "white">];
    const finalImageUrl = imageUrl || defaultImagePath;
    const finalPlaceholderSvgUrl = placeholderSvgUrl || DEFAULT_PLACEHOLDER_SVG;

    // Стили для основного контейнера
    const containerClasses = [
      "relative",
      "flex flex-row items-stretch", // row layout
      "bg-[#FFE699]", // будет переопределен через style (для белого фона нужна граница)
      "rounded-m", // borderRadius: 16px
      "border border-[rgba(52,64,121,0.14)]", // border: 1px
      "overflow-hidden", // скрываем содержимое за скругленными углами
      "box-border",
      // Фиксированная высота: 235px для всех размеров
      "h-[235px]",
      // Максимальная ширина на desktop: 756px
      "w-full md:max-w-[756px]",
      onClick && "cursor-pointer transition-opacity hover:opacity-90",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Получаем цвет фона
    const bgColor = BACKGROUND_COLORS[backgroundColor];

    // Левая часть - текст с badge и заголовком
    const renderTextSection = () => {
      return (
        <div 
          className="flex flex-col justify-between flex-1 relative z-10 self-stretch gap-10 p-20 md:py-24 md:pr-64 md:pl-20"
        >
          {/* Заголовок */}
          <h3 
            className="w-full relative font-medium font-euclid text-[#22263B] line-clamp-3 self-stretch min-w-0 longread-card-title"
          >
            {title}
          </h3>
          {/* Badge */}
          <div className="self-start">
            <Badge variant="default">{tag}</Badge>
          </div>
        </div>
      );
    };

    // Правая часть - изображение
    const renderImageSection = () => {
      // Mobile: изображение 182x166px (из Figma)
      // Desktop: изображение масштабируется на 150%
      // Контейнер для desktop: 257.65px width (из Figma)
      
      return (
        <div 
          className="absolute bottom-0 right-0 z-0 overflow-hidden longread-card-image md:static md:z-10 md:h-full md:shrink-0 md:overflow-visible"
        >
          <div className="w-full h-full relative flex items-center justify-center pointer-events-none md:justify-end md:items-end">
            {finalImageUrl && !imageError ? (
              <img
                src={finalImageUrl}
                alt={imageAlt}
                className="longread-card-img"
                onError={() => {
                  setImageError(true);
                }}
              />
            ) : (
              // SVG заглушка
              <img
                src={finalPlaceholderSvgUrl}
                alt={imageAlt || "Card placeholder"}
                className="longread-card-img"
              />
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
        style={{
          backgroundColor: bgColor,
        }}
        onClick={handleClick}
        {...restProps}
      >
        {renderTextSection()}
        {renderImageSection()}
      </div>
    );
  },
);

LongreadCardWeb.displayName = "LongreadCardWeb";
