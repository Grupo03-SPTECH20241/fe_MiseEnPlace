import React from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import styles from './donutchart.module.css';

const DonutChart = () => {
  const labels = ['Pirulito', 'Docinho', 'Salgados', 'Torta', 'Bolo'];

  const data = {
    labels,
    datasets: [
      {
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: ['#FFB347', '#E75F11', '#E71D34', '#0563B1', '#43CA00'],
        borderColor: 'white',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className={styles["lineChartContainer"]}>
      <h1>Gráfico de Barras</h1>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
