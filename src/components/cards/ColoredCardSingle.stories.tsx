import type { Meta, StoryObj } from "@storybook/react";
import { ColoredCardSingle, type ColoredCardSingleProps } from "./colored-card-single";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof ColoredCardSingle> = {
  title: "Cards/ColoredCardSingle",
  component: ColoredCardSingle,
  tags: ["autodocs"],
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        component: `
Карточка для отображения контента с цветным фоном согласно дизайну из Figma.

**Адаптивность:**
- **Mobile**: ширина растягивается под экран, высота **235px** (фиксированная)
- **Desktop**: максимальная ширина **756px**, высота **235px** (фиксированная)

**Особенности:**
- Фиксированная высота 235px для всех размеров экрана
- Цвет фона: один из 5 вариантов (желтый, оранжевый, красный, голубой, серый #E0E5EF). Рекомендуем использовать все цвета, кроме серого, его только в крайних случаях
- Для серого фона может использоваться иллюстрация любого цвета
- Изображение выбирается по цвету фона
- Используется одно изображение 3x для всех дисплеев
- Изображение справа, текст слева
- В десктопе изображение масштабируется на 150%
- Один опциональный тег (Badge)
- Заголовок максимум 3 строки с обрезкой в многоточие
- SVG заглушка если изображение не загрузилось

**Figma:** [ColoredCardSingle](https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv/%D0%9B%D0%9A-%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--WEB-?node-id=9932-31044&t=iWJmLoiT7vqKsn1t-1)
        `,
      },
    },
  },
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки, но это очень маловероятно на десктопе, нет у нас таких длинных",
    tag: "Тэг",
    backgroundColor: "yellow",
  },
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Заголовок карточки (максимум 3 строки)",
    },
    tag: {
      control: { type: "text" },
      description: "Текст для badge (опционально)",
    },
    backgroundColor: {
      control: { type: "select" },
      options: ["yellow", "orange", "red", "blue", "gray"],
      description: "Цвет фона карточки. Для серого фона используется иллюстрация с любым цветом. В разработке цвет не выбирается из значений, а задается любой HEX",
    },
    imageUrl: {
      control: { type: "text" },
      description: "URL изображения",
    },
    imageAlt: {
      control: { type: "text" },
      description: "Alt текст для изображения",
    },
    placeholderSvgUrl: {
      control: { type: "text" },
      description: "URL SVG заглушки (если изображение не загрузилось, по умолчанию используется стандартная заглушка)",
    },
    onClick: {
      action: "clicked",
      description: "Обработчик клика на всю карточку",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ColoredCardSingle>;

export const Default: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "yellow",
  },
};

export const Yellow: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "yellow",
  },
};

export const Orange: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "orange",
  },
};

export const Red: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "red",
  },
};

export const Blue: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "blue",
  },
};

export const Gray: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "gray",
    imageAlt: "Colored card image",
  },
};

export const WithoutTag: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: undefined,
    backgroundColor: "yellow",
  },
};

export const LongTitle: Story = {
  args: {
    title: "Очень длинный заголовок который должен обрезаться после трех строк и показывать многоточие если текст не умещается в отведенное пространство карточки лонгрида и продолжается дальше",
    tag: "Тэг",
    backgroundColor: "yellow",
  },
};

export const WithCustomImage: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "yellow",
    imageUrl: "https://via.placeholder.com/182x166",
    imageAlt: "Colored card image",
  },
};

export const WithPlaceholder: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "yellow",
    imageUrl: "invalid-url", // Невалидный URL для демонстрации заглушки
    imageAlt: "Placeholder",
  },
};

export const Clickable: Story = {
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "yellow",
    onClick: () => {
      alert("Карточка кликнута!");
    },
  },
};

