import React, { useState, useEffect } from 'react';
import styles from './goalchart.module.css';
import Cancelarv from '../../Button/Cancelar-variant/cancelarv';
import locationIcon from '../../../utils/img/location_icon.png';
import api from '../../../api';

const GoalChart = () => {
  // valores que serão apresentados no gráfico
  const [percentualAtualDaMeta, setPercentualAtualDaMeta] = useState([]);
  const [valorRealizadoDaMeta, setValorRealizadoDaMeta] = useState('');
  const [valorTotalDaMeta, setValorTotalDaMeta] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/metas');
        const { data } = response;
        let percentualTratado;
        console.log(data);

        if(data.percentualRealizado-20 < 0){
          percentualTratado = "0%";
        } else {
          percentualTratado = (data.percentualRealizado-25) + "%";
        }

        const valorRealizadoTratado = "R$"+data.valorRealizado;

        setPercentualAtualDaMeta("0%");
        setValorRealizadoDaMeta(valorRealizadoTratado);
        setValorTotalDaMeta(data.valor);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    const tipoProdutoInterval = setInterval(fetchData, 5000);
    return () => clearInterval(tipoProdutoInterval);
  }, []);

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

          <div className={styles["goalChartProgressBarContainer"]}>

            <div className={styles["progressBarTrack"]}>
              <div 
                className={styles["progressBarCurrentLocation"]} 
                style={{marginLeft: percentualAtualDaMeta}}
              >
                <p>Você está aqui</p>
                <img src={locationIcon} className={styles["locationIcon"]} alt="location icon" />
              </div>
            </div>

            <div className={styles["criclesContainer"]}>
              <div className={styles["goalChartCircleZero"]}>0%</div>
              <div className={styles["goalProgressBar"]}></div>
              <div className={styles["goalChartCircleCinquenta"]}>50%</div>
              <div className={styles["goalProgressBar"]}></div>
              <div className={styles["goalChartCircleCem"]}>100%</div>
            </div>

            <div className={styles["progressBarTrack"]}>
              <div 
                className={styles["progressBarCurrentLocation"]} 
                style={{marginLeft: percentualAtualDaMeta}}
              >
                <p>{valorRealizadoDaMeta}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalChart;
