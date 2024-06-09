import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import styles from './goalchart.module.css';
import Cancelarv from '../../Button/Cancelar-variant/cancelarv';

const GoalChart = () => {
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
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={styles["goalChartContainer"]}>
      <div className={styles["goalChartBox"]}>
        <div className={styles["goalChartHeader"]}>
          <div className={styles["goalChartText"]}>
            <h2>Meta financeira</h2>
            <p>Defina a quantidade que você deseja faturar este mês.</p>
          </div>
          <div className={styles["goalChartSelectOption"]}>
            <Cancelarv></Cancelarv>
          </div>
        </div>
        <div className={styles["goalChart"]}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default GoalChart;
