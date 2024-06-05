import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import styles from './linechart.module.css';

const LineChart = () => {
  const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

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
    <div className={styles["lineChartContainer"]}>
      <h1>Gráfico de Barras</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
