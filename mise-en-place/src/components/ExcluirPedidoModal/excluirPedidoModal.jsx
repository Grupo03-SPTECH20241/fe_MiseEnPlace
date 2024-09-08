import styles from './excluirPedidoModal.module.css'
import React, { useEffect } from 'react';
import exitIcon from '../../utils/img/exit_icon.png';
import ButtonFilledDefault from '../Button/Default/default';
import ButtonFilledNegative from '../Button/Cancelar/cancelar';
import PropTypes from 'prop-types';  
import WarningImage from '../../utils/img/circle-exclamation-solid.png'

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link> 

const ExcluirPedidoModal = ({ pedido, closeModal, onConfirm }) => {
    useEffect(() => {
        try {
            console.log(pedido);
        } catch (e){
            console.log(e);
        }
    }, []);

    return (
        <div className={styles["excluirPedidoModal"]}>
            <div className={styles["excluirPedidoModalHeader"]}>
                <span className={styles["modalTitle"]}>Excluir Pedido</span>
                <img
                    src={exitIcon}
                    onClick={closeModal}
                    className={styles["exitButton"]}
                />
            </div>
            <hr />
            <div className={styles["excluirPedidoModalContentContainer"]}>
                <div className={styles["excluirPedidoModalContentContainer"]}>
                    <div className={styles["imageContainer"]}>
                        <img src={WarningImage} alt="alerta" />
                    </div>
                    <h2>Excluir Pedido #{pedido?.idPedido}</h2>
                    <span>Você tem certeza que deseja excluir o pedido {pedido?.idPedido}?</span>
                    <span>Essa ação não pode ser desfeita.</span>
                </div>
            </div>
            <div className={styles["excluirPedidoModalFooter"]}>
                <div className={styles["excluirPedidoModalLeftContainer"]}>
                    <ButtonFilledNegative
                        label='cancelar'
                        icon='cancel'
                        iconPosition='left'
                        onClick={closeModal}
                    ></ButtonFilledNegative>
                </div>
                <div className={styles["excluirPedidoModalRightContainer"]}>
                    <ButtonFilledDefault
                        label='Excluir'
                        icon='delete'
                        iconPosition='left'
                        onClick={onConfirm}
                    ></ButtonFilledDefault>
                </div>
            </div>
        </div>
    );
};

ExcluirPedidoModal.propTypes = {  
    closeModal: PropTypes.any,
    pedido: PropTypes.object,
    onConfirm: PropTypes.func
};  

export default ExcluirPedidoModal;