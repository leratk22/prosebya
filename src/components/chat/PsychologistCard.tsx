"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
        bg-white rounded-m border border-core-alpha-5 overflow-hidden
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {/* Top: Avatar 80×80 + Name + Subtitle — по Figma card-specialist */}
      <div className="flex gap-16 px-16 pt-16 pb-8">
        <div className="w-80 h-80 rounded-full bg-core-alpha-5 shrink-0 overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-core-alpha-40 text-24 font-semibold">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-4">
          <h3 className="text-20 font-semibold text-core leading-[24px] tracking-[-0.2px]">
            {name}
          </h3>
          {specialization && (
            <p className="text-12 font-medium text-core-alpha-60 leading-[16px] line-clamp-2">
              {specialization}
            </p>
          )}
        </div>
      </div>

      {/* Tags — по Figma: pill bg 5%, text 12px Medium 80% */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-8 px-16 pb-12">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-8 py-4 bg-core-alpha-5 text-12 font-medium text-core-alpha-80 rounded-full leading-[16px]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Info row — по Figma: border-t 10%, rating #344079 14px Medium, стаж/цена 14px Regular 60% */}
      <div className="border-t border-core-alpha-10 px-16 py-12 flex items-center justify-between gap-8">
        {rating != null && (
          <span className="flex items-center gap-4 text-14 font-medium text-brand-blue leading-[20px]" aria-label={`Рейтинг ${rating}`}>
            <Star className="w-16 h-16 fill-brand-blue text-brand-blue shrink-0" strokeWidth={0} />
            {rating}
          </span>
        )}
        {experience && (
          <p className="text-14 font-normal text-core-alpha-60 leading-[20px] flex-1 text-center">
            {experience}
          </p>
        )}
        {price && (
          <p className="text-14 font-normal text-core-alpha-60 leading-[20px]">
            {price}
          </p>
        )}
      </div>
    </motion.div>
  );
};
