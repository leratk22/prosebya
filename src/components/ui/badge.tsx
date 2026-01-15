"use client";

import * as React from "react";
import { Icon } from "@/components/icons";

export type BadgeVariant = "default" | "invert";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Вариант бейджа согласно Figma: Type = Default / Invert
   */
  variant?: BadgeVariant;
  /**
   * Название иконки из библиотеки (например, "test", "check")
   * Если не указано, иконка не отображается
   * Иконка всегда имеет размер 16px
   */
  iconName?: string;
  /**
   * Текст бейджа
   */
  children: React.ReactNode;
}

/**
 * Компонент Badge
 * 
 * Варианты:
 * - default: фон brand-blue-alpha-10, текст brand-blue
 * - invert: фон core-inverted-alpha-10, текст core-inverted (для темного фона)
 * 
 * Иконка опциональна и может отключаться.
 * 
 * @figma https://www.figma.com/file/{fileKey}/{fileName}?node-id={nodeId}
 * Замените {fileKey}, {fileName} и {nodeId} на соответствующие значения из Figma
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = "default",
      iconName,
      children,
      className = "",
      ...rest
    },
    ref,
  ) => {
    // Стили для варианта default
    const defaultClasses = [
      "bg-brand-blue-alpha-10", // rgba(52, 64, 121, 0.1)
      "text-brand-blue", // #344079
    ];

    // Стили для варианта invert
    const invertClasses = [
      "bg-core-inverted-alpha-10", // rgba(255, 255, 255, 0.1)
      "text-core-inverted", // #FFFFFF
    ];

    const variantClasses =
      variant === "default" ? defaultClasses : invertClasses;

    const baseClasses = [
      "relative", // как в Figma
      "inline-flex items-start gap-4", // items-start, gap-4 (4px) - используем spacing из config
      "px-8 py-4", // px-8 (8px боковые) py-4 (4px вертикальные) - используем spacing из config
      "box-border", // как в Figma
      "rounded-full", // rounded-[100px] в Figma
      "text-left", // как в Figma
      "text-body-s font-medium font-euclid leading-4", // text-body-s (12px), leading-4 (16px), letter-spacing: 0 (стандартный)
      ...variantClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={baseClasses} {...rest}>
        {iconName && (
          <Icon 
            name={iconName} 
            size={16} 
            className="shrink-0 flex-shrink-0"
          />
        )}
        <div className="relative leading-4 font-medium">{children}</div>
      </div>
    );
  },
);

Badge.displayName = "Badge";
