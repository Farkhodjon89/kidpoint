import React from 'react'
import s from './layout.module.scss'
import Header from '../Header/header'
import Footer from '../Footer/footer'

const Layout = ({children, categories, parentCategories, catalog= ''}) => {
  return (
      <>
        <Header categories={catalog === 'catalog' ? parentCategories : categories} />
        <div className={s.wrapper}>{children}</div>
        <Footer categories={catalog === 'catalog' ? parentCategories : categories} />
      </>
  )
}
export default Layout
