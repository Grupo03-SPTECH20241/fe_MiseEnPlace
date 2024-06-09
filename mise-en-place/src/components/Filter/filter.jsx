import React, { useState } from 'react';
import styles from './filter.module.css';
import Seta from '../../utils/img/setaBaixo.png';

const Dropdown = ({options, onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Mensal');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const updateFilterValue = (item) => {
    setSelected(item);
    setIsOpen(false);
    onChange(item);
  }

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={`${styles['dropdown-btn']} ${isOpen ? styles.open : ''}`}>
        {selected? selected : 'Filtros'} <img className={styles['dropdown-arrow']} src={Seta} alt="Seta" />
      </button>
      {isOpen && (
        <div className={styles['dropdown-menu']}>
          {
            options.map((item, index) => {
              return (
                <div key={index} className={styles['dropdown-item']} onClick={() => updateFilterValue(item)}>{item}</div>
              )
            })
          }
        </div>
      )}
    </div>
  );
};

export default Dropdown;