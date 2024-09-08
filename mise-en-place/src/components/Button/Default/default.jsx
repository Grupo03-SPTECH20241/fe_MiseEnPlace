import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import styles from './default.module.css';
import WhitePlusImage from '../../../utils/img/icons/enabled-white-plus-icon.png';  
import WhiteSettingsImage from '../../../utils/img/icons/enabled-white-settings-icon.png';
import DisabledBlackSettingsImage from '../../../utils/img/icons/disabled-black-settings-icon.png';
import DisabledBlackPlusImage from '../../../utils/img/icons/disabled-black-plus-icon.png';
import enabledWhiteShoppingCartImage from '../../../utils/img/icons/enabled-white-shopping-cart-icon.png';
import EnabledWhiteDeleteImage from '../../../utils/img/icons/enabled-white-delete-icon.png'
import CheckIcon from '../../../utils/img/icons/check.png';

const ButtonFilledDefault = ({ onClick, label = 'Label', showIcon = true, icon = 'plus', iconPosition = 'both', fontSize = 'medium', width = '137px', isDisabled = false }) => {
  const renderIcon = (iconId) => {  
    if (!showIcon) return null;  
    let currentIcon;

    if (icon === 'plus'){
      currentIcon = isDisabled ? DisabledBlackPlusImage : WhitePlusImage;
    } else if (icon === 'settings'){
      currentIcon = isDisabled ? DisabledBlackSettingsImage : WhiteSettingsImage;
    } else if (icon === 'check') {
      currentIcon = CheckIcon;
    } else if (icon === 'shopping-cart'){
      currentIcon = enabledWhiteShoppingCartImage
    } else if (icon === 'delete') {
      currentIcon = EnabledWhiteDeleteImage
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
      className={`${styles['default-button']} ${isDisabled ? styles['isDisabled'] : ''}`}
      style={{width: `${width}`, color: '#FFFEFE'}}>  
      {renderIcon(0)}  
      <span className={styles[`font-size-${fontSize}`]}>{label}</span>  
      {renderIcon(1)}  
    </button>  
  );
};

ButtonFilledDefault.propTypes = {  
  onClick: PropTypes.any,
  label: PropTypes.string,  
  showIcon: PropTypes.bool,  
  icon: PropTypes.oneOf(['plus','settings', 'check', 'shopping-cart', 'delete']),  
  iconPosition: PropTypes.oneOf(['left', 'right', 'both']),  
  fontSize: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.string,
  isDisabled: PropTypes.bool
};   

export default ButtonFilledDefault;