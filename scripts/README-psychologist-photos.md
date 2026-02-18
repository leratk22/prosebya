# Фото психологов из Figma

## Как получить фото после того, как вы выделили их в Figma

1. **Скопируйте пример файла с node ID:**
   ```bash
   cp scripts/psychologist-photo-node-ids.json.example scripts/psychologist-photo-node-ids.json
   ```

2. **В Figma:** выделите 23 фрейма с фото в нужном порядке:
   - первые **12** — женские фото (для психологов 1, 3, 5, 7, 9, 11, 13, 15, 16, 18, 20, 22);
   - следующие **11** — мужские фото (для психологов 2, 4, 6, 8, 10, 12, 14, 17, 19, 21, 23).

3. **Узнать node ID каждого фрейма:**
   - Выделите один фрейм → ПКМ → **Copy link** (или **Copy/paste as** → **Copy link**).
   - В ссылке будет `node-id=XXXX-YYYY` → в JSON пишите `"XXXX:YYYY"` (дефис заменить на двоеточие).
   - Повторите для всех 23 фреймов в том же порядке и вставьте в `psychologist-photo-node-ids.json`.

4. **Запуск загрузки:**
   ```bash
   FIGMA_ACCESS_TOKEN=ваш_токен node scripts/download-psychologist-photos.js
   ```
   Токен: Figma → Settings → Account → **Personal access tokens**.

Файлы появятся в `public/psychologists/1.png` … `23.png`. В приложении уже используются пути `/psychologists/1.png` … `/psychologists/23.png`.
