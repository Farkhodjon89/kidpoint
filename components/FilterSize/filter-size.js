import React from 'react'
import s from './filter-size.module.scss'

const FilterSize = ({ sizes, active, filterValues }) =>
  sizes && (
    <div className={s.wrapper}>
      <div className={s.title}> Размер </div>
      <div className={s.action}>
        {sizes.map(({ name }, i) => (
          <div
            key={i}
            onClick={() => filterValues('sizes', name)}
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

export default FilterSize
