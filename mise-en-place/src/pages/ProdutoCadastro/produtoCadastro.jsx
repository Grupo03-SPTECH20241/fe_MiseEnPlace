import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import BreadcrumbProdutoCadastro from '../../components/Texts/Breadcrumbs/BreadCrumbsProdutosCadastro';
import styles from './produtoCadastro.module.css';
import CameraIcon from "../../utils/img/icons/camera.png"
import Input from "../../components/Input/Text/text"
import InputMaskCustom from "../../components/Input/InputMask/inputMaskCustom"
import Button from "../../components/Button/Default/default"
import api from "../../api"
import { toast, ToastContainer } from 'react-toastify';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link>

const ProdutoCadastro = () => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [foto, setFoto] = useState('')
    const [massa, setMassa] = useState('');
    const [cobertura, setCobertura] = useState('');
    const [recheio, setRecheio] = useState('');
    const [precoRecheio, setPrecoRecheio] = useState('');
    const [unidadeMedidaId, setUnidadeMedida] = useState('');
    const [tipoProdutoId, setTipoProduto] = useState('');

    const [unidadeMedidaOptions, setUnidadeMedidaOptions] = useState([]);
    const [massaOptions, setMassaOptions] = useState([]);
    const [coberturaOptions, setCoberturaOptions] = useState([]);
    const [recheioOptions, setRecheioOptions] = useState([]);
    const [tipoProdutoOptions, setTipoProdutoOptions] = useState([]);

    useEffect(() => {
        getUnidadeMedida();
        getMassa();
        getCobertura();
        getRecheio();
        getTipoProduto();
    }, []);

    const getUnidadeMedida = async () => {
        try {
            const response = await api.get('/unidades-medida');
            const options = response.data.map(element => ({
                label: element.unidadeMedida,
                value: element.idUnidadeMedida,
            }));
            setUnidadeMedidaOptions(options);
        } catch (error) {
            console.log(error);
        }
    };

    const getMassa = async () => {
        try {
            const response = await api.get('/massas');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.idMassa,
            }));
            setMassaOptions(options);
        } catch (error) {
            console.log(error);
        }
    };

    const getCobertura = async () => {
        try {
            const response = await api.get('/coberturas');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.idCobertura,
            }));
            setCoberturaOptions(options);
        } catch (error) {
            console.log(error);
        }
    };

    const getRecheio = async () => {
        try {
            const response = await api.get('/recheios');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.idRecheio,
            }));
            setRecheioOptions(options);
        } catch (error) {
            console.log(error);
        }
    };

    const getTipoProduto = async () => {
        try {
            const response = await api.get('/tipo-produtos');
            const options = response.data.map(element => ({
                label: element.nome,
                value: element.id,
            }));
            setTipoProdutoOptions(options);
        } catch (error) {
            console.log(error);
        }
    };

    const cadastramento = async (event) => {
        event.preventDefault();
        console.log(recheio)
        console.log(nome)

        try {
            await api.post('/produtos', { 
                "nome": nome,
                "preco": preco,
                "descricao": descricao,
                "foto": foto,
                "qtdDisponivel": 1,
                "recheioId": recheio,
                "massaId": massa,
                "coberturaId": cobertura,
                "unidadeMedidaId": unidadeMedidaId,
                "tipoProdutoId": tipoProdutoId
            });

            toast.success('Produto cadastrado com sucesso!', { theme: "colored" });
        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar o produto!', { theme: "colored" });
        }
    };

    return (
        <div className={styles["mainContainer"]}>
            <ToastContainer />
            <Sidebar />
            <div className={styles["innerContainer"]}>
                <div className={styles["produtoBreadcrumbsContainer"]}>
                    <BreadcrumbProdutoCadastro />
                </div>
                <div className={styles["produtoCadastroTittleCard"]}>
                    <h2>Cadastrar produto</h2>
                    <p>Cadastre um novo produtinho para os seus clientes.</p>
                </div>

                <div className={styles["produtoCadastroMainContainer"]}>
                    <div className={styles["imageContainer"]}>
                        <div className={styles["produtoCadastroImage"]}>
                            <img src={CameraIcon} />
                        </div>
                    </div>
                    <div className={styles["inputsContainer"]}>
                        <div className={styles["inputsContainerLine1"]}>
                            <Input
                                label='Nome do produto:'
                                placeholder='Insira o nome do produto'
                                fieldWidth="48%"
                                width='100%'
                                onChange={setNome}>
                            </Input>
                            <InputMaskCustom
                                label='Preço:'
                                id='precoInput'
                                width='100%'
                                fieldWidth="23%"
                                mask="999999999"
                                maskChar={null}
                                onChange={setPreco}>
                            </InputMaskCustom>
                            <Input
                                label='Unidade de medida:'
                                placeholder='Selecione a medida'
                                fieldWidth="23%"
                                width='100%'
                                onChange={e => setUnidadeMedida(e.target.key)}
                                availableSelect={true}
                                selectOptions={unidadeMedidaOptions}>
                            </Input>
                        </div>
                        <div className={styles["inputsContainerLine2"]}>
                            <Input
                                label='Massa:'
                                placeholder='Insira o tipo de massa'
                                fieldWidth="48%"
                                width='100%'
                                onChange={e => setMassa(e.target.key)}
                                availableSelect={true}
                                selectOptions={massaOptions}>
                            </Input>
                            <Input
                                label='Cobertura:'
                                placeholder='Insira o tipo de cobertura'
                                fieldWidth="48%"
                                width='100%'
                                onChange={e => setCobertura(e.target.key)}
                                availableSelect={true}
                                selectOptions={coberturaOptions}>
                            </Input>
                        </div>
                        <div className={styles["inputsContainerLine3"]}>
                            <Input
                                label='Recheio:'
                                placeholder='Selecione um recheio'
                                fieldWidth="48%"
                                width='100%'
                                onChange={setRecheio}
                                availableSelect={true}
                                selectOptions={recheioOptions}>
                            </Input>
                            <InputMaskCustom
                                label='Preço do recheio:'
                                id='precoCoberturaInput'
                                width='100%'
                                fieldWidth="48%"
                                mask="999999999"
                                maskChar={null}
                                onChange={setPrecoRecheio}>
                            </InputMaskCustom>
                        </div>
                        <div className={styles["inputsContainerLine4"]}>
                            <Input
                                label='Descrição:'
                                placeholder='Insira a descrição do novo produto'
                                fieldWidth="65%"
                                width='100%'
                                onChange={e => setDescricao(e.target.value)}>
                            </Input>
                            <Input
                                label='Tipo de produto:'
                                placeholder='Selecione o tipo'
                                fieldWidth="31%"
                                width='100%'
                                onChange={e => setTipoProduto(e.target.key)}
                                availableSelect={true}
                                selectOptions={tipoProdutoOptions}>
                            </Input>
                        </div>
                        <div className={styles["inputsContainerLine5"]}>
                            <Button
                                onClick={cadastramento}
                                label='Cadastrar produto'
                                icon='plus'
                                iconPosition='left'
                                width='25%'>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdutoCadastro;
