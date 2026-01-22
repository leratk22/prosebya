"use client";

import * as React from "react";
import { motion } from "framer-motion";

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Сообщение",
  disabled = false,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div
          className={`
            flex items-center
            bg-white
            border border-core-alpha-10
            rounded-16
            px-16 py-8
            transition-all
            ${disabled ? "opacity-50" : ""}
            focus-within:border-brand-blue focus-within:shadow-[0px_0px_0px_3px_rgba(52,64,121,0.1)]
          `}
        >
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={`
              flex-1
              resize-none
              outline-none
              text-16 leading-[1.5em]
              text-core
              placeholder:text-core-alpha-60
              bg-transparent
              max-h-24
              overflow-y-auto
            `}
            style={{
              minHeight: "24px",
            }}
          />
          {value.trim() && !disabled && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onSubmit}
              className="ml-8 p-8 shrink-0"
              aria-label="Отправить сообщение"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-brand-blue"
              >
                <path
                  d="M3.49 1.75L20.51 12L3.49 22.25L7 12L3.49 1.75Z"
                  fill="currentColor"
                />
              </svg>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};
