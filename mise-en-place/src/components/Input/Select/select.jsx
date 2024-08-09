import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import styles from './select.module.css';

const InputSelect = ({ label = 'Label:', placeholder = '', id = 'input', required = 'false' }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.trim() === '' && required === 'true') {
      setError('This field is required.');
    } else {
      setError('');
    }
  };

  const handleBlur = () => {
    if (value.trim() === '' && required === 'true') {
      setError('This field is required.');
    } else {
      setError('');
    }
  };

  return (
    <div className={styles['input-field-container']}>
      <span className={styles['label-content']}>{label}</span>
      <select
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
      >
        <option value="" disabled>{placeholder}</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

// Definindo as PropTypes para o componente  
InputSelect.propTypes = { 
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.oneOf(['true', 'false']),
};

export default InputSelect;
