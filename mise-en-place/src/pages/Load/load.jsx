import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadStyles from './load.module.css';
import ImagemLoad from '../../utils/img/Imagem Load.png';

const Load = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/Dashboard');
        }, 3000);

        // Limpeza do temporizador
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={LoadStyles.load}>
            <div className={LoadStyles.load_container}>
                <div className={LoadStyles['div-image']}>
                    <div className={LoadStyles['loading-spinner']}></div>
                    <img src={ImagemLoad} alt="Imagem de Carregamento" />
                </div>
            </div>
        </div>
    );
}

export default Load;