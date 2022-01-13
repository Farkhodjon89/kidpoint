import React from 'react';
import s from './OrderTabs.module.scss'

const OrderTabs = ({id, number, date, text, img}) => {
  return (
        <div className={s.wrapper}>
          <div className={s.number}>
            {number}
          </div>
          <div className={s.date}>
            {date}
          </div>
          <div className={s.status}>
            <img src={img}/>
            <span style={{marginLeft: '10px'}}>{text}</span>
          </div>
        </div>
  );
};

export default OrderTabs;