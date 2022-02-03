import React from 'react'
import s from './filter-category.module.scss'
import Accordion from '../Accordion/accordion'
import login from "../../pages/api/auth/login";

const FilterCategory = ({categories}) =>
    categories.length !== 0 ? (
        <div>
          <div className={s.title}> Категории</div>
          <div className={s.accordion}>
            {categories.map(({name, slug, children}, i) => (
                <Accordion name={name} slug={slug} key={i}>
                  {children}
                </Accordion>
            ))}
          </div>
        </div>
    ) : ''


export default FilterCategory
