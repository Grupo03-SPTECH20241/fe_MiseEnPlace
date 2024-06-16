import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import styles from './donutchart.module.css';
import api from '../../../api';

const DonutChart = () => {
  // valores apresentados no gráfico caso o filtro seja por mês
  const [labelTipoProduto, setLabelTipoProduto] = useState([]);
  const [vendaTipoProduto, setVendaTipoProduto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/quantidade-vendidos-tipo-produto');
        const { data } = response;
        let newTipoValues = [];
        let newVendaValues = [];

        for(let i = 0; i < data.length; i++){
          let tipoExiste = false;
          for(let j = 0; j < data.length; j++){
            if(data[j].tipoProduto === newTipoValues[i]){
              tipoExiste = true;
              break
            }
          }
          if(!tipoExiste){
            newTipoValues.push(data[i].tipoProduto);
            newVendaValues.push(0);
          }
        }
        
        for(let i = 0; i < newTipoValues.length; i++){
          for(let j = 0; j < data.length; j++){
            if(newTipoValues[i] === data[j].tipoProduto){
              newVendaValues[i] += data[j].quantidadeVendida;
            }
          }
        }

        setLabelTipoProduto(newTipoValues);
        setVendaTipoProduto(newVendaValues);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    const tipoProdutoInterval = setInterval(fetchData, 5000);
    return () => clearInterval(tipoProdutoInterval);
  }, []);

  const labels = labelTipoProduto;

  const data = {
    labels,
    datasets: [
      {
        data: vendaTipoProduto,
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
    <div className={styles["donutChartContainer"]}>
      <div className={styles["donutChartBox"]}>
        <div className={styles["donutChartHeader"]}>
          <div className={styles["donutChartText"]}>
            <h2>Tipos de produtos mais vendidos</h2>
            <p>Acompanhe qual produto vem sendo o favorito esse mês.</p>
          </div>
        </div>
        <div className={styles["donutChart"]}>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
