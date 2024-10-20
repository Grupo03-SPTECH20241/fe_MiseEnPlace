import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import styles from './select.module.css';
import { useEffect } from 'react';

const InputSelect = ({ label = 'Label:', placeholder = '', id = 'input', isRequired = false, width = '235px', height = '43px', options = [], onChange = null, defaultValue, isDisabled = false}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '');
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
    if (!value === '' && isRequired) {
      setError('This field is required.');
    } else {
      setError('');
    }
  };

  const renderOptions = () => {  
    return options.map((currentOption, index) => (  
      <option key={index} value={currentOption.value}>  
        {currentOption.label}  
      </option>  
    ));  
  }  

  return (
    <div className={styles['input-field-container']}>
      <span className={styles['label-content']}>{label}</span>
      <select
        id={id}
        placeholder={placeholder}
        disabled={isDisabled}
        value={value}
        style={{width: `${width}`, height: `${height}`}}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
      >
        <option value="" disabled>{placeholder}</option>
        {renderOptions()}
      </select>
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

InputSelect.propTypes = { 
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(  
    PropTypes.shape({  
      value: PropTypes.any,  
      label: PropTypes.any,  
    })  
  )  
};

export default InputSelect;
