import * as React from "react";
import { Icon } from "@/components/icons";

export type ButtonPlayPauseState = "play" | "pause";
export type ButtonPlayPauseSize = 32 | 56 | 72;

export interface ButtonPlayPauseProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /**
   * Состояние кнопки: play (белая с тенью) или pause (полупрозрачная темная с размытием)
   */
  state?: ButtonPlayPauseState;
  /**
   * Размер кнопки: 32px, 56px или 72px
   */
  size?: ButtonPlayPauseSize;
  /**
   * Обработчик клика для переключения состояния
   */
  onToggle?: (newState: ButtonPlayPauseState) => void;
}

/**
 * Кнопка Play/Pause с двумя состояниями
 * 
 * Состояния:
 * - play: белая кнопка с тенью (Elevation)
 * - pause: полупрозрачная темная кнопка с размытием фона (backdrop blur)
 * 
 * Размеры:
 * - 32px: padding 8px, иконка 16px
 * - 56px: padding 16px, иконка 24px
 * - 72px: padding 16px, иконка 40px
 * 
 * @figma https://www.figma.com/file/{fileKey}/{fileName}?node-id={nodeId}
 * Замените {fileKey}, {fileName} и {nodeId} на соответствующие значения из Figma
 */
export const ButtonPlayPause = React.forwardRef<
  HTMLButtonElement,
  ButtonPlayPauseProps
>(
  (
    {
      state = "play",
      size = 56,
      onToggle,
      className = "",
      onClick,
      ...rest
    },
    ref,
  ) => {
    // Определяем размеры иконки и padding на основе размера кнопки
    // Только в самой большой кнопке (72px) будет самая большая иконка (24px)
    const getSizeConfig = () => {
      switch (size) {
        case 32:
          return {
            iconSize: 16,
            padding: 8,
            buttonSize: 32,
          };
        case 56:
          return {
            iconSize: 20,
            padding: 16,
            buttonSize: 56,
          };
        case 72:
          return {
            iconSize: 24, // Самая большая иконка только для самой большой кнопки
            padding: 16,
            buttonSize: 72,
          };
        default:
          return {
            iconSize: 20,
            padding: 16,
            buttonSize: 56,
          };
      }
    };

    const { iconSize, padding, buttonSize } = getSizeConfig();

    // Обработчик клика с переключением состояния
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onToggle) {
        const newState = state === "play" ? "pause" : "play";
        onToggle(newState);
      }
      onClick?.(e);
    };

    // Стили для состояния play
    const playClasses = [
      "bg-core-inverted", // белый фон
      "shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05),0px_0px_0px_1px_rgba(34,38,59,0.05)]", // Elevation
    ];

    // Стили для состояния pause
    const pauseClasses = [
      "bg-core-alpha-60", // rgba(34, 38, 59, 0.6)
      "backdrop-blur-[20px]", // backdrop-filter: blur(20px)
    ];

    const stateClasses = state === "play" ? playClasses : pauseClasses;

    const baseClasses = [
      "flex items-center justify-center",
      "rounded-full",
      "transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
      "focus-visible:ring-offset-light-bg-primary dark:focus-visible:ring-offset-dark-bg-primary",
      "disabled:cursor-not-allowed disabled:opacity-50",
      ...stateClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const sizeStyle: React.CSSProperties = {
      width: buttonSize,
      height: buttonSize,
      minWidth: buttonSize,
      minHeight: buttonSize,
      padding: `${padding}px`,
    };

    const iconColor = state === "play" ? "text-brand-blue" : "text-core-inverted";

    return (
      <button
        ref={ref}
        type="button"
        className={baseClasses}
        style={sizeStyle}
        onClick={handleClick}
        aria-label={state === "play" ? "Play" : "Pause"}
        {...rest}
      >
        {state === "play" ? (
          <Icon
            name="play"
            size={iconSize as 16 | 20 | 24}
            className={iconColor}
          />
        ) : (
          <Icon
            name="pause"
            size={iconSize as 16 | 20 | 24}
            className={iconColor}
          />
        )}
      </button>
    );
  },
);

ButtonPlayPause.displayName = "ButtonPlayPause";
