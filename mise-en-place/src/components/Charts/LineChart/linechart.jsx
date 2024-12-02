import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Filter from '../../Filter/filter';
import { Line } from 'react-chartjs-2';
import styles from './linechart.module.css';
import api from '../../../api';

const LineChart = () => {
  // valor da filtragem
  const [filterSelectedValue, setFilterSelectedValue] = useState('Anual');

  // valida se é a primeira vez que está carregando
  const [firstTimeLoading, setFirstTimeLoading] = useState(true);

  // valores apresentados no gráfico caso o filtro seja por mês
  const [quantidadeVendidaAno, setQuantidadeVendidaAno] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const labelAnual = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  // valores apresentados no gráfico caso o filtro seja por semana
  const [quantidadeVendidaSemana, setQuantidadeVendidaSemana] = useState([]);
  const [labelSemanal, setLabelSemanal] = useState([]);

  // valores apresentados no gráfico caso o filtro seja por dia
  const [quantidadeVendidaMes, setQuantidadeVendidaMes] = useState([]);
  const [labelMensal, setLabelMensal] = useState([]);

  // variáveis que guardam a label e os dados que serão exibidos no gráfico
  const [currentLabel, setCurrentLabel] = useState(labelAnual);
  const [currentData, setCurrentData] = useState(quantidadeVendidaAno);

  const handleFilterChange = (value) => {
    setFilterSelectedValue(value);
  };

  function bubbleSortByDay(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].dia > data[j + 1].dia) {
          let temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }
    return data;
  }

  useEffect(() => {
    const fetchData = async () => {

      if (filterSelectedValue === 'Anual') {
        setCurrentLabel(labelAnual);
        setCurrentData(quantidadeVendidaAno);
        try {
          const response = await api.get('/java-api/quantidade-vendidos-mes');
          const { data } = response;
          for (let i = 0; i < data.length; i++) {
            if ([data[i].mes]) {
              quantidadeVendidaAno[data[i].mes - 1] = data[i].quantidadeVendida;
            }
          }
        } catch (error) {
          console.error(error);
        }

      } else if (filterSelectedValue === 'Semanal') {
        try {
          const response = await api.get('/java-api/quantidade-vendidos-semana');
          const { data } = response;

          let newLabelSemanalValues = [];
          let newQuantidadeVendidaValues = [];

          for (let i = 0; i < data.length; i++) {
            if (data[i].dia) {
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

      } else if (filterSelectedValue === 'Mensal') {
        try {
          const response = await api.get('/java-api/quantidade-vendidos-dia');
          const { data } = response;

          const organizedData = bubbleSortByDay(data);
          let newLabelMensalValues = [];
          let newQuantidadeVendidaMensalValues = [];

          for (let i = 0; i < organizedData.length; i++) {
            if (organizedData[i].dia) {
              newLabelMensalValues.push(organizedData[i].dia);
              newQuantidadeVendidaMensalValues.push(organizedData[i].quantidadeVendida);
            }
          }
          setLabelMensal(newLabelMensalValues);
          setQuantidadeVendidaMes(newQuantidadeVendidaMensalValues);
          setCurrentLabel(labelMensal);
          setCurrentData(quantidadeVendidaMes);


        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
    const fetchDataInterval = setInterval(fetchData, 5000);

    if (firstTimeLoading) {
      setTimeout(() => {
        setFilterSelectedValue('Semanal');
      }, 1000);

      setTimeout(() => {
        setFilterSelectedValue('Mensal');
      }, 2000);

      setTimeout(() => {
        setFilterSelectedValue('Anual');
      }, 3000);
      setFirstTimeLoading(false);
    }

    return () => clearInterval(fetchDataInterval);
  }, [filterSelectedValue]);

  //Configurações do gráfico/labels/opções de filtragem:
  const filterOptions = ['Anual', 'Semanal', 'Mensal'];
  const labels = currentLabel;

  const data = {
    labels,
    datasets: [
      {
        data: currentData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: '#4B24E5;',
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
            <p>Acompanhe o quanto você já vendeu durante o período selecionado.</p>
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
