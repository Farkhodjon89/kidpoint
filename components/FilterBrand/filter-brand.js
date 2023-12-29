import React from 'react'
import s from './filter-brand.module.scss'

const FilterBrand = ({ brands, active, filterValues }) =>
    brands && (
    <div className={s.wrapper}>
      <div className={s.title}> Бренды </div>
      <div className={s.action}>
        {brands?.map(({ name }, i) => (
            <div
                key={i}
                onClick={() => filterValues('brands', name)}
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


export default FilterBrand
