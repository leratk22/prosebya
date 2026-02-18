/**
 * Загрузка фото психологов из Figma.
 *
 * Вариант A — список нод из файла (удобно, когда вы выделили фото в Figma):
 *   1. Скопируйте scripts/psychologist-photo-node-ids.json.example в psychologist-photo-node-ids.json
 *   2. В Figma выделите 23 фрейма с фото в нужном порядке: сначала 12 женских, потом 11 мужских.
 *   3. Вставьте node ID в массив (порядок = психолог 1…23). ID можно взять из ссылки: ПКМ по фрейму → Copy link → node-id=XXX-YYY → в коде пишите "XXX:YYY".
 *   4. FIGMA_ACCESS_TOKEN=xxx node scripts/download-psychologist-photos.js
 *
 * Вариант B — автоматически из родительского фрейма 3713:546:
 *   FIGMA_ACCESS_TOKEN=xxx node scripts/download-psychologist-photos.js
 *   (скрипт сам возьмёт дочерние ноды и по названиям/порядку определит пол.)
 *
 * Токен: Figma → Settings → Account → Personal access tokens
 * Файл: https://www.figma.com/design/3gfXtZEZ1HzcvGnE2ei5cK/...?node-id=3713-546
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const FILE_KEY = "3gfXtZEZ1HzcvGnE2ei5cK";
const PARENT_NODE_ID = "3713:546";
const OUT_DIR = path.join(__dirname, "..", "public", "psychologists");
const NODE_IDS_FILE = path.join(__dirname, "psychologist-photo-node-ids.json");

/** Нормализация node ID из ссылки (3713-546) в формат API (3713:546). */
function normalizeNodeId(id) {
  if (typeof id !== "string") return null;
  const s = id.trim().replace(/-/g, ":");
  return s.length ? s : null;
}

// Порядок психологов по id и пол (из psychologists.ts)
const PSYCHOLOGIST_GENDERS = [
  "female", "male", "female", "male", "female", "male", "female", "male",
  "female", "male", "female", "male", "female", "male", "female", "female",
  "male", "female", "male", "female", "male", "female", "male",
];

function getToken() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    console.error("Задайте FIGMA_ACCESS_TOKEN в окружении.");
    console.error("Пример: FIGMA_ACCESS_TOKEN=xxx node scripts/download-psychologist-photos.js");
    process.exit(1);
  }
  return token;
}

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "X-Figma-Token": getToken() } }, (res) => {
      let data = "";
      res.on("data", (ch) => (data += ch));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on("error", reject);
  });
}

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on("data", (ch) => chunks.push(ch));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

function findNodeById(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
}

function isFemaleByName(name) {
  if (!name || typeof name !== "string") return false;
  const n = name.toLowerCase();
  return /female|woman|жен|дев|female|woman/i.test(n) || /\d+[_\s-]?ж/i.test(n);
}

function isMaleByName(name) {
  if (!name || typeof name !== "string") return false;
  const n = name.toLowerCase();
  return /male|man|муж|male|man/i.test(n) || /\d+[_\s-]?м/i.test(n);
}

async function main() {
  getToken();
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  let orderedNodeIds = [];

  if (fs.existsSync(NODE_IDS_FILE)) {
    console.log("Читаю список нод из", NODE_IDS_FILE);
    const raw = fs.readFileSync(NODE_IDS_FILE, "utf8");
    let arr;
    try {
      arr = JSON.parse(raw);
    } catch (e) {
      throw new Error("Неверный JSON в " + NODE_IDS_FILE + ": " + e.message);
    }
    if (!Array.isArray(arr)) {
      throw new Error(NODE_IDS_FILE + " должен содержать массив строк (node ID).");
    }
    for (let i = 0; i < 23; i++) {
      orderedNodeIds.push(normalizeNodeId(arr[i]) || null);
    }
    console.log("Использовано", orderedNodeIds.filter(Boolean).length, "node ID из файла.");
  }

  if (orderedNodeIds.length === 0 || orderedNodeIds.every((id) => id == null)) {
    console.log("Запрос структуры файла Figma (узел " + PARENT_NODE_ID + ")...");
    const fileUrl = `https://api.figma.com/v1/files/${FILE_KEY}?ids=${encodeURIComponent(PARENT_NODE_ID)}&depth=2`;
    const fileData = await get(fileUrl);
    const doc = fileData.document;
    if (!doc) {
      throw new Error("Нет document в ответе Figma. Проверьте file key и node id.");
    }

    const parent = findNodeById(doc, PARENT_NODE_ID);
    if (!parent) {
      throw new Error("Узел " + PARENT_NODE_ID + " не найден в файле.");
    }

    const children = parent.children || [];
    if (children.length < 23) {
      console.warn("Ожидалось не менее 23 фреймов, найдено:", children.length);
    }

    const femaleNodes = [];
    const maleNodes = [];
    for (const c of children) {
      const name = c.name || "";
      if (isFemaleByName(name)) femaleNodes.push(c);
      else if (isMaleByName(name)) maleNodes.push(c);
      else {
        if (femaleNodes.length < 12) femaleNodes.push(c);
        else maleNodes.push(c);
      }
    }

    const femaleCount = PSYCHOLOGIST_GENDERS.filter((g) => g === "female").length;
    const maleCount = PSYCHOLOGIST_GENDERS.filter((g) => g === "male").length;
    if (femaleNodes.length < femaleCount || maleNodes.length < maleCount) {
      console.warn(
        "Фреймов по полу: female=" + femaleNodes.length + ", male=" + maleNodes.length + ". " +
        "Нужно: female=" + femaleCount + ", male=" + maleCount + ". " +
        "Используем порядок: первые " + femaleCount + " — женские, остальные — мужские."
      );
      femaleNodes.length = 0;
      maleNodes.length = 0;
      for (let i = 0; i < children.length; i++) {
        if (i < femaleCount) femaleNodes.push(children[i]);
        else maleNodes.push(children[i]);
      }
    }

    let fi = 0;
    let mi = 0;
    for (const g of PSYCHOLOGIST_GENDERS) {
      if (g === "female") {
        orderedNodeIds.push(femaleNodes[fi] ? femaleNodes[fi].id : null);
        fi++;
      } else {
        orderedNodeIds.push(maleNodes[mi] ? maleNodes[mi].id : null);
        mi++;
      }
    }
  }

  const validIds = orderedNodeIds.filter(Boolean);
  if (validIds.length === 0) {
    throw new Error("Нет дочерних нод для экспорта.");
  }

  console.log("Запрос URL изображений у Figma...");
  const idsParam = validIds.join(",");
  const imagesUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(idsParam)}&format=png&scale=2`;
  const imagesData = await get(imagesUrl);
  const images = imagesData.images || {};
  if (Object.keys(images).length === 0) {
    throw new Error("Figma не вернул URL изображений. Проверьте права и node id.");
  }

  let saved = 0;
  for (let i = 0; i < orderedNodeIds.length; i++) {
    const nodeId = orderedNodeIds[i];
    if (!nodeId) continue;
    const url = images[nodeId];
    if (!url) {
      console.warn("Нет URL для ноды", nodeId, "(психолог id " + (i + 1) + ")");
      continue;
    }
    const buf = await download(url);
    const outPath = path.join(OUT_DIR, `${i + 1}.png`);
    fs.writeFileSync(outPath, buf);
    saved++;
    console.log("Сохранено:", outPath);
  }

  console.log("Готово. Сохранено файлов:", saved, "в", OUT_DIR);
  console.log("psychologists.ts уже использует пути /psychologists/1.png … /psychologists/23.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
