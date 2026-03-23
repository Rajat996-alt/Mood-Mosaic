import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "../../components/DashboardNavbar";

export default function UserDashboard() {

  const [streak, setStreak] = useState(0);
  const [moodSummary, setMoodSummary] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [transitions, setTransitions] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    const fetchData = async () => {

      try {

        const transitionRes = await axios.get(
  "http://localhost:8080/api/analytics/me/mood-transitions",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

const transitionsObj = transitionRes.data.data.transitions;

const transitionArray = Object.entries(transitionsObj).map(
  ([transition, count]) => ({
    transition,
    count
  })
);

setTransitions(transitionArray);

        const monthlyRes = await axios.get(
  "http://localhost:8080/api/analytics/me/monthly-summary",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

const monthlyDistribution = monthlyRes.data.data.moodDistribution;

const monthlyChartData = Object.entries(monthlyDistribution).map(
  ([mood, count]) => ({
    mood,
    count
  })
);

setMonthlyData(monthlyChartData);
setMonthlyTotal(monthlyRes.data.data.totalEntries);

        const weeklyRes = await axios.get(
  "http://localhost:8080/api/analytics/me/weekly-summary",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

const distribution = weeklyRes.data.data.moodDistribution;

const chartData = Object.entries(distribution).map(
  ([mood, count]) => ({
    mood,
    count
  })
);

setWeeklyData(chartData);
setWeeklyTotal(weeklyRes.data.data.totalEntries);

        const streakRes = await axios.get(
          "http://localhost:8080/api/analytics/me/streak",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setStreak(streakRes.data.data.currentStreak);

        const summaryRes = await axios.get(
          "http://localhost:8080/api/analytics/me/mood-summary",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setMoodSummary(summaryRes.data.data);

      } catch (err) {
        console.error(err);
      }

    };

    fetchData();

  }, []);

  return (

    <div className="min-h-screen bg-[#f6f0e6]">

      <DashboardNavbar />

      <div className="p-10">

        <h1 className="text-3xl font-semibold mb-8">
          Your Mood Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6">

            <h2 className="font-semibold mb-2">
              Current Streak
            </h2>

            <p className="text-3xl text-[#6b7a3a]">
              {streak} days
            </p>

          </div>

          <div className="bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6">

            <h2 className="font-semibold mb-4">
              Mood Summary
            </h2>

            <ul className="text-sm space-y-1">

              {Object.entries(moodSummary).map(([mood, count]) => (
                <li key={mood}>
                  {mood} : {count}
                </li>
              ))}

            </ul>

          </div>

          <div className="mt-8 bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6">

  <h2 className="font-semibold mb-4">
    Weekly Mood Distribution
  </h2>

  <p className="text-sm mb-4 text-[#6b6257]">
    Total Entries: {weeklyTotal}
  </p>

  {weeklyData.length === 0 ? (

    <p>No data yet</p>

  ) : (

    <div className="h-72">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={weeklyData}>

          <XAxis dataKey="mood" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#6b7a3a"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  )}

</div>

<div className="mt-8 bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6">

  <h2 className="font-semibold mb-4">
    Monthly Mood Distribution
  </h2>

  <p className="text-sm mb-4 text-[#6b6257]">
    Total Entries: {monthlyTotal}
  </p>

  {monthlyData.length === 0 ? (

    <p>No data yet</p>

  ) : (

    <div className="h-72">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={monthlyData}>

          <XAxis dataKey="mood" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#d4a373"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  )}

</div>

<div className="mt-8 bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6">

  <h2 className="font-semibold mb-4">
    Mood Transitions
  </h2>

  {transitions.length === 0 ? (

    <p>No transitions recorded yet</p>

  ) : (

    <ul className="space-y-2">

      {transitions.map((t, index) => (

        <li
          key={index}
          className="flex justify-between bg-[#f6f0e6] rounded-lg px-4 py-2"
        >

          <span>{t.transition}</span>

          <span className="font-semibold">
            {t.count}
          </span>

        </li>

      ))}

    </ul>

  )}

</div>

        </div>

      </div>

    </div>

  );

}