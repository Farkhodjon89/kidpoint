import React from 'react';
import s from "./Whishlist.module.scss";
import {getFormatPrice} from "../../../utils/price";
import Link from "next/link";

const Whishlist = ({cartItems,wishlistItems,deleteFromCart}) => {
  let cartTotalPrice = 0
  return (
      <div className={s.wrapper}>
        <div className={s.left}>
          {cartItems.map((product, i) => {
            const wishlistItem = wishlistItems.filter(
                (wishlistItem) => wishlistItem.id === product.id
            )[0]
            cartTotalPrice += product.onSale
                ? product.woocsSalePrice
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

                      <div className={s.separator}>
                        <div>
                          <div className={s.color}>
                            Кол-во:
                          </div>

                          <div className={s.amount_img}>
                            <span className={s.quantity}> {product.quantity}</span>
                            <img
                                src='/public/icons/arrowDown.svg'
                                alt=''
                                onClick={() => console.log("easy")}
                            />
                          </div>
                        </div>

                        <div
                            onClick={() => deleteFromCart(product.selectedProductId)}
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
                          <span className={s.quantity}> {product.quantity}</span>
                          <img
                              src='/public/icons/arrowDown.svg'
                              alt=''
                              onClick={() => console.log("easy")}
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                </>
            )
          })}
        </div>
      </div>
  );
};

export default Whishlist;