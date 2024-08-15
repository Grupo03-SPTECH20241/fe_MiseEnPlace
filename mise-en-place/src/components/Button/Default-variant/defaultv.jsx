import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import styles from './defaultv.module.css';
import BlackPlusImage from '../../../utils/img/icons/enabled-black-plus-icon.png'
import BlackSettingsImage from '../../../utils/img/icons/enabled-black-settings-icon.png';
import WhitePlusImage from '../../../utils/img/icons/enabled-white-plus-icon.png'
import WhiteSettingsImage from '../../../utils/img/icons/enabled-white-settings-icon.png';
import DisabledBlackPlusImage from '../../../utils/img/icons/disabled-black-plus-icon.png'
import DisabledBlackSettingsImage from '../../../utils/img/icons/disabled-black-settings-icon.png'

const ButtonFilledDefaultVariant = ({ onClick, label = 'Label', showIcon = true, icon = 'plus', iconPosition = 'both', fontSize = 'medium', width = '137px', isDisabled = false }) => {
  const [isHovered, setIsHovered] = useState(false);  

  const renderIcon = (iconId) => {  
    if (!showIcon) return null;  
    let currentIcon;

    if (icon === 'plus'){
      if(isDisabled){
        currentIcon = DisabledBlackPlusImage;
      } else {
        currentIcon = isHovered ? WhitePlusImage : BlackPlusImage
      }
    } else if (icon === 'settings') {
      if(isDisabled){
        currentIcon = DisabledBlackSettingsImage;
      } else {
        currentIcon = isHovered ? WhiteSettingsImage : BlackSettingsImage
      }
    }
    if (iconId === 0 && (iconPosition === 'left' || iconPosition === 'both')) {  
      return(<img src={currentIcon} alt="Ícone" />);  
    }  
    if (iconId === 1 && (iconPosition === 'right' || iconPosition === 'both')) {  
      return(<img src={currentIcon} alt="Ícone" />);  
    }  
    return null;  
  };  

  return (
    <button 
      onClick={onClick} 
      disabled={isDisabled}
      className={`${styles['default-variant-button']} ${isDisabled ? styles['isDisabled'] : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
      style={{width: `${width}`}}>  
      {renderIcon(0)}  
      <span className={styles[`font-size-${fontSize}`]}>{label}</span>  
      {renderIcon(1)}  
    </button>  
  );
};

ButtonFilledDefaultVariant.propTypes = {  
  onClick: PropTypes.any,
  label: PropTypes.string,  
  showIcon: PropTypes.bool,  
  icon: PropTypes.oneOf(['plus','settings']),  
  iconPosition: PropTypes.oneOf(['left', 'right', 'both']),  
  fontSize: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.string,
  isDisabled: PropTypes.bool
};   

export default ButtonFilledDefaultVariant;