import React from 'react';
import PropTypes from 'prop-types';  
import styles from '../Text/text.module.css';

const InputMaskCustomProdutoCadastro = ({
    label = "Label:",
    placeholder = "",
    id = 'input',
    isRequired = false,
    width = '235px',
    fieldWidth,
    value = defaultValue,
    onChange,
    hasError = false,
    defaultValue = "",
}) => {
    const [error, setError] = React.useState('');

    const handleChange = (e) => {
        let inputValue = e.target.value;

        inputValue = inputValue.replace(/[^0-9.,]/g, '');

        const parts = inputValue.split(/[.,]/);
        if (parts.length > 1) {
          inputValue = `${parts[0]}.${parts[1]}`;
        }

        onChange(inputValue);
        if (inputValue.trim() === '' && isRequired) {
            setError('This field is required.');
        } else {
            setError('');
        }
    };

    const handleBlur = () => {
        if (typeof value === 'string' && value.trim() === '' && isRequired) {
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
                <input
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    autoComplete="off"
                    type="text"
                    id={id}
                    style={{ width: `calc(${width})`, paddingLeft: '35px' }}
                    className={`${styles['input-field']} ${error ? styles['input-field-error'] : ''} ${hasError ? styles['input-field-error-leandro'] : ''}`}
                />
            </div>
            {error && <span className={styles['error-message']}>{error}</span>}
        </div>
    );
};

InputMaskCustomProdutoCadastro.propTypes = { 
    label: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    width: PropTypes.string,
    fieldWidth: PropTypes.string,
    isRequired: PropTypes.bool,
    mask: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default InputMaskCustomProdutoCadastro;
