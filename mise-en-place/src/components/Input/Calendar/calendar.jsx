import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import styles from './calendar.module.css';

const InputCalendar = ({ label = 'Label:', placeholder = '', id = 'input', isRequired = false, width = '235px', type = 'date' }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

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
    <div className={styles['input-calendar-container']}>
      <span className={styles['label-content']}>{label}</span>
      <input
        type={type === 'date' ? 'date' : 'datetime-local'}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{width: `${width}`}}
        className={`${styles['input-calendar']} ${error ? styles['input-calendar-error'] : ''}`}
      />
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

InputCalendar.propTypes = { 
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.string,
  isRequired: PropTypes.bool,
  type: PropTypes.oneOf(['date','datetime']),  
};

export default InputCalendar;
