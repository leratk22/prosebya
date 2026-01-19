"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ButtonPlayPause } from "@/components/ui/button-play-pause";

export interface AudioCardWebProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Заголовок карточки (максимум 2 строки, обрезается многоточием)
   */
  title: string;
  /**
   * Текст для badge в верхней части (опциональный)
   */
  topBadge?: string;
  /**
   * Длительность аудио в формате "MM:SS" (отображается справа от waveform, опциональный)
   */
  duration?: string;
  /**
   * Обработчик клика на всю карточку
   */
  onClick?: () => void;
}

/**
 * Компонент AudioCardWeb
 *
 * Адаптивная карточка для отображения аудио контента:
 * - Desktop: заголовок и badge в одной строке, карточка с кнопкой play и waveform
 *   - Максимальная ширина: 756px
 * - Mobile: badge сверху, затем заголовок, карточка с кнопкой play и waveform
 *   - Растягивается по ширине контейнера (без ограничений)
 * - Переход на desktop версию: с 440px (breakpoint md:)
 * - Высота фиксированная, ширина тянется
 * - Заголовок обрезается после 2 строк многоточием
 * - Waveform всегда отображается, одного размера, обрезается по ширине контейнера
 * - Весь блок кликабельный при наведении
 */
export const AudioCardWeb = React.forwardRef<
  HTMLDivElement,
  AudioCardWebProps
>(
  (
    {
      title,
      topBadge,
      duration,
      onClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    // Стили для внешнего контейнера - адаптивный
    // Desktop: padding 20px, max-width 756px
    // Mobile: padding 16px, растягивается по ширине контейнера
    const containerClasses = [
      "w-full relative",
      "flex flex-col items-start",
      "p-16 md:p-20", // padding: 16px для mobile, 20px для desktop
      "box-border gap-12", // gap: 12px
      "bg-gray-core", // bg-aliceblue = #EAEFF8
      "rounded-m", // rounded-2xl = 16px
      "text-left font-euclid",
      "md:max-w-[756px]", // максимальная ширина только для desktop (756px)
      onClick && "cursor-pointer transition-opacity hover:opacity-90", // Кликабельный при наведении
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили для карточки
    // Desktop: padding 16px
    // Mobile: padding 12px
    const cardClasses = [
      "w-full",
      "shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]", // Elevation
      "rounded-m", // rounded-2xl = 16px
      "bg-light-bg-primary", // bg-white
      "border border-brand-blue-alpha-20", // border-darkslateblue-200 border-[1px]
      "overflow-hidden",
      "flex items-end", // alignItems: flex-end как в Figma
      "p-12 md:p-16", // padding: 12px для mobile, 16px для desktop
      "gap-12", // gap: 12px
    ]
      .filter(Boolean)
      .join(" ");

    // Верхняя часть - адаптивная: desktop (row), mobile (column)
    const renderTopSection = () => {
      return (
        <div className="w-full overflow-hidden flex flex-col md:flex-row items-start justify-center md:justify-start self-stretch gap-8 md:gap-20">
          {/* Mobile: badge сверху, gap: 4px между badges (но у нас только один) */}
          {topBadge && (
            <div className="flex md:hidden items-center gap-4 w-full">
              <Badge variant="default">{topBadge}</Badge>
            </div>
          )}
          {/* Desktop: заголовок слева, badge справа */}
          <div className="hidden md:flex flex-1 flex-col items-start min-w-0">
            <h3 className="w-full relative text-title-l font-medium font-euclid text-light-fg-primary tracking-title-l [line-height:32px] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              {title}
            </h3>
          </div>
          {topBadge && (
            <div className="hidden md:block md:max-w-[35%] md:min-w-0 shrink">
              <Badge variant="default" className="w-full min-w-0">
                {topBadge}
              </Badge>
            </div>
          )}
          {/* Mobile: заголовок снизу, gap: 8px от badge */}
          <div className="flex md:hidden flex-col gap-8 w-full">
            <h3 className="w-full relative text-body-xl font-medium font-euclid text-light-fg-primary [line-height:24px] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              {title}
            </h3>
          </div>
        </div>
      );
    };

    // Нижняя часть - карточка с кнопкой play и waveform
    const renderCard = () => {
      return (
        <div className={cardClasses}>
          <ButtonPlayPause
            state="play"
            size={56}
            onToggle={undefined} // Не интерактивная, но не disabled
            onClick={(e) => e.preventDefault()} // Предотвращаем клик на кнопке
            className="!bg-[rgba(52,64,121,0.1)] !shadow-none [&_svg]:!w-24 [&_svg]:!h-24"
          />
          <div className="flex-1 overflow-hidden flex flex-col justify-center self-stretch">
            <div className="w-full flex items-center gap-8">
              <div className="flex-1 overflow-hidden flex items-center gap-2">
                <img
                  src="/icons/waveform.svg"
                  alt="Waveform"
                  className="h-24 object-contain object-left"
                  style={{ minWidth: "569px", width: "100%" }} // Фиксированная минимальная ширина SVG, обрезается контейнером
                />
              </div>
              {duration && (
                <div className="shrink-0 flex items-end py-4 px-8 box-border" style={{ width: "47px" }}>
                  <div className="relative leading-4 font-medium text-body-s text-light-fg-secondary">
                    {duration}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick();
      }
      // Пробрасываем onClick из rest, если он есть
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
        {renderTopSection()}
        {renderCard()}
      </div>
    );
  },
);

AudioCardWeb.displayName = "AudioCardWeb";
