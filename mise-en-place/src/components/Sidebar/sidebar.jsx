import React, { useState } from 'react';
import styles from '../Sidebar/sidebar.module.css';
import homeImage from '../../utils/img/home.png';
import agendaImage from '../../utils/img/calendar.png';
import listImage from '../../utils/img/List.png';
import setaImage from '../../utils/img/seta.png';
import esquerda from '../../utils/img/esquerda.png';
import logo from '../../utils/img/logo_v2.png';
import acessibilidadeImage from '../../utils/img/circle-question-regular.png'

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`${styles.sidebar} ${isSidebarOpen ? '' : styles['sidebar-closed']}`}>
            <div className={styles['sidebar-header']}>
                <img className={styles['sidebar-logo']} src={logo} alt="" />
            </div>
            <div className={styles['sidebar-content']}>
                <div className={styles['divisao-header']}></div>
                <div className={styles['div-item']}>
                    <img className='home' src={homeImage} alt="Icon home" />
                    <a href="#">Início</a>
                </div>
                <div className={styles['div-item']}>
                    <img className='agenda' src={agendaImage} alt="Icon Calendar" />
                    <a href="#">Planejamento</a>
                </div>
                <div className={styles['div-item']}>
                    <img className='list' src={listImage} alt="Icon List" />
                    <a href="#">Produtos</a>
                </div>
                <div className={styles['accessibility-mobile']}>
                    <img className='acessibilidade' src={acessibilidadeImage} alt="Icon Acesibilidade" />
                </div>
            </div>
            <div className={styles['minimizar-div']} >
                <div className={styles['div-bola']}>
                <img src={isSidebarOpen ?  esquerda : setaImage} alt="Icon seta" onClick={toggleSidebar} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;