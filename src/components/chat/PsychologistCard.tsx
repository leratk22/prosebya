"use client";

import * as React from "react";
import { motion } from "framer-motion";

export interface PsychologistCardProps {
  name: string;
  specialization?: string;
  experience?: string;
  rating?: number;
  price?: string;
  tags?: string[];
  imageUrl?: string;
  onClick?: () => void;
}

export const PsychologistCard: React.FC<PsychologistCardProps> = ({
  name,
  specialization,
  experience,
  rating,
  price,
  tags = [],
  imageUrl,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        bg-white
        rounded-16
        border-b border-core-alpha-5
        shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05),0px_0px_0px_1px_rgba(34,38,59,0.05)]
        overflow-hidden
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {/* Top section: Avatar and Name */}
      <div className="flex gap-16 px-16 pt-16 pb-8">
        {/* Avatar - 80px */}
        <div className="w-[80px] h-[80px] rounded-full bg-core-alpha-5 shrink-0 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-core-alpha-40 text-24 font-semibold">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Name and Specialization */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          <h3 className="text-16 font-semibold text-core-alpha-80">
            {name}
          </h3>
          {specialization && (
            <p className="text-14 text-core-alpha-60 line-clamp-2">
              {specialization}
            </p>
          )}
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-8 px-16 pb-16">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-8 py-4 bg-core-alpha-5 text-12 text-core-alpha-60 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom section: Experience, Rating, Price */}
      <div className="border-t border-core-alpha-10 px-16 py-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {rating && (
            <>
              <span className="text-14 text-core-alpha-60">★</span>
              <span className="text-14 text-core-alpha-60">{rating}</span>
            </>
          )}
        </div>
        {experience && (
          <p className="text-14 text-core-alpha-60 text-center flex-1">
            {experience}
          </p>
        )}
        {price && (
          <p className="text-16 font-semibold text-core-alpha-80">
            {price}
          </p>
        )}
      </div>
    </motion.div>
  );
};
