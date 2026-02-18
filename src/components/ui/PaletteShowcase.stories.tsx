import type { Meta, StoryObj } from "@storybook/react";
import { PaletteShowcase, PALETTES, type PaletteConfig } from "./palette-showcase";

const meta: Meta<typeof PaletteShowcase> = {
  title: "UI/PaletteShowcase",
  component: PaletteShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Компонент для демонстрации цветовых палитр дизайн-системы. Показывает сравнение 4 палитр с Gauge и Pie графиками.",
      },
    },
  },
  argTypes: {
    palettes: {
      control: false,
      description: "Массив конфигураций палитр для отображения",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaletteShowcase>;

export const Default: Story = {
  args: {
    palettes: PALETTES,
  },
};

export const SinglePalette: Story = {
  args: {
    palettes: [PALETTES[0]],
  },
};

export const ModernUIOnly: Story = {
  args: {
    palettes: [PALETTES[0]],
  },
};

export const EnterpriseOnly: Story = {
  args: {
    palettes: [PALETTES[1]],
  },
};

export const HighContrastOnly: Story = {
  args: {
    palettes: [PALETTES[2]],
  },
};

export const SoftPastelOnly: Story = {
  args: {
    palettes: [PALETTES[3]],
  },
};
