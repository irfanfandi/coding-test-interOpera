import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: "bottom", // move legend below the chart
      labels: {
        boxWidth: 20,
        padding: 15,
      },
    },
  },
  maintainAspectRatio: false,
};

export default function SalesDashboard({ selectedUser }) {
  const [chartDataSales, setChartDataSales] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (selectedUser?.deals?.length > 0) {
      const labels = selectedUser?.deals?.map((deal) => deal.status) || [];
      const dataSets = selectedUser?.deals?.map((deal) => deal.value) || [];
      setChartDataSales({
        labels,
        datasets: [
          {
            label: "Sales",
            data: dataSets,
            backgroundColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255, 99, 132, 1)",
            ],
          },
        ],
      });
    }
  }, [selectedUser]);

  return (
    <section className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {/* Profile Info */}
      <div className="col-span-1 xl:col-span-3 bg-white rounded-2xl shadow p-6">
        <div className="flex gap-6">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-indigo-700">
              {selectedUser?.name?.[0]}
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{selectedUser?.name}</h1>
            <p className="text-gray-600">{selectedUser?.role}</p>
            <p className="text-gray-600">{selectedUser?.region}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <h1>Skills</h1>
          {selectedUser?.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Deals Overview */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Deals by status</h2>
        <div className="space-y-3 w-60 h-60 mx-auto">
          <Doughnut data={chartDataSales} options={options} />
        </div>
      </div>

      {/* Deals Overview */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Deals</h2>
        <div className="space-y-3">
          {selectedUser?.deals
            ?.sort((a, b) => {
              const statusOrder = {
                "Closed Won": 1,
                "In Progress": 2,
                "Closed Lost": 3,
              };
              return statusOrder[a.status] - statusOrder[b.status];
            })
            .map((deal, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{deal.client}</p>
                  <p className="text-sm text-gray-600">
                    ${deal.value.toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    deal.status === "Closed Won"
                      ? "bg-gray-600 text-white"
                      : deal.status === "In Progress"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {deal.status === "Closed Won"
                    ? "Closed Won"
                    : deal.status === "In Progress"
                    ? "In Progress"
                    : "Closed Lost"}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Clients Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Clients</h2>
        <div className="space-y-3">
          {selectedUser?.clients?.map((client, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{client.name}</p>
                <p className="text-sm text-gray-600">{client.industry}</p>
              </div>
              <a
                href={`mailto:${client.contact}`}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
