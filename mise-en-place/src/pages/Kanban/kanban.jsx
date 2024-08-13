import React, { useState, useEffect } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './kanban.module.css';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import ButtonDefault from '../../components/Button/Default/default';
import IconKanban from '../../utils/img/Kanban.svg';
import IconAgenda from '../../utils/img/List.svg';
import Card from '../../components/CardKanban/CardKanban';

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
    const [novos, setNovos] = useState([]);
    const [preparando, setPreparando] = useState([]);
    const [prontos, setProntos] = useState([]);
    const [entregues, setEntregues] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await fetch('http://localhost:8080/produto-pedidos');
                const data = await response.json();

                const novosCards = [];
                const preparandoCards = [];
                const prontosCards = [];
                const entreguesCards = [];

                data.forEach(pedido => {
                    const cardData = {
                        id: pedido.idProdutoPedido,
                        pedido: pedido.produtoDto.nome,
                        cliente: {
                            id: pedido.pedidoDto.clienteDto.idCliente,
                            nome: pedido.pedidoDto.clienteDto.nome
                        },
                        data: pedido.pedidoDto.dtPedido.split('T')[0],
                        hora: '10:30',
                        status: pedido.pedidoDto.status
                    };

                    switch (pedido.pedidoDto.status) {
                        case 'P':
                            preparandoCards.push(cardData);
                            break;
                        case 'N':
                            novosCards.push(cardData);
                            break;
                        case 'R':
                            prontosCards.push(cardData);
                            break;
                        case 'E':
                            entreguesCards.push(cardData);
                            break;
                        default:
                            break;
                    }
                });

                setNovos(novosCards);
                setPreparando(preparandoCards);
                setProntos(prontosCards);
                setEntregues(entreguesCards);
            } catch (error) {
                console.error('Erro ao buscar os pedidos:', error);
            }
        };

        fetchPedidos();
    }, []);

    const updatePedidoStatus = async (cardId, newStatus) => {
        try {
            console.log(cardId)
            const response = await fetch(`http://localhost:8080/pedidos/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dtPedido: "2024-08-13",
                    vlPedido: 0,
                    status: newStatus,
                    valorSinal: 0,
                    formaEntregaId: 0,
                    clienteId: 0,
                    formaPagamentoId: 0
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro ao atualizar o status do pedido: ${response.statusText} (Status Code: ${response.status})`);
            } else {
                console.log(`Status do pedido ${cardId} atualizado para ${newStatus} com sucesso.`);
            }
        } catch (error) {
            console.error('Erro na atualização do status:', error);
            console.log('Payload enviado:', { status: newStatus });
        }
    };



    const moveCard = (cardId, setToColumn) => {
        const moveFromColumn = (fromColumn, setFromColumn) => {
            const cardIndex = fromColumn.findIndex(card => card.id === cardId);
            const [card] = fromColumn.splice(cardIndex, 1);
            setFromColumn([...fromColumn]);
            setToColumn((prev) => [...prev, card]);
        };

        let newStatus = '';

        if (novos.find(card => card.id === cardId)) {
            moveFromColumn(novos, setNovos);
            newStatus = 'N';
        } else if (preparando.find(card => card.id === cardId)) {
            moveFromColumn(preparando, setPreparando);
            newStatus = 'P';
        } else if (prontos.find(card => card.id === cardId)) {
            moveFromColumn(prontos, setProntos);
            newStatus = 'R';
        } else if (entregues.find(card => card.id === cardId)) {
            moveFromColumn(entregues, setEntregues);
            newStatus = 'E';
        }

        // Atualiza o status no backend
        updatePedidoStatus(cardId, newStatus);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles["mainContainer"]}>
                <Sidebar />
                <div className={styles["innerContainer"]}>
                    <div className={styles["dashboardBreadcrumbsContainer"]}>
                        <Breadcrumb />
                    </div>
                    <div className={styles["dashboardTittleCard"]}>
                        <h2>Quadro de Planejamento</h2>
                        <p>Organize os pedidos da semana conforme você os prepara.</p>
                    </div>
                    <div className={styles["DivSpace"]}>
                        <div className={styles["DivActions"]}>
                            <div className={styles["DivButtonAddPedido"]}>
                                <ButtonDefault
                                    label="Adicionar Pedido"
                                    showIcon="true"
                                    icon="plus"
                                    iconPosition="left"
                                    fontSize="small"
                                    width="170px"
                                />
                            </div>
                            <div className={styles["DivButtonTrocarVisualizacao"]}>
                                <img className={styles["IconAgenda"]} src={IconAgenda} alt="" />
                                <div className={styles["BackgroundColorIcon"]}>
                                    <img className={styles["IconKanban"]} src={IconKanban} alt="" />
                                </div>
                            </div>
                        </div>
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