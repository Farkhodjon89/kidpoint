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
import {getPrice} from "../../utils";

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
    name: 'Оплата наличными при получении',
    img: '',
  },
  {
    value: 'payme',
    name: '',
    img: '/public/icons/payme.svg',
  },
  // {
  //   value: 'uzcard',
  //   name: '',
  //   img: '/icons/uzcard.svg'
  // },
  {
    value: 'click',
    name: '',
    img: '/public/icons/click.svg'
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
  // const [payment, setPayment] = useState('cash')
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [checkboxTicked, setCheckboxTicked] = useState(true)
  const [selectMethod, setSelectMethod] = useState(paymentMethods[0].value)
  const [order, setOrder] = useState()
  const [selectDelivery, setSelectDelivery] = useState(delivery[0].value);
  const {userData} = useUser();

  useEffect(() => {
    if (userData && userData.isLoggedIn) {
      setName(userData.user.firstName)
      setSurname(userData.user.lastName)
      setPhone(userData.user.billing.phone)
      setEmail(userData.user.email)
      const userCity = cities.includes(userData.user.billing.city)
          ? userData.user.billing.city
          : 'Ташкент'
      setCity(userCity)
      setValue('city', userCity)
      setAddress(userData.user.billing.address1)
    }
  }, [userData])


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
      right: cartTotalPrice >= 500000 ? '0 UZS' : '20 000 UZS',
    },
    {
      left: 'Самовывоз из магазина',
      right: 'Бесплатно',
    },
  ]

  const getDeliveryPrice = () => {
    return setDelivery === 'flat_rate' && orderReviewData.totalPrice < 500000
        ? 20000
        : 0
  }
  const sendInfo = async () => {
    setIsLoading(true)

    const orderData = {
      customer_id: userData?.isLoggedIn ? userData.user.databaseId : 0,
      set_paid: false,
      currency: 'UZS',
      status: selectMethod === 'cash' ? 'processing' : 'pending',
      payment_method_title:
          selectMethod === 'cash'
              ? 'Оплата наличными или картой при доставке'
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
              selectDelivery === 'flat_rate' ? 'flat_rate' : 'local_pickup',
          method_title:
              selectDelivery === 'flat_rate'
                  ? 'Доставка курьером'
                  : 'Самовывоз из магазина',
          total: getDeliveryPrice().toLocaleString(),
        },
      ],
      customer_note: comment && comment,
    }

    // if (email) {
    //   orderData.billing.email = email
    // }

    const response = await axios.post('/api/order', { order: orderData })

    if (response.data.status) {
      setOrder(response.data.order)

      if (selectMethod === 'cash') {
        await router.replace(`/order/${response.data.order.order_key}`)
        localStorage.clear()
      } else {
        const form = document.querySelector(`#${selectMethod}-form`)
        if (form) {
          form.submit()
        }
        localStorage.clear()
      }
    } else {
      alert(response.data.message)
      router.reload()
    }

    setIsLoading(false)
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
  for (const product of cartItems) {
    const {normalPrice, salePrice} = getPrice(product);

    orderReviewData.price += parseInt(normalPrice) * product.quantity;
    orderReviewData.sale += parseInt(normalPrice) - parseInt(salePrice) * product.quantity;
    console.log(orderReviewData.sale)

    let deliveryPrice = selectDelivery === 'flat_rate' ? 0 : 0;
    orderReviewData.totalPrice = orderReviewData.price /*- orderReviewData.sale*/ + deliveryPrice;
  }

  // console.log(`order`, orderReviewData.totalPrice)


  const fields = [
    {
      title: 'Персоналные данные',
      actions: [
        <input
            name='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            ref={register({ required: true })}
            style={errors.name && s.error}
            className={s.input}
            placeholder='Имя*'
        />,
        <input
            name='surname'
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            ref={register({ required: true })}
            style={errors.surname && s.error}
            className={s.input}
            placeholder='Фамилия*'
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
        <input
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            ref={register({ required: false })}
            value={email}
            style={errors.name && s.errorInput}
            className={s.input}
            placeholder='Введите email(необязательно)'
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
        <CashInput selectMethod={selectMethod}
                   setSelectMethod={setSelectMethod}
                   cashPayment={cashPayment}/>,
        <PaymentInput
            selectMethod={selectMethod}
            setSelectMethod={setSelectMethod}
            otherPayment={otherPayment}
        />,
      ],
    },
  ]


  // console.log(`order`, order)

  const host =
      process.env.NODE_ENV === 'production'
          ? 'https://kidpoint.uz'
          : 'http://localhost:3000'

  return cartItems.length >= 1 ? (
      <div className={s.wrapper}>
        <form id='payme-form' method='post' action='https://checkout.paycom.uz'>
          <input type='hidden' name='merchant' value='61f3e5e26b2af010e78d7835'/>

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
        <form id="click-form" method="get" action="https://my.click.uz/services/pay">
          <input type="hidden" name="merchant_id" value="14802"/>
          <input type="hidden" name="transaction_param" value={order && order.id}/>
          <input type="hidden" name="service_id" value="20491"/>
          <input type="hidden" name="amount" value={orderReviewData.totalPrice}/>
          <input
              type="hidden"
              name="return_url"
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
                      <input
                          name='address'
                          onChange={(e) => setAddress(e.target.value)}
                          ref={register({ required: true })}
                          style={errors.address && s.error}
                          className={s.input}
                          value={address}
                          placeholder='Адрес доставки(район, улица, дом, квартира) *'
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
              <span>{cartTotalPrice >= 500000 ? '0' : '20000'} UZS</span>
            </div>
            <div>
              Итого
              <span>
                {getFormatPrice(
                    (cartTotalPrice) + (cartTotalPrice >= 500000 ? 0 : 20000)
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
          <input type='checkbox' defaultChecked={true} onClick={() => setCheckboxTicked(prev => !prev)}/>
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
