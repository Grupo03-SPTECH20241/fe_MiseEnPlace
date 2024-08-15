import React from 'react';
import styles from './disabled.module.css';
import PlusImage from '../../../utils/img/plusDisable.png'

const Button = () => {
  return (
    <button className={styles['disabled-button']}>
      <img src={PlusImage} alt="Button icon" />
      Button
      <img src={PlusImage} alt="Button icon" />

    </button>
  );
};

export default Button;