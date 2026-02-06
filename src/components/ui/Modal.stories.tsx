import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal, type ModalButtonConfig } from "./modal";
import { Button } from "./button";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
**Неполноэкранное модальное окно** — диалог по центру экрана с оверлеем.

- **Кнопки** — всегда 1, 2 или 3. **Размер: кнопка M.** Комбинации только такие: **1 кнопка** — всегда primary; **2** — primary и secondary (порядок по \`buttonLayout\`); **3** — primary, secondary, tertiary.
- **Заголовок или текст** — хотя бы один обязателен (модалка не может быть только с кнопками).

Закрытие: клик по оверлею (если \`closeOnOverlayClick\`), клавиша Escape, либо кнопка с \`onClick\`/без обработчика (тогда вызывается \`onClose\`).

**Figma:** [Модальное окно](https://www.figma.com/design/Gr1ERrSAzB6n2xWAV5ECiu/?node-id=38287-24301), [Кнопки](https://www.figma.com/design/Gr1ERrSAzB6n2xWAV5ECiu/?node-id=5453-222174).
        `,
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Открыто ли модальное окно",
    },
    title: {
      control: "text",
      description: "Заголовок (опционально, но обязателен title или text)",
    },
    text: {
      control: "text",
      description: "Основной текст (опционально, но обязателен title или text)",
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "Закрывать при клике по оверлею",
    },
    buttons: {
      description: "Кнопки (1, 2 или 3). Вариант задаётся комбинацией: 1 → primary; 2 → primary и secondary; 3 → primary, secondary, tertiary.",
    },
    buttonLayout: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "Раскладка при двух кнопках: horizontal (рядом) или vertical (столбиком).",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

// Обёртка с состоянием для интерактивных историй
function ModalWrapper({
  defaultOpen = false,
  ...modalProps
}: React.ComponentProps<typeof Modal> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="min-h-[400px] p-16">
      <Button variant="primary" size="m" onClick={() => setOpen(true)}>
        Открыть модалку
      </Button>
      <Modal
        {...modalProps}
        open={open}
        onClose={() => setOpen(false)}
        buttons={modalProps.buttons.map((btn) => ({
          ...btn,
          onClick: btn.onClick
            ? () => {
                btn.onClick?.();
                setOpen(false);
              }
            : () => setOpen(false),
        }))}
      />
    </div>
  );
}

/** Полный вариант: заголовок + текст + две кнопки горизонтально (Secondary слева, Primary справа) */
export const Full: Story = {
  render: () => (
    <ModalWrapper
      defaultOpen
      title="Подтвердите действие"
      text="Вы уверены, что хотите продолжить? Это действие нельзя отменить."
      buttons={[
        { label: "Отмена" },
        { label: "Подтвердить" },
      ]}
      buttonLayout="horizontal"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Заголовок, основной текст и две кнопки горизонтально (Secondary слева, Primary справа). Расстояние между заголовком и текстом — 12px.",
      },
    },
  },
};

/** Только заголовок и кнопки (без текста) — две кнопки горизонтально */
export const TitleAndButtonsOnly: Story = {
  render: () => (
    <ModalWrapper
      defaultOpen
      title="Выход из аккаунта?"
      buttons={[
        { label: "Отмена" },
        { label: "Выйти" },
      ]}
      buttonLayout="horizontal"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Состояние без основного текста — только заголовок и две кнопки горизонтально (кнопка M).",
      },
    },
  },
};

/** Две кнопки вертикально: Primary сверху, Secondary снизу. Кнопка M. */
export const TwoButtonsVertical: Story = {
  render: () => (
    <ModalWrapper
      defaultOpen
      title="Выберите действие"
      text="Primary сверху, Secondary снизу. Обе full width."
      buttons={[
        { label: "Основное действие" },
        { label: "Вторичное" },
      ]}
      buttonLayout="vertical"
    />
  ),
};

