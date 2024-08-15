import React from 'react';
import styles from './componentstories.module.css';

import ButtonOutlinedNegative from '../Button/Cancelar-variant/cancelarv'
import ButtonFilledNegative from '../Button/Cancelar/cancelar';
import ButtonFilledDefault from '../Button/Default/default';
import ButtonFilledDefaultVariant from '../Button/Default-variant/defaultv';
import InputPassword from '../Input/Password/password';
import InputSearch from '../Input/Search/search';
import InputSelect from '../Input/Select/select';
import InputText from '../Input/Text/text';
import InputTextField from '../Input/Text Field/textField';
import InputCalendar from '../Input/Calendar/calendar';
import Tag from '../Tag/tag';

const Stories = () => {
    const teste = () => {  
        alert('Botão clicado!');  
    };
  return (
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
                <h5>Botão desabilitado</h5>
                <ButtonOutlinedNegative
                    showIcon={true}
                    isDisabled={true}
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
                <h5>Botão desabilitado</h5>
                <ButtonFilledNegative
                    showIcon={true}
                    isDisabled={true}
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
                <h5>Botão desabilitado</h5>
                <ButtonFilledDefault
                    showIcon={true}
                    isDisabled={true}
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
                <h5>Botão desabilitado</h5>
                <ButtonFilledDefaultVariant
                    showIcon={true}
                    isDisabled={true}
                    onClick={teste}
                ></ButtonFilledDefaultVariant>
            </div>
        </div>
        <h2>InputText</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Input de texto obrigatório</h5>
                <InputText
                    label='Label Customizada:'
                    placeholder='Placeholder customizado'
                    isRequired={true}
                ></InputText>
            </div>
            <div className={styles['row-item']}>
                <h5>Input de texto com tamanho diferente</h5>
                <InputText
                    label='Tamanho Customizado:'
                    placeholder='Width customizado'
                    width='400px'
                ></InputText>
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
                    isRequired={true}
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
        <h2>InputPassword</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Input de senha</h5>
                <InputPassword
                    label='Label customizada:'
                    placeholder='Campo opcional'
                    isRequired={false}
                ></InputPassword>
            </div>

            <div className={styles['row-item']}>
                <h5>Input de senha</h5>
                <InputPassword
                    placeholder='Campo obrigatório!'
                ></InputPassword>
            </div>
            <div className={styles['row-item']}>
                <h5>Input de senha</h5>
                <InputPassword
                    label='Tamanho diferente:'
                    placeholder='Width customizado'
                    width='400px'
                ></InputPassword>
            </div>
        </div>
        <h2>InputCalendar</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Input de calendário do tipo data</h5>
                <InputCalendar
                    label='Label:'
                    placeholder='Campo opcional'
                    isRequired={false}
                ></InputCalendar>
            </div>

            <div className={styles['row-item']}>
                <h5>Input de calendário obrigatório</h5>
                <InputCalendar
                    label='Label Customizada:'
                    placeholder='Campo obrigatório!'
                    isRequired={true}
                ></InputCalendar>
            </div>
            <div className={styles['row-item']}>
                <h5>Input de calendário do tipo datetime & tamanho diferente</h5>
                <InputCalendar
                    label='Data e Hora:'
                    type='datetime'
                    placeholder='Width customizado'
                    width='400px'
                ></InputCalendar>
            </div>
        </div>
        <h2>InputSearch</h2>
        <div className={styles['row']}>
            <div className={styles['row-item']}>
                <h5>Input de pesquisa obrigatório</h5>
                <InputSearch
                    label='Label Customizada:'
                    placeholder='Placeholder customizado'
                    isRequired={true}
                ></InputSearch>
            </div>
            <div className={styles['row-item']}>
                <h5>Input de pesquisa com tamanho diferente</h5>
                <InputSearch
                    label='Label:'
                    placeholder='Width customizado'
                    width='400px'
                ></InputSearch>
            </div>
        </div>
        <h2>Tag</h2>
        <div className={styles['row']}>
            <div className={styles['row-item-sm']}>
                <h5>Tag em estado 'Planejado'</h5>
                <Tag
                    type='planned'
                ></Tag>
            </div>
            <div className={styles['row-item-sm']}>
                <h5>Tag em estado 'Fazendo'</h5>
                <Tag
                    type='preparing'
                ></Tag>
            </div>
            <div className={styles['row-item-sm']}>
                <h5>Tag em estado 'Pronto'</h5>
                <Tag
                    type='ready'
                ></Tag>
            </div>
            <div className={styles['row-item-sm']}>
                <h5>Tag em estado 'Entregue'</h5>
                <Tag
                type='done'
                ></Tag>
            </div>
        </div>
    </div>
  );
};

export default Stories;