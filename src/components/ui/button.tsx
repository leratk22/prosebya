"use client";

import * as React from "react";
import { Icon } from "@/components/icons";
import { Spinner } from "@/components/ui/spinner";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "s" | "m" | "l";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Вариант кнопки согласно Figma: Type = Primary / Secondary / Tertiary
   */
  variant?: ButtonVariant;
  /**
   * Размер кнопки согласно Figma: Size = S / M / L
   */
  size?: ButtonSize;
  /**
   * Inverted = True — варианты для тёмного/инвертированного фона
   * (во Figma заданы для Secondary и Tertiary).
   */
  inverted?: boolean;
  /**
   * Делать кнопку на всю доступную ширину контейнера.
   */
  fullWidth?: boolean;
  /**
   * Состояние загрузки. При loading=true кнопка становится disabled,
   * вместо текста отображается спиннер 16px белого цвета
   */
  loading?: boolean;
  /**
   * Название иконки из библиотеки слева (например, "play", "chevron-left")
   * Автоматически определяется размер иконки по размеру кнопки (L→24px, M→20px, S→16px)
   */
  leftIconName?: string;
  /**
   * Название иконки из библиотеки справа (например, "chevron-right")
   * Автоматически определяется размер иконки по размеру кнопки (L→24px, M→20px, S→16px)
   */
  rightIconName?: string;
  /**
   * Размер иконок (16, 20, 24). Переопределяет автоматический размер.
   * Если не указан, размер определяется по размеру кнопки.
   */
  iconSize?: 16 | 20 | 24;
  /**
   * Левая иконка (ReactNode) - для кастомных иконок или обратной совместимости.
   * Если указан leftIconName, этот пропс игнорируется.
   */
  leftIcon?: React.ReactNode;
  /**
   * Правая иконка (ReactNode) - для кастомных иконок или обратной совместимости.
   * Если указан rightIconName, этот пропс игнорируется.
   */
  rightIcon?: React.ReactNode;
}

/**
 * Компонент Button
 * 
 * Варианты: Primary, Secondary, Tertiary
 * Размеры: S, M, L
 * Поддерживает инвертированные варианты для темного фона
 * 
 * @figma https://www.figma.com/file/{fileKey}/{fileName}?node-id={nodeId}
 * Замените {fileKey}, {fileName} и {nodeId} на соответствующие значения из Figma
 */

const SIZE_CLASSES: Record<ButtonSize, string> = {
  // Label/S, Label/M, Label/L — 12px, 14px, 16px
  s: "text-label-s",
  m: "text-label-m",
  l: "text-label-l",
};

function variantClasses(
  variant: ButtonVariant,
  inverted: boolean | undefined,
  disabled: boolean | undefined,
): string {
  const isDisabled = Boolean(disabled);

  if (variant === "primary") {
    // Figma: заливка brand orange, hover — orange hover, disabled — gray muted + muted текст
    return [
      // default
      "bg-brand-orange text-core rounded-full border border-transparent",
      // hover / active
      !isDisabled && "hover:bg-brand-orange-hover active:bg-brand-orange-hover",
      // disabled
      isDisabled &&
        "disabled:bg-gray-muted disabled:text-core-alpha-40 disabled:border-gray-muted",
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (variant === "secondary") {
    if (inverted) {
      // Inverted=True: бордер и текст белые, hover/pressed — лёгкий overlay
      return [
        "bg-transparent text-core-inverted border border-core-inverted-alpha-10 rounded-full",
        !isDisabled && "hover:bg-core-alpha-5 active:bg-core-alpha-5",
        isDisabled &&
          "disabled:border-core-inverted-alpha-10 disabled:text-core-inverted-alpha-40",
      ]
        .filter(Boolean)
        .join(" ");
    }

    // Inverted=False
    return [
      "bg-transparent text-brand-blue border border-brand-blue-alpha-20 rounded-full",
      !isDisabled && "hover:bg-core-alpha-5 active:bg-core-alpha-5",
      isDisabled &&
        "disabled:border-core-alpha-10 disabled:text-core-alpha-40",
    ]
      .filter(Boolean)
      .join(" ");
  }

  // Tertiary
  if (inverted) {
    // Inverted=True: только текст, hover/pressed с overlay, disabled — приглушённый текст
    return [
      "bg-transparent text-core-inverted rounded-full",
      !isDisabled && "hover:bg-core-alpha-5 active:bg-core-alpha-5",
      isDisabled && "disabled:text-core-inverted-alpha-40",
    ]
      .filter(Boolean)
      .join(" ");
  }

  // Inverted=False
  return [
    "bg-transparent text-brand-blue rounded-full",
    !isDisabled && "hover:bg-core-alpha-5 active:bg-core-alpha-5",
    isDisabled && "disabled:text-core-alpha-40",
  ]
    .filter(Boolean)
    .join(" ");
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "m",
      inverted,
      fullWidth = true,
      loading = false,
      leftIconName,
      rightIconName,
      iconSize,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    // При loading кнопка должна быть disabled
    const isDisabled = disabled || loading;
    // Определяем размер иконки на основе размера кнопки
    const getIconSize = (): 16 | 20 | 24 => {
      if (iconSize) return iconSize;
      // L → 24px, M → 20px, S → 16px
      switch (size) {
        case "l":
          return 24;
        case "m":
          return 20;
        case "s":
          return 16;
        default:
          return 20;
      }
    };

    const finalIconSize = getIconSize();

    const base = [
      "inline-flex items-center justify-center gap-2",
      "px-16 py-12",
      // типографика из токенов: Euclid Circular, semibold
      "font-semibold font-euclid",
      // управление шириной и радиусами
      "rounded-full",
      // состояния фокуса
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
      "focus-visible:ring-offset-light-bg-primary dark:focus-visible:ring-offset-dark-bg-primary",
      // disabled
      "disabled:cursor-not-allowed",
    ];

    if (fullWidth) {
      base.push("w-full");
    }

    const sizeCls = SIZE_CLASSES[size];
    const variantCls = variantClasses(variant, inverted, isDisabled);

    const classes = [
      ...base,
      sizeCls,
      variantCls,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // В состоянии загрузки показываем только спиннер (16px, желтый по умолчанию)
    if (loading) {
      return (
        <button
          ref={ref}
          type={type}
          disabled={isDisabled}
          className={classes}
          {...rest}
        >
          <Spinner size={16} aria-label="Загрузка" />
        </button>
      );
    }

    // Определяем, какую иконку показывать слева
    const leftIconElement = leftIconName ? (
      <span className="shrink-0">
        <Icon name={leftIconName} size={finalIconSize} />
      </span>
    ) : leftIcon ? (
      <span className="shrink-0">{leftIcon}</span>
    ) : null;

    // Определяем, какую иконку показывать справа
    const rightIconElement = rightIconName ? (
      <span className="shrink-0">
        <Icon name={rightIconName} size={finalIconSize} />
      </span>
    ) : rightIcon ? (
      <span className="shrink-0">{rightIcon}</span>
    ) : null;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={classes}
        {...rest}
      >
        {leftIconElement}
        <span className="whitespace-nowrap">{children}</span>
        {rightIconElement}
      </button>
    );
  },
);

Button.displayName = "Button";

