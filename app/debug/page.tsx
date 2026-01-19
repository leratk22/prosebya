"use client";

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [info, setInfo] = useState<{
    innerWidth: number;
    innerHeight: number;
    devicePixelRatio: number;
    viewportContent: string | null;
    userAgent: string;
  } | null>(null);

  useEffect(() => {
    const updateInfo = () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      setInfo({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        viewportContent: viewportMeta?.getAttribute('content') || 'NOT FOUND',
        userAgent: navigator.userAgent,
      });
    };

    updateInfo();
    window.addEventListener('resize', updateInfo);
    return () => window.removeEventListener('resize', updateInfo);
  }, []);

  return (
    <div className="min-h-screen bg-white p-16">
      <h1 className="text-2xl font-bold mb-16">Debug Info</h1>
      
      {info && (
        <div className="space-y-8 mb-24">
          <p><strong>window.innerWidth:</strong> {info.innerWidth}px</p>
          <p><strong>window.innerHeight:</strong> {info.innerHeight}px</p>
          <p><strong>devicePixelRatio:</strong> {info.devicePixelRatio}</p>
          <p><strong>Viewport meta:</strong> {info.viewportContent}</p>
          <p className="text-xs break-all"><strong>User Agent:</strong> {info.userAgent}</p>
        </div>
      )}

      <h2 className="text-xl font-bold mb-8">Media Query Tests</h2>
      
      <div className="space-y-8">
        {/* Тест для md: 440px */}
        <div className="p-16 rounded-lg border">
          <p className="font-medium">md: 440px breakpoint</p>
          <p className="text-red-500 md:hidden">MOBILE (ширина &lt; 440px)</p>
          <p className="text-green-500 hidden md:block">DESKTOP (ширина ≥ 440px)</p>
        </div>

        {/* Тест для lg: 768px */}
        <div className="p-16 rounded-lg border">
          <p className="font-medium">lg: 768px breakpoint</p>
          <p className="text-red-500 lg:hidden">MOBILE (ширина &lt; 768px)</p>
          <p className="text-green-500 hidden lg:block">DESKTOP (ширина ≥ 768px)</p>
        </div>

        {/* Визуальный тест */}
        <div className="p-16 rounded-lg border">
          <p className="font-medium mb-8">Визуальный тест (должен быть красный на mobile, зеленый на desktop md:)</p>
          <div className="w-full h-[100px] bg-red-500 md:bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
            <span className="md:hidden">MOBILE</span>
            <span className="hidden md:block">DESKTOP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
