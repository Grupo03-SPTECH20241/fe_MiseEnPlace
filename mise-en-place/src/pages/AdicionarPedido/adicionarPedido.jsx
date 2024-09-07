import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './adicionarPedido.module.css';
import ButtonOutlinedNegative from '../../components/Button/Cancelar-variant/cancelarv';
import ButtonFilledDefault from '../../components/Button/Default/default';
import InputSearch from '../../components/Input/SearchProduct/searchProduct';
import { useNavigate, useLocation } from "react-router-dom";


import Filter from '../../components/Filter/filter';
import CardProduct from '../../components/CardProduct/CardProduct';
import api from '../../api';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link>




const AdicionarPedido = () => {
    const navigate = useNavigate();  
    const location = useLocation();  
    const [idProdutos, setIdProdutos] = useState( location.state?.idProdutos || []);

    const irParaTelaDestino = () => {  
        const novoArray = idProdutos;  
        navigate('/carrinho', { state: { idProdutos: novoArray } });  
    };  

    const [cardsData, setCardsData] = useState();
    const [filteredCardsData, setFilteredCardsData] = useState();
    const [value, setValue] = useState();

    useEffect(() => {
        fetchDataDrop();
        fetchData();
        console.log("lista de produtos no pedido:")
        console.log(idProdutos)
    }, []);

    const fetchDataDrop = () => {
        api.get('/tipo-produtos').then((response) => {
            response.data.unshift({ nome: 'Todos' });
            setValue(response.data.map((item) => item.nome));
        }).catch((error) => {
            console.error(error);
        });
    }

    const fetchData = () => {
        api.get('/produtos').then((response) => {
            setCardsData(response.data);
            setFilteredCardsData(response.data)
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    // Adiciona o id dos produtos para o array de id's
    const handleSelecionarProduto = (id) => {
        let vetorAuxiliar = idProdutos ? idProdutos : [];
        vetorAuxiliar.push(id);
        setIdProdutos(vetorAuxiliar);
    }

    const handleChange = (value) => {
        if (value === 'Todos') {
            setFilteredCardsData(cardsData);
        } else {
            api.get(`/produtos/filtrar-tipo/${value}`).then((response) => {
                setValue(response.data.map((item) => item.nome));
                setFilteredCardsData(response.data);
                fetchDataDrop()
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    const teste = () => {
        const element = document.getElementById('input');
        const searchValue = element.value.toLowerCase();
        const newCardsData = cardsData.filter((data) => data.nome.toLowerCase().includes(searchValue));
        setFilteredCardsData(newCardsData);
        console.log(element.value);
    }

    return (
        <div className={styles["mainContainer"]}>
            <Sidebar />    
            <div className={styles["innerContainer"]}>
                <div className={styles["produtoBreadcrumbsContainer"]}>
                    <Breadcrumb></Breadcrumb>
                </div>
                <div className={styles["containerTittleCard"]}>
                        <div className={styles["dashboardTittleCard"]}>
                            <h2>Produtos</h2>
                            <p>Selecione os produtos solicitados</p>
                        </div>
                    </div>
                <div className={styles["innerContainerSearch"]}>
                    <div className={styles["containerButton"]}>
                    <ButtonOutlinedNegative
                        showIcon={false}
                        label='Cancelar'
                    ></ButtonOutlinedNegative>
                    </div>
                    <div className={styles["containerInputs"]}>
                        <InputSearch
                            id='input'
                            onKeyUp={teste}
                        ></InputSearch>

                        <Filter options={value ? value : ['']} 
                            onChange={handleChange}
                        ></Filter>
                    </div>
                </div>
               <div className={styles["content-musicas"]}>
                    {filteredCardsData && filteredCardsData.map((data, index) => (
                        <CardProduct
                            key={index}
                            descricao={data.descricao}
                            nomeBolo={data.nome}
                            imagemSrc={data.imagemSrc}
                            valor={data.preco}
                            isSelectable={true}
                            onSelect={()=>{handleSelecionarProduto(data.id)}}
                        ></CardProduct>
                    ))}
                </div>
                <div className={styles["teste"]}>
                    <ButtonFilledDefault
                        label='Ver carrinho'
                        onClick={irParaTelaDestino}
                        showIcon={false}
                    ></ButtonFilledDefault>
                </div>
            </div>
        </div>
    );
};

export default AdicionarPedido;

/*
const TelaOrigem = () => {  
    const navigate = useNavigate();  
    const meuArray = [1, 2, 3, 4, 5];  

    const irParaTelaDestino = () => {  
        navigate('/tela-destino', { state: { meuArray } });  
    };  

    return (  
        <div>  
            <h1>Tela de Origem</h1>  
            <button onClick={irParaTelaDestino}>Ir para Tela Destino</button>  
        </div>  
    );  
};  
*/