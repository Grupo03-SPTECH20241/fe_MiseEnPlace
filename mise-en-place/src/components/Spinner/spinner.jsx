import React from 'react';
import styles from './spinner.module.css';

const Loading = () => {
  return (
    <div className={styles['loading-container']}>
      <div className={styles['loading-spinner']}></div>
    </div>
  );
};

export default Loading;