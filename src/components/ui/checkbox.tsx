"use client";

import * as React from "react";
import { motion } from "framer-motion";

export type CheckboxType = "round" | "box";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /**
   * Тип чекбокса согласно Figma: Type = Round / Box
   */
  type?: CheckboxType;
  /**
   * Размер чекбокса (по умолчанию 24px согласно Figma)
   */
  size?: number;
  /**
   * Состояние checked
   */
  checked?: boolean;
  /**
   * Обработчик изменения состояния
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Отключенное состояние
   */
  disabled?: boolean;
}

/**
 * Компонент Checkbox
 * 
 * Варианты:
 * - round: круглый чекбокс (borderRadius: 1000px)
 * - box: квадратный чекбокс (borderRadius: 6px)
 * 
 * Состояния:
 * - Checked=No: белый фон, border rgba(34, 38, 59, 0.1)
 * - Checked=Yes: фон #344079, белая галочка внутри
 * 
 * @figma https://www.figma.com/design/Gr1ERrSAzB6n2xWAV5ECiu/%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D0%B7%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--mobile-?node-id=5453-218625&m=dev
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      type = "box",
      size = 24,
      checked = false,
      onChange,
      disabled = false,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const borderRadius = type === "round" ? "1000px" : "6px";
    const innerSize = size - 4; // 20px для size=24 (отступ 2px с каждой стороны)

<<<<<<< HEAD
    const inputRef = React.useRef<HTMLInputElement>(null);
=======
    const inputRef = React.useRef<HTMLInputElement | null>(null);
>>>>>>> 4e5b4e4 (fix: исправлена ошибка компиляции в компоненте Checkbox)

    const handleClick = (e: React.MouseEvent) => {
      // Предотвращаем всплытие, чтобы не срабатывал onClick родительского элемента
      e.stopPropagation();
      e.preventDefault();
      
      // Если disabled, не обрабатываем клик
      if (disabled) return;
      
      // Вызываем onChange напрямую, создавая синтетическое событие
      if (onChange && inputRef.current) {
        // Обновляем checked состояние input
        const newChecked = !checked;
        if (inputRef.current) {
          inputRef.current.checked = newChecked;
        }
        
        // Создаем синтетическое событие для onChange
        const syntheticEvent = {
          target: {
            ...inputRef.current,
            checked: newChecked,
          },
          currentTarget: {
            ...inputRef.current,
            checked: newChecked,
          },
          nativeEvent: e.nativeEvent,
          preventDefault: () => {},
          stopPropagation: () => {},
          isDefaultPrevented: () => false,
          isPropagationStopped: () => false,
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        
        onChange(syntheticEvent);
      }
    };

    // Callback ref для объединения внешнего ref и внутреннего inputRef
    const setInputRef = React.useCallback((node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    }, [ref]);

    return (
      <label
        className={`
          relative inline-flex items-center justify-center
          cursor-pointer
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}
        style={{ width: size, height: size }}
        onClick={handleClick}
      >
        <input
<<<<<<< HEAD
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
=======
          ref={setInputRef}
>>>>>>> 4e5b4e4 (fix: исправлена ошибка компиляции в компоненте Checkbox)
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...rest}
        />
        <div
          className={`
            w-full h-full
            flex items-center justify-center
            transition-colors
            pointer-events-none
            ${checked
              ? "bg-brand-blue"
              : "bg-white border border-core-alpha-10"
            }
          `}
          style={{
            borderRadius,
          }}
        >
          {checked && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              width={innerSize}
              height={innerSize}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 10L8.5 13.5L15 7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </div>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
