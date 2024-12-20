import React, { useState, useEffect } from 'react';
import styles from './goalchart.module.css';
import ButtonFilledDefaultVariant from '../../Button/Default-variant/defaultv';
import locationIcon from '../../../utils/img/location_icon.png';
import api from '../../../api';

const GoalChart = ({openModal}) => {
  // valores que serão apresentados no gráfico
  const [percentualAtualDaMeta, setPercentualAtualDaMeta] = useState([]);
  const [valorRealizadoDaMeta, setValorRealizadoDaMeta] = useState('');
  const [valorTotalDaMeta, setValorTotalDaMeta] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/java-api/metas');
        const { data } = response;
        let percentualTratado;

        if(data.percentualRealizado < 0){
          percentualTratado = "0%";

        } else if(data.percentualRealizado > 100){
          percentualTratado = "100%";

        } else {
          percentualTratado = data.percentualRealizado+"%";
        }

        const valorRealizadoTratado = "R$"+data.valorRealizado;

        setPercentualAtualDaMeta(percentualTratado);
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
            <ButtonFilledDefaultVariant
            fontSize='small'
              label='Definir meta'
              onClick={openModal}
              icon='settings'
              iconPosition='left'
              >
            </ButtonFilledDefaultVariant>
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
              <div className={styles["totalGoalContainer"]}>
                <b>Meta final de: R${valorTotalDaMeta} {percentualAtualDaMeta === '100%' ? "foi concluída!":""}</b>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GoalChart;
