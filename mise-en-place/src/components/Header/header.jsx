import React from 'react';
import styles from './header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles['header-content']}>
                <div className={styles['header-logo']}>
                    <h1>Jessica Bolos</h1>
                </div>
                <div className={styles['header-navigation']}>
                        <a href="#">Novidades</a>
                        <a href="#">Mais vendidos</a>
                        <a href="#">Avaliações</a>
                        <a href="#">Sobre nós</a>
                        <a href="#">Catálogo</a>
                </div>
            </div>
        </div>
    );
};

export default Header;