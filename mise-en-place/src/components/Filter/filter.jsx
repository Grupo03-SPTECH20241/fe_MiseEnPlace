import React, { useState } from 'react';
import styles from './filter.module.css';
import Seta from '../../utils/img/setaBaixo.png';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const [itens, setA] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
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
          {
            itens.map((item, index) => {
              return (
                <div key={index} className={styles['dropdown-item']} onClick={() => setSelected(item)}>{item}</div>
              )
            })
          }

        </div>
      )}
    </div>
  );
};

export default Dropdown;