import React from "react";
import styles from "./CardProduct.module.css";
import capaImg from "../../utils/img/Bolo-coco-1.png";
import editarImg from "../../utils/img/editar.png";
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link> 


const CardProduto = ({
    descricao, nomeBolo, imagemSrc,valor
}) => {
    return (

        <div className={styles["card-musica"]}>
            <div className={styles["imagem-container"]}>
                <img src={imagemSrc ? imagemSrc : capaImg} alt="Imagem"
                    className={styles["imagem"]} />
            </div>
            <div className={styles["textos"]}>
                <h1>{nomeBolo || "Bolo de coco"} <img src={editarImg} alt="" className={styles["editarImg"]}/></h1>
                <p>{descricao || "Bolo gelado de coco, com pedaços de coco"} </p>
                
            </div>
            <div className={styles["valor"]}>
                <p>valor: R${valor.toFixed(2) || 99.99}</p>
                
            </div>
            </div>
        
    );
};
export default CardProduto;