import { useEffect, useState, useRef } from "react";

const GAME_DURATION = 30;

const BubblePopGame = () => {
  const [bubbles, setBubbles] = useState([]);
  const [splashes, setSplashes] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  const popSound = useRef(null);

  // spawn bubbles
  useEffect(() => {
    if (!running || paused) return;

    const interval = setInterval(() => {
      const newBubble = {
        id: Date.now(),
        x: Math.random() * 90,
        y: Math.random() * 80,
        size: 40 + Math.random() * 40,
      };

      setBubbles((prev) => [...prev, newBubble]);

      setTimeout(() => {
        setBubbles((prev) =>
          prev.filter((bubble) => bubble.id !== newBubble.id)
        );
      }, 3000);
    }, 800);

    return () => clearInterval(interval);
  }, [running, paused]);

  // timer
  useEffect(() => {
    if (!running || paused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          setRunning(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, paused]);

  const popBubble = (bubble) => {
    if (paused) return;

    setScore((prev) => prev + 1);

    if (popSound.current) {
      popSound.current.currentTime = 0;
      popSound.current.play();
    }

    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));

    const splash = {
      id: Date.now(),
      x: bubble.x,
      y: bubble.y,
    };

    setSplashes((prev) => [...prev, splash]);

    setTimeout(() => {
      setSplashes((prev) => prev.filter((s) => s.id !== splash.id));
    }, 500);
  };

  const startGame = () => {
    setRunning(true);
    setPaused(false);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setBubbles([]);
  };

  const pauseGame = () => {
    setPaused(true);
  };

  const resumeGame = () => {
    setPaused(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5DC] relative overflow-hidden">

      {/* POP SOUND */}
      <audio ref={popSound} src="/sounds/pop.mp3" preload="auto" className="hidden" />

      <h1 className="text-3xl font-bold text-[#5C4033] mb-4">
        Bubble Pop Game
      </h1>

      <div className="flex gap-10 text-lg font-semibold text-[#5C4033] mb-6">
        <div>Score: {score}</div>
        <div>Time: {timeLeft}s</div>
      </div>

      {/* START BUTTON */}
      {!running && timeLeft === GAME_DURATION && (
        <button
          onClick={startGame}
          className="px-6 py-3 bg-[#6B8E23] text-white rounded-xl mb-6 hover:opacity-90"
        >
          Start Game
        </button>
      )}

      {/* PAUSE / RESUME BUTTON */}
      {running && !paused && (
        <button
          onClick={pauseGame}
          className="px-6 py-3 bg-[#5C4033] text-white rounded-xl mb-6 hover:opacity-90"
        >
          Pause
        </button>
      )}

      {running && paused && (
        <button
          onClick={resumeGame}
          className="px-6 py-3 bg-[#6B8E23] text-white rounded-xl mb-6 hover:opacity-90"
        >
          Resume
        </button>
      )}

      {/* bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          onClick={() => popBubble(bubble)}
          className="absolute rounded-full cursor-pointer shadow-lg bg-[#6B8E23] hover:scale-110 transition"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
          }}
        />
      ))}

      {/* water splash */}
      {splashes.map((splash) => (
        <div
          key={splash.id}
          className="absolute w-10 h-10 bg-blue-300 rounded-full animate-ping opacity-75"
          style={{
            left: `${splash.x}%`,
            top: `${splash.y}%`,
          }}
        />
      ))}

      {/* GAME OVER */}
      {!running && timeLeft === 0 && (
        <div className="mt-6 text-xl font-semibold text-[#5C4033]">
          🎉 Game Over! Your Score: {score}
        </div>
      )}

      <p className="mt-6 text-[#5C4033] text-center max-w-md">
        Pop the bubbles as fast as you can. A simple game to relax your mind and release stress.
      </p>

    </div>
  );
};

export default BubblePopGame;