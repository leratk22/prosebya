export type Psychologist = {
  id: number;
  name: string;
  photo: string;
  gender: 'female' | 'male';
  age: number;
  experience: number;
  price: number;
  methods: string[];
  specializations: string[];
  rating: number;
};

export const psychologists: Psychologist[] = [
  {
    id: 1,
    name: 'Елена Смирнова',
    photo: '/psychologists/1.png',
    gender: 'female',
    age: 38,
    experience: 8,
    price: 2500,
    methods: ['КПТ', 'Гештальт'],
    specializations: [
      'Навязчивые мысли',
      'Снижение настроения',
      'Отсутствие радости и удовольствия',
      'Проблемы со сном',
      'Трудности с выполнением повседневных задач'
    ],
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Михаил Петров',
    photo: '/psychologists/2.png',
    gender: 'male',
    age: 42,
    experience: 12,
    price: 3000,
    methods: ['Психоанализ', 'КПТ'],
    specializations: [
      'Навязчивые мысли',
      'Чувство безнадежности и упадка энергии',
      'Недовольство собой',
      'Поиск себя, смысла жизни',
      'Частые перепады настроения'
    ],
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Анна Козлова',
    photo: '/psychologists/3.png',
    gender: 'female',
    age: 35,
    experience: 7,
    price: 2800,
    methods: ['КПТ', 'EMDR'],
    specializations: [
      'Панические атаки',
      'Приступы страха',
      'Проблемы со сном',
      'Трудности с выполнением повседневных задач',
      'Рискованные поступки'
    ],
    rating: 5.0,
  },
  {
    id: 4,
    name: 'Дмитрий Волков',
    photo: '/psychologists/4.png',
    gender: 'male',
    age: 45,
    experience: 15,
    price: 3500,
    methods: ['Психоанализ', 'Гештальт'],
    specializations: [
      'Мысли об уходе из жизни',
      'Чувство безнадежности и упадка энергии',
      'Поиск себя, смысла жизни',
      'Чрезмерная энергичность'
    ],
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Мария Иванова',
    photo: '/psychologists/5.png',
    gender: 'female',
    age: 32,
    experience: 6,
    price: 2400,
    methods: ['Гештальт', 'Арт-терапия'],
    specializations: [
      'Недовольство собой',
      'Чувство одиночества, непонимания',
      'Проблемы с питанием, проблемы с весом',
      'Трудности в общении'
    ],
    rating: 4.8,
  },
  {
    id: 6,
    name: 'Сергей Новиков',
    photo: '/psychologists/6.png',
    gender: 'male',
    age: 40,
    experience: 10,
    price: 3200,
    methods: ['КПТ', 'Гештальт'],
    specializations: [
      'Снижение настроения',
      'Отсутствие радости и удовольствия',
      'Проблемы со сном',
      'Конфликтные ситуации на работе',
      'Трудности с мотивацией и управлением временем'
    ],
    rating: 4.9,
  },
  {
    id: 7,
    name: 'Ольга Федорова',
    photo: '/psychologists/7.png',
    gender: 'female',
    age: 36,
    experience: 9,
    price: 2700,
    methods: ['Психоанализ', 'Гештальт'],
    specializations: [
      'Чувство одиночества, непонимания',
      'Созависимость',
      'Импульсивность',
      'Конфликты'
    ],
    rating: 4.9,
  },
  {
    id: 8,
    name: 'Александр Морозов',
    photo: '/psychologists/8.png',
    gender: 'male',
    age: 48,
    experience: 18,
    price: 4000,
    methods: ['Психоанализ', 'КПТ'],
    specializations: [
      'Трудности в общении',
      'Сложности в семье',
      'Отсутствие интереса к сексуальной активности',
      'Проблемы с эрекцией'
    ],
    rating: 5.0,
  },
  {
    id: 9,
    name: 'Татьяна Лебедева',
    photo: '/psychologists/9.png',
    gender: 'female',
    age: 34,
    experience: 8,
    price: 2600,
    methods: ['КПT', 'EMDR'],
    specializations: [
      'Панические атаки',
      'Приступы страха',
      'Трудно сосредоточить внимание на задачах',
      'Рассеянность/забывчивость'
    ],
    rating: 4.9,
  },
  {
    id: 10,
    name: 'Игорь Соколов',
    photo: '/psychologists/10.png',
    gender: 'male',
    age: 39,
    experience: 11,
    price: 3100,
    methods: ['КПТ', 'Гештальт'],
    specializations: [
      'Аноргазмия',
      'Проблемы с сексуальным возбуждением',
      'Конфликты',
      'Сложности в семье'
    ],
    rating: 4.8,
  },
  {
    id: 11,
    name: 'Екатерина Воробьева',
    photo: '/psychologists/11.png',
    gender: 'female',
    age: 31,
    experience: 6,
    price: 2500,
    methods: ['КПТ', 'ДПДГ'],
    specializations: [
      'Развод',
      'Потеря работы',
      'Трудности в общении',
      'Созависимость'
    ],
    rating: 4.9,
  },
  {
    id: 12,
    name: 'Андрей Орлов',
    photo: '/psychologists/12.png',
    gender: 'male',
    age: 44,
    experience: 14,
    price: 3400,
    methods: ['КПТ', 'Психоанализ'],
    specializations: [
      'Смерть или болезнь близких',
      'Физическое насилие, сексуальное насилие',
      'Мысли об уходе из жизни',
      'Чувство безнадежности и упадка энергии'
    ],
    rating: 5.0,
  },
  {
    id: 13,
    name: 'Наталья Романова',
    photo: '/psychologists/13.png',
    gender: 'female',
    age: 37,
    experience: 9,
    price: 2800,
    methods: ['Гештальт', 'Арт-терапия'],
    specializations: [
      'Чувство одиночества, непонимания',
      'Трудности в общении',
      'Импульсивность',
      'Споры между деловыми партнерами'
    ],
    rating: 4.8,
  },
  {
    id: 14,
    name: 'Владимир Кузнецов',
    photo: '/psychologists/14.png',
    gender: 'male',
    age: 41,
    experience: 13,
    price: 3300,
    methods: ['Гештальт', 'КПТ'],
    specializations: [
      'Развод',
      'Сложности в семье',
      'Конфликты',
      'Отсутствие интереса к сексуальной активности'
    ],
    rating: 4.9,
  },
  {
    id: 15,
    name: 'Юлия Попова',
    photo: '/psychologists/15.png',
    gender: 'female',
    age: 33,
    experience: 7,
    price: 2600,
    methods: ['Гештальт', 'Психоанализ'],
    specializations: [
      'Проблемы с питанием, проблемы с весом',
      'Частые перепады настроения',
      'Рискованные поступки',
      'Чрезмерная энергичность'
    ],
    rating: 4.9,
  },
  {
    id: 16,
    name: 'Ирина Семенова',
    photo: '/psychologists/16.png',
    gender: 'female',
    age: 39,
    experience: 10,
    price: 2900,
    methods: ['Гештальт', 'Системная семейная терапия'],
    specializations: [
      'Сложности в семье',
      'Конфликты',
      'Трудности в общении',
      'Созависимость',
      'Импульсивность'
    ],
    rating: 4.9,
  },
  {
    id: 17,
    name: 'Роман Григорьев',
    photo: '/psychologists/17.png',
    gender: 'male',
    age: 43,
    experience: 12,
    price: 3200,
    methods: ['Системная семейная терапия', 'Гештальт'],
    specializations: [
      'Проблемы с эрекцией',
      'Аноргазмия',
      'Проблемы с сексуальным возбуждением',
      'Отсутствие интереса к сексуальной активности'
    ],
    rating: 4.8,
  },
  {
    id: 18,
    name: 'Светлана Михайлова',
    photo: '/psychologists/18.png',
    gender: 'female',
    age: 36,
    experience: 8,
    price: 2700,
    methods: ['Гештальт', 'КПТ'],
    specializations: [
      'Конфликтные ситуации на работе',
      'Трудности с мотивацией и управлением временем',
      'Трудно сосредоточить внимание на задачах',
      'Рассеянность/забывчивость'
    ],
    rating: 4.9,
  },
  {
    id: 19,
    name: 'Павел Филиппов',
    photo: '/psychologists/19.png',
    gender: 'male',
    age: 38,
    experience: 9,
    price: 3000,
    methods: ['КПТ', 'Гештальт'],
    specializations: [
      'Споры между деловыми партнерами',
      'Конфликтные ситуации на работе',
      'Трудности с мотивацией и управлением временем',
      'Трудно сосредоточить внимание на задачах'
    ],
    rating: 4.8,
  },
  {
    id: 20,
    name: 'Алена Дмитриева',
    photo: '/psychologists/20.png',
    gender: 'female',
    age: 35,
    experience: 7,
    price: 2600,
    methods: ['КПТ', 'Арт-терапия'],
    specializations: [
      'Потеря работы',
      'Смерть или болезнь близких',
      'Физическое насилие, сексуальное насилие',
      'Развод'
    ],
    rating: 4.9,
  },
  {
    id: 21,
    name: 'Виктор Степанов',
    photo: '/psychologists/21.png',
    gender: 'male',
    age: 46,
    experience: 16,
    price: 3600,
    methods: ['Системная семейная терапия', 'Гештальт'],
    specializations: [
      'Сложности в семье',
      'Конфликты',
      'Трудности в общении',
      'Импульсивность',
      'Созависимость'
    ],
    rating: 4.9,
  },
  {
    id: 22,
    name: 'Лариса Николаева',
    photo: '/psychologists/22.png',
    gender: 'female',
    age: 40,
    experience: 11,
    price: 3000,
    methods: ['Системная семейная терапия', 'Психоанализ'],
    specializations: [
      'Рассеянность/забывчивость',
      'Трудно сосредоточить внимание на задачах',
      'Трудности с мотивацией и управлением временем',
      'Конфликтные ситуации на работе'
    ],
    rating: 4.8,
  },
  {
    id: 23,
    name: 'Максим Белов',
    photo: '/psychologists/23.png',
    gender: 'male',
    age: 37,
    experience: 8,
    price: 2800,
    methods: ['Системная семейная терапия', 'КПТ'],
    specializations: [
      'Споры между деловыми партнерами',
      'Трудности с мотивацией и управлением временем',
      'Рассеянность/забывчивость',
      'Трудно сосредоточить внимание на задачах'
    ],
    rating: 4.9,
  },
];
