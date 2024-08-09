import React, { useEffect, useState } from 'react';
import styles from './kanban.module.css';
import JessicaBolosLogo from '../../utils/img/logo_jessica_bolos.png';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import ButtonCancelar from '../../components/Button/Cancelar/cancelar';
import IconKanban from '../../utils/img/Kanban.svg';
import IconAgenda from '../../utils/img/List.svg';

const Kanban = () => {
    return (
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
                            <ButtonCancelar
                                label="Adicionar Pedido"
                                showIcon="true"
                                icon="plus"
                                iconPosition="left"
                                fontSize="small"
                            ></ButtonCancelar>
                        </div>
                        <div className={styles["DivButtonTrocarVisualizacao"]}>
                            <img className={styles["IconAgenda"]} src={IconAgenda} alt="" />
                            <div className={styles["BackgroundColorIcon"]} >
                                <img className={styles["IconKanban"]} src={IconKanban} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Kanban;