"use client";

import { useEffect } from 'react';

export function ViewportMeta() {
  useEffect(() => {
    // Устанавливаем viewport как можно раньше
    const setViewport = () => {
      let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.insertBefore(viewport, document.head.firstChild);
      }
      
      viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
      
      // Принудительно перезагружаем стили для применения медиа-запросов
      if (window.innerWidth < 440) {
        document.body.style.display = 'none';
        setTimeout(() => {
          document.body.style.display = '';
        }, 0);
      }
    };

    // Выполняем сразу
    setViewport();
    
    // Также выполняем после загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setViewport);
    }
  }, []);

  return null;
}
