import type { Meta, StoryObj } from "@storybook/react";
import {
  SkillCourseCarousel,
  type SkillCourseCarouselProps,
} from "./skill-course-carousel";

const meta: Meta<typeof SkillCourseCarousel> = {
  title: "Cards/SkillCourseCarousel",
  component: SkillCourseCarousel,
  tags: ["autodocs"],
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        component: `
Карусель навыков/практик — секция с горизонтально прокручиваемыми карточками.

**Дизайн в Figma:**
- **Desktop:** [node 6960:16476](https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv/%D0%9B%D0%9A-%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--WEB-?node-id=6960-16476)
- **Mobile:** [node 7048:48793](https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv/%D0%9B%D0%9A-%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--WEB-?node-id=7048-48793)

**Адаптивность (брейкпоинт md = 441px):**
- **Mobile**: прозрачный фон, px-16 py-12, заголовок с дополнительным pl-32, без стрелок навигации, горизонтальный скролл
- **Desktop**: фон bg-tertiary (#F4F6FA), p-20, rounded-m, стрелки навигации (</>)

**Состояния карточки:**
- **default**: подпись-количество (напр. «8 практик»)
- **in-progress**: подпись-прогресс (напр. «Далее: упражнение 23»)

**Особенности:**
- Заголовок карточки: максимум 3 строки (line-clamp-3), Body/L-Medium (16px)
- Подпись: Body/S-Medium (12px), цвет #868999
- Изображение: готовый визуал (стек + Play уже в картинке), привязано к правому краю на всю высоту
- Карточка «Смотреть ещё»: опциональная, текст + стрелка вправо
- Весь блок карточки кликабельный (если передан onClick)
- Скрытый скроллбар (scrollbar-hide)
        `,
      },
    },
  },
  args: {
    title: "Какие навыки развить",
    items: [
      {
        title: "Как влиять на самооценку",
        subtitle: "8 практик",
        state: "default",
        imageUrl: "/images/carousel/practice-card-2x.png",
      },
      {
        title: "Как принимать вызовы",
        subtitle: "Далее: упражнение 23",
        state: "in-progress",
        imageUrl: "/images/carousel/practice-card-2x.png",
      },
      {
        title: "Как радоваться жизни каждый день",
        subtitle: "Далее: упражнение 23",
        state: "in-progress",
        imageUrl: "/images/carousel/practice-card-2x.png",
      },
    ],
  },
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Заголовок секции (Title/L: 24px, semibold, tracking -0.36px)",
    },
    items: {
      control: { type: "object" },
      description:
        "Массив карточек. Каждая карточка: title, subtitle, state (default | in-progress), imageUrl, imageAlt, onClick",
    },
    showSeeMore: {
      control: { type: "boolean" },
      description: 'Показать карточку «Смотреть ещё» в конце списка',
    },
    seeMoreText: {
      control: { type: "text" },
      description: 'Текст карточки «Смотреть ещё» (default: «Смотреть еще»)',
    },
    onSeeMore: {
      action: "seeMoreClicked",
      description: 'Обработчик клика на карточку «Смотреть ещё»',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SkillCourseCarousel>;

/* ─────────── Sample data ─────────── */

const defaultItems: SkillCourseCarouselProps["items"] = [
  {
    title: "Как влиять на самооценку",
    subtitle: "8 практик",
    state: "default",
    imageUrl: "/images/carousel/practice-card-2x.png",
  },
  {
    title: "Как влиять на самоценностное ощущение",
    subtitle: "Далее: упражнение 23",
    state: "in-progress",
    imageUrl: "/images/carousel/practice-card-2x.png",
  },
  {
    title: "Как радоваться жизни каждый день",
    subtitle: "Далее: упражнение 23",
    state: "in-progress",
    imageUrl: "/images/carousel/practice-card-2x.png",
  },
  {
    title: "Как определять свои границы",
    subtitle: "Далее: упражнение 23",
    state: "in-progress",
    imageUrl: "/images/carousel/practice-card-2x.png",
  },
];

const defaultOnlyItems: SkillCourseCarouselProps["items"] = [
  {
    title: "Как влиять на самооценку",
    subtitle: "8 практик",
    state: "default",
    imageUrl: "/images/carousel/practice-card-2x.png",
  },
  {
    title: "Как принимать вызовы",
    subtitle: "12 практик",
    state: "default",
    imageUrl: "/images/carousel/practice-card-2x.png",
  },
  {
    title: "Как радоваться жизни каждый день",
    subtitle: "5 практик",
    state: "default",
    imageUrl: "/images/carousel/practice-card-2x.png",
  },
];

const inProgressItems: SkillCourseCarouselProps["items"] = [
  {
    title: "Как влиять на самооценку",
    subtitle: "Далее: упражнение 5",
    state: "in-progress",
    imageUrl: "/images/carousel/practice-card-2x.png",
  },
  {
    title: "Как принимать вызовы",
    subtitle: "Далее: упражнение 23",
    state: "in-progress",
    imageUrl: "/images/carousel/practice-card-2x.png",
  },
  {
    title: "Как радоваться жизни каждый день",
    subtitle: "Далее: упражнение 12",
    state: "in-progress",
    imageUrl: "/images/carousel/practice-card-2x.png",
  },
];

/* ─────────── Stories ─────────── */

export const Default: Story = {
  args: {
    title: "Какие навыки развить",
    items: defaultItems,
    onSeeMore: () => {
      alert("Смотреть ещё");
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Микс карточек с карточкой «Смотреть ещё» в конце (по умолчанию showSeeMore=true).",
      },
    },
  },
};

