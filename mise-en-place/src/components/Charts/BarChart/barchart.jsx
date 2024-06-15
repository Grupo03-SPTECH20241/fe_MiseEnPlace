import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import Filter from '../../Filter/filter';
import styles from './barchart.module.css';
import api from '../../../api';

const BarChart = () => {
  // valor da filtragem
  const [filterSelectedValue, setFilterSelectedValue] = useState('Mensal');

  // valores apresentados no gráfico caso o filtro seja por mês
  const [valoresVendidoMes, setValoresVendidoMes] = useState([]);
  const [labelMensal, setLabelMensal] = useState([]);

  // valores apresentados no gráfico caso o filtro seja por semana
  const [valoresVendidoSemana, setValoresVendidoSemana] = useState([]);
  const [labelSemanal, setLabelSemanal] = useState([]);

  // valores apresentados no gráfico caso o filtro seja por dia
  const [valoresVendidoDia, setValoresVendidoDia] = useState([]);
  const [labelDiaria, setLabelDiaria] = useState([]);

  // variáveis que guardam a label e os dados que serão exibidos no gráfico
  const [currentLabel, setCurrentLabel] = useState(labelMensal);
  const [currentValorVendido, setCurrentValorVendido] = useState(valoresVendidoMes);

  // atualiza o valor da filtragem
  const handleFilterChange = (value) => {
    setFilterSelectedValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {

      if (filterSelectedValue === 'Mensal') {

        try {
          const response = await api.get('/quantidade-vendida-valor-vendido');
          const { data } = response;
          let newLabelMes = [];
          let newValoresVendidosPorMes = [];
          console.log("Mes:");
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            let nomeExiste = false;

            for (let j = 0; j < newLabelMes.length; j++) {
              if (data[i].nome === newLabelMes[j]) {
                nomeExiste = true;
                newValoresVendidosPorMes[j] += data[i].valorVendido;
                break;
              }
            }

            if (!nomeExiste) {
              newLabelMes.push(data[i].nome);
              newValoresVendidosPorMes.push(data[i].valorVendido);
            }
          }
          
          setLabelMensal(newLabelMes);
          setCurrentLabel(labelMensal);

          setValoresVendidoMes(newValoresVendidosPorMes);
          setCurrentValorVendido(valoresVendidoMes);
        } catch (error) {
          console.error(error);
        }

      } else if (filterSelectedValue === 'Semanal') {

        try {
          const response = await api.get('/quantidade-vendida-valor-vendido-semana');
          const { data } = response;
          let newLabelSemana = [];
          let newValoresVendidosPorSemana = [];
          console.log("semana:");
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            let nomeExiste = false;

            for (let j = 0; j < newLabelSemana.length; j++) {
              if (data[i].nome === newLabelSemana[j]) {
                nomeExiste = true;
                newValoresVendidosPorSemana[j] += data[i].valorVendido;
                break;
              }
            }

            if (!nomeExiste) {
              newLabelSemana.push(data[i].nome);
              newValoresVendidosPorSemana.push(data[i].valorVendido);
            }
          }
          
          setLabelSemanal(newLabelSemana);
          setCurrentLabel(labelSemanal);

          setValoresVendidoSemana(newValoresVendidosPorSemana);
          setCurrentValorVendido(valoresVendidoSemana);
        } catch (error) {
          console.error(error);
        }

      } else if (filterSelectedValue === 'Diário') {

        try {
          const response = await api.get('/quantidade-vendida-valor-vendido-dia');
          const { data } = response;
          console.log(response)
          let newLabelDiaria = [];
          let newValoresVendidosPorDia = [];

          console.log("dia:");
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            let nomeExiste = false;

            for (let j = 0; j < newLabelDiaria.length; j++) {
              if (data[i].nome === newLabelDiaria[j]) {
                nomeExiste = true;
                newValoresVendidosPorDia[j] += data[i].valorVendido;
                break;
              }
            }

            if (!nomeExiste) {
              newLabelDiaria.push(data[i].nome);
              newValoresVendidosPorDia.push(data[i].valorVendido);
            }
          }

          setLabelDiaria(newLabelDiaria);
          setCurrentLabel(labelDiaria);
          setValoresVendidoDia(newValoresVendidosPorDia);
          setCurrentValorVendido(valoresVendidoDia);
        } catch (error) {
          console.error(error);
        }

      }
    };
    fetchData();
    const fetchDataInterval = setInterval(fetchData, 5000);
    return () => clearInterval(fetchDataInterval);
  }, [filterSelectedValue]);

  const filterOptions = ['Mensal', 'Semanal', 'Diário'];
  const labels = currentLabel;

  const data = {
    labels,
    datasets: [
      {
        data: currentValorVendido,
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
            <Filter options={filterOptions} onChange={handleFilterChange}></Filter>
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