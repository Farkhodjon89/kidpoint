import React from 'react'
import s from './layout-two.module.scss'
import Link from 'next/link'
import {useRouter} from 'next/router'

const LayoutTwo = ({children}) => {
  const router = useRouter()
  return (
      <>
        <div className={s.header}>
          <div className={s.headerInner}>
            {/* {router.pathname === '/checkout' ? (
            <>
              <Link href='/cart'>
                <a>
                  <img src='/icons/arrowLeft.svg' alt='' />
                  <span>Orqaga</span>
                </a>
              </Link>
              <Link href='/'>
                <a className={s.logo}>
                  <img src='/header/logo.svg' alt='' />
                </a>
              </Link>
              <Link href='/'>
                <a>
                  <img src='/icons/phone.svg' alt='' />
                  <span>(55) 500-88-77</span>
                </a>
              </Link>
            </>
          ) : (
            <Link href='/'>
              <a className={s.logo}>
                <img src='/header/logo.svg' alt='' />
              </a>
            </Link>
          )} */}
            <div className={s.info}>
              {/*<div>*/}
              {/*  <img src='/public/icons/wear.svg' alt='' /> Бесплатная примерка*/}
              {/*</div>*/}
              <Link href='/'>
                <a>
                  <img className={s.logo} src='/header/logo-white.svg' alt=''/>
                </a>
              </Link>
            </div>
            <div className={s.inner}>
              <Link href={'/'}>
                <a>
                  Магазины
                </a>
              </Link>
              <Link href={'/about'}>
                <a>
                  Доставка и оплата
                </a>
              </Link>
              <Link href={'/about'}>
                <a>
                  Обмен и возврат товара
                </a>
              </Link>
              {/*<Link href={'/'}>*/}
              {/*  <a>*/}
              {/*     Статус заказа*/}
              {/*  </a>*/}
              {/*</Link>*/}
            </div>


            <Link href='tel:+998 97 720 16 16'>
              <a>
                <img className={s.phoneLogo} src='/public/icons/phone.svg' alt=''/>
                <span>97 720 16 16</span>
              </a>
            </Link>
          </div>
        </div>
        <div className={s.wrapper}>{children}</div>
        <div className={s.footer}>
          <div className={s.footerInner}>
            <div>© 2022 KidPoint. Все права защищены</div>
            <Link href='https://billz.uz/'>
              <a target='_blank'>
                E-commerce решение от
                <img src='/footer/billz2.svg' alt=''/>
              </a>
            </Link>
          </div>
        </div>
      </>
  )
}

export default LayoutTwo
