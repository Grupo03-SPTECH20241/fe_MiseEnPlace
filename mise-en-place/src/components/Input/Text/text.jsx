import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import styles from './text.module.css';
import { useEffect } from 'react';

const InputText = ({ label = "Label:", placeholder = "", id = 'input', isRequired = false, width = '235px', fieldWidth, onChange = null, defaultValue }) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : null);
  const [error, setError] = useState('');

  useEffect(() => {  
    setValue(defaultValue || '');  
  }, [defaultValue]);  

  const handleChange = (e) => {
    setValue(e.target.value);
    if(onChange !== null) onChange(e);
    
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
    <div className={styles['input-field-container']}
      style={{width: `${fieldWidth}`}}>
      <span className={styles['label-content']}>{label}</span>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
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

InputText.propTypes = { 
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default InputText;
