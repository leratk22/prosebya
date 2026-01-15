import * as React from "react";
import { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from "./button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export type ButtonGroupType =
  | "default"
  | "play"
  | "navigation"
  | "2-buttons"
  | "2-buttons-vertical"
  | "3-buttons-vertical"
  | "3-buttons-vertical-2"
  | "navigation-2"
  | "button-checkbox";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupButtonConfig {
  /**
   * Текст кнопки
   */
  label: string;
  /**
   * Вариант кнопки
   */
  variant?: ButtonVariant;
  /**
   * Размер кнопки
   */
  size?: ButtonSize;
  /**
   * Инвертированная кнопка
   */
  inverted?: boolean;
  /**
   * Отключенная кнопка
   */
  disabled?: boolean;
  /**
   * Левая иконка
   */
  leftIcon?: React.ReactNode;
  /**
   * Правая иконка
   */
  rightIcon?: React.ReactNode;
  /**
   * Обработчик клика
   */
  onClick?: () => void;
}

export interface ButtonGroupProps {
  /**
   * Тип группы кнопок согласно Figma
   */
  type?: ButtonGroupType;
  /**
   * Направление расположения кнопок
   */
  orientation?: ButtonGroupOrientation;
  /**
   * Расстояние между кнопками (4px или 8px)
   */
  gap?: 4 | 8;
  /**
   * Массив конфигураций кнопок
   */
  buttons?: ButtonGroupButtonConfig[];
  /**
   * Дополнительные CSS классы
   */
  className?: string;
  /**
   * Дочерние элементы (альтернатива buttons)
   */
  children?: React.ReactNode;
}

/**
 * Компонент группы кнопок согласно Figma дизайн-системе
 * 
 * Поддерживает различные типы групп:
 * - default: одна кнопка Primary
 * - play: кнопка с иконкой Play
 * - navigation: две кнопки навигации (Secondary + Primary с иконками)
 * - 2-buttons: две кнопки горизонтально (Secondary + Primary)
 * - 2-buttons-vertical: две кнопки вертикально (Primary + Secondary)
 * - 3-buttons-vertical: три кнопки вертикально (Primary + Secondary + Secondary)
 * - 3-buttons-vertical-2: три кнопки вертикально (Primary + Secondary + Tertiary)
 * - navigation-2: две кнопки навигации (Secondary с иконкой + Primary с текстом)
 * - button-checkbox: кнопка с чекбоксом (пока без реализации чекбокса)
 * 
 * @figma https://www.figma.com/file/{fileKey}/{fileName}?node-id={nodeId}
 * Замените {fileKey}, {fileName} и {nodeId} на соответствующие значения из Figma
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      type = "default",
      orientation,
      gap,
      buttons,
      className = "",
      children,
      ...rest
    },
    ref,
  ) => {
    // Определяем ориентацию и gap на основе типа
    const getLayoutConfig = () => {
      switch (type) {
        case "default":
        case "play":
          return { orientation: "vertical" as const, gap: 16 };
        case "navigation":
        case "2-buttons":
        case "navigation-2":
          return { orientation: "horizontal" as const, gap: 4 };
        case "2-buttons-vertical":
        case "3-buttons-vertical":
        case "3-buttons-vertical-2":
        case "button-checkbox":
          return { orientation: "vertical" as const, gap: 8 };
        default:
          return { orientation: "vertical" as const, gap: 8 };
      }
    };

    const layoutConfig = getLayoutConfig();
    const finalOrientation = orientation ?? layoutConfig.orientation;
    const finalGap = gap ?? layoutConfig.gap;

    // Генерируем кнопки на основе типа
    const renderButtons = () => {
      if (children) {
        return children;
      }

      if (buttons && buttons.length > 0) {
        return buttons.map((buttonConfig, index) => (
          <Button
            key={index}
            variant={buttonConfig.variant ?? "primary"}
            size={buttonConfig.size ?? "l"}
            inverted={buttonConfig.inverted}
            disabled={buttonConfig.disabled}
            leftIcon={buttonConfig.leftIcon}
            rightIcon={buttonConfig.rightIcon}
            onClick={buttonConfig.onClick}
            fullWidth={finalOrientation === "vertical"}
          >
            {buttonConfig.label}
          </Button>
        ));
      }

      // Рендерим кнопки на основе типа
      switch (type) {
        case "default":
          return (
            <Button variant="primary" size="l" fullWidth>
              Label
            </Button>
          );

        case "play":
          return (
            <Button
              variant="primary"
              size="l"
              leftIcon={<Play className="w-24 h-24" />}
              fullWidth
            >
              Label
            </Button>
          );

        case "navigation":
          return (
            <>
              <Button
                variant="secondary"
                size="l"
                rightIcon={<ChevronLeft className="w-24 h-24" />}
                fullWidth={true}
              />
              <Button
                variant="primary"
                size="l"
                rightIcon={<ChevronRight className="w-24 h-24" />}
                fullWidth={true}
              />
            </>
          );

        case "2-buttons":
          return (
            <>
              <Button variant="secondary" size="l" fullWidth={true}>
                Label
              </Button>
              <Button variant="primary" size="l" fullWidth={true}>
                Label
              </Button>
            </>
          );

        case "2-buttons-vertical":
          return (
            <>
              <Button variant="primary" size="l" fullWidth>
                Label
              </Button>
              <Button variant="secondary" size="l" fullWidth>
                Label
              </Button>
            </>
          );

        case "3-buttons-vertical":
          return (
            <>
              <Button variant="primary" size="l" fullWidth>
                Label
              </Button>
              <Button variant="secondary" size="l" fullWidth>
                Label
              </Button>
              <Button variant="secondary" size="l" fullWidth>
                Label
              </Button>
            </>
          );

        case "3-buttons-vertical-2":
          return (
            <>
              <Button variant="primary" size="l" fullWidth>
                Label
              </Button>
              <Button variant="secondary" size="l" fullWidth>
                Label
              </Button>
              <Button variant="tertiary" size="l" fullWidth>
                Label
              </Button>
            </>
          );

        case "navigation-2":
          return (
            <>
              <Button
                variant="secondary"
                size="l"
                rightIcon={<ChevronLeft className="w-24 h-24" />}
                fullWidth={false}
                className="shrink-0"
              />
              <Button variant="primary" size="l" fullWidth={true}>
                Label
              </Button>
            </>
          );

        case "button-checkbox":
          // Пока без чекбокса, только кнопка
          return (
            <Button variant="primary" size="l" fullWidth>
              Label
            </Button>
          );

        default:
          return null;
      }
    };

    const baseClasses = [
      "flex",
      finalOrientation === "horizontal" ? "flex-row" : "flex-col",
      finalOrientation === "horizontal" ? "items-stretch" : "items-center",
      "justify-center",
      "px-32 py-12",
    ];

    const gapClass = finalGap === 4 ? "gap-4" : "gap-8";

    const classes = [...baseClasses, gapClass, className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...rest}>
        {renderButtons()}
      </div>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";
