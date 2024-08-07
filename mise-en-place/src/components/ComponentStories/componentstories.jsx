import React from 'react';
import ButtonOutlinedNegative from '../Button/Cancelar-variant/cancelarv'
import ButtonFilledNegative from '../Button/Cancelar/cancelar';
import styles from './componentstories.module.css';

const Stories = () => {
  return (
    <>
    <div className={styles['component-stories-container']}>
        <h2>ButtonOutlinedNegative</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Botão sem ícone</h5>
                <ButtonOutlinedNegative
                    showIcon='false'
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonOutlinedNegative
                    showIcon='true'
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonOutlinedNegative
                    showIcon='true'
                    iconPosition='left'
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonOutlinedNegative
                    showIcon='true'
                    iconPosition='right'
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonOutlinedNegative
                    showIcon='true'
                    icon='settings'
                ></ButtonOutlinedNegative>
            </div>
        </div>
        <h2>ButtonFilledNegative</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Botão sem ícone</h5>
                <ButtonFilledNegative
                    showIcon='false'
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledNegative
                    showIcon='true'
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledNegative
                    showIcon='true'
                    iconPosition='left'
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledNegative
                    showIcon='true'
                    iconPosition='right'
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledNegative
                    showIcon='true'
                    icon='settings'
                ></ButtonFilledNegative>
            </div>
        </div>
    </div>
    </>
  );
};

export default Stories;