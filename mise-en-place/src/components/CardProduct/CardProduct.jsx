import React from 'react';
import styles from "./CardProduct.module.css";

import editarImg from "../../utils/img/editar.png";
import PropTypes from 'prop-types';  
import ButtonFilledDefault from "../Button/Default/default";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link> 


const CardProduto = ({
    descricao, nomeBolo, imagemSrc, valor, produto, isSelectable = false, onSelect
}) => {
    const navigate = useNavigate();  
    const location = useLocation();
    const ip = process.env.REACT_APP_LOCALHOST_IP
    console.log(ip, imagemSrc)
    const navigateToEditProduct= () => {
        navigate(`/produto-editar`, { state: { produto: produto } });
    };
    return (
        <div className={styles["card-musica"]}>
            <div className={styles["imagem-container"]} >   
                <img src={ip + imagemSrc} alt="Imagem"
                    className={styles["imagem"]} />
            </div>
            <div className={styles["textos"]}>
                <h1>{nomeBolo || "Bolo de coco"} <img src={editarImg} className={styles["editarImg"]} onClick={navigateToEditProduct}/></h1>
                <p>{descricao || "Bolo gelado de coco, com pedaços de coco"} {imagemSrc}</p>
                
            </div>
            <div className={styles["valor"]}>
                <p>valor: R${valor.toFixed(2) || 99.99}</p>
                
            </div>
            </div>
        
    );
};

CardProduto.propTypes = {  
    descricao: PropTypes.string, 
    nomeBolo: PropTypes.string, 
    imagemSrc: PropTypes.string,
    valor: PropTypes.any, 
    isSelectable: PropTypes.bool,
    produto: PropTypes.object,
    onSelect: PropTypes.func
};  
  
export default CardProduto;