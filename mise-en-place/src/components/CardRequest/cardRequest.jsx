import React from "react";
import styles from "./cardRequest.module.css";
import fotoDefault from "../../utils/img/Bolo-coco-1.png";
import editarIcon from "../../utils/img/editar.png";
import excluirIcon from "../../utils/img/trash.svg";

const CardPedido = ({
    imagemSrc = fotoDefault, // Usando o valor padrão
    nomeProduto = "Produto",
    descricao = "Descrição do produto",
    quantidade = 1,
    valor = 0.00
}) => {
    return (
        <div className={styles["card-pedido"]}>
            <div className={styles["pedido-info"]}>
                <div className={styles["imagem-pedido"]}>
                    <img src={imagemSrc} alt="Foto do bolo" />
                </div>
                <div className={styles["textos"]}>
                    <h3>{nomeProduto}</h3>
                    <p>{descricao}</p>
                </div>
            </div>
            <div className={styles["importantes"]}>
                <div className={styles["actions"]}>
                    <img src={editarIcon} alt="Botão de editar detalhes do produto" />
                    <img src={excluirIcon} alt="Botão de excluir produto da lista" />
                </div>
                <div className={styles["quantidade"]}>
                    <p>Qtd: {quantidade}</p>
                </div>
                <div className={styles["valor"]}>
                    <h3>Valor R$: {valor.toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
};

export default CardPedido;
