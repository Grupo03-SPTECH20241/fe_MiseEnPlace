import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import Filter from '../../Filter/filter';
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
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={styles["barChartContainer"]}>
      <div className={styles["barChartBox"]}>
        <div className={styles["barChartHeader"]}>
          <div className={styles["barChartText"]}>
            <h2>Produtos X Preço</h2>
            <p>Acompanhe o quanto os seus produtos estão faturando este mês.</p>
          </div>
          <div className={styles["barChartSelectOption"]}>
              <Filter></Filter>
            </div>
        </div>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
