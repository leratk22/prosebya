// Скрипт для перестройки структуры иконок
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../public/icons');
const icons = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));

// Группируем иконки по базовому названию
const iconMap = new Map();

icons.forEach(file => {
  const match = file.match(/^(.+?)-(\d+)\.svg$/);
  if (match) {
    const [, baseName, size] = match;
    if (!iconMap.has(baseName)) {
      iconMap.set(baseName, []);
    }
    iconMap.get(baseName).push({
      size: parseInt(size, 10),
      fileName: file,
    });
  } else {
    // Иконки без размера (если есть)
    const baseName = file.replace('.svg', '');
    if (!iconMap.has(baseName)) {
      iconMap.set(baseName, []);
    }
    iconMap.get(baseName).push({
      size: 16, // по умолчанию
      fileName: file,
    });
  }
});

// Создаем структуру данных
const iconsList = Array.from(iconMap.entries()).map(([baseName, variants]) => ({
  name: baseName,
  sizes: variants.map(v => v.size).sort((a, b) => a - b),
  files: variants.reduce((acc, v) => {
    acc[v.size] = v.fileName;
    return acc;
  }, {}),
}));

// Сохраняем обновленный список
const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(
  path.join(dataDir, 'icons.json'),
  JSON.stringify(iconsList, null, 2)
);

console.log(`Создана структура для ${iconsList.length} уникальных иконок`);
console.log('Примеры:');
iconsList.slice(0, 5).forEach(icon => {
  console.log(`  ${icon.name}: размеры ${icon.sizes.join(', ')}px`);
});
