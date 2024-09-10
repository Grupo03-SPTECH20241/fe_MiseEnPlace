import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './produtoEditar.module.css';
import CameraIcon from "../../utils/img/icons/camera.png"
import Input from "../../components/Input/Text/text"
import InputMaskCustom from "../../components/Input/InputMask/inputMaskCustom"
import Button from "../../components/Button/Default/default";
import { useNavigate, useLocation } from "react-router-dom";

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link>

const ProdutoEditar = () => {
    // navegação
    const navigate = useNavigate();
    const location = useLocation();
    
    const [produto, setProduto] = useState( location.state?.produto || []);

    const mostrarProduto = () => {
        console.log(produto);
    }

    return (
        mostrarProduto(),
        <div className={styles["mainContainer"]}>
            <Sidebar />
            <div className={styles["innerContainer"]}>
                <div className={styles["produtoBreadcrumbsContainer"]}>
                    <Breadcrumb />
                </div>
                <div className={styles["produtoEditarTittleCard"]}>
                    <h2>Editar produto</h2>
                    <p>Informe as novas alterações do produto e mantenha sua lista atualizada.</p>
                </div>

                <div className={styles["produtoEditarMainContainer"]}>
                    <div className={styles["imageContainer"]}>
                        <div className={styles["produtoEditarImage"]}>
                            <img src={CameraIcon} />
                        </div>
                    </div>
                    <div className={styles["inputsContainer"]}>
                        <div className={styles["inputsContainerLine1"]}>
                            <Input
                                defaultValue={produto.nome}
                                label="Nome do produto:"  
                                placeholder='Insira o nome do produto'
                                fieldWidth="65%"
                                width='100%'>

                            </Input>
                            <InputMaskCustom
                                defaultValue={produto.preco}
                                label='Preço:'
                                placeholder='R$'
                                id='precoInput'
                                width='100%'
                                fieldWidth="30%"
                                mask="R$ 999999999"
                                maskChar={null}>
                            </InputMaskCustom>
                        </div>
                        <div className={styles["inputsContainerLine2"]}>
                            <Input
                                defaultValue={produto.massa.nome}  
                                label='Massa:'
                                placeholder='Insira o tipo de massa'
                                fieldWidth="48%"
                                width='100%'>
                            </Input>
                            <Input
                                defaultValue={produto.cobertura.nome}
                                label='Cobertura:'
                                placeholder='Insira o tipo de cobertura'
                                fieldWidth="48%"
                                width='100%'>
                            </Input>
                        </div>
                        <div className={styles["inputsContainerLine3"]}>
                            <Input
                                defaultValue={produto.recheio.nome}
                                label='Recheio:'
                                placeholder='Selecione um recheio'
                                fieldWidth="48%"
                                width='100%'>
                            </Input>
                            <InputMaskCustom
                                defaultValue={produto.recheio.preco}
                                label='Preço do recheio:'
                                placeholder='R$'
                                id='precoCoberturaInput'
                                width='100%'
                                fieldWidth="48%"
                                mask="R$ 999999999"
                                maskChar={null}>
                            </InputMaskCustom>
                        </div>
                        <div className={styles["inputsContainerLine4"]}>
                            <Input
                                defaultValue={produto.descricao}
                                label='Descrição:'
                                placeholder='Insira a descrição do novo produto'
                                fieldWidth="100%"
                                width='100%'>
                            </Input>
                        </div>
                        <div className={styles["inputsContainerLine5"]}>
                            <Button
                                label='Salvar alterações'
                                icon='check'
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

export default ProdutoEditar;
