import React from 'react';
import styles from './avatar.module.css';
import Avatar from '../../../utils/img/user.png'


const Loading = () => {
    return (
        <div className={styles['text-container']}>
                <div className={styles['div-imagem']}>
                    <img src={Avatar} alt="Avatar" />
                </div>
                <div className={styles['div-text']}>
                    <span className={styles['Titulo']}>
                        Nome
                    </span>

                    <span className={styles['Subtitulo']}>
                        Subtitle
                    </span>
                </div>
            </div>
    );
};

export default Loading;