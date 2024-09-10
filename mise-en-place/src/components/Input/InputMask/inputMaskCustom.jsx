import React, { useState } from 'react';
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
    defaultValue
    }) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
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
        value={value}
        style={{width: `${width}`}}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
        >
            {(inputProps) =>
                <input {...inputProps}
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
};

export default InputText;
