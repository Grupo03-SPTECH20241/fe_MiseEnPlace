import React, { useState } from 'react';
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './kanban.module.css';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
// import ButtonCancelar from '../../components/Button/Cancelar/cancelar';
import IconKanban from '../../utils/img/Kanban.svg';
import IconAgenda from '../../utils/img/List.svg';
import Card from '../../components/CardKanban/CardKanban';
import { display } from '@mui/system';

// Component to render columns and handle dropping
const Column = ({ title, cards, setCards, moveCard }) => {
    const [, dropRef] = useDrop({
        accept: 'CARD',
        drop: (item) => moveCard(item.id, setCards),
    });

    return (
        <div className={`${styles.column} ${styles[title.toLowerCase()]}`} ref={dropRef}>
            <h2>{title}</h2>
            <div className={styles.separator}></div>
            {cards.map(card => <Card key={card.id} {...card} />)}
        </div>
    );
};

const Kanban = () => {
    const [novos, setNovos] = useState([
        { id: 1, pedido: 'Bolo de Ninho', cliente: { id: '0946823', nome: 'Amanda Nunes' }, data: '12/05', hora: '10:30' },
        { id: 2, pedido: 'Bolo de Morango', cliente: { id: '0946823', nome: 'Amanda Nunes' }, data: '12/05', hora: '10:30' },
        { id: 3, pedido: 'Bolo de gozo', cliente: { id: '0946823', nome: 'Amanda Nunes' }, data: '12/05', hora: '10:30' },
        { id: 4, pedido: 'torta de cacete', cliente: { id: '0946823', nome: 'Amanda Nunes' }, data: '12/05', hora: '10:30' },
        { id: 5, pedido: 'torta de cacete', cliente: { id: '0946823', nome: 'Amanda Nunes' }, data: '12/05', hora: '10:30' }


    ]);
    const [preparando, setPreparando] = useState([]);
    const [prontos, setProntos] = useState([]);
    const [entregues, setEntregues] = useState([]);

    const moveCard = (cardId, setToColumn) => {
        // Remove card from the current list and add it to the new list
        const moveFromColumn = (fromColumn, setFromColumn) => {
            const cardIndex = fromColumn.findIndex(card => card.id === cardId);
            const [card] = fromColumn.splice(cardIndex, 1);
            setFromColumn([...fromColumn]);
            setToColumn((prev) => [...prev, card]);
        };

        if (novos.find(card => card.id === cardId)) {
            moveFromColumn(novos, setNovos);
        } else if (preparando.find(card => card.id === cardId)) {
            moveFromColumn(preparando, setPreparando);
        } else if (prontos.find(card => card.id === cardId)) {
            moveFromColumn(prontos, setProntos);
        } else if (entregues.find(card => card.id === cardId)) {
            moveFromColumn(entregues, setEntregues);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles["mainContainer"]}>
                <Sidebar />
                <div className={styles["innerContainer"]}>
                    <div className={styles["dashboardBreadcrumbsContainer"]}>
                        <Breadcrumb></Breadcrumb>
                    </div>
                    <div className={styles["dashboardTittleCard"]}>
                        <h2>Quadro de Planejamento</h2>
                        <p>Organize os pedidos da semana conforme você os prepara.</p>
                    </div>
                    <div className={styles["DivSpace"]}>
                        <div className={styles["DivActions"]}>
                            <div className={styles["DivButtonAddPedido"]}>
                                {/* <ButtonCancelar
                                    label="Adicionar Pedido"
                                    showIcon="true"
                                    icon="plus"
                                    iconPosition="left"
                                    fontSize="small"
                                ></ButtonCancelar> */}
                            </div>
                            <div className={styles["DivButtonTrocarVisualizacao"]}>
                                <img className={styles["IconAgenda"]} src={IconAgenda} alt="" />
                                <div className={styles["BackgroundColorIcon"]} >
                                    <img className={styles["IconKanban"]} src={IconKanban} alt="" />
                                </div>
                            </div>
                        </div>
                        {/* Adicionando o Kanban dentro do layout */}
                    </div>
                    <div className={styles.kanban}>
                        <div className={styles["divKanban"]}>
                            <Column title="Novos" cards={novos} setCards={setNovos} moveCard={moveCard} />
                            <Column title="Preparando" cards={preparando} setCards={setPreparando} moveCard={moveCard} />
                            <Column title="Prontos" cards={prontos} setCards={setProntos} moveCard={moveCard} />
                            <Column title="Entregues" cards={entregues} setCards={setEntregues} moveCard={moveCard} />
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default Kanban;
