import React from 'react'
import s from './filter-age.module.scss'

const FilterAge = ({age, active, filterValues}) =>
    age && (
        <div className={s.wrapper}>
          <div className={s.title}> Возраст</div>
          <div className={s.action}>
            {age?.map(({name}, i) => (
                <div
                    key={i}
                    onClick={() => filterValues('age', name)}
                    className={(active || []).includes(name) ? s.active : ''}
                >
                  {(active || []).includes(name) ? (
                      <img src='/public/icons/checkboxFilled.svg' alt=''/>
                  ) : (
                      <img src='/public/icons/checkbox.svg' alt=''/>
                  )}
                  {name}
                </div>
            ))}
          </div>
        </div>
    )


export default FilterAge