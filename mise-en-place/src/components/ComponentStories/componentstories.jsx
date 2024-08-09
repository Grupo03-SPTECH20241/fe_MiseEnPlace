import React from 'react';
import styles from './componentstories.module.css';

import ButtonOutlinedNegative from '../Button/Cancelar-variant/cancelarv'
import ButtonFilledNegative from '../Button/Cancelar/cancelar';
import ButtonFilledDefault from '../Button/Default/default';
import ButtonFilledDefaultVariant from '../Button/Default-variant/defaultv';
import ButtonFilledDisabled from '../Button/Disabled/disabled';
import InputTextField from '../Input/Text Field/textField';
import InputSelect from '../Input/Select/select';

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
                    showIcon={false}
                    fontSize='large'
                    onClick={teste}
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonOutlinedNegative
                    showIcon={true}
                    onClick={teste}
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonOutlinedNegative
                    showIcon={true}
                    iconPosition='left'
                    onClick={teste}
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonOutlinedNegative
                    showIcon={true}
                    iconPosition='right'
                    onClick={teste}
                ></ButtonOutlinedNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonOutlinedNegative
                    showIcon={true}
                    icon='settings'
                    onClick={teste}
                ></ButtonOutlinedNegative>
            </div>
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonOutlinedNegative
                    showIcon={true}
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
                    showIcon={false}
                    fontSize='large'
                    onClick={teste}
                    width='800px'
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledNegative
                    showIcon={true}
                    onClick={teste}
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledNegative
                    showIcon={true}
                    iconPosition='left'
                    onClick={teste}
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledNegative
                    showIcon={true}
                    iconPosition='right'
                    onClick={teste}
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledNegative
                    showIcon={true}
                    icon='settings'
                    onClick={teste}
                ></ButtonFilledNegative>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledNegative
                    showIcon={true}
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
                    showIcon={false}
                    fontSize='large'
                    onClick={teste}
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledDefault
                    showIcon={true}
                    onClick={teste}
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledDefault
                    showIcon={true}
                    iconPosition='left'
                    onClick={teste}
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledDefault
                    showIcon={true}
                    iconPosition='right'
                    onClick={teste}
                ></ButtonFilledDefault>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledDefault
                    showIcon={true}
                    icon='settings'
                    onClick={teste}
                ></ButtonFilledDefault>
            </div>
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledDefault
                    showIcon={true}
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
                    showIcon={false}
                    fontSize='large'
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledDefaultVariant
                    showIcon={true}
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledDefaultVariant
                    showIcon={true}
                    iconPosition='left'
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledDefaultVariant
                    showIcon={true}
                    iconPosition='right'
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledDefaultVariant
                    showIcon={true}
                    icon='settings'
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledDefaultVariant
                    showIcon={true}
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
                    showIcon={false}
                    fontSize='large'
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone</h5>
                <ButtonFilledDisabled
                    showIcon={true}
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone esquerdo</h5>
                <ButtonFilledDisabled
                    showIcon={true}
                    iconPosition='left'
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone direito</h5>
                <ButtonFilledDisabled
                    showIcon={true}
                    iconPosition='right'
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>

            <div className={styles['row-item']}>
                <h5>Botão com ícone customizado</h5>
                <ButtonFilledDisabled
                    showIcon={true}
                    icon='settings'
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>
            <div className={styles['row-item']}>
                <h5>Botão com fonte pequena</h5>
                <ButtonFilledDisabled
                    showIcon={true}
                    fontSize='small'
                    onClick={teste}
                ></ButtonFilledDisabled>
            </div>
        </div>
        <h2>InputTextField</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>InputTextField com label</h5>
                <InputTextField
                    label='Label Customizada'
                ></InputTextField>
            </div>

            <div className={styles['row-item']}>
                <h5>InputTextField com tamanho diferente</h5>
                <InputTextField
                    label='width & height customizado'
                    placeholder='Tamanho customizado'
                    width='400px'
                    height='50px'
                ></InputTextField>
            </div>

            <div className={styles['row-item']}>
                <h5>InputTextField obrigatório</h5>
                <InputTextField
                    required='true'
                    placeholder='Campo obrigatório!'
                ></InputTextField>
            </div>
        </div>
        <h2>InputSelect</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>InputSelect com label</h5>
                <InputSelect
                    label='Label Customizada'
                    options={[
                    {
                        label:'opcao1',
                        value:15
                    },
                    {
                        label:'opcao2',
                        value:64
                    },
                    ]}
                ></InputSelect>
            </div>

            <div className={styles['row-item']}>
                <h5>InputSelect com tamanho diferente</h5>
                <InputSelect
                    placeholder='width & height customizado'
                    width='475px'
                    height='50px'
                    options={[
                        {
                            label:'opcao1',
                            value:15
                        },
                        {
                            label:'opcao2',
                            value:64
                        },
                        {
                            label:'opcao3',
                            value:7
                        },
                    ]}
                ></InputSelect>
            </div>

            <div className={styles['row-item']}>
                <h5>InputSelect obrigatório</h5>
                <InputSelect
                    required={true}
                    placeholder='Campo obrigatório!'
                    options={[
                        {
                            label:'opcao1',
                            value:15
                        }
                    ]}
                ></InputSelect>
            </div>
        </div>
    </div>
    </>
  );
};

export default Stories;