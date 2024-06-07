import React from 'react';
import Chart from 'chart.js/auto';
import Filter from '../../Filter/filter';
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
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={styles["lineChartContainer"]}>
      <div className={styles["lineChartBox"]}>
        <div className={styles["lineChartHeader"]}>
          <div className={styles["lineChartText"]}>
            <h2>Quantidade de produtos vendidos</h2>
            <p>Acompanhe o quanto você já vendeu este mês</p>
          </div>
          <div className={styles["lineChartSelectOption"]}>
              <Filter></Filter>
            </div>
        </div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
