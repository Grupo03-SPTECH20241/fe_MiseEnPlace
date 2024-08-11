import React, { useState } from 'react';
import styles from './text.module.css';
import { width } from '@mui/system';

const InputField = ({ label = "Label:", placeholder = "", id = 'input', widthInput = '100%' }) => {
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
      <span className={styles['label-content']}>{label}</span>
      <input
        type="text"
        id={{id}}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
        style={{ width: widthInput }}
      />
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

export default InputField;
