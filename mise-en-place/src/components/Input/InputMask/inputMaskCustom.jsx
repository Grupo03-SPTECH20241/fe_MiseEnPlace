import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';  
import styles from '../Text/text.module.css';
import InputMask from 'react-input-mask';

const InputText = ({
    label = "Label:",
    placeholder = "",
    id = 'input',
    isRequired = false,
    width = '235px',
    fieldWidth,
    mask,
    defaultValue,
    onChange = null,
    isDisabled = false
    }) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : null);
  const [error, setError] = useState('');

  useEffect(() => {  
    setValue(defaultValue || '');  
  }, [defaultValue]);  

  const handleChange = (e) => {
    setValue(e.target.value);
    if(onChange !== null) onChange(e);
    if (e.target.value?.trim() === '' && isRequired) {
      setError('This field is required.');
    } else {
      setError('');
    }
  };

  const handleBlur = () => {
    if (value?.trim() === '' && isRequired) {
      setError('This field is required.');
    } else {
      setError('');
    }
  };

  return (
    <div className={styles['input-field-container']}
      style={{width: `${fieldWidth}`}}>
      <span className={styles['label-content']}>{label}</span>
      <InputMask
        mask={`${mask}`}
        placeholder={`${placeholder}`}
        maskChar={null}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        id={id}
        disabled={isDisabled}
        value={value}
        style={{width: `${width}`}}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
        >
            {(inputProps) =>
                <input disabled={isDisabled} {...inputProps}
            />}
      </InputMask>
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
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default InputText;
