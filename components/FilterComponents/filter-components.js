import React from 'react'
import s from './filter-components.module.scss'

const FilterComponents = ({components, active, filterValues}) =>
    components && (
        <div className={s.wrapper}>
          <div className={s.title}> Тип</div>
          <div className={s.action}>
            {components?.map(({name}, i) => (
                <div
                    key={i}
                    onClick={() => filterValues('components', name)}
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


export default FilterComponents