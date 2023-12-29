import React from 'react'
import s from './filter-steps.module.scss'

const FilterSteps = ({steps, active, filterValues}) =>
    steps && (
        <div className={s.wrapper}>
          <div className={s.title}> Ступень</div>
          <div className={s.action}>
            {steps?.map(({name}, i) => (
                <div
                    key={i}
                    onClick={() => filterValues('steps', name)}
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





export default FilterSteps