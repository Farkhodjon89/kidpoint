import React from 'react'
import s from './layout.module.scss'
import Header from '../Header/header'
import Footer from '../Footer/footer'

const Layout = ({ children, categories, cartModal, setCartModal }) => {
  return (
    <>
      <Header categories={categories} cartModal={cartModal} setCartModal={setCartModal} />
      <div className={s.wrapper}>{children}</div>
      <Footer categories={categories} />
    </>
  )
}
export default Layout
