import React from 'react';
import PropTypes from 'prop-types';  
import styles from './tag.module.css';

const Tag = ({ type = 'planned', label = 'Label', width = '125px'}) => {

  const getLabelByType = (currentType) => {
    if(label != 'Label'){
      return label;
    }
    switch(currentType){
      case 'planned': return 'Planejado';
      case 'preparing': return 'Preparando';
      case 'ready': return 'Pronto';
      case 'done': return 'Entregue';
      default: return 'Label';
    }
  }
  return (
    <div className={styles['tag-container']}>
        <div style={{width: `${width}`}} className={styles[`tag-${type}`]}>
            <span className={styles['tag-label']}>{getLabelByType(type)}</span>
        </div>
    </div>
  );
};

Tag.propTypes = { 
  label: PropTypes.string,
  icon: PropTypes.oneOf(['planned','preparing', 'ready', 'done']),
  width: PropTypes.string,
};

export default Tag;
