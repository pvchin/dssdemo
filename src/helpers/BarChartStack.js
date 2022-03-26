import React from "react";
import { Bar, char } from "react-chartjs-2";
import { Box, Container } from "@chakra-ui/react";

const data = {
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
      label: "Basic Salary",
      backgroundColor: "rgba(75, 192, 192, 1)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      stack: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 50, 61, 56, 55, 40, 55, 50, 65, 70, 65],
    },
    {
      label: "Site Allowances",
      backgroundColor: "#D6BCFA",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      stack: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [25, 29, 20, 41, 16, 25, 20, 25, 23, 15, 24, 22],
    },
    {
      label: "Allowances",
      backgroundColor: "skyblue",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      stack: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [25, 29, 10, 41, 16, 25, 20, 25, 23, 15, 24, 22],
    },
    {
      label: "Expenses Claims",
      backgroundColor: "grey",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      stack: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [25, 39, 20, 21, 16, 25, 20, 16, 25, 35, 25, 33],
    },
    {
      label: "TAP/SCP",
      backgroundColor: "cyan",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      stack: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [25, 39, 15, 21, 16, 25, 20, 16, 25, 35, 25, 33],
    },
    {
      label: "Deductions",
      backgroundColor: "#9AE6B4",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      stack: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [25, 39, 10, 11, 16, 25, 20, 16, 25, 35, 25, 33],
    },
  ],
};

export default function BarChartStack() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    type: "bar",
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
  };
  return (
    <Container maxW="container.x2">
      <Box>
        <Bar data={data} width="1200" height="2800" options={options} />
      </Box>
    </Container>
  );
}
