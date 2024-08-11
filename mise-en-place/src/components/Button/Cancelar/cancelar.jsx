import React from 'react';
import PropTypes from 'prop-types';  
import styles from './cancelar.module.css';
import WhitePlusImage from '../../../utils/img/icons/enabled-white-plus-icon.png';  
import WhiteSettingsImage from '../../../utils/img/icons/enabled-white-settings-icon.png';  

const ButtonFilledNegative = ({ onClick, label = 'Label', showIcon = true, icon = 'plus', iconPosition = 'both', fontSize = 'medium', width = '137px', isDisabled = false }) => {

  const renderIcon = (iconId) => {  
    if (!showIcon) return null;  

    if (showIcon&& iconId === 0 && iconPosition === 'left' || iconPosition === 'both') {  
      return(<img src={icon === 'settings'? WhiteSettingsImage : WhitePlusImage}/>);  
    }  
    if (showIcon&& iconId === 1 && iconPosition === 'right' || iconPosition === 'both') {  
      return(<img src={icon === 'settings'? WhiteSettingsImage : WhitePlusImage}/>);  
    }  
    return null;  
  };  

  return (  
    <button 
      disabled={isDisabled} 
      onClick={onClick} 
      className={`${styles['cancel-button']} ${isDisabled ? styles['isDisabled'] : ''}`}
      style={{width: `${width}`}}>  
      {renderIcon(0)}  
      <span className={styles[`font-size-${fontSize}`]}>{label}</span>  
      {renderIcon(1)}  
    </button>  
  );  
};

// Definindo as PropTypes para o componente  
ButtonFilledNegative.propTypes = {  
  onClick: PropTypes.any,
  label: PropTypes.string,  
  showIcon: PropTypes.bool,  
  icon: PropTypes.oneOf(['plus','settings']),  
  iconPosition: PropTypes.oneOf(['left', 'right', 'both']),  
  fontSize: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.string,
  isDisabled: PropTypes.bool
};  

export default ButtonFilledNegative;