import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import styles from './textField.module.css';

const InputTextField = ({ label = 'Label:', placeholder = '', id = 'input', required = 'false', width = '235px', height = '100px' }) => {
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
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        style={{width: `${width}`, height: `${height}`}}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
      />
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

// Definindo as PropTypes para o componente  
InputTextField.propTypes = { 
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.string,
  required: PropTypes.oneOf(['true', 'false']),
};

export default InputTextField;
