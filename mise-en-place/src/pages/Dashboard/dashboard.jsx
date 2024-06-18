import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import JessicaBolosLogo from '../../utils/img/logo_jessica_bolos.png';
import Sidebar from '../../components/Sidebar/sidebar';
import Breadcrumb from '../../components/Texts/Breadcrumbs/breadcrumbs';
import BarChart from '../../components/Charts/BarChart/barchart';
import LineChart from '../../components/Charts/LineChart/linechart';
import DonutChart from '../../components/Charts/DonutChart/donutchart';
import GoalChart from '../../components/Charts/GoalChart/goalchart';

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"></link>

const Header = () => {
    return (
        <div className={styles["mainContainer"]}>
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
                    <GoalChart></GoalChart>
                </div>
            </div>
        </div>
    );
};

export default Header;