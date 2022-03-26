import React from "react";
import { Bar } from "react-chartjs-2";

const state = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Expenses",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};

export default function BarChart({ heading, barchartdata }) {
  return (
    <div>
      <Bar
        data={barchartdata}
        height="80"
        options={{
          title: {
            display: true,
            text: { heading },
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}
