import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "../../services/CustomAxios";
const Admin = () => {
  const [labels, setLabels] = useState([]);
  const [numOfArt, setNumOfArt] = useState([]);

  const [change, setChange] = useState(false);

  const countArticle = async () => {
    const res = await axios.get("/faculties/count");
    if (res) {
      const labels = res.map((e) => e.name);
      const numOfArt = res.map((e) => e.num_of_arts);
      setLabels(labels);
      setNumOfArt(numOfArt);
    }
  };

  useEffect(() => {
    countArticle();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of Article",
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
        data: numOfArt, // Replace with actual data
      },
    ],
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-5/6">
          <h2 className=" capitalize text-center mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl ">
            Number of Article in Each Faculty
          </h2>
          <Bar
            data={data}
            options={{
              scales: {
                y: {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Admin;
