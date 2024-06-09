import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import Filter from '../../Filter/filter';
import styles from './barchart.module.css';
import api from '../../../api';

const BarChart = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/quantidade-vendida-valor-vendido');
        const { data } = response;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    const barChartInterval = setInterval(fetchData, 5000);
    return () => clearInterval(barChartInterval);
  }, []);

  const labels = ['Pirulito', 'Salgado', 'Torta', 'Docinho', 'Bolo'];

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
        <div className={styles["barChart"]}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;