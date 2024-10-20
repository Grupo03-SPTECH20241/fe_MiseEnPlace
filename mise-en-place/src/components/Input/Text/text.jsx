import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';  
import styles from './text.module.css';

const InputText = ({ label = "Label:", placeholder = "", id = 'input', isRequired = false, width = '235px', fieldWidth, availableSelect = false, selectOptions = [], onChange = null, hasError = false, defaultValue, numericOnly = false, postiveValuesOnly = false }) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : null);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSelect = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (selectedValue) => {
    handleChange({ target: { value: selectedValue } })
    setShowDropdown(false);
  };

  const handleSelect = () => {
    if (!availableSelect) return null;
    
    const createOptions = () => {
      return selectOptions.map((option) => (
        <li
          onClick={() => handleOptionClick(option.label)}
          className={styles['dropdown-item']}
        >
          {option.label}
        </li>
      ));
    };

    return (
      <ul ref={dropdownRef} className={styles['dropdown-list']}>
        {createOptions()}
      </ul>
    );
  };

  useEffect(() => {  
    setValue(defaultValue || '');
  }, [defaultValue]);  

  const handleChange = (e) => {
    const event = e.target?.value ? e.target.value : e;
    if(postiveValuesOnly && numericOnly){
      if(event <= 0){
        setValue(0);
        if(onChange !== null) onChange(0);
      } else {
        setValue(event);
        if(onChange !== null) onChange(event);
      }
    } else {
      setValue(event);
      if(onChange !== null) onChange(event);
    }
    
    if(event?.length){
      if (event?.trim() === '' && isRequired) {
        setError('This field is required.');
      } else {
        setError('');
      }
    } else if(isRequired){
      setError('This field is required.');
    } else {
      setError('');
    }
  };

  const handleBlur = () => {
    if(value?.length){
      if (value.trim() === '' && isRequired) {
        setError('This field is required.');
      } else {
        setError('');
      }
    } else if (isRequired){
      setError('This field is required.');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles['input-field-container']}
      style={{ width: `${fieldWidth}` }}>
      <span className={styles['label-content']}>{label}</span>
      <input
        type={numericOnly ? "number": "text"}
        id={id}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ width: `${width}` }}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''} ${hasError ? styles['input-field-error-leandro'] : ''}`}
        onFocus={() => {
          if (availableSelect) toggleSelect();
        }}
      />
      {showDropdown && handleSelect()}
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
  defaultValue: PropTypes.any,
  numericOnly: PropTypes.bool,
  postiveValuesOnly: PropTypes.bool,
};

export default InputText;
