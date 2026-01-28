"use client";

import * as React from "react";

export interface BannerImageCardWebProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Путь к изображению баннера для desktop версии (рекомендуется 2x разрешение)
   */
  imageSrc: string;
  /**
   * Путь к изображению баннера для mobile версии (рекомендуется 3x разрешение)
   */
  imageSrcMobile: string;
  /**
   * Альтернативный текст для изображения
   */
  imageAlt?: string;
  /**
   * Обработчик клика на карточку
   */
  onClick?: () => void;
}

/**
 * Компонент BannerImageCardWeb
 *
 * Баннерная карточка с изображением:
 * - Desktop: максимальная ширина 756px, высота фиксированная 176px
 * - Mobile: ширина растягивается под экран, высота подстраивается пропорционально соотношению сторон изображения
 * - Поддержка двух разных изображений для desktop и mobile версий
 * - Desktop: изображение 756px × 176px (рекомендуется 2x разрешение), фиксировано слева, при уменьшении ширины обрезается справа
 * - Mobile: изображение подстраивается по ширине, высота вычисляется пропорционально (соотношение сторон ~1.95:1, рекомендуется 3x разрешение)
 * - Внутри карточки только изображение
 */
export const BannerImageCardWeb = React.forwardRef<
  HTMLDivElement,
  BannerImageCardWebProps
>(
  (
    {
      imageSrc,
      imageSrcMobile,
      imageAlt = "",
      onClick,
      className = "",
      ...rest
    },
    ref,
  ) => {
    // Исключаем onClick из rest, так как он уже обработан отдельно
    type RestProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'imageSrc' | 'imageSrcMobile' | 'imageAlt' | 'className'>;
    const restProps = rest as RestProps;
    
    const [desktopImageError, setDesktopImageError] = React.useState(false);
    const [mobileImageError, setMobileImageError] = React.useState(false);
    const placeholderSrc = "/placeholder_banner_image.svg";

    // Определяем, какие изображения использовать
    const finalDesktopSrc = desktopImageError ? placeholderSrc : imageSrc;
    const finalMobileSrc = mobileImageError ? placeholderSrc : imageSrcMobile;

    // Стили для обертки
    const wrapperClasses = [
      "relative",
      // Максимальная ширина на desktop: 756px
      "w-full md:max-w-[756px]",
      // Desktop: фиксированная высота 176px
      // Mobile: высота подстраивается пропорционально (aspect-ratio)
      "h-auto md:h-[176px]",
      // Минимальная ширина для видимости
      "min-w-0",
      // Скругление углов
      "rounded-m", // borderRadius: 16px
      // Тень как у остальных карточек
      "shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]", // Elevation
      // Обрезка содержимого
      "overflow-hidden",
      onClick && "cursor-pointer transition-opacity hover:opacity-90",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Inline стили для aspect-ratio на mobile
    // Соотношение сторон мобильного изображения из Figma: 343px / 176px
    // На desktop aspect-ratio будет переопределен через фиксированную высоту h-[176px] в классах
    const wrapperStyle: React.CSSProperties = {
      // Применяем aspect-ratio в формате "width / height"
      // На desktop это будет переопределено через h-[176px] из Tailwind классов
      aspectRatio: "343 / 176",
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        className={wrapperClasses}
        style={wrapperStyle}
        onClick={handleClick}
        {...restProps}
      >
        {/* Desktop изображение */}
        <img
          src={finalDesktopSrc}
          alt={imageAlt}
          className="hidden md:block absolute"
          style={{
            width: "756px",
            minWidth: "756px",
            height: "176px",
            objectFit: finalDesktopSrc.endsWith('.svg') ? 'contain' : 'cover',
            objectPosition: "left center",
            left: "0",
            top: "0",
            // Изображение фиксировано слева, при уменьшении контейнера обрезается справа
          }}
          onError={() => {
            if (!desktopImageError) {
              setDesktopImageError(true);
            }
          }}
        />
        
        {/* Mobile изображение */}
        <img
          src={finalMobileSrc}
          alt={imageAlt}
          className="block md:hidden w-full h-full object-cover"
          style={{
            objectFit: finalMobileSrc.endsWith('.svg') ? 'contain' : 'cover',
            objectPosition: "center",
          }}
          onError={() => {
            if (!mobileImageError) {
              setMobileImageError(true);
            }
          }}
        />
      </div>
    );
  },
);

BannerImageCardWeb.displayName = "BannerImageCardWeb";
