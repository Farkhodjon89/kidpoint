import s from './cart-modal.module.scss'
import React, {useRef, useEffect, useState} from 'react'
import Link from 'next/link'
import {getFormatPrice} from '../../utils/price'
import {cartItemStock, decreaseQuantity, addToCart, deleteFromCart} from "../../redux/actions/cartActions";
import {addToWishlist, deleteFromWishlist} from "../../redux/actions/wishlistActions";
import {connect} from "react-redux";
import {hideCartModal} from "../../redux/actions/modalActions";

const CartModal = ({cartItems, deleteFromCart, decreaseQuantity, addToCart, hideCartModal, modalState}) => {
  const myRef = useRef()
  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      hideCartModal && hideCartModal()
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })
  useEffect(() => {
    hideCartModal()
  }, [])

  let cartTotalPrice = 0

  return (
      <>
        {/*<div className={`${s.superWrapper} ${!cartModal ? s.active : ''}`}></div>*/}
        <div ref={myRef} className={`${s.wrapper}  ${modalState.cart ? s.active : ''}`}>
          <div className={s.top}>
            Корзина
            <img
                src='/public/icons/close.svg'
                alt=''
                onClick={() => hideCartModal()}
            />
          </div>
          <div className={s.cardList}>
            {cartItems.map((product, i) => {
              cartTotalPrice += product.onSale
                  ? product.woocsSalePrice * product.quantity
                  : product.woocsRegularPrice * product.quantity
              return (

                  <div className={s.card} key={i}>
                    <div className={s.cardTop}>
                      <div className={s.name}> {product.name} </div>
                      <div className={s.action}>
                        <div
                            onClick={() => deleteFromCart(product.selectedProductId)}
                        >
                          Удалить
                        </div>
                      </div>
                    </div>
                    <div className={s.cardInner}>
                      <img src={product.image.sourceUrl} alt='' className={s.img}/>
                      <div className={s.info}>
                        <div className={s.price}>
                          {getFormatPrice(
                              product.onSale
                                  ? product.woocsSalePrice
                                  : product.woocsRegularPrice
                          )}
                        </div>
                        <div className={s.color}>
                          Количество:
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
                            <input
                                type='text'
                                value={product.quantity}
                                readOnly
                            />
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
                        <div className={s.color2}>
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
                            <input
                                type='text'
                                value={product.quantity}
                                readOnly
                            />
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

                        {product.selectedProductColor && (
                            <div className={s.colorSize}>
                              Цвет:<span>{product.selectedProductColor}</span>
                            </div>
                        )}
                        {/*{product.selectedProductSize && (*/}
                        {/*    <div className={s.colorSize}>*/}
                        {/*      Размер: <span>{product.selectedProductSize}</span>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                      </div>
                    </div>
                  </div>
              )
            })}
          </div>
          <div className={s.bot}>
            <div className={s.details}>
              Итого
              <span>{getFormatPrice(cartTotalPrice)}</span>
            </div>
            <Link href='/cart'>
              <a className={s.checkout}>Оформить заказ</a>
            </Link>
            {/*<Link href='/cart'>*/}
              <a onClick={() => hideCartModal()} className={s.checkout2}>Продолжить покупки</a>
            {/*</Link>*/}
          </div>
        </div>
      </>

  )
}


const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    modalState: state.modalState
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
    hideCartModal: () => {
      dispatch(hideCartModal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
