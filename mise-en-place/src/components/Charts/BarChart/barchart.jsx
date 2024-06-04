import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import styles from './barchart.module.css';

const BarChart = () => {
  const labels = ['Pirulito', 'Salgado', 'Torta', 'Docinho', 'Bolo'];

  const data = {
    labels,
    datasets: [
      {
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'red',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    // Defina suas opções aqui, se necessário
  };

  return (
    <div className={styles["barChartContainer"]}>
      <h1>Gráfico de Barras</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
