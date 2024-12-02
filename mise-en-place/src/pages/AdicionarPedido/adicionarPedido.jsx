import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './adicionarPedido.module.css';
import ButtonOutlinedNegative from '../../components/Button/Cancelar-variant/cancelarv';
import ButtonFilledDefault from '../../components/Button/Default/default';
import InputSearch from '../../components/Input/SearchProduct/searchProduct';
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal"
import AdicionarPedidoModal from '../../components/AdicionarPedidoModal/adicionarPedidoModal';
import Filter from '../../components/Filter/filter';
import CardProduct from '../../components/CardProduct/CardProduct';
import api from '../../api';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link>

const AdicionarPedido = () => {
    // Modal de adição do produto
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);

    const openModal = (data) => {
        setModalProduct(data);
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    // Navegação & recuperação de dados do carrinho
    const navigate = useNavigate();  
    const location = useLocation();  
    const [produtos, setProdutos] = useState( location.state?.produtos || []);
    const [produtoPedidoCriacaoDtos, setProdutoPedidoCriacaoDto] = useState( location.state?.produtoPedidoCriacaoDtos || [] );
    
    const irParaTelaDestino = () => {  
        const arrayProdutos = produtos;  
        const arrayProdutoPedidoCriacaoDtos = produtoPedidoCriacaoDtos;
        navigate('/carrinho', { state: { produtos: arrayProdutos, produtoPedidoCriacaoDtos: arrayProdutoPedidoCriacaoDtos } });  
    };  

    const retornarParaAgenda = () => {
        navigate(location.pathname, { state: null });
        setProdutos([]);
        navigate('/agenda');
    }

    const [cardsData, setCardsData] = useState();
    const [filteredCardsData, setFilteredCardsData] = useState();
    const [value, setValue] = useState();

    useEffect(() => {
        fetchDataDrop();
        fetchData();
    }, []);

    const fetchDataDrop = () => {
        api.get('/java-api/tipo-produtos').then((response) => {
            response.data.unshift({ nome: 'Todos' });
            setValue(response.data.map((item) => item.nome));
        }).catch((error) => {
            console.error(error);
        });
    }

    const fetchData = () => {
        api.get('/java-api/produtos').then((response) => {
            setCardsData(response.data);
            setFilteredCardsData(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleSelecionarProduto = (produtoPedidoCriacaoDto, produto) => {  
        setProdutoPedidoCriacaoDto(prev => [...prev, produtoPedidoCriacaoDto]);
        setProdutos(prev => [...prev, produto]);
    };

    const handleChange = (value) => {
        if (value === 'Todos') {
            setFilteredCardsData(cardsData);
        } else {
            api.get(`/java-api/produtos/filtrar-tipo/${value}`).then((response) => {
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
                            imagemSrc={data.foto}
                            valor={data.preco}
                            isSelectable={true}
                            onSelect={()=>{openModal(data)}}
                            produto={data}
                        ></CardProduct>
                    ))}
                </div>
                <div className={styles["carrinho-container"]}>
                    <ButtonFilledDefault
                        label='Ver carrinho'
                        onClick={irParaTelaDestino}
                        iconPosition='left'
                        icon='shopping-cart'
                    ></ButtonFilledDefault>
                </div>
            </div>

            <Modal className={styles["adicionarPedidoModalStyle"]} isOpen={modalIsOpen}>
                <AdicionarPedidoModal
                    produto={modalProduct}
                    closeModal={closeModal}
                    onConfirm={handleSelecionarProduto}
                ></AdicionarPedidoModal>
            </Modal>
        </div>
    );
};

export default AdicionarPedido;