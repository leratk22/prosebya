export type MyContentCard = {
  id: string;
  /** Тип контента — первая «пилюля» */
  category: string;
  /** Вторая пилюля на разводящем экране (длительность, «10 вопросов» и т.д.) */
  meta?: string;
  /** Заголовок карточки */
  title: string;
  /**
   * Нижняя строка в карусели на главном: если есть `meta`, показываем «meta · suffix»,
   * иначе только suffix (например «Понравилось» для лонгрида).
   */
  carouselFooter?: string;
};
