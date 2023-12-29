import React from 'react'
import s from './filter-gender.module.scss'

const FilterGender = ({ gender, active, filterValues }) =>
    gender && (
        <div className={s.wrapper}>
          <div className={s.title}> Пол </div>
          <div className={s.action}>
            {gender?.map(({ name }, i) => (
                <div
                    key={i}
                    onClick={() => filterValues('gender', name)}
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


export default FilterGender