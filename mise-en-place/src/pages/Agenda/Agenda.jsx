import React, { useEffect, useState } from "react";
import NestedList from "../../components/NestedList/NestedList";
import styles from "./agenda.module.css";
import Sidebar from "../../components/Sidebar/sidebar";
import Breadcrumb from "../../components/Texts/Breadcrumbs/breadcrumbs";
import Filter from "../../components/Filter/filter";
import IconKanban from '../../utils/img/Kanban.svg';
import IconAgenda from '../../utils/img/List.svg';
import api from "../../api";
import ButtonDefault from '../../components/Button/Default/default';
import { useNavigate, useLocation } from "react-router-dom";

const Agenda = () => {
  const [testeMap, setTesteMap] = useState([]);
  const [filterSelectedValue, setFilterSelectedValue] = useState('Mensal');
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterStatus = (value) => {
    setFilterSelectedValue(value);
    fetchAgenda(value);
  }

  const redirect = (url) => {
    window.location = url;
  }

  const fetchAgenda = async (item) => {
    setTesteMap([]);
    try {
      var stringUrl = "";
      if (item === 'Semanal') {
        function startOfWeek(date) {
          var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
          return new Date(date.setDate(diff));
        }

        var dt = new Date();


        stringUrl = 'produto-pedidos/agenda?dataInicio=';
        stringUrl += startOfWeek(dt).getDate() < 10 ? "0" + startOfWeek(dt).getDate() : startOfWeek(dt).getDate()
        stringUrl += "%2F"
        stringUrl += (startOfWeek(dt).getMonth() + 1) < 10 ? "0" + (startOfWeek(dt).getMonth() + 1) : (startOfWeek(dt).getMonth() + 1)
        stringUrl += "%2F"
        stringUrl += startOfWeek(dt).getFullYear().toString()
        stringUrl += "&dataFim="
        stringUrl += (startOfWeek(dt).getDate() + 6) < 10 ? "0" + (startOfWeek(dt).getDate() + 6) : (startOfWeek(dt).getDate() + 6)
        stringUrl += "%2F"
        stringUrl += (startOfWeek(dt).getMonth() + 1) < 10 ? "0" + (startOfWeek(dt).getMonth() + 1) : (startOfWeek(dt).getMonth() + 1)
        stringUrl += "%2F"
        stringUrl += startOfWeek(dt).getFullYear();
      } else {
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);

        stringUrl = "produto-pedidos/agenda?dataInicio=";
        stringUrl += firstDay.getDate() < 10 ? "0" + firstDay.getDate().toString() : firstDay.getDate();
        stringUrl += "%2F";
        stringUrl += (firstDay.getMonth() + 1) < 10 ? "0" + (firstDay.getMonth() + 1) : firstDay.getMonth() + 1;
        stringUrl += "%2F";
        stringUrl += firstDay.getFullYear();
        stringUrl += "&dataFim=";
        stringUrl += lastDay.getDate() < 10 ? "0" + lastDay.getDate() : lastDay.getDate();
        stringUrl += "%2F";
        stringUrl += (lastDay.getMonth() + 1) < 10 ? "0" + (lastDay.getMonth() + 1) : lastDay.getMonth() + 1;
        stringUrl += "%2F";
        stringUrl += lastDay.getFullYear();
      }
      console.log(stringUrl);
      api.get(stringUrl).then((response) => {
        const data = response.data;
        console.log(data);
        setTesteMap(data.itemsAgenda.reverse());
      }).catch((error) => {
        console.error("Erro ao buscar dados da agenda", error);
      });
    } catch (error) {
      console.error("Erro ao buscar dados da agenda", error);
    }
  };
  useEffect(() => {
    fetchAgenda();
  }, []);




  return (
    <div className={styles["mainContainer"]}>
      <Sidebar />
      <div className={styles["innerContainer"]}>
        <div className={styles["dashboardBreadcrumbsContainer"]}>
          <Breadcrumb />
        </div>
        <div className={styles["containerTittleCard"]}>
          <div className={styles["dashboardTittleCard"]}>
            <h2>Quadro de Planejamento</h2>
            <p>Organize os pedidos da semana conforme você os prepara.</p>
          </div>
        </div>
        <div className={styles["DivSpace"]}>
          <div className={styles["DivActions"]}>
            <div className={styles["DivButtonAddPedido"]}>
              <ButtonDefault
                label="Adicionar Pedido"
                showIcon="true"
                icon="plus"
                iconPosition="left"
                fontSize="small"
                width="170px"
                onClick={() => redirect('/adicionar-pedido')}
              /> {/* TODO: ALTERAR LINK PRA REDIRECT */}
            </div>
            <div className={styles["DivButtonTrocarVisualizacao"]}>
              <div className={styles["marginButtons"]}>
                <div style={{ "marginRight": "2vw" }}>
                  <Filter options={['Mensal', 'Semanal']} onChange={handleFilterStatus} />
                </div>
                <div className={styles["BackgroundColorIcon"]} style={{ "marginRight": "0.5vw" }}>
                  <img className={styles["IconAgenda"]} src={IconAgenda} alt="" />
                </div>
                <div style={{ "display": "flex", "alignItems": "center" }} onClick={() => redirect("/kanban")}>
                  <img className={styles["IconKanban"]} src={IconKanban} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{"marginTop": "3vh"}}>
          {testeMap.map((item, index) => (
            <NestedList key={index} testeMap={item} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Agenda;