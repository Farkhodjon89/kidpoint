import React, { useState } from 'react'
import s from './index.module.scss'
import Breadcrumbs from '../../components/Breadcrumbs/breadcrumbs'
import Link from 'next/link'

const ContactsMain = () => {
  const [active, setActive] = useState(1)
  const breadcrumbs = [
    {
      name: 'Главная',
      slug: '/'
    },
    {
      name: 'Контакты',
      slug: `/contacts`
    }
  ]
  const data = [
    // {
    //   id: 1,
    //   name: 'ТРЦ «Poytaxt»',
    //   store: 'ТРЦ «Poytaxt» 1 этаж,',
    //   address: 'ТРЦ «Poytaxt» 1 этаж',
    //   phone: '+998946258855',
    //   image: '/contacts/1.jpg'
    // },
    // {
    //   id: 2,
    //   name: 'ТРЦ «Mega Planet»',
    //   store: 'ТРЦ «Mega Planet», 3 этаж',
    //   address: 'ТРЦ «Mega Planet», 3 этаж',
    //   phone: '+998970013779',
    //   image: '/contacts/2.jpg'
    // },
    // {
    //   id: 3,
    //   name: 'ТРЦ «Samarqand Darvoza»',
    //   store: 'ТРЦ «Samarqand Darvoza», 3 этаж',
    //   address: 'ТРЦ «Samarqand Darvoza», 3 этаж',
    //   phone: '+998977390855',
    //   image: '/contacts/3.jpg'
    // },
    {
      id: 1,
      name: 'ТРЦ «Atlas Chimgan»',
      store: 'ТРЦ «Atlas Chimgan»',
      address: 'улица Темур Малик 3-А',
      phone: ' +998 97 720 16 16',
      image: '/contacts/4.jpg'
    },
    // {
    //   id: 5,
    //   name: 'NCS OUTLET в ТРЦ «Compass»',
    //   store: 'NCS OUTLET в ТРЦ «Compass», 1 этаж',
    //   address: 'NCS OUTLET в ТРЦ «Compass», 1 этаж',
    //   phone: '+998712055025',
    //   image: '/contacts/5.jpg'
    // }
  ]
  return (
    <div>
      <div className={s.title}>Контакты</div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={s.wrapper}>
        <div className={s.left}>
          <div className={s.name}> Наши филиалы </div>
          {data.map(({ id, name }) => (
            <div key={id} onClick={() => setActive(id)} className={`${s.leftDivs} ${active === id ? s.active : ''}`}>
              {name}
            </div>
          ))}
        </div>
        <div className={s.right}>
          {data.map(
            ({ id, name, store, address, phone, image }) =>
              active === id && (
                <div key={id}>
                  <div className={s.name}>{name}</div>
                  <div className={s.rightDivs}>
                    Магазин: <span> {store} </span>
                  </div>
                  <div className={s.rightDivs}>
                    Адрес: <span> {address} </span>
                  </div>
                  <div className={s.rightDivs}>
                    Номер телефона:
                    <span>
                      <Link href={`tel:${phone}`}>
                        <a> {phone} </a>
                      </Link>
                    </span>
                  </div>
                  {/*<img src={image} alt='' />*/}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactsMain
