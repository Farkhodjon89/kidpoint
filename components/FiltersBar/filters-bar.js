import React, { useEffect, useState } from 'react'
import s from './filters-bar.module.scss'
import FilterCategory from '../FilterCategory/filter-category'
import FilterColor from '../FilterColor/filter-color'
import FilterSize from '../FilterSize/filter-size'
import FilterBrand from '../FilterBrand/filter-brand'

const FiltersBar = ({
  category,
  sizes,
  colors,
  filterValues,
  brands,
  filters,
  dispatch,
  activeSortValue, categories
}) => {
  const [open, setOpen] = useState()
  const toggle = (i) => {
    if (open === i) {
      setOpen()
    } else {
      setOpen(i)
    }
  }
  useEffect(() => {
    if (open === 0) {
      document.body.style.overflow = 'hidden'
    } else if (open === 1) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const setSortValue = (value) => {
    dispatch({
      type: 'SET_SORTING',
      sortValue: value,
    })
  }

  const FilterButton = () => (
    <>
      <FilterCategory category={category} categories={categories} />
      {/*<FilterBrand brands={brands} filterValues={filterValues} active={filters.brands} />*/}
      <FilterColor
        colors={colors}
        active={filters.colors}
        filterValues={filterValues}
      />
      <FilterSize
        sizes={sizes}
        active={filters.sizes}
        filterValues={filterValues}
      />
    </>
  )

  const SortButton = () => (
    <div className={s.sort}>
      {[
        { name: 'по умолчанию', value: 'default' },
        { name: 'по убыванию', value: 'highToLow' },
        { name: 'по возрастанию', value: 'lowToHigh' },
      ].map(({ name, value }, i) => {
        return (
          <div
            key={i}
            onClick={() => setSortValue(value)}
            className={(activeSortValue || []).includes(value) ? s.active : ''}
          >
            {name}
          </div>
        )
      })}
    </div>
  )

  const buttons = [
    {
      name: 'Фильтры',
      img: '/public/icons/filter.svg',
      body: <FilterButton />,
    },
    {
      name: 'Сортировка',
      img: '/public/icons/sort.svg',
      body: <SortButton />,
    },
  ]

  return (
    <>
      <div className={s.buttons}>
        {buttons.map(({ name, img }, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`${s.button} ${open === i ? s.active : ''}`}
          >
            {name}
            <img src={img} alt='' />
          </button>
        ))}
      </div>
      {buttons.map(
        ({ body }, i) =>
          open === i && (
            <div className={s.inner} key={i}>
              {body}
              <button className={s.apply} onClick={() => setOpen()}>
                Применить
              </button>
            </div>
          )
      )}
    </>
  )
}
export default FiltersBar
