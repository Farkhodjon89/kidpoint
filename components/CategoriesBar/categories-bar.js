import React, {useState} from 'react'
import s from './categories-bar.module.scss'
import Link from 'next/link'
import CategoriesModal from "../CategoriesModal/categories-modal";

const pages = [
  // {
  //   id: 0,
  //   name: 'Бренды',
  //   slug: '/brands#A'
  // },
  {
    id: 1,
    name: 'Акции',
    slug: '/sales'
  },
  // {
  //   id: 2,
  //   name: 'Подарочные карты',
  //   slug: '/cards'
  // },
  // {
  //   id: 2,
  //   name: 'Клиентские дни',
  //   slug: '/client-days'
  // },

]

const CategoriesBar = ({categories}) => {
  const [isShown, setIsShown] = useState(false)
  return (
      <div className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.catalog}
               onMouseEnter={() => setIsShown(true)}
               onMouseLeave={() => setIsShown(false)}
               style={{display: 'flex', height: '100%', alignItems: 'center'}}
          >
            <Link href='/catalog'>
              <a>
                Каталог
              </a>
            </Link>
            {isShown &&
            <CategoriesModal categories={categories}/>
            }
          </div>
          {pages.map(({id, name, slug}) => (
              <Link href={slug}>
                <a className={s.pages}>
                  {name}
                </a>
              </Link>
          ))}
        </div>
      </div>
  )
}

export default CategoriesBar

