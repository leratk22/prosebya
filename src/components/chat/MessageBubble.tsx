"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Chip } from "./Chip";

export type MessageType = "bot" | "user";
export type MessageVariant = "default" | "chips";

export interface MessageBubbleProps {
  type: MessageType;
  content?: string | React.ReactNode;
  variant?: MessageVariant;
  chips?: Array<{ label: string; value: string; active?: boolean }>;
  onChipClick?: (value: string, step?: string | null) => void;
  chipStep?: string | null;
  showTyping?: boolean;
  multiSelect?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  type,
  content,
  variant = "default",
  chips,
  onChipClick,
  chipStep,
  showTyping = false,
  multiSelect = false,
}) => {
  const isBot = type === "bot";

  if (showTyping) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start"
      >
        <div
          className="
            flex gap-1 items-center px-16 py-12 max-w-[80%] min-h-[48px]
            bg-[rgba(255,184,0,0.3)] text-core
            rounded-[16px_16px_16px_0px]
          "
        >
          <motion.div
            className="w-2 h-2 bg-core-alpha-40 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-core-alpha-40 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-core-alpha-40 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>
    );
  }

  if (variant === "chips" && chips) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-start"
      >
        <div className="flex flex-wrap gap-8 max-w-[80%]">
          {chips.map((chip) => (
            <Chip
              key={chip.value}
              label={chip.label}
              active={chip.active}
              onClick={() => onChipClick?.(chip.value, chipStep)}
              multiSelect={multiSelect}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`
          px-16 py-12 max-w-[80%]
          ${isBot
            ? "bg-[rgba(255,184,0,0.3)] text-core rounded-[16px_16px_16px_0px]"
            : "bg-white text-core rounded-[16px_16px_0px_16px]"
          }
        `}
      >
        {typeof content === "string" ? (
          <p className="text-16 leading-[1.5em] font-regular">{content}</p>
        ) : (
          content
        )}
      </div>
    </motion.div>
  );
};
