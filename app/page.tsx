export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Добро пожаловать</h1>
        <p className="text-lg text-gray-600 mb-4">
          Демо карточек доступно по адресу{" "}
          <a href="/cards-demo" className="text-blue-600 hover:underline">
            /cards-demo
          </a>
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Прототип чата (V3):{" "}
          <a href="/prototype-v3" className="text-blue-600 hover:underline">
            /prototype-v3
          </a>
        </p>
        <p className="text-lg text-gray-600">
          Прототип «Мои специалисты»:{" "}
          <a href="/my-specialists-prototype" className="text-blue-600 hover:underline">
            /my-specialists-prototype
          </a>
        </p>
      </div>
    </div>
  );
}
