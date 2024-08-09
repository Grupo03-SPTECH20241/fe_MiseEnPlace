import React from 'react';
import PropTypes from 'prop-types';  
import styles from './default.module.css';
import PlusImage from '../../../utils/img/plus.png'
import SettingsImage from '../../../utils/img/settings_icon.png';

const ButtonFilledDefault = ({ onClick, label = 'Label', showIcon = true, icon = 'plus', iconPosition = 'both', fontSize = 'medium', width = '137px'  }) => {
  // Renderiza ícones com base na posição  
  const renderIcon = (iconId) => {  
    if (!showIcon) return null;  

    if (showIcon && iconId === 0 && iconPosition === 'left' || iconPosition === 'both') {  
      return(<img src={icon === 'settings'? SettingsImage : PlusImage}/>);  
    }  
    if (showIcon && iconId === 1 && iconPosition === 'right' || iconPosition === 'both') {  
      return(<img src={icon === 'settings'? SettingsImage : PlusImage}/>);  
    }  
    return null;  
  };  

  return (
    <button onClick={onClick} className={styles['default-button']} style={{width: `${width}`}}>  
      {renderIcon(0)}  
      <span className={styles[`font-size-${fontSize}`]}>{label}</span>  
      {renderIcon(1)}  
    </button>  
  );
};

// Definindo as PropTypes para o componente  
ButtonFilledDefault.propTypes = {  
  onClick: PropTypes.any,
  label: PropTypes.string,  
  showIcon: PropTypes.bool,  
  icon: PropTypes.oneOf(['plus','settings']),  
  iconPosition: PropTypes.oneOf(['left', 'right', 'both']),  
  fontSize: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.string
};   

export default ButtonFilledDefault;