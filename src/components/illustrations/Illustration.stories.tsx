import type { Meta, StoryObj } from "@storybook/react";
import { Illustration, type IllustrationType } from "./illustration";

const meta: Meta<typeof Illustration> = {
  title: "Illustrations/Illustration",
  component: Illustration,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Компонент для отображения иллюстраций из Figma. Автоматически загружает изображения в правильном разрешении (1x или 2x) в зависимости от device pixel ratio.",
      },
    },
  },
  args: {
    type: "something-happened",
    width: 200,
    height: 200,
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: [
        "something-happened",
        "time-slot",
        "self-esteem",
        "working-calmly",
        "test",
        "past",
        "reactions",
        "self-help",
        "take-on-challenges",
        "see-a-therapist",
        "payment-completed",
        "relax",
        "aggression",
        "self-knowledge",
        "thanks-for-feedback",
        "card-saved",
        "self-care",
        "therapist",
        "payment-not-processed",
        "emotions",
        "enjoy-life-daily",
        "want-to-grow",
        "couch",
        "meditation",
        "player",
        "burn-out",
        "aggression-level",
        "depression",
        "type49",
        "building",
        "skills",
        "heart",
        "tree",
        "battery",
        "relax-meditation",
        "clock",
        "megaphone",
        "stones",
        "before-conversation",
        "laptop-fire",
        "overloaded",
        "deep-relax",
        "coffee-relax",
        "sandclock",
        "earphones",
        "hugs-himself",
        "puzzles",
        "holding-sun",
        "emotions-level-orange",
        "question",
        "thoughts",
        "party",
        "okay",
        "phone",
        "empty-search",
      ] as IllustrationType[],
      description: "Тип иллюстрации согласно Figma компоненту _illustration",
    },
    width: {
      control: { type: "number" },
      description: "Ширина иллюстрации в пикселях",
    },
    height: {
      control: { type: "number" },
      description: "Высота иллюстрации в пикселях",
    },
    alt: {
      control: { type: "text" },
      description: "Альтернативный текст для изображения",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Illustration>;

export const Default: Story = {
  args: {
    type: "something-happened",
  },
};

export const AllIllustrations: Story = {
  render: () => {
    const allTypes: IllustrationType[] = [
      "something-happened",
      "time-slot",
      "self-esteem",
      "working-calmly",
      "test",
      "past",
      "reactions",
      "self-help",
      "take-on-challenges",
      "see-a-therapist",
      "payment-completed",
      "relax",
      "aggression",
      "self-knowledge",
      "thanks-for-feedback",
      "card-saved",
      "self-care",
      "therapist",
      "payment-not-processed",
      "emotions",
      "enjoy-life-daily",
      "want-to-grow",
      "couch",
      "meditation",
      "player",
      "burn-out",
      "aggression-level",
      "depression",
      "type49",
      "building",
      "skills",
      "heart",
      "tree",
      "battery",
      "relax-meditation",
      "clock",
      "megaphone",
      "stones",
      "before-conversation",
      "laptop-fire",
      "overloaded",
      "deep-relax",
      "coffee-relax",
      "sandclock",
      "earphones",
      "hugs-himself",
      "puzzles",
      "holding-sun",
      "emotions-level-orange",
      "question",
      "thoughts",
      "party",
      "okay",
      "phone",
      "empty-search",
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 p-8">
        {allTypes.map((type) => (
          <div key={type} className="flex flex-col items-center gap-4">
            <Illustration
              type={type}
              width={200}
              height={200}
              alt={`Illustration: ${type}`}
            />
            <p className="text-xs text-center text-gray-600 dark:text-gray-400 max-w-[200px] break-words">
              {type}
            </p>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center p-8">
      <div className="flex flex-col items-center gap-4">
        <Illustration type="something-happened" width={100} height={100} />
        <p className="text-sm">100x100</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Illustration type="something-happened" width={200} height={200} />
        <p className="text-sm">200x200 (default)</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Illustration type="something-happened" width={300} height={300} />
        <p className="text-sm">300x300</p>
      </div>
    </div>
  ),
};
