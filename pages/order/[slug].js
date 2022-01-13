import React from 'react'
import LayoutTwo from '../../components/LayoutTwo/layout-two'
import OrderMain from '../../components/OrderMain/order-main'
import client from '../../apollo/apollo-client'
import ORDER from '../../queries/order'

export default function Order({ order }) {
  return (
    <LayoutTwo>
      <OrderMain order={order} />
    </LayoutTwo>
  )
}

export const getServerSideProps = async ({ params }) => {
  const order = await client.query({
    query: ORDER,
    variables: { id: params.slug }
  })
  return {
    props: {
      order: order.data.order
    }
  }
}
