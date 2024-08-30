import React, { useEffect, useState } from "react";
import NestedList from "../../components/NestedList/NestedList";
import styles from "./agenda.module.css";
import Sidebar from "../../components/Sidebar/sidebar";
import Breadcrumb from "../../components/Texts/Breadcrumbs/breadcrumbs";
import IconKanban from '../../utils/img/Kanban.svg';
import IconAgenda from '../../utils/img/List.svg';
import ButtonDefault from '../../components/Button/Default/default';

const Agenda = () => {
  const [testeMap, setTesteMap] = useState([]);
  // useEffect(() => {
  //   const fetchAgenda = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/produto-pedidos");
  //       const data = await response.json();
  //       data.forEach(pedido => {
  //         const pedidoData = {
  //           id: pedido.idProdutoPedido,
  //           // pedido: nome,
  //           cliente: {
  //             // nome: pedido.clienteDto.nome,
  //             // telefone: pedido.clienteDto.telefone
  //           },
  //           data: pedido.data,
  //           hora: pedido.hora,
  //           status: pedido.status
  //         };
  //         dataJson.push(pedidoData);
  //       });

  //       console.log(dataJson);
  //       setData(dataJson);
  //     } catch (error) {
  //       console.error("Erro ao buscar dados da agenda", error);
  //     }
  //   };

  //   fetchAgenda();
  // }, []);


  useEffect(() => {
    // setTesteMap([{ nome: "braian" }, { nome: "braian" }, { nome: "braian" }])
    setTesteMap(
      [
        {
          title : "Segunda-feira",
          pedidos : [
            {
              cliente: "Gustavo",
              idPedido: 1234,
              descricaoPedido: "Pedido de teste",
              estadoAtual: "Preparando",
              dataEntrega: "06/11/2004"
            },
            {
              cliente: "Gustavo",
              idPedido: 1234,
              descricaoPedido: "Pedido de teste",
              estadoAtual: "Preparando",
              dataEntrega: "06/11/2004"
            },
            {
              cliente: "Gustavo",
              idPedido: 1234,
              descricaoPedido: "Pedido de teste",
              estadoAtual: "Preparando",
              dataEntrega: "06/11/2004"
            }  
          ]
        }
      ]
    
      
    );

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
              />
            </div>
            <div className={styles["DivButtonTrocarVisualizacao"]}>
              <img className={styles["IconAgenda"]} src={IconAgenda} alt="" />
              <div className={styles["BackgroundColorIcon"]}>
                <img className={styles["IconKanban"]} src={IconKanban} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.kanban}>
          <NestedList testeMap={testeMap} />
        </div>
      </div>
    </div>
  );
}

export default Agenda;