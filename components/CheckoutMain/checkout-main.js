import React, {useState, useEffect} from 'react'
import s from './checkout-main.module.scss'
import EmptyBlock from '../EmptyBlock/empty-block'
import {connect} from 'react-redux'
import axios from 'axios'
import {
  Input,
  DeliveryInput,
  PaymentInput,
  Textarea, CashInput,
} from '../../utils/inputs'
import Loader from '../Loader/loader'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import MaskedInput from 'react-input-mask'
import sha512 from 'js-sha512'
import useUser from "../../utils/useUser";
import {RegionDropdown} from "react-country-region-selector";
import {getFormatPrice} from "../../utils/price";
import Link from "next/link";

const cities = [
  "Ташкент",
  "Республика Каракалпакстан",
  "Андижанская область",
  "Бухарская область",
  "Джизакская область",
  "Кашкадарьинская область",
  "Навоийская область",
  "Наманганская область",
  "Самаркандская область",
  "Сурхандарьинская область",
  "Сырдарьинская область",
  "Ташкентская область",
  "Ферганская область",
  "Хорезмская область",
];
const paymentMethods = [
  {
    value: 'cash',
    name: 'Оплата наличными или картой при получении',
    img: '',
  },
  {
    value: 'payme',
    name: '',
    img: '/icons/payme.svg',
  },
  {
    value: 'uzcard',
    name: '',
    img: '/icons/uzcard.svg'
  },
  {
    value: 'click',
    name: '',
    img: '/icons/click.svg'
  }
]

const cashPayment = paymentMethods.filter((_, index) => index === 0)
const otherPayment = paymentMethods.filter((_, index) => index !== 0)

