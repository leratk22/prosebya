"use client";

import * as React from "react";
import { CsiBanner, CsiPopup } from "@/components/csi";

export default function LkPage() {
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null);
  const [comment, setComment] = React.useState("");
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [popupScreen, setPopupScreen] = React.useState<"form" | "success">("form");
  const [submittedRating, setSubmittedRating] = React.useState<number | null>(
    null
  );

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setPopupScreen("form");
    setSubmittedRating(null);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setComment("");
    setPopupScreen("form");
    setSubmittedRating(null);
  };

  const handleSubmit = async () => {
    if (selectedRating == null) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setSubmittedRating(selectedRating);
    setPopupScreen("success");
    setIsBannerVisible(false);
  };

  return (
    <div className="fixed inset-0 w-full h-full">
      <iframe
        src="https://lk.prosebya.ru/"
        title="Личный кабинет Просебя"
        className="absolute inset-0 w-full h-full border-0"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden={!isBannerVisible && !isPopupOpen}
      >
        {isBannerVisible && (
          <div className="pointer-events-auto">
            <CsiBanner
              variant="fixed"
              selectedRating={selectedRating}
              onRatingSelect={handleRatingClick}
              onClose={() => setIsBannerVisible(false)}
            />
          </div>
        )}
        {isPopupOpen && selectedRating != null && (
          <CsiPopup
            selectedRating={selectedRating}
            comment={comment}
            onRatingChange={setSelectedRating}
            onCommentChange={setComment}
            onSubmit={handleSubmit}
            onClose={handlePopupClose}
            isSubmitting={isSubmitting}
            screen={popupScreen}
            submittedRating={submittedRating}
          />
        )}
      </div>
    </div>
  );
}
