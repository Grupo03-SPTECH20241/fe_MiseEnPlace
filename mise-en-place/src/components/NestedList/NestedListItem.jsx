import React, { useState } from "react";
import styles from "./nestedList.module.css";

// Componente para renderizar cada item da lista
const NestedListItem = ({ testeMap }) => {
  console.log("esse aqui eo data2", testeMap)
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    console.log("Chamou o handleToggle");
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles["cardItens"]}>
      <div>
        <p>Cliente: {testeMap.cliente}</p>
        <p>Pedido: {testeMap.pedido}</p>
      </div>
      <div>
        <p>Descrição:</p>
        <p>{testeMap.descricao}</p>
      </div>
      <div>
        <p>Estado Atual</p>
        <p className={
          `${styles["statusAgenda"]} ${
            testeMap.status === "N" ? styles["statusAgendaNovo"]
            : testeMap.status === "P" ? styles["statusAgendaPreparando"]
            : testeMap.status === "R" ? styles["statusAgendaPronto"]
            : testeMap.status === "F" ? styles["statusAgendaFazendo"]
            : testeMap.status === "E" ? styles["statusAgendaEntregue"]
            : ""
          }`
        }>
          {testeMap.status === "N" ? "Novo" 
          : testeMap.status === "P" ? "Preparando" 
          : testeMap.status === "R" ? "Pronto" 
          : testeMap.status === "F" ? "Fazendo" 
          : testeMap.status === "E" ? "Entregue" 
          : "N/A"}
        </p>
      </div>
      <div>
        <p>Data de Entrega</p>
        <p>{testeMap.dataEntrega}</p>
      </div>
    </div>
  );
};

export default NestedListItem;