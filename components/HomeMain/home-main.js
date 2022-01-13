import React from 'react'
import s from './home-main.module.scss'
import Link from 'next/link'

const HomeMain = ({ categories }) => (
  <div className={s.wrapper}>
    {Object.values(categories).map(({ image, name, slug }, i) => (
      <div key={i} style={{ backgroundImage: `url(${image.sourceUrl})` }} className={s.inner}>
        <div>
          <span>{name}</span>
          <Link href={'/base/' + slug}>
            <a>Перейти к покупкам</a>
          </Link>
        </div>
      </div>
    ))}
  </div>
)

export default HomeMain
