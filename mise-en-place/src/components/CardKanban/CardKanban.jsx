import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import styles from './CardKanban.module.css';
import api from '../../api';

const Card = ({ id, pedido, cliente, data, status }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CARD',
        item: { id, status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [quantidadeProdutos, setQuantidadeProdutos] = useState('N/A');

    useEffect(() => {
        const fetchQuantidadeProdutos = async () => {
            try {
                const response = await api.get('/produto-pedidos/quantidade-produto/pedido');
                const data = response.data;

                const pedidoEncontrado = data.find(p => p.idPedido === id); // Comparando id com o idPedido
                if (pedidoEncontrado) {
                    setQuantidadeProdutos(pedidoEncontrado.quantidadeProdutos);
                } else {
                    setQuantidadeProdutos('N/A');
                }
            } catch (error) {
                console.error('Erro ao buscar a quantidade de produtos:', error);
                setQuantidadeProdutos('N/A');
            }
        };

        fetchQuantidadeProdutos();
    }, [id]);

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
                <h3>
                    {pedido} 
                    {quantidadeProdutos > 1 && <span> +{quantidadeProdutos - 1}</span>}
                </h3>
                <p>Pedido: #{id}</p>
                <p>{cliente.nome}</p>
                <p>Data de entrega: {data}</p>
            </div>
            <div className={styles.arrowIcon}>➜</div>
        </div>
    );
};

export default Card;
