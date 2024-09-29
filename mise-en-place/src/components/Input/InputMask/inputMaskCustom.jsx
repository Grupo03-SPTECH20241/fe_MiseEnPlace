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
    onChange
}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(e.target.value);
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
        <div className={styles['input-field-container']} style={{ width: fieldWidth }}>
            <span className={styles['label-content']}>{label}</span>
            <div className={styles['input-wrapper']} style={{ position: 'relative' }}>
                <span className={styles['currency-prefix']} style={{
                    position: 'absolute',
                    left: '10px', 
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}>R$ </span>
                <InputMask
                    mask={mask}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    maskChar={null}
                >
                    {(inputProps) => (
                        <input
                            {...inputProps}
                            type="text"
                            id={id}
                            style={{ width: `calc(${width} - 25px)`, paddingLeft: '35px' }}
                            className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''}`}
                        />
                    )}
                </InputMask>
            </div>
            {error && <span className={styles['error-message']}>{error}</span>}
        </div>
    );
};

InputText.propTypes = { 
    label: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    width: PropTypes.string,
    fieldWidth: PropTypes.string,
    isRequired: PropTypes.bool,
    mask: PropTypes.string,
    onChange: PropTypes.func
};

export default InputText;
