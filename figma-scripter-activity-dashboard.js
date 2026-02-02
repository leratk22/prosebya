// Скрипт для Figma Scripter - Activity Dashboard
// Использование: Выделите фрейм 393x852, запустите скрипт

const TOKENS = {
  colors: {
    bg: "#F6F7F2",
    card: "#FFFFFF",
    accent: "#007A7A",
    accentMuted: "#D6EBEB",
    textPrimary: "#1A1C1E",
    textSecondary: "#6C727A"
  },
  radius: 24,
  padding: 20
};

// Функция для создания текста
async function createStyledText(parent, content, size, weight = "Medium", color = TOKENS.colors.textPrimary) {
  const text = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: weight });
  text.fontName = { family: "Inter", style: weight };
  text.characters = content;
  text.fontSize = size;
  
  // Конвертируем HEX в RGB
  const rgb = hexToRgb(color);
  text.fills = [{ type: 'SOLID', color: rgb }];
  
  parent.appendChild(text);
  return text;
}

// Конвертация HEX в RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

// Функция для создания карточки с Auto Layout
function createAutoLayoutCard(name, y) {
  const card = figma.createFrame();
  card.name = name;
  card.x = 16;
  card.y = y;
  card.resize(361, 100); // Высота подстроится сама
  card.cornerRadius = TOKENS.radius;
  
  const rgb = hexToRgb(TOKENS.colors.card);
  card.fills = [{ type: 'SOLID', color: rgb }];
  
  // Включаем Auto Layout
  card.layoutMode = "VERTICAL";
  card.itemSpacing = 8;
  card.paddingLeft = card.paddingRight = card.paddingTop = card.paddingBottom = TOKENS.padding;
  card.primaryAxisSizingMode = "AUTO";
  card.layoutSizingHorizontal = "FILL";
  
  return card;
}

