import Layout from '../components/Layout/layout'
import SearchMain from '../components/search-main'
import client from '../apollo/apollo-client'
import CATEGORIES from '../queries/categories'
import { useState } from 'react'
import LayoutTwo from "../components/LayoutTwo/layout-two";
import {StaticDataSingleton} from "../utils/staticData";
import PRODUCTS from "../queries/products";
// import {HOME_PAGE} from "../queries/globalSettings";
// import HOMESETTINGS from '../queries/homePageSettings'

const Search = ({ categories }) => {
  const [openCart, setOpenCart] = useState(false)
  return (
    <Layout
      openCart={openCart}
      setOpenCart={setOpenCart}
      categories={categories}
    >
      <SearchMain />
    </Layout>
  )
}

export default Search

export async function getStaticProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(true);
  const categories = staticData.getRootCategories();
  // const category = staticData.getCategoryBySlug('muzhchinam', 3);

  // const result = await client.query({
  //   query: CATEGORIES,
  // })

  return {
    props: {
      categories
    },
    revalidate: 1,
  }
}
