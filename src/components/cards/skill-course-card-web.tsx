"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ButtonPlayPause } from "@/components/ui/button-play-pause";
import { Badge } from "@/components/ui/badge";

export type SkillCourseCardState = "default" | "in-progress";

export interface SkillCourseCardWebProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Тэг (Caption/S, uppercase)
   */
  subtitle?: string;
  /**
   * Заголовок курса
   */
  title: string;
  /**
   * Состояние карточки
   */
  state?: SkillCourseCardState;

  // Для состояния Default
  /**
   * URL изображения видео
   */
  videoImageUrl?: string;
  /**
   * Alt текст для видео
   */
  videoImageAlt?: string;
  /**
   * Текст кнопки
   */
  buttonText?: string;
  /**
   * Обработчик клика кнопки
   */
  buttonOnClick?: () => void;
  /**
   * Тэг для отображения на видео (Mobile Default)
   */
  videoTag?: string;

  // Для состояния In progress
  /**
   * Подзаголовок следующего упражнения ("Следующее упражнение")
   */
  nextExerciseSubtitle?: string;
  /**
   * Название упражнения
   */
  nextExerciseTitle?: string;
  /**
   * URL обложки упражнения
   */
  nextExerciseImageUrl?: string;
  /**
   * Alt текст для обложки
   */
  nextExerciseImageAlt?: string;
  /**
   * Текст кнопки упражнения
   */
  nextExerciseButtonText?: string;
  /**
   * Обработчик клика кнопки упражнения
   */
  nextExerciseButtonOnClick?: () => void;

  // Общие
  /**
   * Обработчик клика на всю карточку
   */
  onClick?: () => void;
}

/**
 * Компонент SkillCourseCardWeb
 *
 * Карточка для отображения курса навыков:
 * - Поддерживает два состояния: Default и In progress
 * - Адаптивная верстка для Desktop и Mobile
 * - Desktop: максимальная ширина 756px
 * - Mobile: ширина растягивается под контейнер
 * - Брейкпоинт: md
 *
 * Состояние Default:
 * - Desktop: горизонтальный layout с текстом слева, кнопкой и видео справа
 * - Mobile: вертикальный layout с видео сверху (с кнопкой play и тэгом) и заголовком снизу
 *
 * Состояние In progress:
 * - Desktop и Mobile: текст с тэгом и заголовком сверху, внизу карточка с упражнением
 */
export const SkillCourseCardWeb = React.forwardRef<
  HTMLDivElement,
  SkillCourseCardWebProps
