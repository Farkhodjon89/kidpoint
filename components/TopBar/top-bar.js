import React from 'react'
import s from './top-bar.module.scss'
import Link from 'next/link'

const TopBar = () => (
  <div className={s.wrapper}>
    <div className={s.inner}>
      <div>
        {/*<img src='/public/icons/return.svg' alt='' />*/}
        Магазины
      </div>
      <div>
        {/*<img src='/public/icons/return.svg' alt='' />*/}
        Доставка и оплата
      </div>
      <div>
        {/*<img src='/public/icons/return.svg' alt='' />*/}
        Обмен и возврат товара
      </div>
      <div>
        {/*<img src='/public/icons/wear.svg' alt='' />*/}
        Статус заказа
      </div>
      <Link href='tel:+998 71 222-22-22'>
        <a>
          <img src='/icons/phone.svg' alt='' />
          +998 99 610-77-88
        </a>
      </Link>
    </div>
  </div>
)
export default TopBar
