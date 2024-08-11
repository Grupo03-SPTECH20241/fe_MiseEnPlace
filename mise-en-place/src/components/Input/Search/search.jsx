import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import styles from './search.module.css';
import Search from '../../../utils/img/search.png';

const InputSearch = ({ label = "Label:", placeholder = "", id = 'input', width= '235px', isRequired = true }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value && isRequired);
    if (e.target.value.trim() === '') {
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
    <div className={styles['search-input-field-container']}>
      <span className={styles['label-content']}>{label}</span>
      <div className={styles['search-input-container']}>
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{width: `${width}`}}
          className={`${styles['search-input-field']} ${error ? styles['search-input-field-error'] : ''}`}
        />
        <img src={Search} alt="Search" className={styles['search-input-icon']} />
      </div>
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

InputSearch.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.string,
  isRequired: PropTypes.bool
};  

export default InputSearch;
