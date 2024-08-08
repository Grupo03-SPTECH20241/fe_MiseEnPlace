import React from 'react';
import styles from './componentstories.module.css';

import ButtonOutlinedNegative from '../Button/Cancelar-variant/cancelarv'
import ButtonFilledNegative from '../Button/Cancelar/cancelar';
import ButtonFilledDefault from '../Button/Default/default';
import ButtonFilledDefaultVariant from '../Button/Default-variant/defaultv';
import ButtonFilledDisabled from '../Button/Disabled/disabled';

const Stories = () => {
    const teste = () => {  
        alert('Botão clicado!');  
    };
  return (
    <>
    <div className={styles['component-stories-container']}>
        <h2>ButtonOutlinedNegative</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Botão sem ícone & fonte grande</h5>
                <ButtonOutlinedNegative
                    showIcon='false'
                    fontSize='large'
                    onClick={teste}
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonOutlinedNegative
                    showIcon='true'
                    onClick={teste}
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonOutlinedNegative
                    showIcon='true'
                    iconPosition='left'
                    onClick={teste}
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonOutlinedNegative
                    showIcon='true'
                    iconPosition='right'
                    onClick={teste}
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonOutlinedNegative
                    showIcon='true'
                    icon='settings'
                    onClick={teste}
                ></ButtonOutlinedNegative>
            </div>
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonOutlinedNegative
                    showIcon='true'
                    fontSize='small'
                    onClick={teste}
                ></ButtonOutlinedNegative>
            </div>
        </div>
        <h2>ButtonFilledNegative</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Botão sem ícone & fonte grande</h5>
                <ButtonFilledNegative
                    showIcon='false'
                    fontSize='large'
                    onClick={teste}
                    width='800px'
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledNegative
                    showIcon='true'
                    onClick={teste}
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledNegative
                    showIcon='true'
                    iconPosition='left'
                    onClick={teste}
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledNegative
                    showIcon='true'
                    iconPosition='right'
                    onClick={teste}
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledNegative
                    showIcon='true'
                    icon='settings'
                    onClick={teste}
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledNegative
                    showIcon='true'
                    fontSize='small'
                    onClick={teste}
                ></ButtonFilledNegative>
            </div>
        </div>
        <h2>ButtonFilledDefault</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Botão sem ícone & fonte grande</h5>
                <ButtonFilledDefault
                    showIcon='false'
                    fontSize='large'
                    onClick={teste}
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledDefault
                    showIcon='true'
                    onClick={teste}
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledDefault
                    showIcon='true'
                    iconPosition='left'
                    onClick={teste}
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledDefault
                    showIcon='true'
                    iconPosition='right'
                    onClick={teste}
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledDefault
                    showIcon='true'
                    icon='settings'
                    onClick={teste}
                ></ButtonFilledDefault>
            </div>
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledDefault
                    showIcon='true'
                    fontSize='small'
                    onClick={teste}
                ></ButtonFilledDefault>
            </div>
        </div>
        <h2>ButtonFilledDefaultVariant</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Botão sem ícone & fonte grande</h5>
                <ButtonFilledDefaultVariant
                    showIcon='false'
                    fontSize='large'
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledDefaultVariant
                    showIcon='true'
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledDefaultVariant
                    showIcon='true'
                    iconPosition='left'
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledDefaultVariant
                    showIcon='true'
                    iconPosition='right'
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledDefaultVariant
                    showIcon='true'
                    icon='settings'
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledDefaultVariant
                    showIcon='true'
                    fontSize='small'
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>
        </div>
        <h2>ButtonFilledDisabled</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Botão sem ícone & fonte grande</h5>
                <ButtonFilledDisabled
                    showIcon='false'
                    fontSize='large'
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledDisabled
                    showIcon='true'
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledDisabled
                    showIcon='true'
                    iconPosition='left'
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledDisabled
                    showIcon='true'
                    iconPosition='right'
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledDisabled
                    showIcon='true'
                    icon='settings'
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledDisabled
                    showIcon='true'
                    fontSize='small'
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>
        </div>
    </div>
    </>
  );
};

export default Stories;