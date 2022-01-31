import React from 'react'
import s from './layout.module.scss'
import Header from '../Header/header'
import Footer from '../Footer/footer'

const Layout = ({children, categories}) => {
  return (
      <>
        <Header categories={categories}/>
        <div className={s.wrapper}>{children}</div>
        <Footer categories={categories}/>
      </>
  )
}
export default Layout
