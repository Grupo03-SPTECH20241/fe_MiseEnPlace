import React, { useState } from 'react';
import styles from './selectProduct.module.css';

const InputField = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.trim() === '') {
      // setError('This field is required.');
    } else {
      setError('');
    }
  };

  const handleBlur = () => {
    if (value.trim() === '') {
      // setError('This field is required.');
    } else {
      setError('');
    }
  };

  return (
    <div className={styles['input-field-container']}>
      
      <select
        id="input"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
      >
        <option value="" disabled>Filtrar por</option>
        {
          optionsNow.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))
        }
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

export default InputField;
