import React, { useState } from 'react';
import styles from './textField.module.css';

const InputField = ({ label = "Label:", placeholder = "", id = 'input' }) => {
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
      <span className={styles['label-content']}>{{label}}</span>
      <textarea
        id={{id}}
        placeholder={{placeholder}}
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
