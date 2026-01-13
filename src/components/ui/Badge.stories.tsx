import type { Meta, StoryObj } from "@storybook/react";
import { Badge, type BadgeProps } from "./badge";
import iconsData from "@/data/icons.json";

// Получаем список всех доступных иконок
const availableIcons = iconsData.map((icon) => icon.name).sort();

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Placeholder",
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "invert"],
    },
    iconName: {
      control: { type: "select" },
      options: ["", ...availableIcons],
      description: "Иконка из библиотеки (опциональна, всегда 16px)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Placeholder",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "default",
    iconName: "check",
    children: "Placeholder",
  },
};

export const Invert: Story = {
  args: {
    variant: "invert",
    children: "Placeholder",
  },
  render: (args) => (
    <div className="p-24 bg-dark-bg-primary rounded-m">
      <Badge {...args} />
    </div>
  ),
};

export const InvertWithIcon: Story = {
  args: {
    variant: "invert",
    iconName: "check",
    children: "Placeholder",
  },
  render: (args) => (
    <div className="p-24 bg-dark-bg-primary rounded-m">
      <Badge {...args} />
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <Badge variant="default">Без иконки</Badge>
      <Badge variant="default" iconName="check">
        С иконкой
      </Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <div className="flex flex-col gap-12">
        <h3 className="text-title-m font-semibold">Default (на светлом фоне)</h3>
        <div className="flex flex-wrap gap-8">
          <Badge variant="default">Без иконки</Badge>
          <Badge variant="default" iconName="check">
            С иконкой
          </Badge>
          <Badge variant="default" iconName="star">
            Star
          </Badge>
          <Badge variant="default" iconName="heart">
            Heart
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <h3 className="text-title-m font-semibold">Invert (на темном фоне)</h3>
        <div className="p-24 bg-dark-bg-primary rounded-m flex flex-wrap gap-8">
          <Badge variant="invert">Без иконки</Badge>
          <Badge variant="invert" iconName="check">
            С иконкой
          </Badge>
          <Badge variant="invert" iconName="star">
            Star
          </Badge>
          <Badge variant="invert" iconName="heart">
            Heart
          </Badge>
        </div>
      </div>
    </div>
  ),
};

