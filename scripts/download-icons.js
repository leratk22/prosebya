// Скрипт для массовой загрузки иконок из Figma
// Использование: node scripts/download-icons.js

const fs = require('fs');
const path = require('path');

// Список всех node-id из ссылок
const iconNodes = [
  { nodeId: '43822:7575', name: 'hash-16' },
  { nodeId: '43821:7526', name: 'phone-16' },
  { nodeId: '12973:89069', name: 'lock-16' },
  { nodeId: '5453:218549', name: 'book-16' },
  { nodeId: '15352:114859', name: 'select-multiple-16' },
  { nodeId: '5453:218537', name: 'log-out-16' },
  { nodeId: '5453:218516', name: 'chevron-right-20' },
  { nodeId: '5453:218504', name: 'chevron-right-16' },
  { nodeId: '5453:218488', name: 'chevron-left-16' },
  { nodeId: '33556:250331', name: 'thumbs-up-20' },
  { nodeId: '6302:88502', name: 'thumbs-down-20' },
  { nodeId: '42862:6504', name: 'heart-16' },
  { nodeId: '5453:218543', name: 'star-16' },
  { nodeId: '12973:89131', name: 'scan-face-id-16' },
  { nodeId: '36043:25194', name: 'camera-16' },
  { nodeId: '33556:250335', name: 'image-16' },
  { nodeId: '5453:218492', name: 'file-16' },
  { nodeId: '33556:250333', name: 'folder-16' },
  { nodeId: '33556:250337', name: 'download-16' },
  { nodeId: '5453:218498', name: 'upload-16' },
  { nodeId: '5453:218474', name: 'share-16' },
  { nodeId: '5453:218480', name: 'copy-16' },
  { nodeId: '5453:218450', name: 'cut-16' },
  { nodeId: '5453:218468', name: 'paste-16' },
  { nodeId: '35241:253815', name: 'trash-16' },
  { nodeId: '35995:25189', name: 'edit-16' },
  { nodeId: '12973:89130', name: 'check-16' },
  { nodeId: '5453:218496', name: 'x-16' },
  { nodeId: '15352:114858', name: 'plus-16' },
  { nodeId: '5453:218547', name: 'minus-16' },
  { nodeId: '5453:218490', name: 'search-16' },
  { nodeId: '43821:7525', name: 'filter-16' },
  { nodeId: '5453:218541', name: 'menu-16' },
  { nodeId: '5453:218514', name: 'more-vertical-16' },
  { nodeId: '5453:218486', name: 'more-horizontal-16' },
  { nodeId: '5453:218448', name: 'arrow-up-16' },
  { nodeId: '5453:218478', name: 'arrow-down-16' },
  { nodeId: '5453:218466', name: 'arrow-left-16' },
  { nodeId: '12973:89068', name: 'arrow-right-16' },
  { nodeId: '5453:218535', name: 'chevron-up-16' },
  { nodeId: '39864:6029', name: 'chevron-down-16' },
  { nodeId: '5453:218502', name: 'chevron-left-20' },
  { nodeId: '43822:7574', name: 'chevron-right-24' },
  { nodeId: '5453:218472', name: 'info-16' },
  { nodeId: '5453:218510', name: 'alert-circle-16' },
  { nodeId: '5453:218508', name: 'alert-triangle-16' },
  { nodeId: '43822:7573', name: 'help-circle-16' },
  { nodeId: '36285:5508', name: 'bell-16' },
  { nodeId: '35339:40637', name: 'user-16' },
  { nodeId: '5453:218462', name: 'users-16' },
  { nodeId: '35339:40581', name: 'user-plus-16' },
  { nodeId: '5453:218470', name: 'user-minus-16' },
  { nodeId: '40715:7452', name: 'mail-16' },
  { nodeId: '35339:40618', name: 'message-16' },
  { nodeId: '35340:40682', name: 'message-square-16' },
  { nodeId: '35337:40516', name: 'send-16' },
  { nodeId: '25558:82926', name: 'calendar-16' },
  { nodeId: '15210:106854', name: 'clock-16' },
  { nodeId: '12973:89129', name: 'time-16' },
  { nodeId: '12973:89067', name: 'timer-16' },
  { nodeId: '5453:218539', name: 'home-16' },
  { nodeId: '5453:218512', name: 'map-pin-16' },
  { nodeId: '5453:218500', name: 'navigation-16' },
  { nodeId: '40715:7443', name: 'compass-16' },
  { nodeId: '35241:253814', name: 'globe-16' },
  { nodeId: '43821:7524', name: 'wifi-16' },
  { nodeId: '5453:218506', name: 'chevron-right-24' },
  { nodeId: '5453:218533', name: 'shield-16' },
  { nodeId: '5453:218482', name: 'key-16' },
  { nodeId: '35339:40648', name: 'unlock-16' },
  { nodeId: '5453:218476', name: 'eye-16' },
  { nodeId: '5453:218446', name: 'eye-off-16' },
  { nodeId: '34968:41696', name: 'visibility-16' },
  { nodeId: '5453:218458', name: 'hide-16' },
  { nodeId: '5453:218494', name: 'settings-16' },
  { nodeId: '5453:218545', name: 'sliders-16' },
  { nodeId: '5453:218484', name: 'toggle-left-16' },
  { nodeId: '5453:218464', name: 'toggle-right-16' },
  { nodeId: '5453:218454', name: 'play-16' },
  { nodeId: '5453:218456', name: 'pause-16' },
  { nodeId: '39624:6008', name: 'stop-16' },
  { nodeId: '5453:218452', name: 'skip-forward-16' },
  { nodeId: '5453:218376', name: 'skip-back-16' },
  { nodeId: '5453:218378', name: 'volume-16' },
  { nodeId: '5453:218380', name: 'volume-x-16' },
  { nodeId: '5453:218374', name: 'volume-1-16' },
  { nodeId: '5453:218384', name: 'volume-2-16' },
  { nodeId: '5453:218382', name: 'music-16' },
];

const iconsDir = path.join(__dirname, '../public/icons');
const dataDir = path.join(__dirname, '../src/data');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Создаём JSON файл со списком иконок для использования в компонентах
const iconsList = iconNodes.map(({ name, nodeId }) => ({
  name,
  nodeId: nodeId.replace(':', '-'),
  figmaNodeId: nodeId,
}));

fs.writeFileSync(
  path.join(dataDir, 'icons.json'),
  JSON.stringify(iconsList, null, 2)
);

console.log(`Создан список из ${iconsList.length} иконок`);
console.log('Используйте MCP инструмент download_figma_images для загрузки');
