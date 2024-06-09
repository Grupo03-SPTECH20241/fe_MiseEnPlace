import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Filter from '../../Filter/filter';
import { Line } from 'react-chartjs-2';
import styles from './linechart.module.css';
import api from '../../../api';

const LineChart = () => {
  // valor da filtragem
  const [filterSelectedValue, setFilterSelectedValue] = useState('Mensal'); 

  // valores apresentados no gráfico caso o filtro seja por mês
  const [quantidadeVendidaMes, setQuantidadeVendidaMes] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const labelMensal = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  // valores apresentados no gráfico caso o filtro seja por semana
  const [quantidadeVendidaSemana, setQuantidadeVendidaSemana] = useState([]); 
  const [labelSemanal, setLabelSemanal] = useState([]); 

  // variáveis que guardam a label e os dados que serão exibidos no gráfico
  const [currentLabel, setCurrentLabel] = useState(labelMensal);
  const [currentData, setCurrentData] = useState(quantidadeVendidaMes);
  
  const handleFilterChange = (value) => {
    setFilterSelectedValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {

      if(filterSelectedValue === 'Mensal') {
        setCurrentLabel(labelMensal);
        setCurrentData(quantidadeVendidaMes);
        try {
          const response = await api.get('/quantidade-vendidos-mes');
          const { data } = response;
          for(let i = 0; i < data.length; i++){
            if([data[i].mes]){
              quantidadeVendidaMes[data[i].mes-1] = data[i].quantidadeVendida;
            }
          }
        } catch (error) {
          console.error(error);
        }

      } else if (filterSelectedValue === 'Semanal'){
        try {
          const response = await api.get('/quantidade-vendidos-semana');
          const { data } = response;
          let newLabelSemanalValues = [];
          let newQuantidadeVendidaValues = [];

          for(let i = 0; i < data.length; i++){
            if(data[i].dia){
              newLabelSemanalValues.push(data[i].dia);
              newQuantidadeVendidaValues.push(data[i].quantidadeVendida);
            }
          }
          setLabelSemanal(newLabelSemanalValues);
          setQuantidadeVendidaSemana(newQuantidadeVendidaValues);
          setCurrentLabel(labelSemanal);
          setCurrentData(quantidadeVendidaSemana);

        } catch (error) {
          console.error(error);
        }

      } else if (filterSelectedValue === 'Diário'){
        try {
          const response = await api.get('/quantidade-vendidos-dia');
          const { data } = response;
          console.log("Diário:")
          console.log(data)

          // for(let i = 0; i < data.length; i++){
          //   if(data[i].dia){
          //     newLabelSemanalValues.push(data[i].dia);
          //     newQuantidadeVendidaValues.push(data[i].quantidadeVendida);
          //   }
          // }
          // labelAnual = newLabelSemanalValues;
          // quantidadeVendidaSemana = newQuantidadeVendidaValues;
          // console.log(labelSemanal)
          // console.log(newQuantidadeVendidaValues);
          // setCurrentLabel(labelSemanal);
          // setCurrentData(quantidadeVendidaSemana);
          // console.log('Semanal:')

        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
    const fetchDataInterval = setInterval(fetchData, 5000);
    return () => clearInterval(fetchDataInterval);
  }, [filterSelectedValue]);

  //Configurações do gráfico/labels/opções de filtragem:
  const filterOptions = ['Mensal', 'Semanal', 'Diário'];
  const labels = currentLabel;

  const data = {
    labels,
    datasets: [
      {
        data: currentData,
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
            <Filter options={filterOptions} onChange={handleFilterChange}></Filter>
          </div>
        </div>
        <div className={styles["lineChart"]}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
