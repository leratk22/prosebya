"use client";

import * as React from "react";

export interface PracticeCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Подзаголовок (например, "Практика")
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
   * URL изображения для правой части
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
 * - Desktop only: текст слева, изображение справа
 * - Декоративный SVG элемент на фоне
 * - Badge с длительностью на изображении
 * - Только светлая тема
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
      "p-20", // padding: 20px
      "bg-light-bg-primary", // белый фон
      "rounded-m", // borderRadius: 16px
      "border border-light-border-secondary", // border: 1px rgba(34, 38, 59, 0.1)
      "shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]", // Elevation
      "overflow-hidden",
      "box-border",
      onClick && "cursor-pointer transition-opacity hover:opacity-90",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Декоративный SVG элемент
    const renderDecorativeVector = () => {
      return (
        <div
          className="absolute pointer-events-none"
          style={{
            left: "248px",
            top: "-30px",
            width: "460px",
            height: "333px",
            opacity: 0.7,
          }}
        >
          <img
            src="/decorative-vector.svg"
            alt=""
            className="w-full h-full object-contain"
            aria-hidden="true"
          />
        </div>
      );
    };

    // Левая часть - текст
    const renderTextSection = () => {
      return (
        <div className="flex flex-col justify-between flex-1 gap-8 py-8" style={{ marginRight: "48px" }}>
          <div className="flex flex-col gap-8">
            {/* Subtitle */}
            <p 
              className="font-medium font-euclid text-light-fg-secondary uppercase"
              style={{
                fontSize: "12px",
                lineHeight: "1.3333333333333333em",
                letterSpacing: "0.1em",
              }}
            >
              {subtitle}
            </p>
            {/* Title */}
            <h3 
              className="font-semibold font-euclid text-light-fg-primary"
              style={{
                fontSize: "24px",
                lineHeight: "1.3333333333333333em",
                letterSpacing: "-0.015em",
              }}
            >
              {title}
            </h3>
          </div>
          {/* Label */}
          {label && (
            <p 
              className="font-medium font-euclid text-light-fg-tertiary"
              style={{
                fontSize: "14px",
                lineHeight: "1.4285714285714286em",
              }}
            >
              {label}
            </p>
          )}
        </div>
      );
    };

    // Правая часть - изображение с Badge
    const renderImageSection = () => {
      return (
        <div className="relative shrink-0" style={{ width: "120px", height: "211px" }}>
          <div
            className="w-full h-full rounded-[0px_16px_16px_0px] overflow-hidden relative"
            style={{
              backgroundColor: "#79818E", // fallback цвет
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-dark" />
            )}
            {/* Badge с длительностью внизу */}
            {duration && (
              <div className="absolute bottom-16 left-0 right-0 flex justify-center">
                <div 
                  className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-core-alpha-60 text-core-inverted font-medium font-euclid"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.3333333333333333em",
                  }}
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
