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
- **Mobile** (< 440px): ширина растягивается под экран, высота фиксированная **176px**
- **Desktop** (≥ 440px): максимальная ширина **756px**, высота фиксированная **176px**

**Особенности:**
- Внутри карточки только изображение
- Изображение центрируется
- По умолчанию изображение равно ширине десктопа (756px), при уменьшении ширины боковые части скрываются за границами блока
- Фиксированная высота 176px на всех разрешениях

**Figma:** [BannerImageCardWeb](https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv/%D0%9B%D0%9A-%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--WEB-?node-id=10039-108244&m=dev)
        `,
      },
    },
  },
  args: {
    imageSrc: "/ImageExample3x.png",
    imageAlt: "Пример баннера",
  },
  argTypes: {
    imageSrc: {
      control: { type: "text" },
      description: "Путь к изображению баннера",
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
    imageSrc: "/ImageExample3x.png",
    imageAlt: "Пример баннера",
  },
};

export const WithPlaceholder: Story = {
  args: {
    imageSrc: "/placeholder_banner_image.svg",
    imageAlt: "Заглушка баннера",
  },
};

export const Clickable: Story = {
  args: {
    imageSrc: "/ImageExample3x.png",
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
                  h-[176px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Фиксированная высота 176px на всех разрешениях
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> height: 176px
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
                  756px только для desktop (≥ 440px)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> max-width: 756px (при ширине экрана ≥ 440px)
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
                <h4 className="text-label-m font-medium mb-4">Ширина и высота</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  width: 756px, height: 176px
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  По умолчанию изображение равно ширине десктопа (756px) и высоте баннера (176px)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> width: 756px, min-width: 756px, height: 176px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Центрирование</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  position: absolute, left: 50%, transform: translateX(-50%)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Изображение центрируется по горизонтали внутри контейнера
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> position: absolute, left: 50%, top: 0, transform: translateX(-50%)
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
                  md: (440px)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Переход между mobile и desktop версиями происходит на 440px
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> @media (min-width: 440px)
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
