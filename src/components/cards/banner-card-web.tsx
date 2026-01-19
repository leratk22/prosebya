"use client";

import * as React from "react";
import { Highlight } from "@/components/ui/highlight";

export interface BannerCardWebProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Текст для компонента Highlight (обязательно)
   */
  highlightText: string;
  /**
   * Заголовок карточки (максимум 2 строки)
   */
  title: string;
  /**
   * Описание под заголовком (обязательно)
   * Максимум 2 строки на desktop, 3 строки на mobile
   */
  description: string;
  /**
   * Обработчик клика на карточку
   */
  onClick?: () => void;
}

/**
 * Компонент BannerCardWeb
 *
 * Баннерная карточка для отображения контента:
 * - Desktop: максимальная ширина 756px, высота адаптируется под текст
 * - Mobile: ширина растягивается под экран
 * - В десктопной версии есть 2 фоновые SVG
 * - В мобильной версии фоновых SVG нет
 * - Переключения между светлой и темной темой нет (только темный фон)
 * - Компонент Highlight обязателен и отображается перед заголовком
 * - Заголовок максимум на 2 строки, далее обрезается в троеточие
 * - Описание максимум 2 строки на десктопе и 3 в мобилке, далее обрезается в троеточие
 */
export const BannerCardWeb = React.forwardRef<
  HTMLDivElement,
  BannerCardWebProps
>(
  (
    {
      highlightText,
      title,
      description,
      onClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    // Исключаем onClick из rest, так как он уже обработан отдельно
    type RestProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'highlightText' | 'title' | 'description' | 'className'>;
    const restProps = rest as RestProps;
    // Стили для обертки (для фоновых SVG)
    const wrapperClasses = [
      "relative",
      // Максимальная ширина на desktop: 756px
      "w-full md:max-w-[756px]",
      // Явно указываем overflow для видимости SVG
      "overflow-visible",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили для контентного контейнера
    const containerClasses = [
      "relative",
      "flex flex-col items-center", // column, alignItems: center
      "gap-12", // gap: 12px
      "p-24 md:p-32", // padding: mobile 24px 32px, desktop 32px 64px
      "px-32 md:px-64",
      "bg-[#22263B]", // темный фон без переключения темы
      "rounded-m", // borderRadius: 16px
      "overflow-hidden md:overflow-visible", // на desktop позволяем SVG выходить за границы
      "box-border",
      // Высота адаптируется под текст
      "h-auto",
      onClick && "cursor-pointer transition-opacity hover:opacity-90",
    ]
      .filter(Boolean)
      .join(" ");

    // Фоновые SVG для desktop
    const renderBackgroundVectors = () => {
      return (
        <>
          {/* Vector 810 */}
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{
              zIndex: 0,
              left: "-70px",
              top: "-209.92px",
              width: "359.39px",
              height: "433.14px",
            }}
          >
            <svg
              width="359.39"
              height="433.14"
              viewBox="0 0 350 352"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
              aria-hidden="true"
            >
              <path
                opacity="0.06"
                d="M0.0312614 321.989C90.6579 321.894 281.419 258.253 319.45 4.44628"
                stroke="white"
                strokeWidth="60"
              />
            </svg>
          </div>
          {/* Vector 811 */}
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{
              zIndex: 0,
              left: "446.61px",
              top: "-189.92px",
              width: "359.39px",
              height: "433.14px",
            }}
          >
            <svg
              width="359.39"
              height="433.14"
              viewBox="0 0 350 352"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
              aria-hidden="true"
            >
              <path
                opacity="0.06"
                d="M349.099 321.989C258.472 321.894 67.7109 258.253 29.6802 4.44628"
                stroke="white"
                strokeWidth="60"
              />
            </svg>
          </div>
        </>
      );
    };

    // Контент карточки
    const renderContent = () => {
      return (
        <div className="flex flex-col items-center gap-16 relative z-10 w-full">
          {/* Highlight компонент */}
          <div className="flex justify-center">
            <Highlight variant="inverted">{highlightText}</Highlight>
          </div>
          {/* Заголовок */}
          {/* Mobile: MVP2.0/Title/M (20px, lineHeight: 1.2em, letterSpacing: -1%) */}
          {/* Desktop: MVP2.0/Title/L (24px, lineHeight: 1.3333333333333333em, letterSpacing: -1.5%) */}
          <h3 className="banner-card-title w-full text-center font-medium font-euclid text-[#FFFFFF] line-clamp-2">
            {title}
          </h3>
          {/* Описание */}
          {/* Mobile: MVP2.0/Body/S-Regular (12px, lineHeight: 1.3333333333333333em) */}
          {/* Desktop: MVP2.0/Body/M-Regular (14px, lineHeight: 1.4285714285714286em) */}
          <p className="banner-card-description w-full text-center font-regular font-euclid text-[rgba(255,255,255,0.8)] line-clamp-3 md:line-clamp-2">
            {description}
          </p>
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
        className={wrapperClasses}
        {...restProps}
      >
        {/* Контентный контейнер */}
        <div
          className={containerClasses}
          onClick={handleClick}
        >
          {/* Фоновые SVG внутри контентного контейнера - на desktop они будут видны благодаря overflow-visible */}
          {renderBackgroundVectors()}
          {/* Контент карточки */}
          {renderContent()}
        </div>
      </div>
    );
  },
);

BannerCardWeb.displayName = "BannerCardWeb";
