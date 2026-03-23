import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "../../components/DashboardNavbar";

export default function CanvasPage() {

  const [canvas, setCanvas] = useState(null);
  const [regionColors, setRegionColors] = useState({});
  const token = localStorage.getItem("token");
  const { canvasId } = useParams();
  const moodPalette = {
  HAPPY: ["#FFD93D", "#FFE066", "#FFB703"],
  SAD: ["#74C0FC", "#4DABF7", "#1C7ED6"],
  ANGRY: ["#FF6B6B", "#FA5252", "#C92A2A"],
  ANXIOUS: ["#B197FC", "#9775FA", "#7950F2"],
  CALM: ["#63E6BE", "#38D9A9", "#12B886"],
  NEUTRAL: ["#DEE2E6", "#CED4DA", "#ADB5BD"]
};
  const palette =
  canvas && canvas.latestMood
    ? moodPalette[canvas.latestMood.toUpperCase()] || []
    : [];
  const [selectedColor, setSelectedColor] = useState(null);
  const regions = Array.from({ length: 25 }, (_, i) => `region-${i+1}`);

  const fetchCanvas = async () => {

    try {

      const response = await axios.get(
  `http://localhost:8080/api/canvas/${canvasId}`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      const data = response.data;

      setCanvas(data);
      setRegionColors(data.regionColors || {});

    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
  if (canvasId) {
    fetchCanvas();
  }
}, [canvasId]);

  if (!canvas) return <div>Loading canvas...</div>;

  const paintRegion = (regionId) => {

  if (!selectedColor) return;
  if (canvas.completed) return;

  if (regionColors[regionId]) return;   // already painted → do nothing

  const updated = {
    ...regionColors,
    [regionId]: selectedColor
  };

  setRegionColors(updated);

};
const saveCanvas = async () => {

  try {

    await axios.post(
      "http://localhost:8080/api/canvas/me",
      {
        id: canvas.id,
        regionColors: regionColors
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchCanvas();

  } catch (error) {
    console.error(error);
  }

};

  return (
    <div className="min-h-screen bg-[#f6f0e6]">

      <DashboardNavbar />

      <div className="max-w-4xl mx-auto p-10">

        <h1 className="text-3xl font-semibold mb-6">
          Canvas #{canvas.canvasNumber}
        </h1>
        <div className="flex gap-3 mb-6">

  {palette.map(color => (

    <button
      key={color}
      onClick={() => setSelectedColor(color)}
      className={`w-10 h-10 rounded-full border-2 ${
  selectedColor === color ? "border-black" : "border-gray-300"
}`}
      style={{ backgroundColor: color }}
    />

  ))}

</div>
<div className="grid grid-cols-5 gap-2">

  {regions.map(region => (

    <div
      key={region}
      onClick={() => paintRegion(region)}
      className="w-20 h-20 border cursor-pointer"
      style={{
        backgroundColor: regionColors[region] || "#fff"
      }}
    />


  ))}

</div>
<button
  onClick={saveCanvas}
  disabled={canvas.completed}
  className={`mt-6 px-4 py-2 rounded-lg text-white ${
    canvas.completed
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#6b7a3a]"
  }`}
>
  Save Canvas
</button>
{canvas.completed && (

  <div className="mt-6 p-4 bg-white rounded-lg border">

    <p className="font-semibold mb-2">
      Reflection
    </p>

    <p>{canvas.reflectionLine}</p>

  </div>

)}

      </div>
      


    </div>
  );
}