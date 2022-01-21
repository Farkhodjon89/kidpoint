import React from 'react'
import s from './products-list-item.module.scss'
import Link from 'next/link'
import { getFormatPrice, getDiscountPrice } from '../../utils/price'
import icons from '../../public/fixture'
import {addToCart, deleteFromCart} from "../../redux/actions/cartActions";
import {addToWishlist, deleteFromWishlist} from "../../redux/actions/wishlistActions";
import {connect} from "react-redux";

const ProductsListItem = ({ product, catalog,slider,wishlistItems,addToWishlist,deleteFromWishlist }) => {
  const discountPrice = getDiscountPrice(product)
  const wishlistItem = wishlistItems.filter((wishlistItem) => wishlistItem.id === product.id)[0]

  return (
      <div className={slider ? s.listItem2 : s.listItem }>
          <div className={s.card}>
            {product.onSale && (
                <div className={s.discountPrice}>-{discountPrice}%</div>
            )}
            <Link href={'/product/' + product.slug}>
              <a>
                <img
                    src={product.image.sourceUrl}
                    alt=''
                    className={catalog ? s.productImgCatalog : s.productImg}
                />
              </a>
            </Link>
            <button
                className={`${s.addToWishlist} ${wishlistItem ? s.active : null}`}
                onClick={wishlistItem ? () => deleteFromWishlist(product) : () => addToWishlist(product)}
                dangerouslySetInnerHTML={ { __html: wishlistItem ? icons.wishlistChosen : icons.wishlist  }}
            />

            <Link href={`/product${product.slug}`}>
              <a>
                <div className={s.details}>
                  {product.paBrands?.nodes[0]?.name && (
                      <div>{product.paBrands?.nodes[0].name}</div>
                  )}
                  <div className={s.productName}>{product.name}</div>
                  {/*<div*/}
                  {/*    dangerouslySetInnerHTML={{ __html: product.description }}*/}
                  {/*/>*/}
                  <div>
                    {product.onSale ? (
                        <>
                    <span className={s.normalPrice}>
                      {getFormatPrice(product.woocsRegularPrice)}
                    </span>{' '}
                          <span className={s.salePrice}>
                      {getFormatPrice(product.woocsSalePrice)}
                    </span>
                        </>
                    ) : (
                        <div>{getFormatPrice(product.woocsRegularPrice)}</div>
                    )}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>


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
    addToWishlist: (item) => {
      dispatch(addToWishlist(item))
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsListItem)
