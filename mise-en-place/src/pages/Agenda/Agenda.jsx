import React, { useEffect, useState } from "react";
import NestedList from "../../components/NestedList/NestedList";
import styles from "./agenda.module.css";
import Sidebar from "../../components/Sidebar/sidebar";
import Breadcrumb from "../../components/Texts/Breadcrumbs/breadcrumbs";
import IconKanban from '../../utils/img/Kanban.svg';
import IconAgenda from '../../utils/img/List.svg';
import ButtonDefault from '../../components/Button/Default/default';
import { useNavigate, useLocation } from "react-router-dom";

const Agenda = () => {
  const [testeMap, setTesteMap] = useState([]);
  const navigate = useNavigate();  
  const location = useLocation();

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const response = await fetch('http://localhost:8080/produto-pedidos/agenda?dataInicio=01%2F01%2F2000&dataFim=10%2F09%2F2024');
        const data = await response.json();
        console.log("Esse aqui é o data: ", data);
        setTesteMap(data.itemsAgenda);
      } catch (error) {
        console.error("Erro ao buscar dados da agenda", error);
      }
    };

    fetchAgenda();
  }, []);

  const navigateToAdicionarPedido = () => {
    navigate('/adicionar-pedido');
  }
  
  const navigateToVisualizarPedido = ( pedidoSelecionado ) => {
    console.log("pedido selecionado:");
    console.log(pedidoSelecionado);
    navigate('/visualizar-pedido', { state: { pedido: pedidoSelecionado } });
  }

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
                onClick={navigateToAdicionarPedido}
              />
            </div>
            <div className={styles["DivButtonTrocarVisualizacao"]}>
              <div className={styles["BackgroundColorIcon"]}>
                <img className={styles["IconAgenda"]} src={IconAgenda} alt="" />
              </div>
              <div>
                <img className={styles["IconKanban"]} src={IconKanban} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.kanban}>
          {testeMap.map((item) => (
            <NestedList testeMap={item} title={item.title} onClick={()=>{navigateToVisualizarPedido(item)}} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Agenda;