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

const AdicionarPedidoModal = ({ produto, qtdProduto, idProdutoPedido, closeModal, onConfirm, isEditing = false }) => {
    // opções dos inputs
    const [recheioOptions, setRecheioOptions] = useState([{id: '', value: ''}]);
    const [massaOptions, setMassaOptions] = useState([{id: '', value: ''}]);
    const [massa, setMassa] = useState(null);
    const [recheio, setRecheio] = useState(null);
    const [quantidade, setQuantidade] = useState(qtdProduto);

    // dados dos produto-pedido selecionado
    const [produtoPedido, setProdutoPedido] = useState([]);
    
    useEffect(() => {
        try {
            if(isEditing)fetchProdutoPedido();
            fetchRecheioOptions();
            fetchMassaOptions();
            
        } catch (e){
            console.log(e);
        }
    }, []);

    // busca produtos-pedidos
    const fetchProdutoPedido = async () => {
        const response = await api.get(`/java-api/produto-pedidos`);
        const data = response?.data;
        setProdutoPedido(data.find((currentData) => currentData?.idProdutoPedido === idProdutoPedido));
    }

    const handleMassaChange = (event) => {
        setMassa(event?.target?.value);
    }

    const handleRecheioChange = (event) => {
        setRecheio(event?.target?.value);
    }

    const handleQuantidadeChange = (event) => {
        setQuantidade(event?.target?.value ? event.target.value : event);
    }

    const adicionarProduto = () => {
        const inputObservacoes = document.getElementById('input-observacoes');
        const produtoPedidoCriacaoDto = {  
            qtProduto: quantidade,  
            observacoes: inputObservacoes?.value,  
            produtoId: produto?.id,  
            personalizacaoId: null,  
            pedidoId: null,  
        };
        onConfirm(produtoPedidoCriacaoDto, produto);
        closeModal();
    }

    const editarProduto = () => {
        const inputObservacoes = document.getElementById('input-observacoes');
        const produtoPedidoCriacaoDto = {  
            qtProduto: quantidade,  
            observacoes: inputObservacoes?.value,  
            produtoId: produto?.id,  
            personalizacaoId: null,  
            pedidoId: null,  
        };
        onConfirm(produtoPedidoCriacaoDto, produto);
        closeModal();
    }

    const fetchRecheioOptions = async () => {
        const response = await api.get('/java-api/recheios');  
        const { data } = response;
        setRecheioOptions(data.map((value) =>{
            return {
                label: value?.nome,
                value: value?.id
            }
        }))
    }

    const fetchMassaOptions = async () => {
        const response = await api.get('/java-api/massas');  
        const { data } = response;
        setMassaOptions(data.map((value) =>{
            return {
                label: value?.nome,
                value: value?.idMassa
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
                <InputSelect
                    width='30vw'
                    label='Massa:'
                    options={massaOptions}
                    defaultValue={produto?.massa}
                    onChange={handleMassaChange}
                    isDisabled={true}
                ></InputSelect>
                <InputSelect
                    width='30vw'
                    label='Recheio:'
                    options={recheioOptions}
                    isDisabled={true}
                    defaultValue={produto?.recheio}
                    onChange={handleRecheioChange}
                ></InputSelect>
                <InputText
                    width='10vw'
                    label='Quantidade:'
                    numericOnly={true}
                    postiveValuesOnly={true}
                    defaultValue={qtdProduto}
                    onChange={handleQuantidadeChange}
                ></InputText>
            </div>
            <div className={styles["produto-observacoes-container"]}>
                <div className={styles["imagem-container"]}>
                    <p>Foto de referência:</p>
                    <img src={produto?.foto? produto.foto : FotoBolo} alt="imagem do produto" />
                </div>
                <div className={styles["observacao-field-container"]}>
                    <InputTextField
                        id='input-observacoes'
                        width='40vw'
                        defaultValue={produtoPedido?.observacoes}
                        height='100%'
                        label='Observações:'
                    ></InputTextField>
                </div>
            </div>
            <div className={styles["adicionar-pedido-modal-footer"]}>
                <div className={styles["outer-value-container"]}>
                    <div className={styles["value-container"]}>
                        <p>R${produto?.preco ? (produto.preco * (quantidade ? quantidade : 0))  : '-'}</p>
                    </div>
                </div>
                <div className={styles["confirmation-button-container"]}>
                    {!isEditing && (<ButtonFilledDefault  
                        label='Adicionar ao carrinho'  
                        iconPosition='left'  
                        icon='shopping-cart'  
                        width='100%'  
                        onClick={adicionarProduto}
                    ></ButtonFilledDefault>)}  

                    {isEditing && (<ButtonFilledDefault  
                        label='Salvar alterações'  
                        iconPosition='left'  
                        icon='check'  
                        width='100%'  
                        onClick={editarProduto}
                    ></ButtonFilledDefault>)}  
                </div>
            </div>
        </div>
    );
};

AdicionarPedidoModal.propTypes = {  
    closeModal: PropTypes.any,
    produto: PropTypes.object,
    qtdProduto: PropTypes.number,
    idProdutoPedido: PropTypes.number,
    onConfirm: PropTypes.func,
    isEditing: PropTypes.bool,
};  

export default AdicionarPedidoModal;