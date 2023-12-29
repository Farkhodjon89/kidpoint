import React from 'react'
import s from './top-bar.module.scss'
import Link from 'next/link'

const TopBar = () => (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.leftSide}>
          <Link href='/contacts'>
            <a>
              Магазины
            </a>
          </Link>
          <Link href='/about'>
            <a>
              Доставка и оплата
            </a>
          </Link>
          <Link href='/about'>
            <a>
              Обмен и возврат товара
            </a>
          </Link>
          {/*<Link href='/'>*/}
          {/*  <a>*/}
          {/*    Статус заказа*/}
          {/*  </a>*/}
          {/*</Link>*/}
        </div>
        <div className={s.rightSide}>
          <Link href='tel:+998 97 720 16 16'>
            <a>
              <img src='/icons/phone.svg' alt=''/>
              +998 97 720 16 16
            </a>
          </Link>
        </div>

      </div>
    </div>
)
export default TopBar
