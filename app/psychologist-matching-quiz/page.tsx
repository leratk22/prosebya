import dynamic from "next/dynamic";

const PsychologistMatchingQuiz = dynamic(
  () =>
    import("@/components/psychologist-matching-quiz").then((m) => ({
      default: m.PsychologistMatchingQuiz,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-812 items-center justify-center px-24 font-euclid text-body-l text-light-fg-secondary">
        Загрузка…
      </div>
    ),
  },
);

export default function PsychologistMatchingQuizPage() {
  return (
    <div className="min-h-screen font-euclid bg-light-bg-primary md:bg-light-bg-secondary md:py-24">
      <div className="mx-auto min-h-screen md:min-h-812 md:max-w-375">
        <PsychologistMatchingQuiz />
      </div>
    </div>
  );
}
