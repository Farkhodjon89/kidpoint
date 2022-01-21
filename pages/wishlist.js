import React from 'react';
import Breadcrumbs from "../components/Breadcrumbs/breadcrumbs";
import Layout from "../components/Layout/layout";
import WishlistMain from "../components/WishlistMain/wishlist-main";
import {StaticDataSingleton} from "../utils/staticData";
import SectionTitle from "../components/SectionTitle";

const Wishlist = ({categories}) => {

  const breadcrumbs = [
    {
      name: 'Главная',
      slug: '/'
    },
    {
      name: 'Избранные товары',
      slug: '/wishlist'
    }
  ]

  return (
      <Layout categories={categories}>
        <SectionTitle  title={'Избранные'}/>
        <Breadcrumbs breadcrumbs={breadcrumbs}/>
        <WishlistMain />
      </Layout>
  )
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(true);

  const categories = staticData.getRootCategories();

  return {
    props: {
      categories: categories,
    },
    revalidate: 60,
  };
}

export default Wishlist