import React from 'react'
import s from './empty-block.module.scss'
import Link from 'next/link'

const EmptyBlock = () => {
  return (
    <div className={s.wrapper}>
      <div>Корзина пуста</div>
      <Link href='/'>
        <a>Начать покупки</a>
      </Link>
    </div>
  )
}

export default EmptyBlock
