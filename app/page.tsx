export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Добро пожаловать</h1>
        <p className="text-lg text-gray-600">
          Демо карточек доступно по адресу{" "}
          <a href="/cards-demo" className="text-blue-600 hover:underline">
            /cards-demo
          </a>
        </p>
      </div>
    </div>
  );
}
