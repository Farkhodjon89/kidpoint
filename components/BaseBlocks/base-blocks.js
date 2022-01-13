import React from 'react'
import s from './base-blocks.module.scss'
import Link from 'next/link'

const BaseSlider = ({ category }) => {
  return (
    <div className={s.wrapper}>
      {category.children.map((r, i) => (
        <div className={s.inner} key={i}>
          <Link href={'/catalog/' + category.slug + '/' + r.slug} key={i}>
            <a className={s.title}> {r.name} </a>
          </Link>
          {r.children.map(({ name, slug }, i) => (
            <Link href={'/catalog/' + category.slug + '/' + r.slug + '/' + slug} key={i}>
              <a className={s.text}> {name} </a>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export default BaseSlider
