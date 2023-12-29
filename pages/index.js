import Layout from '../components/Layout/layout'
import CategoriesBar from '../components/CategoriesBar/categories-bar'
import BaseSlider from '../components/BaseSlider/base-slider'
import BaseBlocks from '../components/BaseBlocks/base-blocks'
import ProductsList from '../components/ProductsList/products-list'
import BaseBrands from '../components/BaseBrands/base-brands'
import client from '../apollo/apollo-client'
import PRODUCTS from '../queries/products'
import {StaticDataSingleton} from '../utils/staticData'
import CategoriesSlider from "../components/CategoriesSlider/categories-slider";
import {HOME_PAGE} from "../queries/globalSettings";
import BlockWrapper from "../components/BlockWrapper/BlockWrapper";
import Brands from "../components/Brands/Brands";
import ProductSlider from "../components/ProductSlider";
import Categories from "../components/Categories/categories";

export default function Base({
                               categories,
                               category,
                               products,
                               slides,
                               homeCategories,
                               banners,
                               offers,
                               brands1,
                               brands2
                             }) {
  return (
      <Layout categories={categories}>
        <CategoriesBar categories={categories}/>
        <BaseSlider data={slides}/>
        <Categories categories={homeCategories}/>
        {/*<CategoriesSlider categories={homeCategories}/>*/}
        {/*<BlockWrapper offers={offers}/>*/}
        {/*<BaseBlocks category={category} />*/}
        <ProductSlider products={products} text={`Популярные товары `}/>
        {/*<ProductSlider products={products} text={`Бестселлеры`}/>*/}
        {/*{banners.map(({title, url, image, mobimage, button, subtitle}) => <BaseBrands title={title} url={url}*/}
        {/*                                                                              image={image} mobimage={mobimage}*/}
        {/*                                                                              button={button}*/}
        {/*                                                                              subtitle={subtitle}/>)}*/}
        <Brands brands1={brands1} brands2={brands2}/>

      </Layout>
  )
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch(true)
  const categories = staticData.getRootCategories()
  console.log(categories)


  const products = await client.query({
    query: PRODUCTS,
    variables: {first: 9, featured: true}
  })
  const homePageData = await client.query({
    query: HOME_PAGE
  })

  return {
    props: {
      categories,
      slides: homePageData.data.themeGeneralSettings.globalOptions?.slider,
      products: products.data.products.nodes,
      homeCategories: homePageData.data.themeGeneralSettings.globalOptions?.categories,
      // banner: homePageData.data.themeGeneralSettings.globalOptions?.banner,
      offers: homePageData.data.themeGeneralSettings.globalOptions?.offers,
      brands1: homePageData.data.themeGeneralSettings.globalOptions?.brands1,
      brands2: homePageData.data.themeGeneralSettings.globalOptions?.brands2,
    },
    revalidate: 60,
  }
}


