import styles from './adicionarPedidoModal.module.css'
import React, { useState, useEffect } from 'react';
import exitIcon from '../../utils/img/exit_icon.png';
import FotoBolo from '../../utils/img/produtos/Bolo-coco-1.png';
import ButtonFilledDefault from '../Button/Default/default';
import InputText from '../Input/Text/text';
import InputTextField from '../../components/Input/Text Field/textField';
import InputSelect from '../Input/Select/select';
import PropTypes from 'prop-types';  
import api from "../../api";  

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link> 

const AdicionarPedidoModal = ({ produto, closeModal, onConfirm }) => {
    const [recheioOptions, setRecheioOptions] = useState([{id: '', value: ''}]);

    useEffect(() => {
        try {
            fetchRecheioOptions();
            console.log(produto)
        } catch (e){
            console.log(e);

        }

    }, []);

    const fetchRecheioOptions = async () => {
        const response = await api.get('/recheios');  
        const { data } = response;
        setRecheioOptions(data.map((value) =>{
            return {
                label: value?.nome,
                value: value?.id
            }
        }))
    }
    return (
        <div className={styles["adicionarPedidoModal"]}>
            <div className={styles["adicionarPedidoModalHeader"]}>
                <span className={styles["modalTitle"]}>{produto?.nome ? produto.nome : ''}</span>
                <img
                    src={exitIcon}
                    onClick={closeModal}
                    className={styles["exitButton"]}
                    />
            </div>
            {produto?.nome && (<hr />)}
            <div className={styles["produto-info-container"]}>
                <InputText
                    width='25vw'
                    label='Massa:'
                ></InputText>
                <InputSelect
                    width='20vw'
                    label='Recheio:'
                    options={recheioOptions}
                ></InputSelect>
                <InputText
                    width='10vw'
                    label='Quantidade:'
                ></InputText>
            </div>
            <div className={styles["produto-observacoes-container"]}>
                <div className={styles["imagem-container"]}>
                    <p>Foto de referência:</p>
                    <img src={produto?.imgSrc? produto.imgSrc : FotoBolo} alt="imagem do produto" />
                </div>
                <div className={styles["observacao-field-container"]}>
                    <InputTextField
                        width='35vw'
                        height='20vh'
                        label='Observações:'
                    ></InputTextField>
                </div>
            </div>
            <div className={styles["adicionar-pedido-modal-footer"]}>
                <div className={styles["outer-value-container"]}>
                    <div className={styles["value-container"]}>
                        <p>R${produto?.preco? produto.preco : '-'}</p>
                    </div>
                </div>
                <div className={styles["confirmation-button-container"]}>
                    <ButtonFilledDefault
                        label='Adicionar ao carrinho'
                        iconPosition='left'
                        icon='shopping-cart'
                        width='18vw'
                        onClick={onConfirm}
                    ></ButtonFilledDefault>
                </div>
            </div>
        </div>
    );
};

AdicionarPedidoModal.propTypes = {  
    closeModal: PropTypes.any,
    produto: PropTypes.object,
    onConfirm: PropTypes.func
};  

export default AdicionarPedidoModal;