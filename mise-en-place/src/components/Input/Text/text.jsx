import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import styles from './text.module.css';

const InputText = ({ label = "Label:", placeholder = "", id = 'input', isRequired = false, width = '235px', fieldWidth, availableSelect = false, selectOptions = [] }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSelect = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = () => {
    if (!availableSelect) return null;
    
    const createOptions = () => {
      return selectOptions.map((option) => (
            <li
              onClick={() => handleChange()}
              className={styles['dropdown-item']}
            >
              {option.label}
            </li>
      ));
    }

    return (
        <ul className={styles['dropdown-list']}>
          {createOptions()}
        </ul>
    );
  }

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
    <div className={styles['input-field-container']}
      style={{width: `${fieldWidth}`}}>
      <span className={styles['label-content']}>{label}</span>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={() => {
          handleBlur();
          if (availableSelect) toggleSelect(false);
        }}
        style={{width: `${width}`}}
        className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
        onFocus={() => {
          if (availableSelect) toggleSelect(true)
        }}
      />
      {showDropdown && (
        handleSelect()
      )}
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
