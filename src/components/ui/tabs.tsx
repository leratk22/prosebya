"use client";

import * as React from "react";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

/**
 * Компонент Tabs для переключения вкладок
 * 
 * Поддерживает активную вкладку с подчеркиванием primary-цветом
 * Показывает количество элементов рядом с текстом вкладки (если указано)
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTabId,
  onTabChange,
  className = "",
}) => {
  return (
    <div className={`flex gap-32 ${className}`}>
      {items.map((item) => {
        const isActive = item.id === activeTabId;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              relative pb-8
              text-body-l font-regular
              transition-colors
              ${isActive 
                ? "text-brand-blue font-semibold" 
                : "text-light-fg-tertiary hover:text-light-fg-secondary"
              }
            `}
          >
            <span className="flex items-center gap-4">
              {item.label}
              {item.count !== undefined && (
                <span className={isActive ? "text-brand-blue" : "text-light-fg-tertiary"}>
                  {item.count}
                </span>
              )}
            </span>
            {isActive && (
              <span 
                className="absolute bottom-0 left-0 right-0 h-1 bg-brand-blue rounded-full"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