const CheckoutMain = ({cartItems}) => {
  const {register, handleSubmit, errors, setValue} = useForm()
  const user = process.browser && JSON.parse(localStorage.getItem('info'));
  const router = useRouter()
  const lineItems = []
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState(user && user.city ? user.city : 'Toshkent shahri');
  const [country, setCountry] = useState(user && user.country ? user.country : 'Uzbekistan');
  const [address, setAddress] = useState('')
  const [delivery, setDelivery] = useState(`Доставка курьером`)
  const [payment, setPayment] = useState('cash')
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [checkboxTicked, setCheckboxTicked] = useState(false)
  const [selectMethod, setSelectMethod] = useState(paymentMethods[0].value)
  const [order, setOrder] = useState()
  const {userData} = useUser();

  useEffect(() => {
    if (userData && userData.isLoggedIn) {
      setValue('firstName', userData.user.firstName)
      setValue('lastName', userData.user.lastName)
      setValue('phone', userData.user.billing.phone)
      setPhone(userData.user.billing.phone)
      setValue('email', userData.user.email)
      setValue('city', cities.includes(userData.user.billing.city) ? userData.user.billing.city : 'Ташкент')
      setValue('address', userData.user.billing.address1)
    }
  }, [userData]);


  for (const product of cartItems) {
    lineItems.push({
      product_id: product.databaseId,
      name: product.name,
      price: product.onSale
          ? product.woocsSalePrice
          : product.woocsRegularPrice,
      quantity: product.quantity,
      variation_id: product.variations && product.selectedProductId,
    })
  }

  let cartTotalPrice = 0
  cartItems.map(
      ({woocsRegularPrice, onSale, woocsSalePrice, quantity}) =>
          (cartTotalPrice += onSale ? woocsSalePrice : woocsRegularPrice * quantity)
  )

  const deliveryMethods = [
    {
      left: 'Доставка курьером',
      right: cartTotalPrice >= 500000 ? '0 UZS' : '25 000 UZS',
    },
    // {
    //   left: 'Самовывоз из магазина',
    //   right: 'Бесплатно',
    // },
  ]
  const sendInfo = async () => {
    setIsLoading(true);

    const orderData = {
      customer_id: userData?.isLoggedIn ? userData.user.databaseId : 0,
      set_paid: false,
      currency: "UZS",
      status: selectMethod === "cash" ? "processing" : "pending",
      payment_method_title:
          selectMethod === "cash"
              ? "Оплата наличными или картой при доставке"
              : selectMethod,
      line_items: lineItems,
      billing: {
        country: country,
        address_1: address,
        city: city,
        first_name: name,
        last_name: surname,
        phone: phone,
      },
      shipping_lines: [
        {
          method_id:
              setDelivery === "flat_rate" ? "flat_rate" : "local_pickup",
          method_title:
              setDelivery === "flat_rate"
                  ? "Доставка курьером"
                  : "Самовывоз из магазина",
          total: getDeliveryPrice().toLocaleString(),
        },
      ],
      customer_note: comment && comment,
    };

    const response = await axios.post('/api/order', {order: orderData})

    // if (response.data.status) {
    //   setOrder(response.data.order)
    //   if (payment === 'zoodpay') {
    //     axios
    //       .post('/api/zoodpay', {
    //         data: {
    //           customer: {
    //             customer_email: 'test@gmail.com',
    //             customer_phone: response.data.order.billing.phone,
    //             first_name: response.data.order.billing.first_name
    //           },
    //           items: response.data.order.line_items.map(({ name, price, quantity }) => ({
    //             categories: [['test', 'test']],
    //             name: name,
    //             price: price,
    //             quantity: quantity
    //           })),
    //           order: {
    //             amount: response.data.order.total,
    //             currency: 'UZS',
    //             market_code: 'UZ',
    //             merchant_reference_no: response.data.order.id.toString(),
    //             service_code: 'ZPI',
    //             signature: sha512(`B!LLZ_W@rk|${response.data.order.id}|${response.data.order.total}|UZS|UZ|w*]7J8K%`)
    //           },
    //           shipping: {
    //             address_line1: response.data.order.billing.address_1,
    //             country_code: 'UZB',
    //             name: response.data.order.billing.first_name,
    //             zipcode: '100096'
    //           }
    //         }
    //       })
    //       .then(function (response) {
    //         window.location.assign(response.data.data.payment_url)
    //         localStorage.clear()
    //       })
    //       .catch(function (error) {
    //         console.log(error)
    //         setIsLoading(false)
    //       })
    //   } else {
    //     await window.location.assign(`/order/${response.data.order.order_key}`)
    //     localStorage.clear()
    //   }
    // } else {
    //   alert(response.data.message)
    //   setIsLoading(false)
    // }
    setOrder(response.data.order)
    if (response.data.status) {
      if (payment === 'cash') {
        await window.location.assign(`/order/${response.data.order.order_key}`)
        localStorage.clear()
      } else {
        const form = document.querySelector(`#${payment}-form`)
        if (form) {
          form.submit()
        }
        localStorage.clear()
      }
    } else {
      alert(response.data.message)
      router.reload()
    }
  }

  let orderReviewData = {
    price: 0,
    sale: 0,
    totalPrice: 0,
    button: (
        <button
            onClick={handleSubmit(sendInfo)}
            disabled={isLoading}
            className={s.orderButton}
        >
          {isLoading ? (
              <div className={s.loaderAnimation}></div>
          ) : (
              <>Оформить заказ</>
          )}
        </button>
    ),
  }
  const getDeliveryPrice = () => {
    return setDelivery === 'flat_rate' && orderReviewData.totalPrice < 500000
        ? 25000
        : 0
  }


  const fields = [
    {
      title: 'Персоналные данные',
      actions: [
        <Input
            name='firstName'
            placeholder='Ваше имя'
            setAction={setName}
            innerRef={register({required: true})}
            style={errors.name && s.error}
        />,
        <Input
            name='lastName'
            setAction={setSurname}
            placeholder='Фамилия *'
            innerRef={register({required: true})}
            style={errors.name && s.error}
        />,
        <MaskedInput
            name='phone'
            mask='+\9\98999999999'
            alwaysShowMask
            className={errors.phone && s.error}
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
        >
          {(inputProps) => (
              <input
                  ref={register({
                    required: true,
                    pattern: /^[\+]?[0-9]{12}$/im,
                  })}
                  value={phone}
                  name={inputProps.name}
                  {...inputProps}
              />
          )}
        </MaskedInput>,
        <Input
            name='email'
            setAction={setEmail}
            value={email}
            innerRef={register({required: false})}
            placeholder='Введите email(необязательно)'
            onChange={(e) => validateEmail(e)}
        />,
        <input
            id="country"
            name="country"
            onChange={(e) => setCountry(e.target.value)}
            ref={register({required: true})}
            className={`${errors.country && s.error} ${country ? s.valid : ""}`}
            value='Узбекистан'
            disabled={true}
            placeholder='Узбекистан'
        />,
        <RegionDropdown
            country={country}
            value={city}
            onChange={(val) => setCity(val)}
            placeholder='Город *'
            // setAction={setCity}
            className={errors.city && s.errorInput}
            blankOptionLabel="Старана не выбрана"
            defaultOptionLabel="Выберите город"
        />

      ],
    },
    {
      title: 'Способ доставки',
      rowStyle: 'full',
      actions: [
        <DeliveryInput
            delivery={delivery}
            setDelivery={setDelivery}
            deliveryMethods={deliveryMethods}
        />,
      ],
    },
    {
      title: 'Метод оплаты',
      rowStyle: 'full',
      actions: [
        <CashInput payment={payment}
                   setPayment={setPayment}
                   cashPayment={cashPayment}/>,
        <PaymentInput
            payment={payment}
            setPayment={setPayment}
            otherPayment={otherPayment}
        />,
      ],
    },
  ]


  // console.log(`order`, order)

  const host =
      process.env.NODE_ENV === 'production'
          ? 'https://bloomshop.uz'
          : 'http://localhost:3000'

  return cartItems.length >= 1 ? (
      <div className={s.wrapper}>
        <form id='payme-form' method='post' action='https://checkout.paycom.uz'>
          <input type='hidden' name='merchant' value='607843bee928245e531ce1d3'/>

          <input type='hidden' name='amount' value={order?.total * 100}/>

          <input
              type='hidden'
              name='account[order_id]'
              value={order && order.id}
          />

          <input type='hidden' name='lang' value='ru'/>

          <input
              type='hidden'
              name='callback'
              value={`${host}/order/${order && order.order_key}`}
          />
        </form>
        {/*<div className={s.main}>Оформление заказа</div>*/}
        {fields.map(({title, rowStyle = '2cols', actions}, i) => (
            <div key={i}>
              <div className={s.title}>
                {title} <span> {i + 1} </span>
              </div>
              <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                {actions.map((r, i) => (
                    <div className={`${s.action} ${rowStyle === 'full' ? s.actionFullRow : ''}`} key={i}>
                      {r}
                    </div>
                ))}
              </div>
              {i === 0 && (
                  <>
                    <div>
                      <Input
                          name='address'
                          placeholder='Адрес доставки *'
                          setAction={setAddress}
                          innerRef={register({required: true})}
                          style={errors.address && s.error}
                          className={s.input}
                      />
                    </div>
                    <div>
                      <Textarea className={s.textArea} setComment={setComment}/>
                    </div>

                  </>
              )}

            </div>
        ))}
        <div className={s.right}>
          <div className={s.title2}>Итог заказа</div>
          <div className={s.details}>
            <div>
              Подытог
              <span>{getFormatPrice(cartTotalPrice)}</span>
            </div>
            <div>
              Доставка
              <span>{cartTotalPrice >= 500000 ? '0' : '25000'} UZS</span>
            </div>
            <div>
              Итого
              <span>
                {getFormatPrice(
                    (cartTotalPrice) + (cartTotalPrice >= 500000 ? 0 : 25000)
                )}
              </span>
            </div>
          </div>
        </div>

        {isLoading ? (
            <Loader/>
        ) : (
            <button disabled={!checkboxTicked} className={checkboxTicked ? s.submit : s.disabled}
                    onClick={handleSubmit(sendInfo)}>
              Перейти к оплате
            </button>
        )}
        <div className={s.checkbox}>
          <input type='checkbox' onClick={() => setCheckboxTicked(prev => !prev)}/>
          <label>Я прочитал и согласен с условиями использования сайта*</label>
        </div>
      </div>

  ) : (
      <EmptyBlock/>
  )
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  }
}

export default connect(mapStateToProps)(CheckoutMain)