export const DefaultOnly: Story = {
  args: {
    title: "Какие навыки развить",
    items: defaultOnlyItems,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Все карточки в состоянии default — показано количество практик.",
      },
    },
  },
};

export const InProgress: Story = {
  args: {
    title: "Какие навыки развить",
    items: inProgressItems,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Все карточки в состоянии in-progress — показан прогресс «Далее: упражнение N».',
      },
    },
  },
};

export const WithoutSeeMore: Story = {
  args: {
    title: "Какие навыки развить",
    items: defaultItems,
    showSeeMore: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Вариант без карточки «Смотреть ещё» (showSeeMore=false).",
      },
    },
  },
};

export const Clickable: Story = {
  args: {
    title: "Какие навыки развить",
    items: defaultItems.map((item, i) => ({
      ...item,
      onClick: () => {
        alert(`Карточка ${i + 1}: ${item.title}`);
      },
    })),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Все карточки кликабельные — при наведении меняется opacity, при клике срабатывает onClick.",
      },
    },
  },
};

export const LongTitles: Story = {
  args: {
    title: "Какие навыки развить",
    items: [
      {
        title:
          "Очень длинный заголовок практики, который должен обрезаться после трёх строк и показывать многоточие, если текст не умещается в отведённое пространство",
        subtitle: "8 практик",
        state: "default" as const,
        imageUrl: "/images/carousel/practice-card-2x.png",
      },
      {
        title:
          "Ещё один длинный заголовок для проверки обрезки текста на трёх строках карточки навыка в десктопной и мобильной версии",
        subtitle: "Далее: упражнение 23",
        state: "in-progress" as const,
        imageUrl: "/images/carousel/practice-card-2x.png",
      },
      {
        title: "Короткий",
        subtitle: "3 практики",
        state: "default" as const,
        imageUrl: "/images/carousel/practice-card-2x.png",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Проверка обрезки заголовков на 3 строках (line-clamp-3). Длинные заголовки обрезаются многоточием.",
      },
    },
  },
};

export const WithoutSubtitles: Story = {
  args: {
    title: "Какие навыки развить",
    items: [
      {
        title: "Как влиять на самооценку",
        imageUrl: "/images/carousel/practice-card-2x.png",
      },
      {
        title: "Как принимать вызовы",
        imageUrl: "/images/carousel/practice-card-2x.png",
      },
      {
        title: "Как радоваться жизни каждый день",
        imageUrl: "/images/carousel/practice-card-2x.png",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Карточки без подписи (subtitle). Заголовок и стек изображений.",
      },
    },
  },
};

