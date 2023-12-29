import React from 'react'
import s from './products-list.module.scss'
import Link from 'next/link'
import { getFormatPrice, getDiscountPrice } from '../../utils/price'
import ProductsListItem from "../ProductsListItem/products-list-item";
import {addToWishlist, deleteFromWishlist} from "../../redux/actions/wishlistActions";
import {addToCart, deleteFromCart} from "../../redux/actions/cartActions";
import {connect} from "react-redux";


const ProductsList = ({ products, catalog,title,wishlistItems,addToWishlist,deleteFromWishlist }) => {
  return (
      <>
        <h1 className={s.title}>{title}</h1>
        <div className={s.list}>
          {products.map((product, i) => {
            return <ProductsListItem addToWishlist={addToWishlist} deleteFromWishlist={deleteFromWishlist} wishlistItems={wishlistItems} product={product} catalog={catalog}/>
          })}
        </div>
      </>

  )
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
        selectedProductColor,
        selectedProductSize,
        selectedProductId
    ) => {
      dispatch(
          addToCart(
              item,
              selectedProductColor,
              selectedProductSize,
              selectedProductId
          )
      )
    },
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item))
    },
    // addToWishlist: (item) => {
    //   dispatch(addToWishlist(item))
    // },
    // deleteFromWishlist: (item) => {
    //   dispatch(deleteFromWishlist(item))
    // },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsList)