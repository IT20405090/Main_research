import React, { useEffect, useState, useRef } from "react"; // Import 'useRef'
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Note: Using 'auto' will include all necessary components

const HWGraph = ({ chartRefs }) => {
  // Initialize state to store graph data with height, weight, and step
  const [graphData, setGraphData] = useState({
    height: [],
    weight: [],
    step: [],
  });

  // Use useRef to hold a reference to the chart
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch data from your Flask API
    // Update the 'graphData' state with the retrieved data
    fetch("http://localhost:5000/predictions")
      .then((response) => response.json())
      .then((result) => {
        const predictions = result.predictions;

        // Extract height and weight data from predictions
        const heightData = predictions.map(
          (entry) => entry.user_data.height[0]
        );
        const weightData = predictions.map(
          (entry) => entry.user_data.weight[0]
        );
        const numPredictions = predictions.length;
        const stepData = Array.from(
          { length: numPredictions },
          (_, i) => i + 1
        );

        // Generate an array for the 'step' data
        setGraphData({
          height: heightData,
          weight: weightData,
          step: stepData,
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Use an effect to create a chart when 'chartRef' changes
  useEffect(() => {
    // Get the 2D rendering context of the chart reference
    const ctx = chartRef.current.getContext("2d");

    // Create a new line chart using Chart.js
    const chart = new Chart(ctx, {
      type: "line",
      data: chartData, // Data for the chart
      options: chartOptions, // Options for the chart
    });

    // Return a cleanup function to destroy the chart when the component unmounts
    return () => {
      chart.destroy(); // Destroy the chart to prevent memory leaks
    };
  }, [chartRef]);

  // Define the data for the chart
  const chartData = {
    labels: graphData.step, // X-axis labels, in this case, the 'step' data
    datasets: [
      {
        label: "Height", // Label for the first dataset
        data: graphData.height, // Data for the 'Height' dataset
        borderColor: "rgba(0, 0, 255, 0.7)", // Border color for the line
        backgroundColor: "rgba(0, 0, 255, 0.3)", // Fill color for the area under the line
      },
      {
        label: "Weight", // Label for the second dataset
        data: graphData.weight, // Data for the 'Weight' dataset
        borderColor: "rgba(255, 0, 0, 0.7)", // Border color for the line
        backgroundColor: "rgba(255, 0, 0, 0.3)", // Fill color for the area under the line
      },
    ],
  };

  // Define the options for the chart
  const chartOptions = {
    scales: {
      x: {
        type: "linear", // X-axis scale type (linear)
        title: {
          display: true,
          text: "Step", // X-axis title
          color: "white", // Change color to white or any other visible color for dark backgrounds
        },
      },
      y: {
        type: "linear", // Y-axis scale type (linear)
        beginAtZero: true, // Start the Y-axis at zero
        title: {
          display: true,
          text: "Value", // Y-axis title
          color: "white", // Change color to white or any other visible color for dark backgrounds
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "black", // Change legend label color to black or any other color for visibility on dark backgrounds
        },
      },
    },
  };

  return (
    <div>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

export default HWGraph;
