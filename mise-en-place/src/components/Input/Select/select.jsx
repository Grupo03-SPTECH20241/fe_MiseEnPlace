import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import styles from './select.module.css';

const InputSelect = ({ label = 'Label:', placeholder = '', id = 'input', required = false, width = '235px', height = '43px', options = []}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.trim() === '' && required) {
      setError('This field is required.');
    } else {
      setError('');
    }
  };

  const handleBlur = () => {
    if (value.trim() === '' && required) {
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
  required: PropTypes.bool,
  options: PropTypes.arrayOf(  
    PropTypes.shape({  
      value: PropTypes.any.isRequired,  
      label: PropTypes.any.isRequired,  
    })  
  )  
};

export default InputSelect;
