import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './produto.module.css';
import Button from '../../components/Button/Product/product';
import InputSearch from '../../components/Input/SearchProduct/searchProduct';
// import InputSearch from '../../components/Input/Search/search';
import InputSelect from '../../components/Input/SelectProduct/selectProduct'
import Filter from '../../components/Filter/filter';
import CardProduct from '../../components/CardProduct/CardProduct';
import api from '../../api';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link>




const Produtos = () => {
    const [cardsData, setCardsData] = useState();
    const [filteredCardsData, setFilteredCardsData] = useState();
    const [value, setValue] = useState();
    useEffect(() => {
        fetchDataDrop();
        fetchData();
        // const tipoProdutoInterval = setInterval(fetchData, 5000);
        // return () => clearInterval(tipoProdutoInterval);
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
            setFilteredCardsData(response.data);
        }).catch((error) => {
            console.error(error);
        });
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
                <div className={styles["produtoTittleCard"]}>
                    <h2>Produtos</h2>
                    <p> Lista de todos os produtos, Dropdown cadastrados no sistema</p>
                </div>
                <div className={styles["innerContainerSearch"]}>
                    <Button></Button>
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

                    {
                        filteredCardsData && filteredCardsData.map((data, index) => (
                            <CardProduct
                                key={index}
                                descricao={data.descricao}
                                nomeBolo={data.nome}
                                imagemSrc={data.imagemSrc}
                                valor={data.preco}
                            ></CardProduct>
                        ))



                    }

                    

                </div>



            </div>
        </div>
    );
};

export default Produtos;