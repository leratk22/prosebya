import * as React from "react";
import { ChevronDown } from "lucide-react";
import { type ButtonProps, type ButtonSize } from "./button";

export interface ButtonExpandProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "type"
  > {
  /**
   * Текст кнопки
   */
  label: string;
  /**
   * Значение счетчика
   */
  count?: number;
  /**
   * Размер кнопки: M (24px иконка) или S (20px иконка)
   */
  size?: "m" | "s";
  /**
   * Иконка справа (по умолчанию ChevronDown)
   */
  icon?: React.ReactNode;
}

/**
 * Кнопка со счетчиком и иконкой (button-expand)
 * 
 * Всегда использует вариант Secondary согласно Figma.
 * Поддерживает состояния: Default, Pressed, Disabled.
 * 
 * Структура:
 * - Левая часть: пустое место для выравнивания (24x24 или 20x20)
 * - Центр: Label + счетчик (счетчик с opacity 0.5)
 * - Правая часть: иконка chevron-down (24px для M, 20px для S)
 * 
 * @figma https://www.figma.com/file/{fileKey}/{fileName}?node-id={nodeId}
 * Замените {fileKey}, {fileName} и {nodeId} на соответствующие значения из Figma
 */
export const ButtonExpand = React.forwardRef<
  HTMLButtonElement,
  ButtonExpandProps
>(
  (
    {
      label,
      count = 0,
      size = "m",
      icon,
      className = "",
      disabled,
      ...rest
    },
    ref,
  ) => {
    const iconSize = size === "m" ? 24 : 20;
    const emptySize = iconSize; // Пустое место для выравнивания

    // Определяем размер для стилей
    const buttonSize: ButtonSize = size === "m" ? "l" : "m";
    const SIZE_CLASSES: Record<ButtonSize, string> = {
      l: "text-title-s md:text-label-l",
      m: "text-label-m",
      s: "text-label-s",
    };

    // Иконка по умолчанию или переданная
    const rightIconElement = icon ?? (
      <ChevronDown style={{ width: iconSize, height: iconSize }} />
    );

    // Стили для secondary варианта
    const isDisabled = Boolean(disabled);
    const variantClasses = [
      "bg-transparent text-brand-blue border border-brand-blue-alpha-20 rounded-full",
      !isDisabled && "hover:bg-core-alpha-5 active:bg-core-alpha-5",
      isDisabled &&
        "disabled:border-core-alpha-10 disabled:text-core-alpha-40",
    ]
      .filter(Boolean)
      .join(" ");

    const baseClasses = [
      "flex items-center justify-between gap-4",
      "px-20 py-12",
      "font-semibold font-euclid",
      "rounded-full",
      "w-full",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
      "focus-visible:ring-offset-light-bg-primary dark:focus-visible:ring-offset-dark-bg-primary",
      "disabled:cursor-not-allowed",
      SIZE_CLASSES[buttonSize],
      variantClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={baseClasses}
        {...rest}
      >
        {/* Левая часть: пустое место для выравнивания (24x24 или 20x20) */}
        <span
          className="shrink-0 flex items-center justify-center"
          style={{ width: emptySize, height: emptySize }}
          aria-hidden="true"
        />

        {/* Центр: Label + счетчик (растягивается и центрируется) */}
        <span className="flex-1 flex items-center justify-center gap-4 min-w-0">
          <span className="whitespace-nowrap">{label}</span>
          {count !== undefined && (
            <span
              className={`whitespace-nowrap ${
                disabled
                  ? "text-core-alpha-40"
                  : "text-brand-blue opacity-50"
              }`}
            >
              {count}
            </span>
          )}
        </span>

        {/* Правая часть: иконка (24x24 или 20x20) */}
        <span
          className="shrink-0 flex items-center justify-center"
          style={{ width: iconSize, height: iconSize }}
        >
          {rightIconElement}
        </span>
      </button>
    );
  },
);

ButtonExpand.displayName = "ButtonExpand";
