import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';  
import styles from './text.module.css';

const InputText = ({ label = "Label:", placeholder = "", id = 'input', isRequired = false, width = '235px', fieldWidth, availableSelect = false, selectOptions = [], onChange = null }) => {
  const [value, setValue] = useState('');
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

  const handleChange = (e) => {
    setValue(e.target.value);
    if(onChange !== null) onChange(e.target.value);
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
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ width: `${width}` }}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
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
};

export default InputText;
