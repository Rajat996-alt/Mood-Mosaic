import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "../../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";

export default function CanvasGallery() {

  const [canvases, setCanvases] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchGallery = async () => {

  try {

    const response = await axios.get(
      "http://localhost:8080/api/canvas/me/gallery",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setCanvases(response.data?.data || []);

  } catch (error) {
    console.error(error);
  }

};

  useEffect(() => {
    fetchGallery();
  }, []);


  return (

    <div className="min-h-screen bg-[#f6f0e6]">

      <DashboardNavbar />

      <div className="max-w-5xl mx-auto p-10">

        <h1 className="text-3xl font-semibold mb-8">
          Canvas Gallery
        </h1>

        <div className="grid grid-cols-3 gap-6">

          {canvases.map(canvas => (

            <div
              key={canvas.id}
              onClick={() => navigate(`/canvas/${canvas.id}`)}
              className="p-6 bg-white rounded-xl border cursor-pointer hover:shadow-md"
            >

              <h2 className="font-semibold mb-2">
                Canvas #{canvas.canvasNumber}
              </h2>

              <p className="text-sm text-gray-600 mb-2">
  Regions filled: {canvas.filledRegions}/25
</p>

<div className="w-full bg-gray-200 h-2 rounded">
  <div
    className="bg-[#6b7a3a] h-2 rounded"
    style={{ width: `${(canvas.filledRegions/25)*100}%` }}
  />
</div>

              <p className="text-xs mt-2">
                {canvas.completed ? "Completed" : "In Progress"}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}