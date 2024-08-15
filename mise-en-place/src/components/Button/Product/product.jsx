import React from 'react';
import styles from './product.module.css';
import PlusImage from '../../../utils/img/Vector.png'

const Button = () => {
  return (
    <button className={styles['default-button']}>
      <img src={PlusImage} alt="Button icon" />
      Cadastrar novo produto
     
    </button>
  );
};

export default Button;