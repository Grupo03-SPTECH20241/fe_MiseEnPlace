import React from 'react';
import Button from '../Button/Cancelar-variant/cancelarv'
import styles from './componentstories.module.css';

const Stories = () => {
  return (
    <>
    <div className={styles['component-stories-container']}>
        <h2>Botão sem ícone</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Botão sem ícone</h5>
                <Button
                    showIcon='false'
                ></Button>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <Button
                    showIcon='true'
                ></Button>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <Button
                    showIcon='true'
                    iconPosition='left'
                ></Button>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <Button
                    showIcon='true'
                    iconPosition='right'
                ></Button>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <Button
                    showIcon='true'
                    icon='settings'
                ></Button>
            </div>
        </div>
    </div>
    </>
  );
};

export default Stories;