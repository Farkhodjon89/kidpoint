import React, {useState} from 'react'
import s from './header-menu.module.scss'
import Link from 'next/link'
import TopBar from '../TopBar/top-bar'
import Accordion from '../Accordion/accordion'
import icons from "../../public/fixture";
import {connect} from "react-redux";

const pages = [
  {
    id: 0,
    name: 'Бренды',
    slug: '/brands'
  },
  {
    id: 1,
    name: 'Акции',
    slug: '/sales'
  },
  // {
  //   id: 2,
  //   name: 'Подарочные карты',
  //   slug: '/cards'
  // },
  // {
  //   id: 2,
  //   name: 'Клиентские дни',
  //   slug: '/client-days'
  // },

]

const HeaderMenu = ({categories, open, setOpen, cartItems, wishlistItems}) => {
  const [tab, setTab] = useState(0)
  const [expand, setExpand] = useState(false)
  return (
      <div className={`${s.wrapper}  ${open && s.active}`}>
        <TopBar/>
        <div className={s.top}>
          <div className={s.user}>
            <Link href={'/account/'}>
              <a dangerouslySetInnerHTML={{__html: icons.user}} className={s.account}>
              </a>
            </Link>
          </div>
          <div className={s.wishlist}>
            <Link href={'/wishlist'}>
              <a className={s.headerWishlist}>
                <span dangerouslySetInnerHTML={{__html: icons.wishlist}}/>
                {wishlistItems.length > 0 && <span className={s.wishlistQuantity}>{wishlistItems.length}</span>}
              </a>
            </Link>
          </div>
          <div className={s.cartLink}>
            <Link href='/cart'>
              <a onClick={() => setOpen(false)}>
                <span dangerouslySetInnerHTML={{__html: icons.cart2}}/>
                <span className={s.cartWord}> Корзина ({cartItems.length}) </span>
              </a>
            </Link>
          </div>

          <img className={s.closeIcon} src='/public/icons/close.svg' alt='' onClick={() => setOpen(false)}/>
        </div>
        {/*<div className={s.tab}>*/}
        {/*  {Object.values(categories).map(({ name }, i) => (*/}
        {/*    <div key={i} onClick={() => setTab(i)} className={tab === i ? s.active : ''}>*/}
        {/*      {name}*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
        <div className={s.accordion}>
          <div className={s.catalog} onClick={() => setExpand((expand) => !expand)}>
            Каталог
            <img src="/public/icons/arrowDown.svg" alt="" />
          </div>
          {expand &&
          (Object.values(categories).map(
              ({name, slug, children}, i) => (
                  <Accordion name={name} slug={slug} key={i} setOpen={setOpen}>
                    {children}
                  </Accordion>
              )
          ))}
          {pages.map(({id,name,slug}) => (
              <div className={s.pages}>
                <Link href={slug}>
                  <a>
                    {name}
                  </a>
                </Link>
              </div>
          ))}
        </div>
      </div>
  )
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}
export default connect(mapStateToProps)(HeaderMenu)
