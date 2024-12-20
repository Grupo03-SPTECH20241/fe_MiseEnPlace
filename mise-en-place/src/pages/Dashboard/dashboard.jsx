import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from "../../api";  
import styles from './dashboard.module.css';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import BarChart from '../../components/Charts/BarChart/barchart';
import LineChart from '../../components/Charts/LineChart/linechart';
import DonutChart from '../../components/Charts/DonutChart/donutchart';
import GoalChart from '../../components/Charts/GoalChart/goalchart';
import GoalChartModal from '../../components/GoalChartModal/goalChartModal';
import Modal from "react-modal"

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link>

const Dashboard = () => {
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    return (
        <div className={styles["mainContainer"]}>
            <ToastContainer></ToastContainer>
            <Sidebar />
            <div className={styles["innerContainer"]}>
                <div className={styles["dashboardBreadcrumbsContainer"]}>
                    <Breadcrumb></Breadcrumb>
                </div>
                <div className={styles["dashboardTittleCard"]}>
                    <h2>Bem-vinda!</h2>
                    <p>Acompanhe o desenvolvimento da sua confeitaria.</p>
                </div>
                <div className={styles["chartContainer"]}>
                    <LineChart></LineChart>
                    <BarChart></BarChart>
                </div>
                <div className={styles["chartContainer"]}>
                    <DonutChart></DonutChart>
                    <GoalChart openModal={openModal}></GoalChart>
                </div>

                <Modal
                    className={styles["dashboardGoalChartModal"]}
                    isOpen={modalIsOpen}
                >
                    <GoalChartModal closeModal={closeModal}></GoalChartModal>
                </Modal>
            </div>
        </div>
    );
};

export default Dashboard;