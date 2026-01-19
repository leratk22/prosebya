"use client";

import { useEffect } from 'react';

export function ViewportMeta() {
  useEffect(() => {
    // Удаляем существующий viewport meta тег, если есть
    const existingViewport = document.querySelector('meta[name="viewport"]');
    if (existingViewport) {
      existingViewport.remove();
    }

    // Создаем новый viewport meta тег
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.head.appendChild(viewport);

    return () => {
      // Очистка при размонтировании
      const viewportToRemove = document.querySelector('meta[name="viewport"]');
      if (viewportToRemove && viewportToRemove.getAttribute('content') === 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no') {
        viewportToRemove.remove();
      }
    };
  }, []);

  return null;
}
