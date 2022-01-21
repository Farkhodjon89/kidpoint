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

  return (
      <div className={s.wrapper}>
        <div className={s.inner}>
          {categories.map(({name, slug, children}) => (
              <Category name={name} slug={slug} children={children} />
          ))}
        </div>
      </div>
  )
}


const Category = ({name, slug, children}) => {
  const [isShown, setIsShown] = useState(false);
  return (
      <div
          className={s.moki}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}>
        <Link href={`/catalog/${slug}`}>
          <a className={isShown ? s.hover : ''}>{name}</a>
        </Link>
        {isShown && (
            <div className={s.joki}>
              <div className={s.jokiInner}>
                {children.map(({name, slug, children}, i) => (
                    <div className={s.jokiMoki}>
                      <Link href={`/catalog/${slug}/`} key={i}>
                        <a>{name}</a>
                      </Link>
                      <div>
                        {children.map((r) => (
                            <>
                              <Link href={`/catalog/${r.slug}`} >
                                <a className={s.jokiLink}>
                                  {/*<span dangerouslySetInnerHTML={{__html: icon.dotIcon}}/>*/}
                                  {r.name}
                                </a>
                              </Link>
                            </>
                        ))}
                      </div>
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>
  );


}

export default CategoriesBar