export const ImageLoading: Story = {
  render: (args: ColoredCardSingleProps) => {
    // Создаем кастомную карточку с спиннером вместо изображения
    const CustomCard = () => {
      const bgColor = args.backgroundColor === "yellow" ? "#FFE699" :
                      args.backgroundColor === "orange" ? "#FFB899" :
                      args.backgroundColor === "red" ? "#FF9999" :
                      args.backgroundColor === "blue" ? "#A6C1F2" :
                      args.backgroundColor === "gray" ? "#E0E5EF" : "#FFE699";

      const containerClasses = [
        "relative",
        "flex flex-row items-stretch",
        "rounded-m",
        "border border-[rgba(52,64,121,0.14)]",
        "overflow-hidden",
        "box-border",
        "h-[235px]",
        "w-full md:max-w-[756px]",
      ].join(" ");

      return (
        <div className={containerClasses} style={{ backgroundColor: bgColor }}>
          {/* Текстовая часть */}
          <div className="flex flex-col justify-between flex-1 min-w-0 relative z-10 self-stretch gap-10 p-20 md:py-24 md:pr-64 md:pl-20 overflow-hidden">
            <h3 className="w-full relative font-medium font-euclid text-[#22263B] line-clamp-3 self-stretch min-w-0 longread-card-title">
              {args.title}
            </h3>
            {args.tag && (
              <div className="self-start flex min-w-0 max-w-full">
                <Badge variant="default" className="max-w-full min-w-0">{args.tag}</Badge>
              </div>
            )}
          </div>
          {/* Область изображения со спиннером */}
          <div 
            className="absolute bottom-0 right-0 z-0 overflow-hidden longread-card-image md:static md:z-10 md:h-full md:shrink-0 md:overflow-visible flex items-center justify-center"
            style={{
              width: "182px",
              height: "166px",
            }}
          >
            <Spinner size={32} aria-label="Загрузка изображения" role="status" />
          </div>
        </div>
      );
    };

    return <CustomCard />;
  },
  args: {
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается на три строки",
    tag: "Тэг",
    backgroundColor: "yellow",
  },
  parameters: {
    docs: {
      description: {
        story: "Состояние загрузки изображения. На месте изображения отображается спиннер размером 32px.",
      },
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
                <h4 className="text-label-m font-medium mb-4">Фон</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  backgroundColor (yellow/orange/red/blue/gray)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Желтый: #FFE699, Оранжевый: #FFB899, Красный: #FF9999, Голубой: #A6C1F2, Серый: #E0E5EF
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> background-color: #FFE699 (yellow), #FFB899 (orange), #FF9999 (red), #A6C1F2 (blue), #E0E5EF (gray)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Примечание:</strong> Для серого фона автоматически используется иллюстрация из желтой карточки.
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>В разработке:</strong> Цвет не выбирается из значений, а задается любой HEX.
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Граница</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  border border-[rgba(52,64,121,0.14)]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  rgba(52, 64, 121, 0.14)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> border: 1px solid rgba(52, 64, 121, 0.14)
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
                <h4 className="text-label-m font-medium mb-4">Высота</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  h-[235px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  235px (фиксированная для всех размеров экрана)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> height: 235px
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
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Текстовая часть</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Отступы (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  p-20
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  20px со всех сторон (токен Numbers)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> padding: 20px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Отступы (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  md:py-24 md:pr-64 md:pl-20
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  paddingTop: 24px, paddingBottom: 24px, paddingRight: 64px, paddingLeft: 20px
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> padding-top: 24px, padding-bottom: 24px, padding-right: 64px, padding-left: 20px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Промежуток между элементами</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  gap-10
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  10px между заголовком и badge (токен Numbers)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> gap: 10px
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Изображение</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Размер контейнера (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-image
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  182px × 166px
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> width: 182px, height: 166px
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Размер контейнера (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-image (md:)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  273px × 249px (для масштабированного изображения)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> width: 273px, height: 249px (desktop)
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Масштабирование изображения (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-img transform: scale(1.5)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Изображение масштабируется на 150% от исходного размера (182×166px → 273×249px)
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точное значение:</strong> transform: scale(1.5), transform-origin: bottom right
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Типографика</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Заголовок (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-title font-medium font-euclid text-[#22263B] line-clamp-3
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Title/M, Medium, Euclid Circular A
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 20px, line-height: 1.2em, font-weight: 500 (Medium), color: #22263B, letter-spacing: -0.01em (-1%), максимум 3 строки
                </p>
              </div>
              
              <div>
                <h4 className="text-label-m font-medium mb-4">Заголовок (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  longread-card-title font-medium font-euclid text-[#22263B] line-clamp-3
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Title/L, Medium, Euclid Circular A
                </p>
                <p className="text-body-s text-light-fg-tertiary dark:text-dark-fg-tertiary mt-2">
                  <strong>Точные значения:</strong> font-size: 24px, line-height: 1.3333333333333333em (32px), font-weight: 500 (Medium), color: #22263B, letter-spacing: -0.015em (-1.5%), максимум 3 строки
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
        story: "Подробное описание всех используемых дизайн-токенов в компоненте ColoredCardSingle",
      },
    },
  },
};
