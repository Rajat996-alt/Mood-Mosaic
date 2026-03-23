import { useRef, useEffect } from "react";

const ZenGardenGame = () => {
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // canvas size
    canvas.width = window.innerWidth * 0.8;
    canvas.height = 500;

    // sand background
    ctx.fillStyle = "#F5F5DC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // rake style
    ctx.strokeStyle = "#5C4033";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
  }, []);

  const startDrawing = () => {
    drawing.current = true;
  };

  const stopDrawing = () => {
    drawing.current = false;
  };

  const draw = (e) => {
    if (!drawing.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#5C4033";
    ctx.fill();
  };

  const clearSand = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#F5F5DC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5DC] p-6">

      <h1 className="text-3xl font-bold text-[#5C4033] mb-6">
        Zen Garden
      </h1>

      <canvas
        ref={canvasRef}
        className="border-4 border-[#5C4033] rounded-xl shadow-lg cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseMove={draw}
      />

      <button
        onClick={clearSand}
        className="mt-6 px-6 py-3 bg-[#6B8E23] text-white rounded-xl hover:opacity-90"
      >
        Clear Sand
      </button>

      <p className="mt-6 text-[#5C4033] text-center max-w-md">
        Move your mouse across the sand to create calming patterns like a Zen garden.
        Take a moment to relax and enjoy the flow.
      </p>

    </div>
  );
};

export default ZenGardenGame;