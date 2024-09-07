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
    // Navegação & recuperação de dados do carrinho
    const navigate = useNavigate();  
    const location = useLocation();  
    const [idProdutos, setIdProdutos] = useState( location.state?.idProdutos || []);
    
    const irParaTelaDestino = () => {  
        const novoArray = idProdutos;  
        navigate('/carrinho', { state: { idProdutos: novoArray } });  
    };  

    const retornarParaAgenda = () => {
        navigate(location.pathname, { state: null });
        setIdProdutos([]);
        // navigate('/agenda');
    }

    const [cardsData, setCardsData] = useState();
    const [filteredCardsData, setFilteredCardsData] = useState();
    const [value, setValue] = useState();

    useEffect(() => {
        fetchDataDrop();
        fetchData();
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

    const filtragem = () => {
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
                        icon='cancel'
                        iconPosition='left'
                        label='Cancelar'
                        onClick={retornarParaAgenda}
                    ></ButtonOutlinedNegative>
                    </div>
                    <div className={styles["containerInputs"]}>
                        <InputSearch
                            id='input'
                            onKeyUp={filtragem}
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
                <div className={styles["carrinho-container"]}>
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