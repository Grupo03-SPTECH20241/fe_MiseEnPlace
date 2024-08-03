import React from "react";
import styles from "./CardProduct.module.css";
import capaImg from "../../utils/img/Bolo-coco-1.png";
import editarImg from "../../utils/img/editar.png";
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link> 


const CardMusica = ({
    genero, artista, nomeMusica, anoLancamento, imagemSrc,
}) => {
    return (
        <div className={styles["card-musica"]}>
            <div className={styles["imagem-container"]}>
                <img src={imagemSrc ? imagemSrc : capaImg} alt="Imagem"
                    className={styles["imagem"]} />
            </div>
            <div className={styles["textos"]}>
                <h1>{nomeMusica || "Bolo de coco"} <img src={editarImg} alt="" className={styles["editarImg"]}/></h1>
                <p>{artista || "Bolo gelado de coco, com pedaços de coco"} </p>
                
            </div>
            <div className={styles["valor"]}>
                <p>valor: R$99.99</p>
                
            </div>
            </div>
        
    );
};
export default CardMusica;