export const WithoutImages: Story = {
  args: {
    title: "Какие навыки развить",
    items: [
      {
        title: "Как влиять на самооценку",
        subtitle: "8 практик",
        state: "default" as const,
      },
      {
        title: "Как принимать вызовы",
        subtitle: "Далее: упражнение 23",
        state: "in-progress" as const,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Карточки без изображений — используется плейсхолдер practice-card-default.png.",
      },
    },
  },
};

export const DesignTokens: Story = {
  render: () => (
    <div className="space-y-24 p-16 max-w-4xl">
      <div>
        <h2 className="text-title-l font-semibold mb-16">
          Используемые токены
        </h2>

        <div className="space-y-16">
          <section>
            <h3 className="text-title-m font-semibold mb-12">
              Секция-контейнер
            </h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Фон (Desktop)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  bg-light-bg-tertiary
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  #F4F6FA — серый фон секции, только на desktop
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">Фон (Mobile)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  transparent
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Прозрачный — карточки на основном фоне страницы
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">Отступы</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  Mobile: px-16 py-12 | Desktop: p-20
                </code>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Gap между header и cards
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  Mobile: gap-8 (8px) | Desktop: gap-28 (28px)
                </code>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Максимальная ширина (Desktop)
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  md:max-w-[756px]
                </code>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Радиус скругления
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  rounded-m (16px)
                </code>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">
              Заголовок секции
            </h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Типографика</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  24px, semibold, line-height 32px, tracking -0.36px
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  MVP2.0/Title/L — одинаковый размер на mobile и desktop
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Отступ слева (Mobile)
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  pl-32 (внутри контейнера с px-16)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Заголовок смещён на 32px правее карточек
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">
              Стрелки навигации (Desktop)
            </h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Размер</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  36px × 36px, rounded-full
                </code>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Граница</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  0.75px solid rgba(52, 64, 121, 0.2)
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  border-button-secondary
                </p>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Иконка</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  chevron-left / chevron-right, 20px, text-fg-accent (#344079)
                </code>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">
              Карточка practice
            </h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Фон</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  bg-light-bg-primary (#FFFFFF)
                </code>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Граница</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  border-light-border-button-tertiary — rgba(52, 64, 121, 0.1)
                </code>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Тень</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  Elevation: 0px 12px 24px -4px rgba(34, 38, 59, 0.05)
                </code>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Ширина</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  294px × 160px (shrink-0)
                </code>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Радиус скругления
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  rounded-m (16px)
                </code>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Типографика карточки</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Заголовок</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  Body/L-Medium: 16px, medium, line-height 24px, line-clamp-3
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Цвет: fg-primary (#22263B)
                </p>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Подпись</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  Body/S-Medium: 12px, medium, line-height 16px
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Цвет: #868999 (фиксированный)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">
              Изображение карточки
            </h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Размещение</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  Привязано к правому краю, h-full, object-contain
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  Готовое изображение: стек из 3 карточек + Play-кнопка уже в картинке
                </p>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Высота</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  160px (вся высота карточки)
                </code>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Плейсхолдер</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  /images/carousel/practice-card-2x.png
                </code>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">
              Карточка «Смотреть ещё»
            </h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Размер</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  200px × self-stretch
                </code>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Граница</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  border-light-border-secondary — rgba(34, 38, 59, 0.1)
                </code>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Текст</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  16px, medium, text-center
                </code>
              </div>
              <div>
                <h4 className="text-label-m font-medium mb-4">Кнопка-стрелка</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  bg-white, rounded-full, px-16 py-8, arrow-right 24px
                </code>
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
        story:
          "Подробное описание всех используемых дизайн-токенов в компоненте SkillCourseCarousel",
      },
    },
  },
};
