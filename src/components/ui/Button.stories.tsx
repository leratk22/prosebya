import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonProps } from "./button";
import iconsData from "@/data/icons.json";

// Получаем список всех доступных иконок
const availableIcons = iconsData.map((icon) => icon.name).sort();

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Label",
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: { type: "radio" },
      options: ["s", "m", "l"],
    },
    inverted: {
      control: { type: "boolean" },
    },
    fullWidth: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
      description: "Состояние загрузки. При loading=true кнопка становится disabled, вместо текста отображается спиннер 16px (желтый)",
    },
    leftIconName: {
      control: { type: "select" },
      options: ["", ...availableIcons],
      description: "Иконка из библиотеки слева",
    },
    rightIconName: {
      control: { type: "select" },
      options: ["", ...availableIcons],
      description: "Иконка из библиотеки справа",
    },
    iconSize: {
      control: { type: "select" },
      options: [16, 20, 24],
      description: "Размер иконок (автоматически определяется по размеру кнопки, если не указан)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "m",
    children: "Primary button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "m",
    children: "Disabled button",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    size: "m",
    children: "Loading button",
    loading: true,
  },
};

export const LoadingVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-16 max-w-xs">
      <div>
        <h3 className="text-title-m font-semibold mb-8">Primary Loading</h3>
        <Button variant="primary" size="m" loading>
          Loading
        </Button>
      </div>
      <div>
        <h3 className="text-title-m font-semibold mb-8">Secondary Loading</h3>
        <Button variant="secondary" size="m" loading>
          Loading
        </Button>
      </div>
      <div>
        <h3 className="text-title-m font-semibold mb-8">Tertiary Loading</h3>
        <Button variant="tertiary" size="m" loading>
          Loading
        </Button>
      </div>
    </div>
  ),
};

export const LoadingSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-16 max-w-xs">
      <div>
        <h3 className="text-title-m font-semibold mb-8">Large (L)</h3>
        <Button variant="primary" size="l" loading>
          Loading
        </Button>
      </div>
      <div>
        <h3 className="text-title-m font-semibold mb-8">Medium (M)</h3>
        <Button variant="primary" size="m" loading>
          Loading
        </Button>
      </div>
      <div>
        <h3 className="text-title-m font-semibold mb-8">Small (S)</h3>
        <Button variant="primary" size="s" loading>
          Loading
        </Button>
      </div>
    </div>
  ),
};

export const LoadingInverted: Story = {
  render: () => (
    <div className="flex flex-col gap-16 max-w-xs">
      <div>
        <h3 className="text-title-m font-semibold mb-8">Secondary Inverted Loading</h3>
        <Button variant="secondary" inverted size="m" loading>
          Loading
        </Button>
      </div>
      <div>
        <h3 className="text-title-m font-semibold mb-8">Tertiary Inverted Loading</h3>
        <Button variant="tertiary" inverted size="m" loading>
          Loading
        </Button>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "m",
    children: "Secondary button",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    size: "m",
    children: "Tertiary button",
  },
};

export const InvertedSecondary: Story = {
  args: {
    variant: "secondary",
    inverted: true,
    size: "m",
    children: "Secondary inverted",
  },
};

export const Sizes: Story = {
  render: (args: ButtonProps) => (
    <div className="flex flex-col gap-4 max-w-xs">
      <Button {...args} size="l">
        Large (L)
      </Button>
      <Button {...args} size="m">
        Medium (M)
      </Button>
      <Button {...args} size="s">
        Small (S)
      </Button>
    </div>
  ),
  args: {
    variant: "primary",
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-16 max-w-xs">
      <Button variant="primary" size="m" leftIconName="play">
        Play
      </Button>
      <Button variant="primary" size="m" leftIconName="pause">
        Pause
      </Button>
      <Button variant="primary" size="m" leftIconName="chevron-left">
        Back
      </Button>
      <Button variant="primary" size="m" rightIconName="chevron-right">
        Next
      </Button>
      <Button variant="primary" size="m" leftIconName="chevron-up">
        Up
      </Button>
      <Button variant="primary" size="m" leftIconName="chevron-down">
        Down
      </Button>
      <Button variant="primary" size="m" leftIconName="settings">
        Settings
      </Button>
      <Button variant="primary" size="m" leftIconName="search">
        Search
      </Button>
    </div>
  ),
};

export const WithIconsLeftAndRight: Story = {
  render: () => (
    <div className="flex flex-col gap-16 max-w-xs">
      <Button variant="primary" size="m" leftIconName="play" rightIconName="chevron-right">
        Play and Next
      </Button>
      <Button variant="secondary" size="m" leftIconName="chevron-left" rightIconName="chevron-right">
        Navigation
      </Button>
    </div>
  ),
};
