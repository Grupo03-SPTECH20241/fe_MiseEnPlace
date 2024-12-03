import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import Filter from '../../Filter/filter';
import styles from './barchart.module.css';
import api from '../../../api';
import InputCalendar from '../../Input/Calendar/calendar';

const BarChart = () => {
  // valor da filtragem
  const [filterSelectedValue, setFilterSelectedValue] = useState('Mensal');

  // valida se é a primeira vez que está carregando
  const [firstTimeLoading, setFirstTimeLoading] = useState(true);

  // valores apresentados no gráfico caso o filtro seja por mês
  const [valoresVendidoMes, setValoresVendidoMes] = useState([]);
  const [labelMensal, setLabelMensal] = useState([]);

  // valores apresentados no gráfico caso o filtro seja por semana
  const [valoresVendidoSemana, setValoresVendidoSemana] = useState([]);
  const [labelSemanal, setLabelSemanal] = useState([]);

  // valores apresentados no gráfico caso o filtro seja por dia
  const [valoresVendidoDia, setValoresVendidoDia] = useState([]);
  const [labelDiaria, setLabelDiaria] = useState([]);

  const [valoresVendidoIntervalo, setValoresVendidoIntervalo] = useState([]);
  const [labelIntervalo, setLabelIntervalo] = useState([]);

  const [dataInicio, setDataInicio] = useState();
  const [dataFim, setDataFim] = useState();

  const [isVisible, setIsVisible] = useState(false);

  const [trigger, setTrigger] = useState(false);

  // variáveis que guardam a label e os dados que serão exibidos no gráfico
  const [currentLabel, setCurrentLabel] = useState(labelMensal);
  const [currentValorVendido, setCurrentValorVendido] = useState(valoresVendidoMes);

  // atualiza o valor da filtragem
  const handleFilterChange = (value) => {
    setFilterSelectedValue(value);
  };

  const handleDataInicio = (event) => {  
    setDataInicio(event?.target?.value ? event?.target?.value : event);  
  };

  const handleDataFim = (event) => {  
  setDataFim(event?.target?.value ? event?.target?.value : event);  
  };

  const toggleVisibility = (value) => {
    setIsVisible(value);
  };

  useEffect(() => {
    const fetchData = async () => {

      if (filterSelectedValue === 'Mensal') {

        try {
          toggleVisibility(false);
          
          const response = await api.get('/java-api/quantidade-vendida-valor-vendido');
          const { data } = response;
          let newLabelMes = [];
          let newValoresVendidosPorMes = [];
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
          toggleVisibility(false);

          const response = await api.get('/java-api/quantidade-vendida-valor-vendido-semana');
          const { data } = response;
          let newLabelSemana = [];
          let newValoresVendidosPorSemana = [];
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

      } else if (filterSelectedValue === 'Hoje') {

        try {
          toggleVisibility(false);

          const response = await api.get('/java-api/quantidade-vendida-valor-vendido-dia');
          const { data } = response;
          let newLabelDiaria = [];
          let newValoresVendidosPorDia = [];

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

      } else if (filterSelectedValue === 'Intervalo') {
        toggleVisibility(true);
        if ((dataInicio && dataFim) && new Date(dataInicio) < new Date(dataFim)) {
          setTrigger((prev) => !prev);
        }
      }
    };
    fetchData();
    const fetchDataInterval = setInterval(fetchData, 5000);

    if(firstTimeLoading){
      setTimeout(()=>{
        setFilterSelectedValue('Semanal');
      }, 1000);
  
      setTimeout(()=>{
        setFilterSelectedValue('Hoje');
      }, 2000);
  
      setTimeout(()=>{
        setFilterSelectedValue('Mensal');
      }, 3000);
      setFirstTimeLoading(false);
    }

    return () => clearInterval(fetchDataInterval);
  }, [filterSelectedValue]);

  useEffect(() => {
    const handleChange = async () => {
      if ((dataInicio && dataFim) && new Date(dataInicio) < new Date(dataFim)) {
        try {
            const response = await api.get(`/java-api/quantidade-vendida-valor-vendido-intervalo?startDate=${dataInicio}&endDate=${dataFim}`);
            const { data } = response;

            let newLabelInterval = [];
            let newValorVendidoInterval = [];

            for (let i = 0; i < data.length; i++) {
              let nomeExiste = false;
  
              for (let j = 0; j < newLabelInterval.length; j++) {
                if (data[i].nome === newLabelInterval[j]) {
                  nomeExiste = true;
                  newValorVendidoInterval[j] += data[i].valorVendido;
                  break;
                }
              }
  
              if (!nomeExiste) {
                newLabelInterval.push(data[i].nome);
                newValorVendidoInterval.push(data[i].valorVendido);
              }
            }

            setLabelIntervalo(newLabelInterval);
            setValoresVendidoIntervalo(newValorVendidoInterval);
            setCurrentLabel(labelIntervalo);
            setCurrentValorVendido(valoresVendidoIntervalo);
        } catch(ex) {
          console.log(ex)
        }
      }
    };

    handleChange();
  }, [dataInicio, dataFim, trigger]);

  const filterOptions = ['Mensal', 'Semanal', 'Hoje', 'Intervalo'];
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
            <p>Acompanhe o quanto os seus produtos estão faturando no período selecionado.</p>
          </div>
          <div className={styles["barChartSelectOption"]}>
            <Filter 
              options={filterOptions} 
              onChange={handleFilterChange}>
            </Filter>
          </div>
        </div>
        <div
        className={styles["lineInterval"]}
        style={{ display: isVisible ? 'flex' : 'none' }}
        >
          <InputCalendar
            label='Início'
            width='30%'
            onChange={handleDataInicio}
          ></InputCalendar>
          <InputCalendar
            label='Fim'
            width='30%'
            onChange={handleDataFim}
          ></InputCalendar>
        </div>
        <div className={styles["barChart"]}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;