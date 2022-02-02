import React from 'react'
import Layout from '../../../components/Layout/layout'
import CategoriesBar from '../../../components/CategoriesBar/categories-bar'
import Breadcrumbs from '../../../components/Breadcrumbs/breadcrumbs'
import CatalogMain from '../../../components/CatalogMain/catalog-main'
import client from '../../../apollo/apollo-client'
import PRODUCTS from '../../../queries/products'
import {useRouter} from "next/router";
import BRANDS from '../../../queries/brands'
// import SIZES from '../../../queries/sizes'
// import COLORS from '../../../queries/colors'

import { StaticDataSingleton } from '../../../utils/staticData'
import Seo from '../../../utils/seo'
import SectionTitle from "../../../components/SectionTitle";

export default function Catalog({
  categories,
  category,
  // sizes,
  // colors,
    brands,
  products,
  pageInfo,
  activeTerms,
}) {
  const breadcrumbs = [
    {
      name: 'Главная',
      slug: '/',
    },
    {
      name: category.name,
      slug: `/catalog/${category.slug}`,
    },
  ]

  const router = useRouter()
  let title = ''
  let description = ''
  switch (router.asPath) {
    case '/catalog/mylo-dlya-ruk':
      title = 'Купить мыло для рук и жидкое мыло | Bloomshop'
      description = 'Хотите приобрести высококачественное мыло для рук или жидкое мыло в Ташкенте? Пенное или гелевое мыло с доставкой на дом.'
      break
    case '/catalog/parfyumeriya':
      title = 'Купить парфюмерию в Ташкенте | Bloomshop'
      description = 'Парфюмерная линия интернет магазина BloomShop предлагает вам исключительно высококачественную продукцию по доступным ценам.'

      break

    case '/catalog/svechi':
      title = 'Купить Арома свечи в Ташкенте | Bloomshop'
      description = 'Наполните жизнь ароматом свежих цитрусов, либо изумительной магнолии… а как насчет и того, и другого? Арома свечи в BloomShop - ждут вас.'

      break
    case '/catalog/uhod-za-kozhej':
      title = 'Средства по уходу за кожей, Ташкент | Bloomshop'
      description = 'Парфюмерные спреи и лосьоны для вашей кожи. Необычайно чувственные ароматы с элементами увлажнения кожи, у нас в Bloomshop.'

      break
    case '/catalog/uhod-za-telom':
      title = 'Средства по уходу за телом, Ташкент | Bloomshop'
      description = 'Гель для душа, Крем для тела, Лосьоны, скрабы, спреи и другие средства по уходу за телом, в нашем интернет-магазине Bloomshop.'
      break

    default:
      break
  }
  return (
      <>
        <Seo title={title} description={description}/>
        <Layout categories={categories}>
          <CategoriesBar categories={categories} category={category} />
          {/*<SectionTitle title='Каталог'/>*/}
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <CatalogMain
              key={category.id}
              categories={categories}
              category={category}
              products={products}
              pageInfo={pageInfo}
              // sizes={sizes}
              // colors={colors}
              // brands={brands}
              activeTerms={activeTerms}
          />
        </Layout></>

  )
}

// export const getStaticPaths = async () => {
//   const staticData = new StaticDataSingleton()
//   await staticData.checkAndFetch()
//   const categories = staticData.getRootCategories()

//   const paths = Object.values(categories).map(({ slug }) => ({ params: { parent: slug } }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

export async function getServerSideProps({ params }) {
  // const brands = await client.query({
  //   query: BRANDS,
  //   fetchPolicy: 'no-cache',
  // });

  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()
  const categories = staticData.getRootCategories()
  const category = staticData.getCategoryBySlug(params.parent, 3)
  // console.log(categories)

  const products = await client.query({
    query: PRODUCTS,
    variables: {
      first: 9,
      categories: [params.parent],
    },
  })

  // const sizes = await client.query({
  //   query: SIZES,
  // })
  // const colors = await client.query({
  //   query: COLORS,
  // })
  // const brands = await client.query({
  //   query: BRANDS
  // })
  // console.log(brands.data.paBrands)

  // const niJoki = brands.data.paBrands.nodes.filter(
  //     ({ products }) => products.nodes.length !== 0
  // )
  // const niJoki = brands.data.paBrands.nodes.filter(({products}) => products.nodes.length !== 0);


  return {
    props: {
      categories,
      category,
      // sizes: sizes.data.paSizes.nodes,
      // colors: colors.data.paColors.nodes,
      products: products.data.products.nodes,
      pageInfo: products.data.products.pageInfo,
      // brands: niJoki,
      activeTerms: products.data.products.activeTerms,
    },
    // revalidate: 60,
  }
}
