import React from 'react';
import styles from './cancelarv.module.css';
import PlusImage from '../../../utils/img/plus.png'

const Button = ({label}) => {
  return (
    <button className={styles['cancel-variant-button']}>
      <img src={PlusImage} alt="Button icon" />
      <span>{label ? label : 'Label'}</span>
      <img src={PlusImage} alt="Button icon" />
    </button>
  );
};

export default Button;  