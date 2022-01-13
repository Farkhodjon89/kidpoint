import React from 'react'
import s from './services.module.scss'

const data = [
  {
    img: '/home/car.svg',
    title: 'Qulay yetkazib berish',
    text: 'Toshkent shahrida o`tkazilgan 500000 so`m va undan ortiq narxga buyurtma berishda'
  },
  {
    img: '/home/card.svg',
    title: 'Istalgan tolov turi',
    text: 'Saytda xaridlar uchun pul to`lashingiz mumkin siz uchun qulay bo`lgan har qanday usulda'
  },
  {
    img: '/home/phone.svg',
    title: 'Qo`llav quvatlash markazi',
    text: 'Hayot sifatini yaxshilashga intilishlarida ular mohiyatni tushunishni unutishadi'
  },
  {
    img: '/home/discount.svg',
    title: 'Aksiyalar va chegirmalar',
    text: 'Pozitsiyani shakllantirish bo`yicha kundalik ishlarning boshlanishi tayyorgarlikka hissa qo`shadi'
  }
]

const Services = ({ home }) => {
  return home ? (
    <div className={s.wrapper}>
      <div className={s.inner}>
        {data.map((r, i) => (
          <div key={i} className={s.block}>
            <img src={r.img} alt='' />
            <div className={s.title}> {r.title} </div>
            <div className={s.text}> {r.text} </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className={s.innerTwo}>
      {data.map((r, i) => (
        <div key={i} className={s.blockTwo}>
          <img src={r.img} alt='' />
          <div className={s.titleTwo}> {r.title} </div>
        </div>
      ))}
    </div>
  )
}

export default Services
