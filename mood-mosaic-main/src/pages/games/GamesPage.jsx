import { useNavigate } from "react-router-dom";

const GamesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5DC] p-6">
      <h1 className="text-3xl font-bold text-[#5C4033] mb-10">Choose a Game</h1>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        <button
          onClick={() => navigate("/games/breathing")}
          className="bg-[#6B8E23] text-white py-4 rounded-xl text-lg font-semibold hover:scale-105 transition shadow-lg cursor-pointer"
        >
          🌿 Breathing Game
        </button>

        <button
          onClick={() => navigate("/games/bubbles")}
          className="bg-[#5C4033] text-white py-4 rounded-xl text-lg font-semibold hover:scale-105 transition shadow-lg cursor-pointer"
        >
          🫧 Bubble Pop Game
        </button>

        <button
          onClick={() => navigate("/games/zen-garden")}
          className="bg-[#6B8E23] text-white py-4 rounded-xl text-lg font-semibold hover:scale-105 transition shadow-lg cursor-pointer"
        >
          🪷 Zen-Garden Game
        </button>

      </div>
    </div>
  );
};

export default GamesPage;