>(
  (
    {
      subtitle,
      title,
      state = "default",
      videoImageUrl,
      videoImageAlt = "Video preview",
      buttonText,
      buttonOnClick,
      videoTag,
      nextExerciseSubtitle,
      nextExerciseTitle,
      nextExerciseImageUrl,
      nextExerciseImageAlt = "Exercise cover",
      nextExerciseButtonText,
      nextExerciseButtonOnClick,
      onClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    // Исключаем onClick из rest
    type RestProps = Omit<
      React.HTMLAttributes<HTMLDivElement>,
      | "onClick"
      | "subtitle"
      | "title"
      | "state"
      | "videoImageUrl"
      | "videoImageAlt"
      | "buttonText"
      | "buttonOnClick"
      | "videoTag"
      | "nextExerciseSubtitle"
      | "nextExerciseTitle"
      | "nextExerciseImageUrl"
      | "nextExerciseImageAlt"
      | "nextExerciseButtonText"
      | "nextExerciseButtonOnClick"
      | "className"
    >;
    const restProps = rest as RestProps;

    const [videoImageError, setVideoImageError] = React.useState(false);
    const [exerciseImageError, setExerciseImageError] = React.useState(false);

    // Обработчик клика на карточку
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick();
      }
    };

    // Обработчик клика кнопки (предотвращаем всплытие)
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (buttonOnClick) {
        buttonOnClick();
      }
    };

    // Обработчик клика кнопки упражнения (предотвращаем всплытие)
    const handleExerciseButtonClick = (
      e: React.MouseEvent<HTMLButtonElement>,
    ) => {
      e.stopPropagation();
      if (nextExerciseButtonOnClick) {
        nextExerciseButtonOnClick();
      }
    };

    // Состояние Default - Desktop
    const renderDefaultDesktop = () => {
      return (
        <div className="flex flex-row items-stretch gap-16 p-20">
          {/* Левая часть - текст и кнопка */}
          <div className="flex flex-col justify-between flex-1 min-w-0 gap-8">
            {/* Текстовая часть */}
            <div className="flex flex-col gap-8 flex-1 min-w-0">
              {subtitle && (
                <p
                  className="font-medium font-euclid text-light-fg-secondary dark:text-dark-fg-secondary uppercase"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.3333333333333333em",
                    letterSpacing: "0.1em", // 10%
                  }}
                >
                  {subtitle}
                </p>
              )}
              <h3
                className="font-semibold font-euclid text-light-fg-primary dark:text-dark-fg-primary line-clamp-3"
                style={{
                  fontSize: "24px",
                  lineHeight: "1.3333333333333333em",
                  letterSpacing: "-0.015em", // -1.5%
                }}
              >
                {title}
              </h3>
            </div>
            {/* Кнопка */}
            {buttonText && (
              <Button
                variant="primary"
                size="m"
                rightIconName="chevron-right"
                onClick={handleButtonClick}
                className="self-start"
                fullWidth={false}
              >
                {buttonText}
              </Button>
            )}
          </div>
          {/* Правая часть - видео с кнопкой play */}
          {videoImageUrl && (
            <div className="relative shrink-0 w-[343px] h-[193px] rounded-m overflow-hidden">
              {!videoImageError ? (
                <>
                  <img
                    src={videoImageUrl}
                    alt={videoImageAlt}
                    className="w-full h-full object-cover"
                    onError={() => setVideoImageError(true)}
                  />
                  {/* Кнопка play по центру */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <ButtonPlayPause state="play" size={56} />
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-light-bg-secondary dark:bg-dark-bg-secondary flex items-center justify-center">
                  <span className="text-light-fg-tertiary dark:text-dark-fg-tertiary text-body-s">
                    Изображение не загружено
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      );
    };

    // Состояние Default - Mobile
    const renderDefaultMobile = () => {
      return (
        <div className="flex flex-col gap-8 p-16">
          {/* Видео с кнопкой play и тэгом */}
          {videoImageUrl && (
            <div className="relative w-full h-[193px] rounded-m overflow-hidden">
              {!videoImageError ? (
                <>
                  <img
                    src={videoImageUrl}
                    alt={videoImageAlt}
                    className="w-full h-full object-cover"
                    onError={() => setVideoImageError(true)}
                  />
                  {/* Кнопка play по центру */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <ButtonPlayPause state="play" size={72} />
                  </div>
                  {/* Тэг внизу слева (videoAddon) */}
                  {videoTag && (
                    <div className="absolute bottom-12 left-12 pointer-events-none">
                      <div
                        className="inline-flex items-center gap-4 px-6 py-2 rounded-full backdrop-blur-[20px]"
                        style={{
                          backgroundColor: "rgba(34, 38, 59, 0.6)",
                        }}
                      >
                        <span
                          className="font-medium font-euclid text-white"
                          style={{
                            fontSize: "12px",
                            lineHeight: "1.3333333333333333em",
                          }}
                        >
                          {videoTag}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-light-bg-secondary dark:bg-dark-bg-secondary flex items-center justify-center">
                  <span className="text-light-fg-tertiary dark:text-dark-fg-tertiary text-body-s">
                    Изображение не загружено
                  </span>
                </div>
              )}
            </div>
          )}
          {/* Заголовок (content) */}
          <div className="px-0">
            <h3
              className="font-semibold font-euclid text-light-fg-primary dark:text-dark-fg-primary line-clamp-2"
              style={{
                fontSize: "20px",
                lineHeight: "1.2em",
                letterSpacing: "-0.01em", // -1%
              }}
            >
              {title}
            </h3>
          </div>
        </div>
      );
    };

    // Состояние In progress - Desktop
    const renderInProgressDesktop = () => {
      return (
        <div className="flex flex-col gap-12 p-24">
          {/* Текстовая часть сверху */}
          <div className="flex flex-col gap-4">
            {subtitle && (
              <p
                className="font-medium font-euclid text-light-fg-secondary dark:text-dark-fg-secondary uppercase"
                style={{
                  fontSize: "12px",
                  lineHeight: "1.3333333333333333em",
                  letterSpacing: "0.1em", // 10%
                }}
              >
                {subtitle}
              </p>
            )}
            <h3
              className="font-semibold font-euclid text-light-fg-primary dark:text-dark-fg-primary line-clamp-2"
              style={{
                fontSize: "20px",
                lineHeight: "1.2em",
                letterSpacing: "-0.01em", // -1%
              }}
            >
              {title}
            </h3>
          </div>
          {/* Карточка с упражнением */}
          {(nextExerciseTitle || nextExerciseImageUrl) && (
            <div className="flex flex-row gap-16 p-16 bg-light-bg-primary dark:bg-dark-bg-primary rounded-m border border-light-border-secondary dark:border-dark-border-secondary shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]">
              {/* Обложка упражнения */}
              {nextExerciseImageUrl && (
                <div className="shrink-0 w-[160px] h-[192px] rounded-s overflow-hidden">
                  {!exerciseImageError ? (
                    <img
                      src={nextExerciseImageUrl}
                      alt={nextExerciseImageAlt}
                      className="w-full h-full object-cover"
                      onError={() => setExerciseImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-light-bg-secondary dark:bg-dark-bg-secondary flex items-center justify-center">
                      <span className="text-light-fg-tertiary dark:text-dark-fg-tertiary text-body-s text-center px-8">
                        Изображение не загружено
                      </span>
                    </div>
                  )}
                </div>
              )}
              {/* Текст и кнопка */}
              <div className="flex flex-col justify-between flex-1 min-w-0 gap-24">
                {/* Текстовая часть */}
                <div className="flex flex-col gap-4 flex-1 min-w-0">
                  {nextExerciseSubtitle && (
                    <p
                      className="font-regular font-euclid text-light-fg-secondary dark:text-dark-fg-secondary"
                      style={{
                        fontSize: "12px",
                        lineHeight: "1.3333333333333333em",
                      }}
                    >
                      {nextExerciseSubtitle}
                    </p>
                  )}
                  {nextExerciseTitle && (
                    <h4
                      className="font-semibold font-euclid text-light-fg-primary dark:text-dark-fg-primary line-clamp-3"
                      style={{
                        fontSize: "24px",
                        lineHeight: "1.3333333333333333em",
                        letterSpacing: "-0.015em", // -1.5%
                      }}
                    >
                      {nextExerciseTitle}
                    </h4>
                  )}
                </div>
                {/* Кнопка */}
                {nextExerciseButtonText && (
                  <Button
                    variant="primary"
                    size="m"
                    rightIconName="chevron-right"
                    onClick={handleExerciseButtonClick}
                    className="self-start"
                    fullWidth={false}
                  >
                    {nextExerciseButtonText}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      );
    };

    // Состояние In progress - Mobile
    const renderInProgressMobile = () => {
      return (
        <div className="flex flex-col gap-8 p-16">
          {/* Текстовая часть сверху */}
          <div className="flex flex-col gap-4">
            {subtitle && (
              <p
                className="font-regular font-euclid text-light-fg-secondary dark:text-dark-fg-secondary"
                style={{
                  fontSize: "14px",
                  lineHeight: "1.4285714285714286em",
                }}
              >
                {subtitle}
              </p>
            )}
            <h3
              className="font-semibold font-euclid text-light-fg-primary dark:text-dark-fg-primary line-clamp-2"
              style={{
                fontSize: "24px",
                lineHeight: "1.3333333333333333em",
                letterSpacing: "-0.015em", // -1.5%
              }}
            >
              {title}
            </h3>
          </div>
          {/* Карточка с упражнением */}
          {(nextExerciseTitle || nextExerciseImageUrl) && (
            <div className="flex flex-col gap-16 p-16 bg-light-bg-primary dark:bg-dark-bg-primary rounded-s border border-light-border-secondary dark:border-dark-border-secondary shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]">
              {/* Контент: обложка и текст */}
              <div className="flex flex-row gap-12">
                {/* Обложка упражнения */}
                {nextExerciseImageUrl && (
                  <div className="shrink-0 w-[80px] h-[96px] rounded-s overflow-hidden">
                    {!exerciseImageError ? (
                      <img
                        src={nextExerciseImageUrl}
                        alt={nextExerciseImageAlt}
                        className="w-full h-full object-cover"
                        onError={() => setExerciseImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-light-bg-secondary dark:bg-dark-bg-secondary flex items-center justify-center">
                        <span className="text-light-fg-tertiary dark:text-dark-fg-tertiary text-body-s text-center px-4 text-[10px]">
                          Изображение не загружено
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {/* Текстовая часть */}
                <div className="flex flex-col gap-8 flex-1 min-w-0">
                  {nextExerciseTitle && (
                    <h4
                      className="font-medium font-euclid text-light-fg-primary dark:text-dark-fg-primary line-clamp-3"
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.5em",
                      }}
                    >
                      {nextExerciseTitle}
                    </h4>
                  )}
                  {nextExerciseSubtitle && (
                    <p
                      className="font-medium font-euclid text-light-fg-secondary dark:text-dark-fg-secondary"
                      style={{
                        fontSize: "12px",
                        lineHeight: "1.3333333333333333em",
                      }}
                    >
                      {nextExerciseSubtitle}
                    </p>
                  )}
                </div>
              </div>
              {/* Кнопка */}
              {nextExerciseButtonText && (
                <Button
                  variant="primary"
                  size="m"
                  rightIconName="chevron-right"
                  onClick={handleExerciseButtonClick}
                  fullWidth={true}
                >
                  {nextExerciseButtonText}
                </Button>
              )}
            </div>
          )}
        </div>
      );
    };

    // Определяем фон в зависимости от состояния
    const bgClass =
      state === "in-progress"
        ? "bg-gray-light dark:bg-dark-bg-tertiary"
        : "bg-gray-core dark:bg-dark-bg-secondary";

    // Стили для основного контейнера
    const containerClasses = [
      "relative",
      "w-full",
      "md:max-w-[756px]",
      bgClass,
      "rounded-m",
      onClick && "cursor-pointer transition-opacity hover:opacity-90",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={containerClasses}
        onClick={handleClick}
        {...restProps}
      >
        {/* Desktop версия */}
        <div className="hidden md:block">
          {state === "default"
            ? renderDefaultDesktop()
            : renderInProgressDesktop()}
        </div>
        {/* Mobile версия */}
        <div className="block md:hidden">
          {state === "default"
            ? renderDefaultMobile()
            : renderInProgressMobile()}
        </div>
      </div>
    );
  },
);

SkillCourseCardWeb.displayName = "SkillCourseCardWeb";
