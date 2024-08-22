import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './CardKanban.module.css';

const Card = ({ id, pedido, cliente, data, hora, status }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CARD',
        item: { id, status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const cardClass = `${styles.divKanban} ${
        status === 'N' ? styles.novos
        : status === 'P' ? styles.preparando
        : status === 'R' ? styles.prontos
        : styles.entregues
    }`;

    return (
        <div
            ref={drag}
            className={cardClass}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div className={styles.DivCardContent}>
                <h3>{pedido}</h3>
                <p>Pedido: #{id}</p>
                <p>{cliente.nome}</p>
                <p>Data de entrega: {data}</p>
                <p>Horário: {hora}</p>
            </div>
            <div className={styles.arrowIcon}>➜</div>
        </div>
    );
};



export default Card;
