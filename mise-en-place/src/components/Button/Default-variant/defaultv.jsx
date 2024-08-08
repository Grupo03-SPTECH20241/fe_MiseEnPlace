import React from 'react';
import PropTypes from 'prop-types';  
import styles from './defaultv.module.css';
import PlusImage from '../../../utils/img/plus.png'
import SettingsImage from '../../../utils/img/settings_icon.png';

const ButtonFilledDefaultVariant = ({ onClick, label = 'Label', showIcon = 'true', icon = 'plus', iconPosition = 'both', fontSize = 'medium', width = '137px' }) => {
  // Renderiza ícones com base na posição  
  const renderIcon = (iconId) => {  
    if (showIcon !== 'true') return null;  

    if (showIcon === 'true' && iconId === 0 && iconPosition === 'left' || iconPosition === 'both') {  
      return(<img key="left-icon" src={icon === 'settings'? SettingsImage : PlusImage}/>);  
    }  
    if (showIcon === 'true' && iconId === 1 && iconPosition === 'right' || iconPosition === 'both') {  
      return(<img key="right-icon" src={icon === 'settings'? SettingsImage : PlusImage}/>);  
    }  
    return null;  
  };  

  return (
    <button onClick={onClick} className={styles['default-variant-button']} style={{width: `${width}`}}>  
      {renderIcon(0)}  
      <span className={styles[`font-size-${fontSize}`]}>{label}</span>  
      {renderIcon(1)}  
    </button>  
  );
};

// Definindo as PropTypes para o componente  
ButtonFilledDefaultVariant.propTypes = {  
  onClick: PropTypes.any,
  label: PropTypes.string,  
  showIcon: PropTypes.bool,  
  icon: PropTypes.oneOf(['plus','settings']),  
  iconPosition: PropTypes.oneOf(['left', 'right', 'both']),  
  fontSize: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.string
};   

export default ButtonFilledDefaultVariant;