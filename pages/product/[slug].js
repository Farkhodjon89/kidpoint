import React, {useState} from 'react'
import Layout from '../../components/Layout/layout'
import CategoriesBar from '../../components/CategoriesBar/categories-bar'
import Breadcrumbs from '../../components/Breadcrumbs/breadcrumbs'
import ProductCard from '../../components/ProductCard/product-card'
import ProductsList from '../../components/ProductsList/products-list'
import client from '../../apollo/apollo-client'
import PRODUCT from '../../queries/product'
import PRODUCTS from '../../queries/products'
import TOPCOLORS from '../../queries/topColors'
import {connect} from 'react-redux'
import {addToCart, deleteFromCart,decreaseQuantity} from '../../redux/actions/cartActions'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'
import {StaticDataSingleton} from '../../utils/staticData'
import ProductSlider from "../../components/ProductSlider";

const Product = ({
                   categories,
                   products,
                   category,
                   product,
                   cartItems,
                   wishlistItems,
                   addToCart,
                   deleteFromCart,
                   addToWishlist,
                   decreaseQuantity,
                   deleteFromWishlist,
                   topColors,
                 }) => {
  // console.log(wishlistItems)
  const [cartModal, setCartModal] = useState(false)

  const breadcrumbs = [
    {
      name: 'Главная',
      slug: '/',
    },
    {
      name: category.name,
      slug: `/catalog/${category.slug}`,
    },
    {
      name: product.name,
      slug: `/product/${product.slug}`,
    },
  ]

  return (
      <Layout
          categories={categories}
          cartModal={cartModal}
          setCartModal={setCartModal}
      >
        <CategoriesBar categories={categories}/>
        <Breadcrumbs breadcrumbs={breadcrumbs}/>
        <ProductCard
            key={product.id}
            product={product}
            cartItems={cartItems}
            wishlistItems={wishlistItems}
            addToCart={addToCart}
            deleteFromCart={deleteFromCart}
            addToWishlist={addToWishlist}
            decreaseQuantity={decreaseQuantity}
            deleteFromWishlist={deleteFromWishlist}
            setCartModal={setCartModal}
            topColors={topColors}
        />
        <ProductSlider  wishlistItems={wishlistItems} products={product.related.nodes}
                       related={true} text={`С этим также покупают`}/>
      </Layout>
  )
}

// export const getStaticPaths = async () => {
//   const paths = []

//   const getAllProducts = async after => {
//     const temp = await client.query({
//       query: PRODUCTS,
//       variables: {
//         first: 10,
//         ...(after ? { after } : {})
//       }
//     })

//     paths.push(
//       ...temp.data.products.nodes.map(product => ({
//         params: { slug: product.slug }
//       }))
//     )

//     if (temp.data.products.pageInfo.hasNextPage) {
//       await getAllProducts(temp.data.products.pageInfo.endCursor)
//     }
//   }

//   if (process.env.NODE_ENV === 'production') {
//     await getAllProducts()
//   }

//   return {
//     paths,
//     fallback: 'blocking'
//   }
// }

export async function getServerSideProps({params}) {
  let response
  try {
    response = await client.query({
      query: PRODUCT,
      variables: {id: params.slug},
    })
  } catch (e) {
    return {
      notFound: true,
      revalidate: 30,
    }
  }

  // let topColors
  //
  // try {
  //   topColors = await client.query({
  //     query: TOPCOLORS,
  //     variables: {terms: response.data.product.sku},
  //   })
  // } catch (e) {
  //   return {
  //     notFound: true,
  //     revalidate: 30,
  //   }
  // }
  const products = await client.query({
    query: PRODUCTS,
    variables: {first: 9, featured: true}
  })

  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()
  const categories = staticData.getRootCategories()
  const category =
      response.data.product.productCategories.nodes.length !== 0
          ? response.data.product.productCategories.nodes[0]?.slug ===
          'uncategorized'
          ? ''
          : staticData.getCategoryBySlug(
              response.data.product.productCategories.nodes[0].slug,
              2
          )
          : ''

  return {
    props: {
      categories,
      category,
      product: response.data.product,
      products: products.data.products.nodes,
      // topColors: topColors.data.products.nodes,
    },
    // revalidate: 60,
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
        item,
        quantityCount,
        selectedProductColor,
        selectedProductSize,
        selectedProductId
    ) => {
      dispatch(
          addToCart(
              item,
              quantityCount,
              selectedProductColor,
              selectedProductSize,
              selectedProductId
          )
      )
    },
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item))
    },
    addToWishlist: (item) => {
      dispatch(addToWishlist(item))
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
