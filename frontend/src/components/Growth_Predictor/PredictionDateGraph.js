import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const PredictionDateGraph = () => {
  const [graphData, setGraphData] = useState({
    labels: [], // For x-axis labels
    datasets: [
      {
        label: 'Prediction Result',
        data: [],
        borderColor: 'blue',
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/predictions')
      .then((response) => response.json())
      .then((result) => {
        const predictions = result.predictions;
        const predictionDates = predictions.map((entry) => entry.date);
        const predictionResults = predictions.map((entry) => entry.prediction);
        setGraphData({
          labels: predictionDates,
          datasets: [
            {
              label: 'Prediction Result',
              data: predictionResults,
              borderColor: 'blue',
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      <h4>Prediction Date vs. Prediction Result</h4>
      <Line data={graphData} options={{
        scales: {
          x: {
            title: {
              display: true,
              text: 'Prediction Date',
              color: 'black',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Prediction Result',
              color: 'black',
            },
          },
        },
      }} />
    </div>
  );
};

export default PredictionDateGraph;
