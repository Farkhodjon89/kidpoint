import React from 'react'
import s from './breadcrumbs.module.scss'
import Link from 'next/link'

const Breadcrumbs = ({ breadcrumbs }) => (
  <div className={s.wrapper}>
    {breadcrumbs.map(({ name, slug }, i) => (
      <Link href={slug} key={i}>
        <a>{name}</a>
      </Link>
    ))}
  </div>
)
export default Breadcrumbs
