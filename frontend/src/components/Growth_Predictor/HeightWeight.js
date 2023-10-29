import React, { useEffect, useState, useRef } from 'react'; // Import 'useRef'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Note: Using 'auto' will include all necessary components


const HWGraph = ({ chartRefs }) => {
  const [graphData, setGraphData] = useState({
    height: [],
    weight: [],
    step: [],
  });

  const chartRef = useRef(null); // Use useRef for chart reference

  useEffect(() => {
    // Fetch data from your Flask API here
    // Update the 'graphData' state with the retrieved data
    fetch('http://localhost:5000/predictions')
      .then((response) => response.json())
      .then((result) => {
        const predictions = result.predictions;

        const heightData = predictions.map((entry) => entry.user_data.height[0]);
        const weightData = predictions.map((entry) => entry.user_data.weight[0]);
        const numPredictions = predictions.length;
        const stepData = Array.from({ length: numPredictions }, (_, i) => i + 1);

        setGraphData({ height: heightData, weight: weightData, step: stepData });
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  
    return () => {
      chart.destroy();
    };
  }, [chartRef]);
  

  const chartData = {
    labels: graphData.step,
    datasets: [
      {
        label: 'Height',
        data: graphData.height,
        borderColor: 'rgba(0, 0, 255, 0.7)',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
      },
      {
        label: 'Weight',
        data: graphData.weight,
        borderColor: 'rgba(255, 0, 0, 0.7)',
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
      },
    ],
  };

  const chartOptions = {
  scales: {
    x: {
      type: 'linear',
      title: {
        display: true,
        text: 'Step',
        color: 'white', // Change color to white or any other color that is visible on your dark background
      },
    },
    y: {
      type: 'linear',
      beginAtZero: true,
      title: {
        display: true,
        text: 'Value',
        color: 'white', // Change color to white or any other color that is visible on your dark background
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: 'black', // Change label color to black or any other color that is visible on your dark background
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
