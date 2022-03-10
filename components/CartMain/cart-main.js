import React, {useState} from 'react'
import s from './cart-main.module.scss'
import EmptyBlock from '../EmptyBlock/empty-block'
import Link from 'next/link'
import {connect} from 'react-redux'
import {
  addToCart,
  cartItemStock,
  deleteFromCart,
  decreaseQuantity,
} from '../../redux/actions/cartActions'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'
import {getFormatPrice} from '../../utils/price'
import Breadcrumbs from '../Breadcrumbs/breadcrumbs'

const CartMain = ({
                    cartItems,
                    deleteFromCart,
                    decreaseQuantity,
                    addToCart,


                  }) => {
  // const [quantity, setQuantity] = useState(1)

  let cartTotalPrice = 0
  // const [quantity, setQuantity] = useState(1)

  return cartItems.length >= 1 ? (
      <div>
        <div className={s.wrapper}>
          <div className={s.left}>
            {cartItems.map((product, i) => {
              cartTotalPrice += product.onSale
                  ? product.woocsSalePrice * product.quantity
                  : product.woocsRegularPrice * product.quantity
              return (
                  <>
                    <div className={`${s.card} ${s.showDesktop} `} key={i}>
                      <div className={s.img}>
                        <img src={product.image.sourceUrl} alt=''/>
                      </div>
                      <div className={s.info}>
                        <div className={s.namePrice}>
                          <div className={s.name}> {product.name} </div>
                          <div className={s.price}>
                            {getFormatPrice(
                                product.onSale
                                    ? product.woocsSalePrice
                                    : product.woocsRegularPrice
                            )}
                          </div>
                        </div>
                        {/* <div className={s.color}>
                      Цвет: <span> {product.selectedProductColor}</span>
                    </div>
                    <div className={s.color}>
                      Размер:<span>{product.selectedProductSize}</span>
                    </div> */}

                        <div className={s.separator}>
                          <div>
                            <div className={s.color}>Кол-во:</div>
                            <div className={s.quantity}>
                              <button
                                  onClick={() =>
                                      decreaseQuantity(
                                          product.selectedProductId,
                                          product.quantity
                                      )
                                  }
                              >
                                -
                              </button>
                              <input type='text' value={product.quantity} readOnly/>
                              <button
                                  onClick={() => addToCart(product)}
                                  disabled={
                                    product !== undefined &&
                                    product.quantity &&
                                    product.quantity >=
                                    cartItemStock(
                                        product,
                                        product.selectedProductColor,
                                        product.selectedProductSize
                                    )
                                  }
                              >
                                +
                              </button>
                            </div>

                            {/*<div className={s.amount_img}>*/}
                            {/*  <span className={s.quantity}> {product.quantity}</span>*/}
                            {/*  <img*/}
                            {/*      src='/public/icons/arrowDown.svg'*/}
                            {/*      alt=''*/}
                            {/*      onClick={() => console.log("easy")}*/}
                            {/*  />*/}
                            {/*</div>*/}
                          </div>

                          <div
                              onClick={() =>
                                  deleteFromCart(product.selectedProductId)
                              }
                              className={s.delete}
                          >
                            Удалить товар
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile version */}
                    <div className={s.showMobile}>
                      <div className={s.productName}>
                        <div className={s.name2}>{product.name}</div>
                        <div
                            onClick={() => deleteFromCart(product.selectedProductId)}
                            className={s.delete}
                        >
                          Удалить
                        </div>
                      </div>

                      <div className={s.card}>
                        <div className={s.img}>
                          <img src={product.image.sourceUrl} alt=''/>
                        </div>

                        <div className={s.info}>
                          <div className={s.productPrice}>
                            {getFormatPrice(
                                product.onSale
                                    ? product.woocsSalePrice
                                    : product.woocsRegularPrice
                            )}
                          </div>

                          <div className={s.color}>
                            Кол-во:
                            <div className={s.quantity}>
                              <button
                                  onClick={() =>
                                      decreaseQuantity(
                                          product.selectedProductId,
                                          product.quantity
                                      )
                                  }
                              >
                                -
                              </button>
                              <input type='text' value={product.quantity} readOnly/>
                              <button
                                  onClick={() => addToCart(product)}
                                  disabled={
                                    product !== undefined &&
                                    product.quantity &&
                                    product.quantity >=
                                    cartItemStock(
                                        product,
                                        product.selectedProductColor,
                                        product.selectedProductSize
                                    )
                                  }
                              >
                                +
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </>
              )
            })}
          </div>
          <div className={s.right}>
            <div className={s.title}>Итог заказа</div>
            <div className={s.details}>
              <div>
                Подытог
                <span>{getFormatPrice(cartTotalPrice)}</span>
              </div>
              <div>
                Доставка
                <span>{cartTotalPrice  ? '20000' : ''} UZS</span>
              </div>
              <div>
                Итого
                <span>
                {getFormatPrice(
                    (cartTotalPrice) + (cartTotalPrice ? 20000 : '')
                )}
              </span>
              </div>
            </div>
            <Link href='/checkout'>
              <a className={s.checkout}>Оформить заказ</a>
            </Link>
            {/*<Link href='/checkout'>*/}
            {/*  <a className={s.buy}>Купить сейчас</a>*/}
            {/*</Link>*/}
          </div>
        </div>
        {/* <ProductsList /> */}
      </div>
  ) : (
      <EmptyBlock/>
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
    addToCart: (item) => {
      dispatch(addToCart(item))
    },
    decreaseQuantity: (item, joki) => {
      dispatch(decreaseQuantity(item, joki))
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

export default connect(mapStateToProps, mapDispatchToProps)(CartMain)
