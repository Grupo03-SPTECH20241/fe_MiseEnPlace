import React, { useState } from 'react';  
import PropTypes from 'prop-types';  
import styles from './cancelarv.module.css';  
import PurplePlusImage from '../../../utils/img/icons/enabled-purple-plus-icon.png';  
import WhitePlusImage from '../../../utils/img/icons/enabled-white-plus-icon.png';
import PurpleSettingsImage from '../../../utils/img/icons/enabled-purple-settings-icon.png';
import WhiteSettingsImage from '../../../utils/img/icons/enabled-white-settings-icon.png';
import DisabledPurplePlusImage from '../../../utils/img/icons/disabled-purple-plus-icon.png';  
import DisabeldPurpleSettingsImage from '../../../utils/img/icons/disabled-purple-settings-icon.png';

const ButtonOutlinedNegative = ({ onClick, label = 'Label', showIcon = true, icon = 'plus', iconPosition = 'both', fontSize = 'medium', width = '137px', isDisabled=false }) => {  
  const [isHovered, setIsHovered] = useState(false);  

  const renderIcon = (iconId) => {  
    if (!showIcon) return null;  
    let currentIcon;

    if (icon === 'plus'){
      if(isDisabled){
        currentIcon = DisabledPurplePlusImage;
      } else {
        currentIcon = isHovered ? WhitePlusImage : PurplePlusImage;
      }
    } else if (icon === 'settings') {
      if(isDisabled){
        currentIcon = DisabeldPurpleSettingsImage;
      } else {
        currentIcon = isHovered ? WhiteSettingsImage : PurpleSettingsImage;
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
      className={`${styles['cancel-variant-button']} ${isDisabled ? styles['isDisabled'] : ''}`}
      style={{width: `${width}`, color: '##4B24E5;'}}>  
      {renderIcon(0)}  
      <span className={styles[`font-size-${fontSize}`]}>{label}</span>  
      {renderIcon(1)}  
    </button>  
  );  
};  

ButtonOutlinedNegative.propTypes = {  
  onClick: PropTypes.any,  
  label: PropTypes.string,  
  showIcon: PropTypes.bool,  
  icon: PropTypes.oneOf(['plus','settings']),  
  iconPosition: PropTypes.oneOf(['left', 'right', 'both']),  
  fontSize: PropTypes.oneOf(['small', 'medium', 'large']),  
  width: PropTypes.string,
  isDisabled: PropTypes.bool
};  

export default ButtonOutlinedNegative;