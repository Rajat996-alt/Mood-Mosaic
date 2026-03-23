import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "../../components/DashboardNavbar";

export default function MyJournals() {

  const [journals, setJournals] = useState([]);
  const [filterMood, setFilterMood] = useState("");

  const token = localStorage.getItem("token");

  const moodColors = {
    HAPPY: "#fceabb",
    SAD: "#dbeafe",
    ANGRY: "#fecaca",
    ANXIOUS: "#ede9fe",
    CALM: "#d1fae5",
    NEUTRAL: "#f3f4f6"
  };

  const moodEmoji = {
    HAPPY: "😊",
    SAD: "😔",
    ANGRY: "😡",
    ANXIOUS: "😰",
    CALM: "😌",
    NEUTRAL: "😐"
  };

  // FETCH JOURNALS

  const fetchJournals = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/journals/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setJournals(response.data.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {
    fetchJournals();
  }, []);

  // DELETE JOURNAL

  const deleteJournal = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/journals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchJournals();

    } catch (error) {

      console.error(error);

    }

  };

  // FILTERED JOURNALS

  const filteredJournals = filterMood
    ? journals.filter(
        (j) => j.predictedMood?.toUpperCase() === filterMood
      )
    : journals;

  return (

    <div className="min-h-screen bg-[#f6f0e6]">

      <DashboardNavbar />

      <div className="max-w-3xl mx-auto p-10">

        <h1 className="text-3xl font-semibold mb-6">
          My Journals
        </h1>

        {/* Mood Filter */}

        <div className="flex gap-2 mb-6 flex-wrap">

          {["HAPPY","SAD","ANGRY","ANXIOUS","CALM","NEUTRAL"].map(mood => (

            <button
              key={mood}
              onClick={() => setFilterMood(mood)}
              className="px-3 py-1 rounded-full bg-white border"
            >
              {moodEmoji[mood]} {mood}
            </button>

          ))}

          <button
            onClick={() => setFilterMood("")}
            className="px-3 py-1 rounded-full bg-gray-200"
          >
            Clear
          </button>

        </div>

        {/* Journals */}

        <div className="space-y-4">

          {filteredJournals.map(journal => (

            <div
              key={journal.id}
              className="p-5 rounded-xl border"
              style={{
                backgroundColor:
                  moodColors[journal.predictedMood?.toUpperCase()]
              }}
            >

              <h2 className="font-semibold text-lg">
                {moodEmoji[journal.predictedMood?.toUpperCase()]} {journal.title}
              </h2>

              <p className="text-sm mt-2">
                {journal.content}
              </p>

              <p className="text-xs mt-2 text-gray-600">
                {journal.predictedMood} • Confidence {(journal.moodConfidence * 100).toFixed(1)}%
              </p>

              <div className="flex gap-3 mt-3">

                <button
                  onClick={() => deleteJournal(journal.id)}
                  className="bg-red-500 text-white py-2 px-3 rounded-xl hover:bg-red-600"
                >
                  🗑 Delete
                </button>

</div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}