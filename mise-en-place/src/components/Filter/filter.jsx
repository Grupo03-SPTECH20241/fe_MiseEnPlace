import React, { useState } from 'react';
import styles from './filter.module.css';
import Seta from '../../utils/img/setaBaixo.png';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={`${styles['dropdown-btn']} ${isOpen ? styles.open : ''}`}>
        Label <img src={Seta} alt="Seta" />
      </button>
      {isOpen && (
        <div className={styles['dropdown-menu']}>
          <div className={styles['dropdown-item']}>Label</div>
          <div className={styles['dropdown-item']}>Label</div>
          <div className={styles['dropdown-item']}>Label</div>
          <div className={styles['dropdown-item']}>Label</div>
          <div className={styles['dropdown-item']}>Label</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;