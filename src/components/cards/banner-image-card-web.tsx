"use client";

import * as React from "react";

export interface BannerImageCardWebProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Путь к изображению баннера
   */
  imageSrc: string;
  /**
   * Альтернативный текст для изображения
   */
  imageAlt?: string;
  /**
   * Обработчик клика на карточку
   */
  onClick?: () => void;
}

/**
 * Компонент BannerImageCardWeb
 *
 * Баннерная карточка с изображением:
 * - Desktop: максимальная ширина 756px, высота фиксированная 176px
 * - Mobile: ширина растягивается под экран, высота фиксированная 176px
 * - Внутри карточки только изображение
 * - Изображение центрируется
 * - По умолчанию изображение равно ширине десктопа (756px), при уменьшении ширины боковые части скрываются
 */
export const BannerImageCardWeb = React.forwardRef<
  HTMLDivElement,
  BannerImageCardWebProps
>(
  (
    {
      imageSrc,
      imageAlt = "",
      onClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const placeholderSrc = "/placeholder_banner_image.svg";

    // Стили для обертки
    const wrapperClasses = [
      "relative",
      // Максимальная ширина на desktop: 756px
      "w-full md:max-w-[756px]",
      // Фиксированная высота: 176px
      "h-[176px]",
      // Минимальная ширина для видимости
      "min-w-0",
      // Скругление углов
      "rounded-m", // borderRadius: 16px
      // Тень как у остальных карточек
      "shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]", // Elevation
      // Обрезка содержимого
      "overflow-hidden",
      onClick && "cursor-pointer transition-opacity hover:opacity-90",
      className,
    ]
      .filter(Boolean)
      .join(" ");

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

    // Определяем, какое изображение использовать
    const finalImageSrc = imageError ? placeholderSrc : imageSrc;

    return (
      <div
        ref={ref}
        className={wrapperClasses}
        onClick={handleClick}
        {...restProps}
      >
        {/* Изображение с центрированием и обрезкой боковых частей */}
        <img
          src={finalImageSrc}
          alt={imageAlt}
          className="block"
          style={{
            // По умолчанию изображение равно ширине десктопа (756px)
            // При уменьшении ширины боковые части скрываются благодаря overflow-hidden на контейнере
            width: "756px",
            minWidth: "756px",
            height: "176px",
            objectFit: finalImageSrc.endsWith('.svg') ? 'contain' : 'cover',
            objectPosition: "center",
            position: "absolute",
            left: "50%",
            top: "0",
            transform: "translateX(-50%)",
          }}
          onError={() => {
            if (!imageError) {
              setImageError(true);
            }
          }}
        />
      </div>
    );
  },
);

BannerImageCardWeb.displayName = "BannerImageCardWeb";
