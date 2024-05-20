import React from 'react';
import styles from './contente.module.css';

const Loading = () => {
    return (
        <div className={styles['text-container']}>
            <span className={styles['Titulo']}>
                Title
            </span>

            <span className={styles['Subtitulo']}>
                Subtitle
            </span>
        </div>
    );
};

export default Loading;