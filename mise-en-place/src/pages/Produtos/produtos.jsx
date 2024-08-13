import React, {useState, useEffect}  from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './produto.module.css';
import ButtonFilledDefault from '../../components/Button/Default/default';
import InputSearch from '../../components/Input/Search/search';
import InputSelect from '../../components/Input/Select/select';
import CardProduct from '../../components/CardProduct/CardProduct';
import api from '../../api';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link> 

const Produtos = () => {
    const [cardsData, setCardsData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/produtos');
                const { data } = response;
                setCardsData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        const tipoProdutoInterval = setInterval(fetchData, 5000);
        return () => clearInterval(tipoProdutoInterval);
    }, []);

    
    return (
        <div className={styles["mainContainer"]}>
            <Sidebar />
            <div className={styles["innerContainer"]}>
                <div className={styles["produtoBreadcrumbsContainer"]}>
                    <Breadcrumb></Breadcrumb>
                </div>
                <div className={styles["produtoTittleCard"]}>
                    <h2>Produtos</h2>
                    <p> Lista de todos os produtos cadastrados no sistema</p>
                </div>
                <div className={styles["innerContainerSearch"]}>
                    <ButtonFilledDefault
                        label='Cadastrar novo produto'
                        iconPosition='left'
                        width='300px'
                    ></ButtonFilledDefault>
                    <div className={styles["containerInputs"]}>
                        <InputSearch></InputSearch>    
                        <InputSelect></InputSelect>

                    </div>
                </div>
                
                
                <div className= {styles["content-musicas"]}>

                {cardsData && cardsData.map((data, index) => (
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