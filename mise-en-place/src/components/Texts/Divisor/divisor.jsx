import React from 'react';
import styles from './divisor.module.css';

const Loading = () => {
    return (
        <div className={styles['text-container']}>
            <span className={styles['Titulo']}>
                Title
            </span>

            <div className={styles['Divisor']}></div>
        </div>
    );
};

export default Loading;