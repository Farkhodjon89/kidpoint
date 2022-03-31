import React, {useEffect, useState} from 'react'
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
import COUPON from '../../queries/coupon'
import client from "../../apollo/apollo-client";
import {useLazyQuery} from "@apollo/react-hooks";
import Loader from "../Loader/loader";
import {getFormat} from "../../utils";

const CartMain = ({
                    cartItems,
                    deleteFromCart,
                    decreaseQuantity,
                    addToCart,


                  }) => {

  const [loadCupon, {data, loading, error}] = useLazyQuery(COUPON, {
    client,
  })

  const [name, setName] = useState('')
  const [myCoupon, setMyCoupon] = useState(
      typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('coupon'))
          : ' '
  )
  const sendCupon = () => {
    loadCupon({
      variables: {
        id: name,
      },
    })
  }

  useEffect(() => {
    if (data && data.coupon) {
      localStorage.setItem('coupon', JSON.stringify(data.coupon))
      setMyCoupon(JSON.parse(localStorage.getItem('coupon')))
    }
  }, [data])

  let couponFront
  let cartTotalPrice = 0

  if (myCoupon && myCoupon.amount) {
    switch (myCoupon.discountType) {
      case 'FIXED_CART':
        cartTotalPrice -= myCoupon.amount
        couponFront = getFormat(myCoupon.amount) + ' сум'
        break
      case 'PERCENT':
        cartTotalPrice = Math.round(
            cartTotalPrice - cartTotalPrice * (myCoupon.amount / 100)
        )
        couponFront = myCoupon.amount + ' %'
        break
      default:
        break
    }
    localStorage.setItem('cartTotalPriceFront', cartTotalPrice)
  }


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
            <div className={s.rightInner}>
              <div className={s.title}>Итог заказа</div>
              <div className={s.details}>
                <div>
                  Подытог
                  <span>{getFormatPrice(cartTotalPrice)}</span>
                </div>
                <div>
                  Купон <span>{couponFront ? couponFront : '0 UZS'}</span>
                </div>
                <div>
                  Доставка
                  <span>{cartTotalPrice ? '20000' : ''} UZS</span>
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

            </div>
            <div className={s.promoCode}>У вас есть промокод?</div>
            {loading ? (
                <Loader coupon/>
            ) : myCoupon ? (
                <div className={s.activatedPromoCode}>
                  Промокод <div>{myCoupon.code}</div> активирован!
                  <button
                      onClick={() => {
                        setMyCoupon(localStorage.removeItem('coupon'))
                        setName('')
                      }}
                  >
                    Отменить
                  </button>
                </div>
            ) : (
                <>
                  {error && (
                      <div className={s.wrongPromoCode}>Неправильный промокод</div>
                  )}
                  <div className={s.sendPromoCode}>
                    <input
                        type="text"
                        placeholder="Введите промокод"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={sendCupon}>Применить</button>
                  </div>
                </>
            )}

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
