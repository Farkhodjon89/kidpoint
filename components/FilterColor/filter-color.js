import React from 'react'
import s from './filter-color.module.scss'

const FilterColor = ({ colors, active, filterValues }) =>
  colors && (
    <div className={s.wrapper}>
      <div className={s.title}> Цвет </div>
      <div className={s.action}>
        {colors.map(({ name }, i) => (
          <div
            key={i}
            onClick={() => filterValues('colors', name)}
            className={(active || []).includes(name) ? s.active : ''}
          >
            {(active || []).includes(name) ? (
              <img src='/public/icons/checkboxFilled.svg' alt='' />
            ) : (
              <img src='/public/icons/checkbox.svg' alt='' />
            )}
            {name}
          </div>
        ))}
      </div>
    </div>
  )

export default FilterColor
