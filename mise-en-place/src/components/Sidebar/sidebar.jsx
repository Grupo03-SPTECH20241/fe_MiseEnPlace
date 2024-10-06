import React, { useState } from 'react';
import styles from '../Sidebar/sidebar.module.css';
import homeImage from '../../utils/img/home.png';
import agendaImage from '../../utils/img/calendar.png';
import listImage from '../../utils/img/List.png';
import setaImage from '../../utils/img/seta.png';
import esquerda from '../../utils/img/esquerda.png';
import logo from '../../utils/img/logo_v2.png';
import acessibilidadeImage from '../../utils/img/circle-question-regular.png'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const redirect = (url) => {
        navigate(url);
    }

    return (
        <div className={`${styles.sidebar} ${isSidebarOpen ? '' : styles['sidebar-closed']}`}>
            <div className={styles['sidebar-header']}>
                <img className={styles['sidebar-logo']} src={logo} alt="" />
            </div>
            <div className={styles['sidebar-content']}>
                <div className={styles['divisao-header']}></div>
                <div className={styles['div-item']}>
                    <img onClick={() => redirect('/dashboard')} className='home' src={homeImage} alt="Icon home"  />
                    <a href="/dashboard">Início</a>
                </div>
                <div className={styles['div-item']}>
                    <img onClick={() => redirect('/agenda')} className='agenda' src={agendaImage} alt="Icon Calendar" />
                    <a href="/agenda">Planejamento</a>
                </div>
                <div className={styles['div-item']}>
                    <img onClick={() => redirect('/produtos')} className='list' src={listImage} alt="Icon List" />
                    <a href="/produtos">Produtos</a>
                </div>
                <div id={styles['accessibility-mobile']} className={styles['div-item']}>
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