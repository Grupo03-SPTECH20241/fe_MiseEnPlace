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

    let massaResponse = {};
    let coberturaResponse = {};
    let recheioResponse = {};

    const getMassa = async (event) => {
        api.get('/massas', { }).then((response) => {
            massaResponse = response.data;
        }).catch((error) => {
            console.log(error, "error")
        })
    }

    const getCobertura = async (event) => {
        api.get('/coberturas', { }).then((response) => {
            coberturaResponse = response.data;    
        }).catch((error) => {
            console.log(error, "error")
        })
    }

    const getRecheio = async (event) => {
        api.get('/recheios', { }).then((response) => {
            recheioResponse = response.data;
        }).catch((error) => {
            console.log(error, "error")
        })
    }

    const cadastrarMassa = async (event) => {
        api.post('/massas', { }).then((response) => {
        }).catch((error) => {
            console.log(error, "error")
        })
    }

    const cadastrarCobertura = async (event) => {
        api.post('/coberturas', { }).then((response) => {
        }).catch((error) => {
            console.log(error, "error")
        })
    }

    const cadastrarRecheio = async (event) => {
        api.post('/recheios', { }).then((response) => {
        }).catch((error) => {
            console.log(error, "error")
        })
    }

    const cadastramento = async (event) => {
        event.preventDefault();

        api.post('/produtos', { 
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

        }).then((response) => {
            toast.success('Produto cadastrado com sucesso!', { theme: "colored" })
        }).catch((error) => {
            console.log(error, "error")
        })

        api.post("/")
    }

    getMassa();
    getCobertura();
    getRecheio();

    const mySelectOptions = [
        { label: "Opcao1", value: 1 },
        { label: "Opcao2", value: 2 },
        { label: "Opcao3", value: 3 }
    ];
    
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
                                onChange={e => setNome(e.target.value)}>
                            </Input>
                            <InputMaskCustom
                                label='Preço:'
                                placeholder='R$'
                                id='precoInput'
                                width='100%'
                                fieldWidth="23%"
                                mask="R$ 999999999"
                                maskChar={null}
                                onChange={setPreco}>
                            </InputMaskCustom>
                            <Input
                                label='Unidade de medida:'
                                placeholder='Selecione a medida'
                                fieldWidth="23%"
                                width='100%'
                                onChange={e => setUnidadeMedida(e.target.value)}
                                availableSelect={true}
                                selectOptions={mySelectOptions}
                                >
                            </Input>
                        </div>
                        <div className={styles["inputsContainerLine2"]}>
                            <Input
                                label='Massa:'
                                placeholder='Insira o tipo de massa'
                                fieldWidth="48%"
                                width='100%'
                                onChange={e => setMassa(e.target.value)}>
                            </Input>
                            <Input
                                label='Cobertura:'
                                placeholder='Insira o tipo de cobertura'
                                fieldWidth="48%"
                                width='100%'
                                onChange={e => setCobertura(e.target.value)}>
                            </Input>
                        </div>
                        <div className={styles["inputsContainerLine3"]}>
                            <Input
                                label='Recheio:'
                                placeholder='Selecione um recheio'
                                fieldWidth="48%"
                                width='100%'
                                onChange={e => setRecheio(e.target.value)}>
                            </Input>
                            <InputMaskCustom
                                label='Preço do recheio:'
                                placeholder='R$'
                                id='precoCoberturaInput'
                                width='100%'
                                fieldWidth="48%"
                                mask="R$ 999999999"
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
                                onChange={e => setTipoProduto(e.target.value)}>
                            </Input>
                        </div>
                        <div className={styles["inputsContainerLine5"]}>
                            <Button
                                onClick={cadastramento}
                                label='Cadstrar produto'
                                icon='plus'
                                iconPosition='left'
                                width='25%'
                                >
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdutoCadastro;