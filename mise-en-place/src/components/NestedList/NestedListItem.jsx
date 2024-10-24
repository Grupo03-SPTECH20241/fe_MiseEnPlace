import React, { useState, useEffect } from "react";
import setaDireita from "../../utils/img/setaDireita.png";
import styles from "./nestedList.module.css";

// Componente para renderizar cada item da lista
const NestedListItem = ({ testeMap }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [dataEntregaFormatted, setDataEntregaFormatted] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (

    useEffect(() => {
      var dataEntregaSplit = testeMap.dataEntrega.split("-");
      var dataEntregaFormatted = dataEntregaSplit[2] + '/' + dataEntregaSplit[1] + '/' + dataEntregaSplit[0];
      setDataEntregaFormatted(dataEntregaFormatted);
    }, []),


    <div className={styles["cardItens"]}>
      <div className={styles["divValores1"]}>
        <p>Cliente: {testeMap.cliente}</p>
        <p>Pedido: {testeMap.pedido}</p>
      </div>
      <div className={styles["divValores2"]}>
        <p>Descrição:</p>
        <p>{testeMap.descricao}</p>
      </div>
      <div className={styles["divValores3"]}>
        <p>Estado Atual: </p>
        <p className={
          `${styles["statusAgenda"]} ${testeMap.status === "N" ? styles["statusAgendaNovo"]
            : testeMap.status === "P" ? styles["statusAgendaPreparando"]
              : testeMap.status === "R" ? styles["statusAgendaPronto"]
                : testeMap.status === "E" ? styles["statusAgendaEntregue"]
                  : ""
          }`
        }>
          {testeMap.status === "N" ? "Novo"
            : testeMap.status === "P" ? "Preparando"
              : testeMap.status === "R" ? "Pronto"
                : testeMap.status === "E" ? "Entregue"
                  : "N/A"}
        </p>
      </div>
      <div className={styles["divValores4"]}>
        <p>Data de Entrega: </p>
        <p>{dataEntregaFormatted}</p>
      </div>
      <div className={styles['seta']}>  {/* TODO: ALTERAR REDIRECIONAMENTO PARA PEDIDO */}
        <img src={setaDireita} />
      </div>
    </div>
  );
};

export default NestedListItem;