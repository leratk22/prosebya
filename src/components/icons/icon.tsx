"use client";

import * as React from "react";
import iconsData from "@/data/icons.json";

type IconSize = 16 | 20 | 24 | 32 | 40;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Название иконки (без размера и расширения)
   */
  name: string;
  /**
   * Размер иконки в пикселях
   */
  size?: IconSize;
  /**
   * Цвет иконки (по умолчанию currentColor, можно переопределить через className)
   */
  color?: string;
}

/**
 * Компонент для отображения SVG иконок из библиотеки
 * 
 * Использование:
 * ```tsx
 * <Icon name="play" size={24} />
 * <Icon name="chevron-right" size={20} className="text-brand-blue" />
 * ```
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 16, color, className = "", ...props }, ref) => {
    // Находим иконку в данных
    const iconData = iconsData.find((icon) => icon.name === name);

    if (!iconData) {
      if (typeof window !== "undefined") {
        console.warn(`Icon "${name}" not found in icon library`);
      }
      return null;
    }

    // Проверяем, есть ли нужный размер
    let finalSize = size;
    if (!iconData.sizes.includes(size)) {
      if (typeof window !== "undefined") {
        console.warn(
          `Icon "${name}" doesn't have size ${size}. Available sizes: ${iconData.sizes.join(", ")}`,
        );
      }
      // Используем ближайший доступный размер
      const availableSize = iconData.sizes.find((s) => s >= size) || iconData.sizes[iconData.sizes.length - 1];
      finalSize = availableSize as IconSize;
    }

    const fileName = iconData.files[String(finalSize) as "16" | "20" | "24"];
    if (!fileName) {
      if (typeof window !== "undefined") {
        console.error(`Icon "${name}" doesn't have file for size ${finalSize}`);
      }
      return null;
    }
    const iconPath = `/icons/${fileName}`;

    // Загружаем SVG содержимое только на клиенте
    const [svgContent, setSvgContent] = React.useState<string | null>(null);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
      fetch(iconPath)
        .then((res) => res.text())
        .then((text) => {
          setSvgContent(text);
        })
        .catch((err) => {
          console.error(`Failed to load icon "${name}" (${finalSize}px):`, err);
        });
    }, [iconPath, name, finalSize]);

    // На сервере возвращаем placeholder
    if (!mounted || !svgContent) {
      return (
        <svg
          ref={ref}
          width={finalSize}
          height={finalSize}
          viewBox={`0 0 ${finalSize} ${finalSize}`}
          className={className}
          {...props}
        />
      );
    }

    // Парсим SVG и извлекаем содержимое path
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg");

    if (!svgElement) {
      return null;
    }

    // Извлекаем viewBox из оригинального SVG
    const viewBox = svgElement.getAttribute("viewBox") || `0 0 ${finalSize} ${finalSize}`;

    // Извлекаем все path элементы
    const paths = Array.from(svgElement.querySelectorAll("path"));

    // Обрабатываем path элементы с учетом fill и stroke
    const pathsWithColor = paths.map((path, index) => {
      const pathElement = path.cloneNode(true) as SVGPathElement;
      const originalFill = pathElement.getAttribute("fill");
      const originalStroke = pathElement.getAttribute("stroke");
      
      if (color) {
        // Если указан цвет, применяем его к fill и stroke
        if (originalFill && originalFill !== "none") {
          pathElement.setAttribute("fill", color);
        }
        if (originalStroke && originalStroke !== "none") {
          pathElement.setAttribute("stroke", color);
        }
      } else {
        // Если цвет не указан, используем currentColor для возможности переопределения через className
        if (originalFill && originalFill !== "none") {
          pathElement.setAttribute("fill", "currentColor");
        }
        if (originalStroke && originalStroke !== "none") {
          pathElement.setAttribute("stroke", "currentColor");
        }
      }
      
      // Собираем все атрибуты
      const attributes: Record<string, string> = {};
      Array.from(pathElement.attributes).forEach((attr) => {
        attributes[attr.name] = attr.value;
      });
      
      return (
        <path
          key={index}
          {...attributes}
        />
      );
    });

    return (
      <svg
        ref={ref}
        width={finalSize}
        height={finalSize}
        viewBox={viewBox}
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {pathsWithColor}
      </svg>
    );
  },
);

Icon.displayName = "Icon";
