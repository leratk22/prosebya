import type { Meta, StoryObj } from "@storybook/react";
import {
  SkillCourseCardWeb,
  type SkillCourseCardWebProps,
} from "./skill-course-card-web";

const meta: Meta<typeof SkillCourseCardWeb> = {
  title: "Cards/SkillCourseCardWeb",
  component: SkillCourseCardWeb,
  tags: ["autodocs"],
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        component: `
Карточка для отображения курса навыков согласно дизайну из Figma.

**Дизайн в Figma:** [SkillCourseCardWeb](https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv/%D0%9B%D0%9A-%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--WEB-?node-id=10348-86253&m=dev&t=4UI1WKLLMK9UJTeE-1)

**Адаптивность:**
- **Mobile**: ширина растягивается под контейнер
- **Desktop**: максимальная ширина **756px**

**Состояния:**
- **Default**: обычное состояние карточки курса
- **In progress**: состояние с информацией о следующем упражнении

**Особенности:**
- Заголовок Default Desktop: максимум 3 строки (line-clamp-3)
- Заголовок Default Mobile: максимум 2 строки (line-clamp-2)
- Заголовок In progress: максимум 2 строки (line-clamp-2) для обоих вариантов
- Название упражнения: максимум 3 строки (line-clamp-3) для обоих вариантов
- Mobile Default: на видео отображается тэг через компонент _video-addon
- Весь блок кликабельный при наведении (если передан onClick)
        `,
      },
    },
  },
  args: {
    subtitle: "тэг",
    title: "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается",
    state: "default",
    buttonText: "Название кнопки",
    videoTag: "Тэг",
  },
  argTypes: {
    subtitle: {
      control: { type: "text" },
      description: "Тэг (Caption/S, uppercase)",
    },
    title: {
      control: { type: "text" },
      description: "Заголовок курса",
    },
    state: {
      control: { type: "select" },
      options: ["default", "in-progress"],
      description: "Состояние карточки",
    },
    videoImageUrl: {
      control: { type: "text" },
      description: "URL изображения видео",
    },
    videoImageAlt: {
      control: { type: "text" },
      description: "Alt текст для видео",
    },
    buttonText: {
      control: { type: "text" },
      description: "Текст кнопки",
    },
    buttonOnClick: {
      action: "buttonClicked",
      description: "Обработчик клика кнопки",
    },
    videoTag: {
      control: { type: "text" },
      description: "Тэг для отображения на видео (Mobile Default)",
    },
    nextExerciseSubtitle: {
      control: { type: "text" },
      description: "Подзаголовок следующего упражнения",
    },
    nextExerciseTitle: {
      control: { type: "text" },
      description: "Название упражнения",
    },
    nextExerciseImageUrl: {
      control: { type: "text" },
      description: "URL обложки упражнения",
    },
    nextExerciseImageAlt: {
      control: { type: "text" },
      description: "Alt текст для обложки",
    },
    nextExerciseButtonText: {
      control: { type: "text" },
      description: "Текст кнопки упражнения",
    },
    nextExerciseButtonOnClick: {
      action: "exerciseButtonClicked",
      description: "Обработчик клика кнопки упражнения",
    },
    onClick: {
      action: "clicked",
      description: "Обработчик клика на всю карточку",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SkillCourseCardWeb>;

export const DefaultDesktop: Story = {
  args: {
    subtitle: "тэг",
    title:
      "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается",
    state: "default",
    videoImageUrl: "/ImageExample3x.png",
    videoImageAlt: "Video preview",
    buttonText: "Название кнопки",
    buttonOnClick: () => {
      console.log("Button clicked");
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

export const DefaultMobile: Story = {
  args: {
    title: "Заголовок на две строки, а затем обрезаем его многоточ...",
    state: "default",
    videoImageUrl: "/ImageExample3x.png",
    videoImageAlt: "Video preview",
    videoTag: "Тэг",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const InProgressDesktop: Story = {
  args: {
    subtitle: "Тэг",
    title: "Название всего курса максимум в две строки, потом многоточие",
    state: "in-progress",
    nextExerciseSubtitle: "Следующее упражнение",
    nextExerciseTitle:
      "Название упражнения, максимум три строки на десктопе, если длиннее, то обрезаем в многоточие, но таких названий вроде и нет",
    nextExerciseImageUrl: "/ImageExample3x.png",
    nextExerciseImageAlt: "Exercise cover",
    nextExerciseButtonText: "Название кнопки",
    nextExerciseButtonOnClick: () => {
      console.log("Exercise button clicked");
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

export const InProgressMobile: Story = {
  args: {
    subtitle: "Тэг",
    title: "Название всего курса максимум в две строки, потом многоточие",
    state: "in-progress",
    nextExerciseSubtitle: "Следующее упражнение",
    nextExerciseTitle:
      "Название упражнения, максимум три строки, если длиннее, то обрезаем в многоточие, но таких названий вроде и нет",
    nextExerciseImageUrl: "/ImageExample3x.png",
    nextExerciseImageAlt: "Exercise cover",
    nextExerciseButtonText: "Название кнопки",
    nextExerciseButtonOnClick: () => {
      console.log("Exercise button clicked");
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const Clickable: Story = {
  args: {
    subtitle: "тэг",
    title:
      "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается",
    state: "default",
    videoImageUrl: "/ImageExample3x.png",
    videoImageAlt: "Video preview",
    buttonText: "Название кнопки",
    onClick: () => {
      alert("Карточка кликнута!");
    },
    buttonOnClick: () => {
      alert("Кнопка кликнута!");
    },
  },
};

export const WithoutSubtitle: Story = {
  args: {
    title:
      "Заголовок на три строки, а затем обрезаем его в многоточие, если не умещается",
    state: "default",
    videoImageUrl: "/ImageExample3x.png",
    videoImageAlt: "Video preview",
    buttonText: "Название кнопки",
  },
};

export const LongTitle: Story = {
  args: {
    subtitle: "тэг",
    title:
      "Очень длинный заголовок который должен обрезаться после трех строк на десктопе и после двух строк на мобильном устройстве если текст не умещается в отведенное пространство карточки курса навыков и продолжается дальше",
    state: "default",
    videoImageUrl: "/ImageExample3x.png",
    videoImageAlt: "Video preview",
    buttonText: "Название кнопки",
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
            <h3 className="text-title-m font-semibold mb-12">Карточка</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Фон (Default)</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  bg-gray-core
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  #EAEFF8 (примитивный токен)
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Фон (In progress)
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  bg-gray-light
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  #F4F6FA (примитивный токен)
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Радиус скругления
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  rounded-m
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  16px (radius-m)
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Максимальная ширина (Desktop)
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  md:max-w-[756px]
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  756px только для desktop
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Типографика</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">Subtitle</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  MVP2.0/Caption/S
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  12px, uppercase, letter-spacing 10%
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Title Default Desktop
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  MVP2.0/Title/L line-clamp-3
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  24px, line-height 1.333em, letter-spacing -1.5%, максимум 3
                  строки
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Title Default Mobile
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  MVP2.0/Title/M line-clamp-2
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  20px, line-height 1.2em, letter-spacing -1%, максимум 2
                  строки
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Title In progress Desktop
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  MVP2.0/Title/M line-clamp-2
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  20px, line-height 1.2em, letter-spacing -1%, максимум 2
                  строки
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Title In progress Mobile
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  MVP2.0/Title/L line-clamp-2
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  24px, line-height 1.333em, letter-spacing -1.5%, максимум 2
                  строки
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Next Exercise Title Desktop
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  MVP2.0/Title/L line-clamp-3
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  24px, line-height 1.333em, letter-spacing -1.5%, максимум 3
                  строки
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Next Exercise Title Mobile
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  MVP2.0/Body/L-Medium line-clamp-3
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  16px, line-height 1.5em, максимум 3 строки
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Отступы</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Default Desktop
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  p-20
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  20px со всех сторон
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">Mobile</h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  p-16
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  16px со всех сторон
                </p>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  In progress Desktop
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  p-24
                </code>
                <p className="text-body-s text-light-fg-secondary dark:text-dark-fg-secondary mt-4">
                  24px со всех сторон
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-title-m font-semibold mb-12">Размеры</h3>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-m p-16 space-y-8">
              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Видео (Desktop Default)
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  343px × 193px
                </code>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Видео (Mobile Default)
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  ширина: 100%, высота: 193px
                </code>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Обложка упражнения (Desktop)
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  160px × 192px
                </code>
              </div>

              <div>
                <h4 className="text-label-m font-medium mb-4">
                  Обложка упражнения (Mobile)
                </h4>
                <code className="text-body-s bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 rounded-s block">
                  80px × 96px
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
          "Подробное описание всех используемых дизайн-токенов в компоненте SkillCourseCardWeb",
      },
    },
  },
};
