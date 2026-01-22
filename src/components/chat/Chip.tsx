"use client";

import * as React from "react";
import { motion } from "framer-motion";

export interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  multiSelect?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  active = false,
  onClick,
  disabled = false,
}) => {
  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        px-16 py-8
        rounded-full
        font-semibold text-14 leading-[1.4285714285714286em]
        transition-colors
        ${active
          ? "bg-brand-blue text-white"
          : "bg-core-alpha-5 text-core-alpha-40"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${!disabled && !active ? "hover:bg-core-alpha-10" : ""}
      `}
    >
      {label}
    </motion.button>
  );
};