/** Только текст и кнопки (без заголовка) */
export const TextAndButtonsOnly: Story = {
  render: () => (
    <ModalWrapper
      defaultOpen
      text="Изменения сохранены. Вы можете закрыть это окно."
      buttons={[{ label: "ОК" }]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Состояние без заголовка — только текст и кнопка.",
      },
    },
  },
};

/** Одна кнопка (всегда primary). */
export const SingleButton: Story = {
  render: () => (
    <ModalWrapper
      defaultOpen
      title="Уведомление"
      text="Операция выполнена успешно."
      buttons={[{ label: "Понятно" }]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Одна кнопка — всегда primary (комбинация фиксирована).",
      },
    },
  },
};

/** Три кнопки: primary, secondary, tertiary (порядок фиксирован). */
export const ThreeButtons: Story = {
  render: () => (
    <ModalWrapper
      defaultOpen
      title="Выберите действие"
      text="Можно опубликовать, сохранить черновик или отменить."
      buttons={[
        { label: "Опубликовать" },
        { label: "Черновик" },
        { label: "Отмена" },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Три кнопки: первая — primary, вторая — secondary, третья — tertiary (комбинация фиксирована).",
      },
    },
  },
};

/** Кнопка в состоянии загрузки */
export const ButtonLoading: Story = {
  render: () => (
    <ModalWrapper
      defaultOpen
      title="Сохранение"
      text="Подождите, данные отправляются..."
      buttons={[
        { label: "Отмена" },
        { label: "Сохранить", loading: true },
      ]}
      buttonLayout="horizontal"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Одна из кнопок в состоянии loading (используется спиннер в Button).",
      },
    },
  },
};

/** Отключённая кнопка */
export const ButtonDisabled: Story = {
  render: () => (
    <ModalWrapper
      defaultOpen
      title="Подтверждение"
      text="Согласитесь с условиями, чтобы продолжить."
      buttons={[
        { label: "Отмена" },
        { label: "Принять", disabled: true },
      ]}
      buttonLayout="horizontal"
    />
  ),
};

/** Без закрытия по клику на оверлей */
export const NoOverlayClose: Story = {
  render: () => (
    <ModalWrapper
      defaultOpen
      title="Важное сообщение"
      text="Закрыть можно только кнопкой или Escape."
      closeOnOverlayClick={false}
      buttons={[{ label: "Закрыть" }]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "closeOnOverlayClick = false — клик по затемнённой области не закрывает модалку.",
      },
    },
  },
};

/** Кастомный контент (children вместо text) */
export const CustomContent: Story = {
  render: () => (
    <ModalWrapper
      defaultOpen
      title="Настройки"
      buttons={[
        { label: "Отмена" },
        { label: "Сохранить" },
      ]}
      buttonLayout="horizontal"
    >
      <p className="mb-12">Ниже — произвольная разметка (список, форма и т.д.):</p>
      <ul className="list-disc list-inside text-body-l space-y-4">
        <li>Пункт 1</li>
        <li>Пункт 2</li>
        <li>Пункт 3</li>
      </ul>
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: "Передача кастомного контента через children (вместо или вместе с text).",
      },
    },
  },
};

/** Контролируемое открытие/закрытие через args */
export const Controlled: Story = {
  args: {
    open: true,
    title: "Контролируемая модалка",
    text: "Управляется из Canvas через контроль open.",
    closeOnOverlayClick: true,
    buttons: [
      { label: "Отмена" },
      { label: "ОК" },
    ],
    buttonLayout: "horizontal",
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);
    return (
      <div className="min-h-[300px] p-16">
        <Button variant="primary" size="m" onClick={() => setOpen(true)}>
          Открыть
        </Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          buttons={args.buttons.map((b) => ({
            ...b,
            onClick: () => setOpen(false),
          }))}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Состояние open и onClose можно переключать в панели Controls.",
      },
    },
  },
};
