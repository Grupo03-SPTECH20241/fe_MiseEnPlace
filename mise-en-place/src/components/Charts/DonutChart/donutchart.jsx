import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import styles from './donutchart.module.css';
import Filter from '../../Filter/filter';
import api from '../../../api';
import InputCalendar from '../../Input/Calendar/calendar';

const DonutChart = () => {
  // valor da filtragem
  const [filterSelectedValue, setFilterSelectedValue] = useState("Geral");

  const [labelTipoProduto, setLabelTipoProduto] = useState([]);
  const [vendaTipoProduto, setVendaTipoProduto] = useState([]);

  const [dataInicio, setDataInicio] = useState();
  const [dataFim, setDataFim] = useState();

  const [isVisible, setIsVisible] = useState(false);

  const [trigger, setTrigger] = useState(false);

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

      if (filterSelectedValue === 'Geral') {
        toggleVisibility(false);

        try {
          const response = await api.get('/java-api/quantidade-vendidos-tipo-produto');
          const { data } = response;
          let newTipoValues = [];
          let newVendaValues = [];
  
          for(let i = 0; i < data.length; i++){
            let tipoExiste = false;
            for(let j = 0; j < data.length; j++){
              if(data[j].tipoProduto == newTipoValues[i]){
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

      } else if (filterSelectedValue === 'Intervalo') {
        toggleVisibility(true);
        if ((dataInicio && dataFim) && new Date(dataInicio) < new Date(dataFim)) {
          setTrigger((prev) => !prev);
        }
      }
    };
    fetchData();
    const tipoProdutoInterval = setInterval(fetchData, 5000);
    return () => clearInterval(tipoProdutoInterval);

  }, [filterSelectedValue]);

  useEffect(() => {
    const handleChange = async () => {
      if ((dataInicio && dataFim) && new Date(dataInicio) < new Date(dataFim)) {
        try {
            const response = await api.get(`/java-api/quantidade-vendidos-tipo-produto-intervalo?startDate=${dataInicio}&endDate=${dataFim}`);
            const { data } = response;

          let newTipoValues = [];
          let newVendaValues = [];
  
          for(let i = 0; i < data.length; i++){
            let tipoExiste = false;
            for(let j = 0; j < data.length; j++){
              if(data[j].tipoProduto == newTipoValues[i]){
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

        } catch(ex) {
          console.log(ex)
        }
      }
    };

    handleChange();
  }, [dataInicio, dataFim, trigger]);

  const filterOptions = ['Geral', 'Intervalo'];
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
        display: true,
        position: 'bottom'
      },
    },
  };
  return (
    <div className={styles["donutChartContainer"]}>
      <div className={styles["donutChartBox"]}>
        <div className={styles["donutChartHeader"]}>
          <div className={styles["donutChartText"]}>
            <h2>Tipos de produtos mais vendidos</h2>
            <p>Acompanhe qual produto vem sendo o favorito entre os seus clientes.</p>
          </div>
          <div className={styles["donutChartSelectOption"]}>
            <Filter options={filterOptions} onChange={handleFilterChange}></Filter>
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
        <div className={styles["donutChart"]}>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
