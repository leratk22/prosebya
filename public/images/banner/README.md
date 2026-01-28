# Баннерные изображения для BannerImageCardWeb

## Требуемые файлы

1. **banner-desktop.png** - изображение для desktop версии (756px × 176px)
   - Node ID в Figma: `10039:107969`
   - Размеры: 756px × 176px
   - Формат: PNG
   - Масштаб: 1x (для retina используйте 2x)

2. **banner-mobile.png** - изображение для mobile версии (343px × 176px, соотношение сторон ~1.95:1)
   - Node ID в Figma: `10039:107970`
   - Размеры: 343px × 176px (или пропорционально для адаптивности)
   - Формат: PNG
   - Масштаб: 1x (для retina используйте 2x)

## Инструкция по загрузке из Figma

1. Откройте Figma файл: https://www.figma.com/design/NvzcX700bseJnlyBwa2zFv/%D0%9B%D0%9A-%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8--WEB-?node-id=10039-107968

2. Выберите компонент для desktop (node-id: 10039-107969)
3. Экспортируйте как PNG с масштабом 1x
4. Сохраните как `banner-desktop.png` в папку `public/images/banner/`

5. Выберите компонент для mobile (node-id: 10039-107970)
6. Экспортируйте как PNG с масштабом 1x
7. Сохраните как `banner-mobile.png` в папку `public/images/banner/`

## Альтернативный способ через MCP инструменты

Используйте MCP инструмент `export_node_as_image` для экспорта:
- Desktop: `export_node_as_image` с nodeId `10039:107969`, format `PNG`, scale `1`
- Mobile: `export_node_as_image` с nodeId `10039:107970`, format `PNG`, scale `1`
