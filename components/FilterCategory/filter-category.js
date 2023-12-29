import React from 'react'
import s from './filter-category.module.scss'
import Accordion from '../Accordion/accordion'

const FilterCategory = ({categories}) =>
    Array.isArray(categories) ? (
        <div>
          <div className={s.title}>Категории</div>
          <div className={s.accordion}>
            {categories?.map(({name, slug, children}, i) => (
                <Accordion name={name} slug={slug} key={i}>
                  {children}
                </Accordion>
            ))}
          </div>
        </div>
    ) : (
        <>
          <div className={s.title}>Категории</div>
          <div className={s.accordion}>
            <Accordion slugEmpty={'slugEmpty'} name={categories.name} >
              {categories.name}
            </Accordion>
          </div>
        </>

    )


export default FilterCategory
