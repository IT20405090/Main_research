import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const AgeGrowthGraph = () => {
  const [graphData, setGraphData] = useState({
    age: [],
    growthLevel: [],
  });

  useEffect(() => {
    fetch('http://localhost:5000/predictions')
      .then((response) => response.json())
      .then((result) => {
        const predictions = result.predictions;
        const ageData = predictions.map((entry) => entry.user_data.age[0]);
        const growthLevelData = predictions.map((entry) => entry.prediction);
        setGraphData({ age: ageData, growthLevel: growthLevelData });
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const chartData = {
    labels: graphData.age,
    datasets: [
      {
        label: 'Growth Level',
        data: graphData.growthLevel,
        borderColor: 'red',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Child Age',
          color: 'black',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Growth Level',
          color: 'black',
        },
      },
    },
  };

  return (
    <div>
      <h4>Child's Age vs. Growth Level</h4>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default AgeGrowthGraph;
