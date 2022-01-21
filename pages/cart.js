import React from 'react'
import Layout from '../components/Layout/layout'
import CartMain from '../components/CartMain/cart-main'
import { StaticDataSingleton } from '../utils/staticData'
import Breadcrumbs from '../components/Breadcrumbs/breadcrumbs'
import {
  cartItemStock,
  addToCart,
} from '../redux/actions/cartActions'
import SectionTitle from "../components/SectionTitle";
import CategoriesBar from "../components/CategoriesBar/categories-bar";

export default function Cart({ categories, category }) {
  const breadcrumbs = [
    {
      name: 'Главная',
      slug: '/',
    },
    // {
    //   name: 'Каталог',
    //   slug: `/catalog/${category.slug}`,
    // },
    {
      name: 'Корзина',
      slug: `/cart`,
    },
  ]
  // const breadcrumbs = [
  //   {
  //     name: 'Главная',
  //     url: '/'
  //   },
  //   {
  //     name: 'Каталог',
  //     url: '/shop'
  //   },
  //   {
  //     name: 'Корзина',
  //     active: true
  //   }
  // ]
  return (
    <Layout categories={categories}>
      <CategoriesBar categories={categories}/>
      <SectionTitle title={'Корзина'}/>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <CartMain  />
    </Layout>
  )
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch(true)
  const categories = staticData.getRootCategories()
  return {
    props: {
      categories,
    },
    revalidate: 60,
  }
}
