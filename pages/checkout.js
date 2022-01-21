import React from 'react'
import LayoutTwo from '../components/LayoutTwo/layout-two'
import CheckoutMain from '../components/CheckoutMain/checkout-main'
import Breadcrumbs from "../components/Breadcrumbs/breadcrumbs";
import SectionTitle from "../components/SectionTitle";

export default function Checkout() {
  const breadcrumbs = [
    {
      name: 'Главная',
      slug: '/'
    },
    {
      name: 'Корзина',
      slug: '/cart'
    },
    {
      name: 'Офромление заказа',
      slug: '/checkout'
    }
  ]

  return (
      <LayoutTwo>
        <SectionTitle title={'Оформление заказа'}/>
        <Breadcrumbs breadcrumbs={breadcrumbs}/>
        <CheckoutMain/>
      </LayoutTwo>
  )
}
