import React, {useState} from 'react'
import s from './buy-modal.module.scss'
import ReactModal from 'react-modal'
import axios from 'axios'
import Loader from '../Loader/loader'
import {getFormatPrice} from '../../utils/price'
import Link from 'next/link'
import MaskedInput from 'react-input-mask'
import {useForm} from "react-hook-form";
import icons from '../../public/fixture';
import ReactTooltip from "react-tooltip";

const BuyModal = ({
                    buy,
                    setBuy,
                    product,
                    selectedProductId,

                  }) => {
  const {register, handleSubmit, errors} = useForm();
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const makeOrder = async () => {
    setIsLoading(true)

    const orderData = {
      set_paid: false,
      currency: 'UZS',
      status: 'processing',
      payment_method_title: 'cash',
      line_items: [
        {
          product_id: product.databaseId,
          name: product.name,
          price: product.onSale ? product.salePrice : product.normalPrice,
          quantity: quantity,
          variation_id: product.variations && selectedProductId,
        },
      ],
      billing: {
        first_name: name,
        phone: phone,
      },
    }

    console.log(JSON.stringify(orderData))
    const response = await axios.post('/api/order', {order: orderData})

    setOrder(response.data.order)

    if (response.data.status) {
      setSuccess(true)
    } else {
      alert(response.data.message)
    }
    setIsLoading(false)
  }

  return (
      <ReactModal
          isOpen={buy}
          onRequestClose={() => (setBuy(false), setOrder())}
          ariaHideApp={false}
          overlayClassName={s.modalOverlay}
          className={s.modalContent}
      >
        <div className={s.modalTitle}>
          Купить сейчас
          <img
              src='/public/icons/close.svg'
              alt=''
              onClick={() => (setBuy(false), setOrder())}
          />
        </div>
        {success && order ? (
            <>
              <div className={s.successBlock}>
                <div>
                  <img src='/public/icons/successTick.svg' alt=''/> Спасибо за ваш заказ!
                </div>
                <div>
                  {order.billing.first_name}, вы можете ознакомиться с информацией о
                  заказе ниже
                </div>
              </div>
              <div className={s.modalTitle}>Детали заказа</div>
              <div className={s.details}>
                Имя и фамилия
                <span>{order.billing.first_name}</span>
              </div>
              <div className={s.details}>
                Номер телефона
                <span>{order.billing.phone}</span>
              </div>
              <div className={s.details}>
                Доставка
                <span>15 000 UZS</span>
              </div>
              <div className={s.details}>
                Итого
                <span>
              {getFormatPrice(
                  parseInt(
                      product.onSale
                          ? product.woocsSalePrice
                          : product.woocsRegularPrice
                  ) * quantity
              )}
            </span>
              </div>
              <Link href='/'>
                <a> Вернутся на главную </a>
              </Link>
            </>
        ) : (
            <>
              <div className={s.productName}> {product.name} </div>
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
                    Количество:
                    <div className={s.quantity}>
                      <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                        -
                      </button>
                      <input
                          type='text'
                          value={quantity}
                          readOnly
                      />
                      <button onClick={() => quantity < product.stockQuantity && setQuantity(quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.inputs}>
                <input
                    name='name'
                    placeholder='Ваше имя'
                    onChange={(e) => setName(e.target.value)}
                    ref={register({required: true})}
                />
                {errors.name ? (
                    <div className={s.errorMessage}>
                <span
                    dangerouslySetInnerHTML={{__html: icons.warning}}
                    data-for="error"
                    data-tip
                />
                    </div>
                ) : null}

              </div>
              <div className={s.inputs}>
                <MaskedInput
                    placeholder='+998   _ _   _ _ _   _ _   _ _'
                    onChange={(e) => setPhone(e.target.value)}
                    name='phone'
                    mask='+\9\98999999999'
                    alwaysShowMask
                    value={phone}
                    className={errors.phone && s.error}
                >
                  {(inputProps) => (
                      <input
                          ref={register({
                            required: true,
                            pattern: /^[\+]?[0-9]{12}$/im,
                          })}

                          name={inputProps.name}
                          {...inputProps}
                      />
                  )}
                </MaskedInput>
                {errors.phone ? (
                    <div className={s.errorMessage}>
              <span
                  dangerouslySetInnerHTML={{__html: icons.warning}}
                  data-for="error"
                  data-tip
              />
                      <ReactTooltip id="error" type="dark" effect="solid">
                        <span>Необходимо заполнить</span>
                      </ReactTooltip>
                    </div>
                ) : null}

              </div>

              <div className={s.details}>
                Итого
                <span>
              {getFormatPrice(
                  parseInt(
                      product.onSale
                          ? product.woocsSalePrice
                          : product.woocsRegularPrice
                  ) * quantity
              )}
            </span>
              </div>
              {isLoading ? (
                  <Loader/>
              ) : (
                  <button onClick={handleSubmit(makeOrder)}>Купить сейчас</button>
              )}
            </>
        )}
      </ReactModal>
  )
}

export default BuyModal
