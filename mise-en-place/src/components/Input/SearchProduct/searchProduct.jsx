import React, { useState } from 'react';
import styles from './searchProduct.module.css';
import Search from '../../../utils/img/search.png';

const InputField = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.trim() === '') {
      setError('This field is required.');
    } else {
      setError('');
    }
  };

  const handleBlur = () => {
    if (value.trim() === '') {
      setError('This field is required.');
    } else {
      setError('');
    }
  };

  return (
    <div className={styles['search-input-field-container']}>
      <span className={styles['label-content']}>Label:</span>
      <div className={styles['search-input-container']}>
        <input
          type="text"
          id="input"
          placeholder="Placeholder"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles['search-input-field']} ${error ? styles['search-input-field-error'] : ''}`}
        />
        <img src={Search} alt="Search" className={styles['search-input-icon']} />
      </div>
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

export default InputField;
