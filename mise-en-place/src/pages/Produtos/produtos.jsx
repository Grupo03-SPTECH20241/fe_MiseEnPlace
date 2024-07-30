import React from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import styles from './produto.module.css';
import Button from '../../components/Button/Product/product';
import InputSearch from '../../components/Input/SearchProduct/searchProduct';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link> 

const Produtos = () => {
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
                    <Button></Button>
                    <InputSearch></InputSearch>
                </div>
            </div>
        </div>
    );
};

export default Produtos;