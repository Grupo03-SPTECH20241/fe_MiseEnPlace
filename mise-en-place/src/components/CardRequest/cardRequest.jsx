import React from "react";
import styles from "./cardRequest.module.css";
import fotoDefault from "../../utils/img/Bolo-coco-1.png";
import editarIcon from "../../utils/img/editar.png"
import excluirIcon from "../../utils/img/editar.png"

const CardPedido = ({
    imagemSrc, nomeProduto, descricao, quantidade, valor
}) => {
    return (
        <div className={styles["card-pedido"]}>
            <div className={styles["imagem-pedido"]}>
                <img src={imagemSrc ? imagemSrc : fotoDefault} alt="Foto do bolo" />
            </div>
            <div className={styles=["textos"]}>
                <h3>{nomeProduto || "Bolo de coco"}</h3>
                <p>
                    {descricao || "2kg, Bolo de ninho com morango, Decoração com beijinhos"}
                </p>
            </div>
            <div className={styles["importantes"]}>
                <div className={styles["actions"]}>
                    <img src={editarIcon} alt="Botão de editar detalhes do produto" />
                    <img src={excluirIcon} alt="Botão de excluir produto da lista" />
                </div>
                <div className={styles["quantidade"]}>
                    <p>{quantidade}</p>
                </div>
                <div className={styles["valor"]}>
                    <h3>Valor R$: {valor.toFixed(2) || "23.07"}</h3>
                </div>
            </div>
        </div>
    )
}

export default CardPedido;