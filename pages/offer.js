import React from 'react'
import Layout from '../components/Layout/layout'
import { StaticDataSingleton } from '../utils/staticData'
import client from '../apollo/apollo-client'
import EXTRA from '../queries/extra'

const Offer = ({ categories, post }) => {
  return (
    <Layout categories={categories}>
      <div dangerouslySetInnerHTML={{ __html: post }} className='extraClass' />
    </Layout>
  )
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch(true)
  const categories = staticData.getRootCategories()

  const post = await client.query({
    query: EXTRA,
    variables: { id: 10867 }
  })

  return {
    props: {
      categories,
      post: post.data.post.content
    },
    revalidate: 60
  }
}

export default Offer
