import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Statistics() {
  const data = {
    labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
    datasets: [
      {
        label: 'Daily Purchases',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  Chart.register(Chart.controllers.bar, Chart.scaleService.getScaleConstructor('category'));

  const options = {
    scales: {
      x: {
        type: 'category',
      },
    },
  };

  return (
    <div className="statistics-page">
      <h2>Statistics</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Statistics;
