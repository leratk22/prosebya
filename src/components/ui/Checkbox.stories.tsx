import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Checkbox, type CheckboxProps } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Компонент Checkbox согласно дизайну из Figma.

**Варианты:**
- **round**: круглый чекбокс (borderRadius: 1000px)
- **box**: квадратный чекбокс (borderRadius: 6px)

**Состояния:**
- **Checked=No**: белый фон, border rgba(34, 38, 59, 0.1)
- **Checked=Yes**: фон #344079, белая галочка внутри

**Размеры:**
- По умолчанию: 24x24px
- Внутренний элемент: 20x20px (отступ 2px с каждой стороны)

**Figma:** [Checkbox](https://www.figma.com/design/Gr1ERrSAzB6n2xWAV5ECiu/%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D0%B7%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--mobile-?node-id=5453-218625&m=dev)
        `,
      },
    },
  },
  args: {
    checked: false,
    type: "box",
    disabled: false,
  },
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["round", "box"],
    },
    checked: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    size: {
      control: { type: "number" },
      description: "Размер чекбокса в пикселях (по умолчанию 24px)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    type: "box",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    type: "box",
    checked: true,
  },
};

export const Round: Story = {
  args: {
    type: "round",
    checked: false,
  },
};

export const RoundChecked: Story = {
  args: {
    type: "round",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    type: "box",
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    type: "box",
    checked: true,
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex flex-col gap-16">
        <Checkbox
          type="box"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <p className="text-14 text-core-alpha-60">
          Состояние: {checked ? "Выбран" : "Не выбран"}
        </p>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [boxChecked, setBoxChecked] = React.useState(false);
    const [roundChecked, setRoundChecked] = React.useState(false);
    
    return (
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-12">
          <h3 className="text-title-m font-semibold">Box Type</h3>
          <div className="flex items-center gap-16">
            <Checkbox
              type="box"
              checked={boxChecked}
              onChange={(e) => setBoxChecked(e.target.checked)}
            />
            <span className="text-14 text-core-alpha-80">
              {boxChecked ? "Выбран" : "Не выбран"}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col gap-12">
          <h3 className="text-title-m font-semibold">Round Type</h3>
          <div className="flex items-center gap-16">
            <Checkbox
              type="round"
              checked={roundChecked}
              onChange={(e) => setRoundChecked(e.target.checked)}
            />
            <span className="text-14 text-core-alpha-80">
              {roundChecked ? "Выбран" : "Не выбран"}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col gap-12">
          <h3 className="text-title-m font-semibold">Все состояния</h3>
          <div className="flex flex-col gap-16">
            <div className="flex items-center gap-16">
              <Checkbox type="box" checked={false} />
              <span className="text-14 text-core-alpha-80">Box - Не выбран</span>
            </div>
            <div className="flex items-center gap-16">
              <Checkbox type="box" checked={true} />
              <span className="text-14 text-core-alpha-80">Box - Выбран</span>
            </div>
            <div className="flex items-center gap-16">
              <Checkbox type="round" checked={false} />
              <span className="text-14 text-core-alpha-80">Round - Не выбран</span>
            </div>
            <div className="flex items-center gap-16">
              <Checkbox type="round" checked={true} />
              <span className="text-14 text-core-alpha-80">Round - Выбран</span>
            </div>
            <div className="flex items-center gap-16">
              <Checkbox type="box" checked={false} disabled />
              <span className="text-14 text-core-alpha-60">Box - Disabled</span>
            </div>
            <div className="flex items-center gap-16">
              <Checkbox type="box" checked={true} disabled />
              <span className="text-14 text-core-alpha-60">Box - Disabled Checked</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
