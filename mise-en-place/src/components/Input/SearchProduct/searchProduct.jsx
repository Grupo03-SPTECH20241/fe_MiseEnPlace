import React, { useState } from 'react';
import styles from './searchProduct.module.css';
import PropTypes from 'prop-types';  
import Search from '../../../utils/img/search.png';

const InputField = ({ onKeyUp , label = "Label:", placeholder = "", id = 'input', width= '235px', isRequired = false }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.trim() === '') {
      // setError('This field is required.');
    } else {
      setError('');
    }
  };

  const handleBlur = () => {
    if (value.trim() === '') {
      // setError('This field is required.');
    } else {
      setError('');
    }
  };

  return (
    <div className={styles['search-input-field-container']}>
      
      <div className={styles['search-input-container']}>
        <input
          type="text"
          id="input"
          placeholder="Buscar produto..."
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyUp={onKeyUp}
          className={`${styles['search-input-field']} ${error ? styles['search-input-field-error'] : ''}`}
        />
        <img src={Search} alt="Search" className={styles['search-input-icon']} />
      </div>
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.string,
  onKeyUp: PropTypes.func,
  isRequired: PropTypes.bool
};  

export default InputField;
