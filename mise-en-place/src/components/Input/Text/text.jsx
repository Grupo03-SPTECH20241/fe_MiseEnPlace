import React, { useState } from 'react';
import styles from './text.module.css';

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
    <div className={styles['input-field-container']}>
      <span className={styles['label-content']}>Label:</span>
      <input
        type="text"
        id="input"
        placeholder="Placeholder"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
      />
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

export default InputField;
