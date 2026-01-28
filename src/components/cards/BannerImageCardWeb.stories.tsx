import type { Meta, StoryObj } from "@storybook/react";
import { BannerImageCardWeb, type BannerImageCardWebProps } from "./banner-image-card-web";

const meta: Meta<typeof BannerImageCardWeb> = {
  title: "Cards/BannerImageCardWeb",
  component: BannerImageCardWeb,
  tags: ["autodocs"],
  parameters: {
    // По умолчанию показываем мобильную версию
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        component: `
Баннерная карточка с изображением согласно дизайну из Figma.

**Адаптивность:**
- **Mobile**: ширина растягивается под экран, высота подстраивается пропорционально соотношению сторон изображения (~1.95:1)
- **Desktop**: максимальная ширина **756px**, высота фиксированная **176px**

**Особенности:**
- Поддержка двух разных изображений для desktop и mobile версий
- Desktop: изображение 756px × 176px (рекомендуется **2x разрешение** для retina дисплеев), фиксировано слева, при уменьшении ширины обрезается справа
- Mobile: изображение подстраивается по ширине экрана, высота вычисляется пропорционально (соотношение сторон ~1.95:1, рекомендуется **3x разрешение** для retina дисплеев)
- Внутри карточки только изображение
- Фиксированная высота 176px только для desktop версии

**Изображения:**
- Desktop: рекомендуется использовать изображение в разрешении **2x** (1512px × 352px) для поддержки retina дисплеев
- Mobile: рекомендуется использовать изображение в разрешении **3x** для поддержки retina дисплеев на мобильных устройствах

**Figma:** [BannerImageCardWeb](https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv/%D0%9B%D0%9A-%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--WEB-?node-id=10039-107968&t=4UI1WKLLMK9UJTeE-1)
        `,
      },
    },
  },
  args: {
    imageSrc: "/images/banner/banner-desktop.png",
    imageSrcMobile: "/images/banner/banner-mobile.png",
    imageAlt: "Пример баннера",
  },
  argTypes: {
    imageSrc: {
      control: { type: "text" },
      description: "Путь к изображению баннера для desktop версии (рекомендуется 2x разрешение для retina дисплеев)",
    },
    imageSrcMobile: {
      control: { type: "text" },
      description: "Путь к изображению баннера для mobile версии (рекомендуется 3x разрешение для retina дисплеев)",
    },
    imageAlt: {
      control: { type: "text" },
      description: "Альтернативный текст для изображения",
    },
    onClick: {
      action: "clicked",
      description: "Обработчик клика на всю карточку",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BannerImageCardWeb>;

export const Default: Story = {
  args: {
    imageSrc: "/images/banner/banner-desktop.png",
    imageSrcMobile: "/images/banner/banner-mobile.png",
    imageAlt: "Пример баннера",
  },
};

export const WithDifferentImages: Story = {
  args: {
    imageSrc: "/images/banner/banner-desktop.png",
    imageSrcMobile: "/images/banner/banner-mobile.png",
    imageAlt: "Пример баннера с разными изображениями",
  },
  parameters: {
    docs: {
      description: {
        story: "Пример использования разных изображений для desktop и mobile версий",
      },
    },
  },
};


export const WithPlaceholder: Story = {
  args: {
    imageSrc: "/placeholder_banner_image.svg",
    imageSrcMobile: "/placeholder_banner_image.svg",
    imageAlt: "Заглушка баннера",
  },
};

export const Clickable: Story = {
  args: {
    imageSrc: "/images/banner/banner-desktop.png",
    imageSrcMobile: "/images/banner/banner-mobile.png",
    imageAlt: "Пример баннера",
    onClick: () => {
      alert("Баннер кликнут!");
    },
  },
};

export const DesignTokens: Story = {
  render: () => (
    <div className="space-y-24 p-16 max-w-4xl">
      <div>
        <h2 className="text-title-l font-semibold mb-16">Используемые токены</h2>
        
        <div className="space-y-16">
          <section>
            <h3 className="text-title-m font-semibold mb-12">Карточка</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Высота</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  h-auto md:h-[176px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Desktop: фиксированная высота 176px. Mobile: высота подстраивается пропорционально соотношению сторон изображения (~1.95:1)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> height: auto (mobile), height: 176px (desktop), aspect-ratio: ~1.95 (mobile)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Радиус скругления</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  rounded-m
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  16px (radius-m)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> border-radius: 16px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Максимальная ширина (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  md:max-w-[756px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  756px только для desktop
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> max-width: 756px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Обрезка содержимого</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  overflow-hidden
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Боковые части изображения скрываются за границами блока при уменьшении ширины
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> overflow: hidden
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Тень</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  shadow-[0px_12px_24px_-4px_rgba(34,38,59,0.05)]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Elevation тень как у остальных карточек
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> box-shadow: 0px 12px 24px -4px rgba(34, 38, 59, 0.05)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Изображение</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Позиционирование</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  objectFit: cover (для изображений) / contain (для SVG)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Обычные изображения заполняют контейнер с сохранением пропорций (cover), SVG заглушки заполняют всю высоту без обрезки (contain)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> object-fit: cover (изображения), object-fit: contain (SVG), object-position: center
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Размеры изображений</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  Desktop: 756px × 176px<br />
                  Mobile: 100% width × пропорциональная высота
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Desktop: изображение имеет фиксированные размеры 756px × 176px, центрируется. Mobile: изображение подстраивается по ширине экрана, высота вычисляется пропорционально (соотношение сторон ~1.95:1 из Figma)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> Desktop: width: 756px, min-width: 756px, height: 176px. Mobile: width: 100%, height: auto, aspect-ratio: ~1.95
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Два изображения</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  imageSrc (desktop) + imageSrcMobile (mobile)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Компонент поддерживает два разных изображения: одно для desktop версии (рекомендуется 2x разрешение), другое для mobile версии (рекомендуется 3x разрешение). Оба изображения обязательны.
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Логика:</strong> Desktop использует imageSrc (рекомендуется 2x разрешение), Mobile использует imageSrcMobile (рекомендуется 3x разрешение). Оба изображения обязательны.
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Позиционирование</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  Desktop: absolute, left: 50%, transform: translateX(-50%)<br />
                  Mobile: block, width: 100%, height: 100%
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Desktop: изображение центрируется по горизонтали через absolute positioning. Mobile: изображение заполняет весь контейнер с сохранением пропорций
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> Desktop: position: absolute, left: 50%, top: 0, transform: translateX(-50%). Mobile: display: block, width: 100%, height: 100%, object-fit: cover
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Адаптивность</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Брейкпоинт</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  md:
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Переход между mobile и desktop версиями происходит на брейкпоинте md
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> @media (min-width: md)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Ширина (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  w-full
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  На мобильных устройствах карточка растягивается по ширине контейнера
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> width: 100%
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Интерактивность</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Hover эффект</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  hover:opacity-90 transition-opacity
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Применяется только если передан onClick. Плавное изменение прозрачности до 90%
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> opacity: 0.9 (hover), transition: opacity (плавный переход)
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Подробное описание всех используемых дизайн-токенов в компоненте BannerImageCardWeb",
      },
    },
  },
};
