import React, {useState, useEffect}  from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './produto.module.css';
import Button from '../../components/Button/Product/product';
import InputSearch from '../../components/Input/SearchProduct/searchProduct';
import InputSelect from '../../components/Input/SelectProduct/selectProduct'
import Filter from '../../components/Filter/filter';
import CardProduct from '../../components/CardProduct/CardProduct';
import api from '../../api';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link> 




const Produtos = () => {
    const [cardsData, setCardsData] = useState();
    const [value, setValue] = useState();
    useEffect(() => {
        fetchDataDrop();
        fetchData();
        // const tipoProdutoInterval = setInterval(fetchData, 5000);
        // return () => clearInterval(tipoProdutoInterval);
    }, []);

    const fetchDataDrop = () => {
        api.get('/tipo-produtos').then((response) => {
            setValue(response.data.map((item) => item.nome));
        }).catch((error) => {
            console.error(error);
        });
    }

    const fetchData = () => {
        api.get('/produtos').then((response) => {
            setCardsData(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleChange = (value) => {
        console.log(value);
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
                        <InputSearch></InputSearch>    

                        <Filter options= {value ? value : ['']}
                            onChange={handleChange}
                        ></Filter> 
                        

                    </div>
                </div>
                
                
                <div className= {styles["content-musicas"]}> 

                {
                cardsData && cardsData.map((data, index) => (
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