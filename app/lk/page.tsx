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
        className="absolute inset-0 w-full h-full border-0 z-0"
      />

      <div
        className="absolute inset-0 pointer-events-none z-10"
        aria-hidden={!isBannerVisible && !isPopupOpen}
      >
        {isBannerVisible && (
          <>
            {/* По Figma NvzcX700bseJnlyBwa2zFv: core #22263B, 25% opacity снизу, прозрачный сверху */}
            <div
              className="absolute bottom-0 left-0 right-0 h-160 md:hidden pointer-events-none z-20"
              style={{
                background:
                  "linear-gradient(0deg, rgba(34, 38, 59, 0.25) 0%, rgba(34, 38, 59, 0) 100%)",
              }}
              aria-hidden
            />
            <div className="pointer-events-auto relative z-40">
              <CsiBanner
                variant="fixed"
                selectedRating={selectedRating}
                onRatingSelect={handleRatingClick}
                onClose={() => setIsBannerVisible(false)}
              />
            </div>
          </>
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
