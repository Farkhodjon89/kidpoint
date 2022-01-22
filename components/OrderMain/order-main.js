import React from 'react'
import s from './order-main.module.scss'
import Link from 'next/link'
import { getFormatPrice } from '../../utils/price'

const OrderMain = ({ order }) => {
  const personalInfo = [
    {
      title: 'Персоналные данные',
      details: [
        `Имя: <span>${order.billing.firstName}</span>`,
        `Номер телефона: <span>${order.billing.phone}</span>`,
        `Адрес: <span>${order.billing.address1}</span>`,
      ],
    },
    {
      title: 'Способ доставки',
      details: ['Доставка курьером по Узбекистану'],
    },
    {
      title: 'Метод оплаты',
      details: ['Оплата наличными или картой при получении'],
    },
  ]

  const data = {
    title: 'Итог заказа',
    details: [
      {
        label: `Товары (${order.lineItems.nodes.length})`,
        value: getFormatPrice(parseInt(order.total)),
      },
      {
        label: order.shippingLines.nodes[0].methodTitle,
        value: getFormatPrice(
          order.shippingLines.nodes[0].total === null
            ? 0
            : order.shippingLines.nodes[0].total
        ),
      },
      {
        label: `Итого`,
        value: getFormatPrice(parseInt(order.total) + 15000),
      },
    ],
  }

  return (
    <div className={s.wrapper}>
      <div className={s.main}>Спасибо за ваш заказ!</div>
      <div className={s.mainOrder}>
        Номер заказа: <span> №{order.databaseId} </span>
      </div>
      <div className={s.successBlock}>
        <div>
          <img src='/public/icons/successTick.svg' alt='' /> Спасибо за ваш заказ!
        </div>
        <div>
          {order.billing.firstName}, вы можете ознакомиться с информацией о
          заказе ниже
        </div>
      </div>
      {personalInfo.map(({ title, details }, i) => (
        <div key={i}>
          <div className={s.title}>{title}</div>
          <div className={s.info}>
            {details.map((r, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: r }} />
            ))}
          </div>
        </div>
      ))}
      <div className={s.title}>{data.title}</div>
      <div className={s.details}>
        {data.details.map(({ label, value }, i) => (
          <div key={i}>
            {label}
            <span> {value} </span>
          </div>
        ))}
      </div>
      <Link href='/'>
        <a className={s.finish}>Вернутся на главную</a>
      </Link>
      <div className={s.lastBlock}>
        <div>
          <img src='/public/icons/phone.svg' alt='' /> Круглосуточная поддержка
        </div>
        <div>
          Если у вас возникли вопросы, вы можете обратиться по телефону и мы
          обязательно решим возникший вопрос{' '}
          <Link href='tel:+998 99 610-77-88'>
            <a>+998 99 610-77-88</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderMain
