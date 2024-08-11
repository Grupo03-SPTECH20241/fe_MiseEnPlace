import React, { useState } from 'react';
import styles from './text.module.css';

const InputText = ({ label = "Label:", placeholder = "", id = 'input', isRequired = false, width = '235px' }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.trim() === '' && isRequired) {
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
      <span className={styles['label-content']}>{{label}}</span>
      <input
        type="text"
        id={{id}}
        placeholder={{placeholder}}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{width: `${width}`}}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
      />
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

export default InputText;
