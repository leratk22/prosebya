"use client";

import { AudioCardWeb } from "@/components/cards/audio-card-web";
import { BannerCardWeb } from "@/components/cards/banner-card-web";
import { BannerImageCardWeb } from "@/components/cards/banner-image-card-web";
import { HorizontalCardWeb } from "@/components/cards/horizontal-card-web";
import { ColoredCardSingle } from "@/components/cards/colored-card-single";
import { WormCardWeb } from "@/components/cards/worm-card-web";
import { BigPhotoCard } from "@/components/cards/big-photo-card";
export default function CardsDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-4xl mx-auto p-16 md:p-24">
        <div className="flex flex-col gap-16 md:gap-24">
          {/* AudioCardWeb */}
          <AudioCardWeb
            title="Медитация для глубокого расслабления и снятия стресса"
            topBadge="Медитация"
            duration="12:45"
          />

          {/* BannerCardWeb */}
          <BannerCardWeb
            highlightText="Новое"
            title="Как справиться с тревогой и паническими атаками"
            description="Практические техники дыхания и когнитивно-поведенческие упражнения для управления тревожными состояниями в повседневной жизни"
          />

          {/* BannerImageCardWeb */}
          <BannerImageCardWeb
            imageSrc="/ImageExample3x.png"
            imageAlt="Пример баннерной карточки с изображением"
          />

          {/* HorizontalCardWeb */}
          <HorizontalCardWeb
            title="Техники работы с внутренним критиком"
            description="Помочь себе за 5 минут"
            badges={["Психология", "Саморазвитие"]}
            imageUrl="/horizontal-card-3x.png"
            imageAlt="Психологическая практика"
          />

          {/* ColoredCardSingle */}
          <ColoredCardSingle
            title="Эмоциональный интеллект: как развить способность понимать и управлять своими эмоциями"
            tag="Статья"
            backgroundColor="yellow"
          />

          {/* WormCardWeb */}
          <WormCardWeb
            title="Привязанность и отношения: как формируются паттерны поведения"
            tagLeft="Лонгрид"
            tagRight="18:20"
          />

          {/* BigPhotoCard */}
          <BigPhotoCard
            subtitle="Практика"
            title="Техника заземления при панических атаках"
            label="Помочь себе за 2 минуты"
            imageUrl="/practice-images/practice-image-3x.png"
            imageAlt="Практика медитации"
            duration="03:15"
          />

        </div>
      </div>
    </div>
  );
}
