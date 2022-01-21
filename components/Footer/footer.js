import React from 'react'
import s from './footer.module.scss'
import Link from 'next/link'
import icons from '../../public/fixture';

const Footer = ({categories}) => {
  const links = [
    // {
    //   title: 'Страницы',
    //   child: [
    //     {
    //       id: 1,
    //       name: 'Каталог',
    //       slug: '/catalog'
    //     },
    //     // {
    //     //   id: 2,
    //     //   name: 'Бренды',
    //     //   slug: '/brands'
    //     // },
    //     {
    //       id: 2,
    //       name: 'Акции',
    //       slug: '/sales'
    //     },
    //     // {
    //     //   id: 2,
    //     //   name: 'Подарочные карты',
    //     //   slug: '/cards'
    //     // },
    //     // {
    //     //   id: 3,
    //     //   name: 'Клиентские дни',
    //     //   slug: '/client-days'
    //     // },
    //
    //   ]
    // },

    {
      title: 'Категории',
      child: Object.values(categories).map(({ name, slug }) => ({
        name: name,
        slug: '/catalog/' + slug,
      })),
    },
    // {
    //   child: [
    //     {
    //       name: 'Уход за волосами',
    //       slug: '/offer',
    //     },
    //     {
    //       name: 'Мужчинам',
    //       slug: '/privacy',
    //     },
    //     {
    //       name: 'Детям',
    //       slug: '/privacy',
    //     },
    //     {
    //       name: 'Подарки',
    //       slug: '/privacy',
    //     },
    //     {
    //       name: 'Бижутерия',
    //       slug: '/privacy',
    //     },
    //   ],
    // },
    {
      title: 'Помощь',
      child: [
        {
          name: 'Публичная оферта',
          slug: '/offer',
        },
        {
          name: 'Политика конфиденциальности',
          slug: '/privacy',
        },
      ],
    },

    {
      title: 'О компании',
      child: [
        {
          name: 'О нас',
          slug: '/about',
        },
        {
          name: 'Контакты',
          slug: '/contacts',
        },
      ],
    },
  ]
  const references = {
    child: [

      {
        name: 'Instagram',
        img: '/footer/instagram.svg',
        slug: 'https://www.instagram.com/bloombeauty.uz/',
      },
      {
        name: 'Facebook',
        img: '/footer/facebook.svg',
        slug: 'https://www.facebook.com/bloombeauty.uz',
      },
      {
        name: 'Telegram',
        img: '/footer/telegram.svg',
        slug: 'https://t.me/bloombeautyuz',
      },
    ],
  }


  return (
      <div className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.top}>
            <div className={s.references}>
              <div>
                <img src='/footer/logoBig.svg'/>
              </div>
              <div className={s.referencesWrapper}>
                {references.child.map(({img, slug}, i) => (
                    <Link href={slug} key={i}>
                      <a>
                        <img src={img} alt=''/>
                      </a>
                    </Link>
                ))}
              </div>

            </div>
            {links.map(({id, title, parentSlug, child}, i) => (
                <div key={i}>
                  <span> {title} </span>
                  {child.map(({name, slug}, i) => (
                      <Link href={slug} key={i}>
                        <a>{name}</a>
                      </Link>
                  ))}
                </div>
            ))}
          </div>
          <div className={s.bot}>
            <div className={s.botInner}>
              <div>© 2022 Kid Point. Все права защищены</div>
              <ul className={s.center}>
                <li>
                  <span dangerouslySetInnerHTML={{__html: icons.click}}></span>
                </li>
                <li>
                  <span dangerouslySetInnerHTML={{__html: icons.payme}}></span>
                </li>
                <li>
                  <span dangerouslySetInnerHTML={{__html: icons.uzcard}}></span>
                </li>
              </ul>
              <Link href='https://billz.uz/e-market'>
                <a target='_blank' rel='nofollow'>
                  E-commerce решение от
                  <img src='/footer/billz.svg' alt=''/>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Footer
