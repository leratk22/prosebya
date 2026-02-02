"use client";

import * as React from "react";
import { Sidebar, SidebarMenuItem } from "@/components/layout";
import { Tabs, TabItem } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/icons";
import { ChevronLeft } from "lucide-react";

// Данные специалиста
interface SpecialistData {
  id: string;
  name: string;
  imageUrl?: string;
  rating: number;
  experience: string;
  about: string;
  specializations: string;
  education: string;
  reviewsCount: number;
}

const specialistData: SpecialistData = {
  id: "1",
  name: "Кундозерова Светлана Гарьевна",
  rating: 4.8,
  experience: "12 лет",
  about: "Я — психолог и семейный психотерапевт. Провожу индивидуальные консультации, работаю с семейными парами и родителями с детьми. Я помогаю клиентам найти опору, когда «земля уходит из-под ног», и достичь таких перемен в жизни, чтобы стало легче и качественнее жить.",
  specializations: "Ко мне обращаются люди с острыми эмоциональными состояниями: потерей работы или изменой партнера. Я работаю с теми, кто не может решиться на смену работы или отказывается от сложных творческих задач. Ко мне приходят, когда постоянно что-то тревожит, ничего не радует, страшно летать или случаются приступы паники. Применяю в работе системный подход: рассматриваю проблему человека, как часть его взаимоотношений с окружением. Поэтому смогу помочь даже в ситуации, когда партнер клиента не готов к совместной терапии.",
  education: "В 2005 г. окончила Северный государственный медицинский университет по специальности «Клиническая психология». В вузе получила базовую подготовку для работы с горем, фобиями и запросами по выходу из кризиса.\n\nВ 2006 г. окончила резидентуру по клинической психологии в НИПНИ им. В.М. Бехтерева, где научилась вести психотерапевтические группы. Кандидат психологических наук с 2016 г.\n\nПовышаю квалификацию: в 2013 г. – системная семейная психотерапия и сексологическое консультирование в семейной психотерапии, в 2012 г. – рационально-эмоциональная поведенческая терапия, в 2010 г. – психотерапия неврозов, в 2006 г. – позитивная психотерапия.\n\nПрохожу супервизию каждые два месяца у специалистов по семейной психотерапии и рационально-эмоционально поведенческой терапии.",
  reviewsCount: 12,
};

export default function SpecialistProfilePage() {
  const [activeTab, setActiveTab] = React.useState<string>("about");

  const menuItems: SidebarMenuItem[] = [
    {
      id: "home",
      label: "Главная",
      iconName: "home",
      href: "/",
    },
    {
      id: "sessions",
      label: "Мои сессии",
      iconName: "calendar",
      href: "/sessions",
    },
    {
      id: "profile",
      label: "Личная информация",
      iconName: "user",
      href: "/profile",
    },
    {
      id: "support",
      label: "Служба поддержки",
      iconName: "help-circle",
      href: "/support",
    },
  ];

  const tabs: TabItem[] = [
    { id: "appointment", label: "Запись" },
    { id: "reviews", label: "Отзывы", count: specialistData.reviewsCount },
    { id: "about", label: "Обо мне" },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleAvatarExpand = () => {
    // Здесь можно открыть модальное окно с увеличенным изображением
    console.log("Expand avatar");
  };

  const handleAppointmentClick = () => {
    // Обработчик клика на кнопку записи
    console.log("Appointment clicked");
  };

  return (
    <div className="min-h-screen bg-light-bg-secondary flex">
      {/* Sidebar */}
      <Sidebar
        menuItems={menuItems}
        activeMenuItemId="home"
        appointmentButtonText="Записаться на сессию"
        onAppointmentClick={handleAppointmentClick}
        logo={<span className="text-title-xl font-bold text-brand-orange">просебя</span>}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Контейнер с карточкой профиля */}
        <div className="flex-1 p-24 md:p-32 lg:p-48">
          <div className="max-w-[932px] mx-auto">
            {/* Карточка профиля */}
            <div className="bg-light-bg-primary rounded-l p-24 md:p-32 lg:p-48" style={{ borderRadius: '28px' }}>
              {/* Кнопка "Назад" */}
              <a
                href="/"
                className="inline-flex items-center gap-8 mb-24 text-body-l text-light-fg-secondary hover:text-light-fg-primary transition-colors"
              >
                <ChevronLeft className="w-20 h-20" />
                <span>Назад</span>
              </a>

              {/* Заголовок профиля */}
              <div className="flex flex-col items-center gap-16 mb-32">
                <Avatar
                  imageUrl={specialistData.imageUrl}
                  name={specialistData.name}
                  size="xl"
                  showExpandButton={true}
                  onExpandClick={handleAvatarExpand}
                />
                <div className="flex flex-col items-center gap-8">
                  <h1 className="text-title-xl font-bold text-light-fg-primary text-center">
                    {specialistData.name}
                  </h1>
                  <div className="flex items-center gap-12 text-body-l text-light-fg-tertiary">
                    <span className="flex items-center gap-4">
                      <Icon name="star" size={16} className="text-brand-orange" />
                      {specialistData.rating}
                    </span>
                    <span>Стаж {specialistData.experience}</span>
                  </div>
                </div>
              </div>

              {/* Вкладки */}
              <div className="mb-32">
                <Tabs
                  items={tabs}
                  activeTabId={activeTab}
                  onTabChange={handleTabChange}
                />
              </div>

              {/* Контент вкладок */}
              <div className="mt-32">
                {activeTab === "about" && (
                  <div className="flex flex-col gap-24">
                    {/* Обо мне */}
                    <section className="flex flex-col gap-16">
                      <h2 className="text-title-l font-semibold text-light-fg-primary">
                        Обо мне
                      </h2>
                      <div className="flex flex-col gap-12">
                        <p className="text-body-l font-regular text-light-fg-primary leading-relaxed">
                          {specialistData.about}
                        </p>
                      </div>
                    </section>

                    {/* С чем ко мне обращаются */}
                    <section className="flex flex-col gap-16">
                      <h2 className="text-title-l font-semibold text-light-fg-primary">
                        С чем ко мне обращаются
                      </h2>
                      <div className="flex flex-col gap-12">
                        <p className="text-body-l font-regular text-light-fg-primary leading-relaxed">
                          {specialistData.specializations}
                        </p>
                      </div>
                    </section>

                    {/* Профессиональная подготовка */}
                    <section className="flex flex-col gap-16">
                      <h2 className="text-title-l font-semibold text-light-fg-primary">
                        Профессиональная подготовка
                      </h2>
                      <div className="flex flex-col gap-12">
                        {specialistData.education.split("\n\n").map((paragraph, index) => (
                          paragraph.trim() && (
                            <p
                              key={index}
                              className="text-body-l font-regular text-light-fg-primary leading-relaxed"
                            >
                              {paragraph.trim()}
                            </p>
                          )
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="flex flex-col items-center justify-center py-48">
                    <p className="text-body-l text-light-fg-tertiary">
                      Отзывы ({specialistData.reviewsCount})
                    </p>
                    <p className="text-body-m text-light-fg-muted mt-8">
                      Раздел в разработке
                    </p>
                  </div>
                )}

                {activeTab === "appointment" && (
                  <div className="flex flex-col items-center justify-center py-48">
                    <p className="text-body-l text-light-fg-tertiary">
                      Запись на сессию
                    </p>
                    <p className="text-body-m text-light-fg-muted mt-8">
                      Раздел в разработке
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
