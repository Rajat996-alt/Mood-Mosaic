import { useEffect, useState } from "react";

const phases = [
  { name: "Inhale", duration: 4000, scale: 1.4 },
  { name: "Hold", duration: 4000, scale: 1.4 },
  { name: "Exhale", duration: 4000, scale: 1 },
];

const BreathingGame = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [running, setRunning] = useState(false);
  const [rounds, setRounds] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const currentPhase = phases[phaseIndex];

  useEffect(() => {
    if (!running) return;

    setScale(currentPhase.scale);

    const timer = setTimeout(() => {
      const nextPhase = (phaseIndex + 1) % phases.length;

      // Round complete when Exhale finishes
      if (phaseIndex === phases.length - 1) {
        setRounds((prev) => {
          const newRounds = prev + 1;

          // When 5 rounds complete
          if (newRounds === 3) {
            setShowMessage(true);
            setRunning(false); // auto stop game

            setTimeout(() => {
              setShowMessage(false);
            }, 4000);
          }

          return newRounds;
        });
      }

      setPhaseIndex(nextPhase);
    }, currentPhase.duration);

    return () => clearTimeout(timer);
  }, [phaseIndex, running]);

  const startGame = () => {
    setRunning(true);
    setRounds(0);
    setPhaseIndex(0);
    setScale(1);
    setShowMessage(false);
  };

  const stopGame = () => {
    setRunning(false);
    setPhaseIndex(0);
    setScale(1);
    setRounds(0);
    setShowMessage(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5DC]">
      <h1 className="text-3xl font-bold text-[#5C4033] mb-6">
        Breathing Relaxation Game
        {/* Round Counter */}
        <div className="mb-6 mt-1 text-lg text-center font-semibold text-[#5C4033]">
          Rounds Completed: {rounds}/3
        </div>
      </h1>

      {/* Breathing Circle */}
      <div
        className="rounded-full shadow-xl transition-transform duration-[4000ms] ease-in-out bg-[#6B8E23]"
        style={{
          width: "200px",
          height: "200px",
          transform: `scale(${scale})`,
        }}
      />

      {/* Phase Text */}
      <h2 className="mt-10 text-2xl font-semibold text-[#5C4033]">
        {running ? currentPhase.name : "Press Start"}
      </h2>

      {/* Happy Message */}
      {showMessage && (
        <div className="mt-6 px-6 py-3 bg-[#6B8E23] text-white rounded-xl shadow-lg text-center">
          🎉 Great Job! You completed 3 calming breaths!
        </div>
      )}

      {/* Buttons */}
      <div className="mt-10 flex gap-4">
        <button
          onClick={startGame}
          className="px-6 py-3 bg-[#6B8E23] text-white rounded-xl hover:opacity-90 transition"
        >
          Start
        </button>

        <button
          onClick={stopGame}
          className="px-6 py-3 bg-[#5C4033] text-white rounded-xl hover:opacity-90 transition"
        >
          Stop
        </button>
      </div>

      <p className="mt-8 text-[#5C4033] text-center max-w-md">
        Follow the circle. Breathe in when it grows, hold when it stays, and
        breathe out when it shrinks.
      </p>
    </div>
  );
};

export default BreathingGame;