import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import styles from './textField.module.css';
import { useEffect } from 'react';

const InputTextField = ({ label = '', placeholder = '', id = 'input', isRequired = false, width = '235px', height = '100px', defaultValue = null }) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '');
  const [error, setError] = useState('');

  useEffect(() => {  
    setValue(defaultValue || '');  
  }, [defaultValue]);  

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.trim() === '' && isRequired) {
      setError('This field is required.');
    } else {
      setError('');
    }
  };

  const handleBlur = () => {
    if (value.trim() === '' && isRequired) {
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

InputTextField.propTypes = { 
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.string,
  isRequired: PropTypes.bool,
  defaultValue: PropTypes.string,
};

export default InputTextField;