async function run() {
  const mainFrame = figma.currentPage.selection[0];
  if (!mainFrame) {
    figma.notify("❌ Выдели фрейм 393x852 перед запуском!");
    return;
  }

  // Очищаем старые элементы
  mainFrame.children.forEach(child => child.remove());
  
  const bgRgb = hexToRgb(TOKENS.colors.bg);
  mainFrame.fills = [{ type: 'SOLID', color: bgRgb }];

  let currentY = 0;

  // 1. Header "Today"
  const header = figma.createFrame();
  header.name = "Header";
  header.resize(393, 100);
  header.fills = [];
  header.layoutMode = "HORIZONTAL";
  header.primaryAxisAlignItems = "SPACE_BETWEEN";
  header.paddingLeft = header.paddingRight = 16;
  header.paddingTop = header.paddingBottom = 56;
  mainFrame.appendChild(header);
  
  // Кнопка назад (слева)
  const backBtn = figma.createFrame();
  backBtn.name = "Back Button";
  backBtn.resize(40, 40);
  backBtn.fills = [];
  header.appendChild(backBtn);
  
  // Заголовок "Today" (центр)
  const titleText = await createStyledText(header, "Today", 18, "Semi Bold", TOKENS.colors.textPrimary);
  titleText.layoutAlign = "CENTER";
  
  // Кнопка редактирования (справа)
  const editBtn = figma.createFrame();
  editBtn.name = "Edit Button";
  editBtn.resize(40, 40);
  editBtn.fills = [];
  header.appendChild(editBtn);
  
  currentY = 100;

  // 2. Заголовок "Activity"
  const activityHeader = figma.createFrame();
  activityHeader.name = "Activity Header";
  activityHeader.x = 16;
  activityHeader.y = currentY;
  activityHeader.resize(361, 40);
  activityHeader.fills = [];
  mainFrame.appendChild(activityHeader);
  
  const activityTitle = await createStyledText(activityHeader, "Activity", 20, "Semi Bold", TOKENS.colors.textPrimary);
  activityTitle.y = 0;
  
  currentY += 56;

  // 3. Карточка Cardio Load
  const cardio = createAutoLayoutCard("Cardio Load", currentY);
  mainFrame.appendChild(cardio);
  
  // Заголовок карточки
  const cardioTitle = await createStyledText(cardio, "Cardio load", 16, "Medium", TOKENS.colors.textSecondary);
  
  // Контейнер для значения и иконки
  const cardioRow = figma.createFrame();
  cardioRow.name = "Cardio Value Row";
  cardioRow.layoutMode = "HORIZONTAL";
  cardioRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  cardioRow.layoutAlign = "STRETCH";
  cardioRow.fills = [];
  cardioRow.layoutSizingHorizontal = "FILL";
  cardio.appendChild(cardioRow);
  
  // Значение "0"
  const cardioValue = await createStyledText(cardioRow, "0", 48, "Semi Bold", TOKENS.colors.textPrimary);
  
  // Иконка сердца в круге
  const iconContainer = figma.createFrame();
  iconContainer.name = "Heart Icon Container";
  iconContainer.resize(48, 48);
  iconContainer.fills = [];
  cardioRow.appendChild(iconContainer);
  
  const iconCircle = figma.createEllipse();
  iconCircle.name = "Heart Icon Circle";
  iconCircle.resize(48, 48);
  const accentMutedRgb = hexToRgb(TOKENS.colors.accentMuted);
  iconCircle.fills = [{ type: 'SOLID', color: accentMutedRgb }];
  iconContainer.appendChild(iconCircle);
  
  // Иконка сердца (текст как замена SVG)
  const heartIcon = await createStyledText(iconContainer, "❤", 16, "Regular", TOKENS.colors.accent);
  heartIcon.x = 16;
  heartIcon.y = 16;
  
  // Текст "Today • No target"
  const cardioSubtext = await createStyledText(cardio, "Today • No target", 12, "Regular", TOKENS.colors.textSecondary);
  
  currentY += cardio.height + 16;

  // 4. Карточка Exercise Days
  const exercise = createAutoLayoutCard("Exercise Days", currentY);
  mainFrame.appendChild(exercise);
  
  // Заголовок карточки
  const exerciseTitle = await createStyledText(exercise, "Exercise days", 16, "Medium", TOKENS.colors.textSecondary);
  
  // Значение "1 of 6"
  const exerciseValue = await createStyledText(exercise, "1 of 6", 24, "Semi Bold", TOKENS.colors.textPrimary);
  
  // Текст "This week"
  const exerciseSubtext = await createStyledText(exercise, "This week", 12, "Regular", TOKENS.colors.textSecondary);
  
  // Календарь дней
  const daysWrapper = figma.createFrame();
  daysWrapper.name = "Days Calendar";
  daysWrapper.layoutMode = "HORIZONTAL";
  daysWrapper.itemSpacing = 8;
  daysWrapper.fills = [];
  daysWrapper.layoutSizingHorizontal = "FILL";
  exercise.appendChild(daysWrapper);

  const days = ['S', 'S', 'M', 'T', 'W', 'T', 'F'];
  const todayIndex = 3; // Четверг (T) выделен по референсу
  
  for (const [i, day] of days.entries()) {
    const dayCol = figma.createFrame();
    dayCol.name = `Day ${day}`;
    dayCol.layoutMode = "VERTICAL";
    dayCol.itemSpacing = 4;
    dayCol.counterAxisAlignItems = "CENTER";
    dayCol.fills = [];
    dayCol.layoutSizingHorizontal = "FILL";
    
    // Прямоугольник-индикатор (24x48 с radius 12)
    const dayRect = figma.createRectangle();
    dayRect.name = `Day Indicator ${day}`;
    dayRect.resize(24, 48);
    dayRect.cornerRadius = 12;
    
    // Четверг (T, индекс 3) выделен акцентным цветом, остальные - приглушенным
    const isHighlighted = day === 'T' && i === 3;
    const rectColor = isHighlighted 
      ? hexToRgb(TOKENS.colors.accent)
      : hexToRgb(TOKENS.colors.accentMuted);
    
    dayRect.fills = [{ type: 'SOLID', color: rectColor }];
    dayCol.appendChild(dayRect);
    
    // Буква дня
    const dayLabel = await createStyledText(dayCol, day, 12, "Medium", TOKENS.colors.textSecondary);
    
    daysWrapper.appendChild(dayCol);
  }
  
  // Разделитель
  const divider = figma.createRectangle();
  divider.name = "Divider";
  divider.resize(321, 1);
  divider.fills = [];
  divider.strokes = [{ type: 'SOLID', color: hexToRgb(TOKENS.colors.accentMuted) }];
  divider.strokeWeight = 1;
  divider.layoutSizingHorizontal = "FILL";
  exercise.appendChild(divider);
  
  // Детали тренировки
  const workoutRow = figma.createFrame();
  workoutRow.name = "Workout Details";
  workoutRow.layoutMode = "HORIZONTAL";
  workoutRow.itemSpacing = 12;
  workoutRow.fills = [];
  workoutRow.layoutSizingHorizontal = "FILL";
  exercise.appendChild(workoutRow);
  
  // Иконка тренировки (круг)
  const workoutIcon = figma.createEllipse();
  workoutIcon.name = "Workout Icon";
  workoutIcon.resize(32, 32);
  workoutIcon.fills = [{ type: 'SOLID', color: hexToRgb(TOKENS.colors.accentMuted) }];
  workoutRow.appendChild(workoutIcon);
  
  // Текст тренировки
  const workoutTextFrame = figma.createFrame();
  workoutTextFrame.name = "Workout Text";
  workoutTextFrame.layoutMode = "VERTICAL";
  workoutTextFrame.itemSpacing = 4;
  workoutTextFrame.fills = [];
  workoutTextFrame.layoutSizingHorizontal = "FILL";
  workoutRow.appendChild(workoutTextFrame);
  
  const workoutType = await createStyledText(workoutTextFrame, "Workout", 14, "Medium", TOKENS.colors.textPrimary);
  const workoutDetails = await createStyledText(workoutTextFrame, "10:38 PM • 0 cal • 0 min", 12, "Regular", TOKENS.colors.textSecondary);
  
  currentY += exercise.height + 16;

  // 5. Карточка Active Zone Min
  const activeZone = createAutoLayoutCard("Active Zone Min", currentY);
  mainFrame.appendChild(activeZone);
  
  // Заголовок карточки
  const activeZoneTitle = await createStyledText(activeZone, "Active Zone Min", 16, "Medium", TOKENS.colors.textSecondary);
  
  // Контейнер для значения и прогресс-бара
  const activeZoneRow = figma.createFrame();
  activeZoneRow.name = "Active Zone Value Row";
  activeZoneRow.layoutMode = "HORIZONTAL";
  activeZoneRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  activeZoneRow.layoutAlign = "STRETCH";
  activeZoneRow.fills = [];
  activeZoneRow.layoutSizingHorizontal = "FILL";
  activeZone.appendChild(activeZoneRow);
  
  // Левая часть - значение
  const activeZoneValueFrame = figma.createFrame();
  activeZoneValueFrame.name = "Active Zone Value";
  activeZoneValueFrame.layoutMode = "VERTICAL";
  activeZoneValueFrame.itemSpacing = 4;
  activeZoneValueFrame.fills = [];
  activeZoneRow.appendChild(activeZoneValueFrame);
  
  const activeZoneValue = await createStyledText(activeZoneValueFrame, "0", 48, "Semi Bold", TOKENS.colors.textPrimary);
  const activeZoneSubtext = await createStyledText(activeZoneValueFrame, "Today", 12, "Regular", TOKENS.colors.textSecondary);
  
  // Правая часть - круговой прогресс-бар (80x80)
  const progressContainer = figma.createFrame();
  progressContainer.name = "Progress Container";
  progressContainer.resize(80, 80);
  progressContainer.fills = [];
  activeZoneRow.appendChild(progressContainer);
  
  // Фоновый круг
  const progressBg = figma.createEllipse();
  progressBg.name = "Progress Background";
  progressBg.resize(80, 80);
  progressBg.fills = [];
  progressBg.strokes = [{ 
    type: 'SOLID', 
    color: hexToRgb(TOKENS.colors.accentMuted),
    strokeWeight: 6
  }];
  progressContainer.appendChild(progressBg);
  
  // Прогресс круг (частично заполненный)
  const progressCircle = figma.createEllipse();
  progressCircle.name = "Progress Circle";
  progressCircle.resize(80, 80);
  progressCircle.fills = [];
  progressCircle.strokes = [{ 
    type: 'SOLID', 
    color: hexToRgb(TOKENS.colors.accent),
    strokeWeight: 6
  }];
  // Для демонстрации делаем частичный прогресс (примерно 30%)
  // strokeDashPattern: [длина линии, длина пробела]
  const circumference = 2 * Math.PI * 36; // радиус 36 (80/2 - 4 для stroke)
  const progressPercent = 30; // 30% прогресса
  const dashLength = (circumference * progressPercent) / 100;
  const gapLength = circumference - dashLength;
  progressCircle.strokeDashPattern = [dashLength, gapLength];
  progressContainer.appendChild(progressCircle);
  
  // Центральная иконка молнии (текст как замена SVG)
  const lightningText = await createStyledText(progressContainer, "⚡", 20, "Regular", TOKENS.colors.accent);
  lightningText.x = 30;
  lightningText.y = 30;

  // Финальная настройка
  figma.viewport.scrollAndZoomIntoView([mainFrame]);
  figma.notify("✅ Activity Dashboard создан!");
}

run().catch(err => {
  figma.notify(`❌ Ошибка: ${err.message}`);
  console.error(err);
});
