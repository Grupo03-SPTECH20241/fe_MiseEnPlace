import React from 'react';
import styles from './componentstories.module.css';

import ButtonOutlinedNegative from '../Button/Cancelar-variant/cancelarv'
import ButtonFilledNegative from '../Button/Cancelar/cancelar';
import ButtonFilledDefault from '../Button/Default/default';
import ButtonFilledDefaultVariant from '../Button/Default-variant/defaultv';
import ButtonFilledDisabled from '../Button/Disabled/disabled';

const Stories = () => {
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
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonOutlinedNegative
                    showIcon='true'
                    fontSize='small'
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

            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledNegative
                    showIcon='true'
                    fontSize='small'
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
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledDefault
                    showIcon='true'
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledDefault
                    showIcon='true'
                    iconPosition='left'
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledDefault
                    showIcon='true'
                    iconPosition='right'
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledDefault
                    showIcon='true'
                    icon='settings'
                ></ButtonFilledDefault>
            </div>
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledDefault
                    showIcon='true'
                    fontSize='small'
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
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledDefaultVariant
                    showIcon='true'
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledDefaultVariant
                    showIcon='true'
                    iconPosition='left'
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledDefaultVariant
                    showIcon='true'
                    iconPosition='right'
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledDefaultVariant
                    showIcon='true'
                    icon='settings'
                ></ButtonFilledDefaultVariant>
            </div>
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledDefaultVariant
                    showIcon='true'
                    fontSize='small'
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
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledDisabled
                    showIcon='true'
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledDisabled
                    showIcon='true'
                    iconPosition='left'
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledDisabled
                    showIcon='true'
                    iconPosition='right'
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledDisabled
                    showIcon='true'
                    icon='settings'
                ></ButtonFilledDisabled>
            </div>
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledDisabled
                    showIcon='true'
                    fontSize='small'
                ></ButtonFilledDisabled>
            </div>
        </div>
    </div>
    </>
  );
};

export default Stories;