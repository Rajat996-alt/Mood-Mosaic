import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "../../components/DashboardNavbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {

  const [organization, setOrganization] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalJournals, setTotalJournals] = useState(0);
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    const fetchData = async () => {

      try {

        // Organization info
        const orgRes = await axios.get(
          "http://localhost:8080/api/admin/organization",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
     );

        setOrganization(orgRes.data.data);

        // Analytics
        const analyticsRes = await axios.get(
          "http://localhost:8080/api/admin/organization/analytics/summary",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const analytics = analyticsRes.data.data.data;

        setTotalUsers(analytics.totalUsers);
        setTotalJournals(analytics.totalJournals);

        const chartData = Object.entries(
          analytics.moodDistribution
        ).map(([mood, count]) => ({
          mood,
          count
        }));

        setMoodData(chartData);

      } catch (err) {
        console.error(err);
      }

    };

    fetchData();

  }, []);

  const copyInviteCode = () => {

    navigator.clipboard.writeText(organization.inviteCode);

    alert("Invite code copied!");

  };

  return (

    <div className="min-h-screen bg-[#f6f0e6]">

      <DashboardNavbar />

      <div className="p-10">

        <h1 className="text-3xl font-semibold mb-8">
          Admin Dashboard
        </h1>

        {organization && (

          <div className="grid md:grid-cols-2 gap-6 mb-8">

            {/* Organization */}
            <div className="bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6">

              <h2 className="font-semibold mb-2">
                Organization
              </h2>

              <p className="text-lg">
                {organization.name}
              </p>

            </div>

            {/* Invite Code */}
            <div className="bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6">

              <h2 className="font-semibold mb-2">
                Invite Code
              </h2>

              <div className="flex gap-4 items-center">

                <span className="text-lg font-semibold">
                  {organization.inviteCode}
                </span>

                <button
                  onClick={copyInviteCode}
                  className="bg-[#6b7a3a] text-white px-3 py-1 rounded-md"
                >
                  Copy
                </button>

              </div>

            </div>

          </div>

        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6">

            <h2 className="font-semibold mb-2">
              Total Users
            </h2>

            <p className="text-3xl text-[#6b7a3a]">
              {totalUsers}
            </p>

          </div>

          <div className="bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6">

            <h2 className="font-semibold mb-2">
              Total Journals
            </h2>

            <p className="text-3xl text-[#6b7a3a]">
              {totalJournals}
            </p>

          </div>

        </div>

        {/* Mood Distribution Chart */}

        <div className="bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6">

          <h2 className="font-semibold mb-4">
            Organization Mood Distribution
          </h2>

          {moodData.length === 0 ? (

            <p>No data available</p>

          ) : (

            <div className="h-72">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={moodData}>

                  <XAxis dataKey="mood" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="count"
                    fill="#6b7a3a"
                    radius={[6,6,0,0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}