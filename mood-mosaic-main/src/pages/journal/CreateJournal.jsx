import { useState } from "react";
import axios from "axios";
import DashboardNavbar from "../../components/DashboardNavbar";

export default function CreateJournal() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [journalId, setJournalId] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(null);
  const moodEmoji = {
  HAPPY: "😊",
  SAD: "😔",
  ANGRY: "😡",
  ANXIOUS: "😰",
  CALM: "😌",
  NEUTRAL: "😐"
};
  const moodColors = {
  HAPPY: "#fceabb",
  SAD: "#dbeafe",
  ANGRY: "#fecaca",
  ANXIOUS: "#ede9fe",
  CALM: "#d1fae5",
  NEUTRAL: "#f3f4f6"
};

  const token = localStorage.getItem("token");

  // SAVE DRAFT

  const handleSaveDraft = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/journals",
        {
          title: title,
          content: content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const id = response.data.data.id;

      setJournalId(id);

      alert("Draft saved successfully!");

    } catch (error) {

      console.error(error);
      alert(error.response?.data?.message || "Draft save failed");

    }

  };

  // SUBMIT JOURNAL

  const handleSubmitJournal = async () => {

    if (!journalId) {
    alert("Please save draft first");
    return;
}

    try {

      const response = await axios.patch(
        `http://localhost:8080/api/journals/${journalId}/submit`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const mood = response.data.data.predictedMood;
const conf = response.data.data.moodConfidence;

setPrediction(mood);
setConfidence(conf);

      alert("Journal submitted!");

    } catch (error) {

      console.error(error);
      alert(error.response?.data?.message || "Submit failed");
    }

  };

  const backgroundColor = prediction
  ? moodColors[prediction.toUpperCase()]
  : "#f6f0e6";

  return (

    <div
  className="min-h-screen transition-colors duration-700"
  style={{ backgroundColor: backgroundColor }}
>

      <DashboardNavbar />

      <div className="max-w-2xl mx-auto p-10">

        <h1 className="text-3xl font-semibold mb-6">
          Create Journal
        </h1>

        <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSaveDraft();
  }}
  className="bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6 space-y-4"
>
  

          <input
            type="text"
            placeholder="Journal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-[#e6dccd] rounded-lg px-4 py-2"
          />

          <textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full border border-[#e6dccd] rounded-lg px-4 py-2"
          />

          <div className="flex gap-4">

            <button
              type="submit"
              className="bg-[#d4a373] text-white px-4 py-2 rounded-lg"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={handleSubmitJournal}
              disabled={!journalId || prediction}
              className="bg-[#6b7a3a] text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
              Submit Journal
            </button>

          </div>

          {prediction && (

            <div className="p-4 bg-[#f1eadf] rounded-lg">

              <div className="text-center">

  <p className="text-2xl">
    {moodEmoji[prediction?.toUpperCase()]}
  </p>

  <p className="font-semibold text-lg">
    Predicted Mood: {prediction}
  </p>

  <p className="text-sm text-gray-600">
    AI Confidence: {(confidence * 100).toFixed(1)}%
  </p>

</div>

            </div>

          )}

        </form>

      </div>

    </div>

  );

}