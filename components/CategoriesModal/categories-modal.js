import React, {useState} from 'react';
import s from './categories-modal.module.scss';
import Link from 'next/link';

const CategoriesModal = ({categories}) => {
  const [activeSubMenu, setActiveSubMenu] = useState()

  return (
      <div className={s.wrapper}>
        <div className={s.inner}>
          {categories.map(({id, name, slug, children}) => (
              <>
                <div style={{display: 'flex'}}>
                  <div className={s.innerFirst} onMouseEnter={() => setActiveSubMenu(id)}>
                    <Link href={`/catalog/${slug}`}>
                      <a className={s.bold}>
                        {name}
                      </a>
                    </Link>
                  </div>
                  <div className={activeSubMenu === id ? s.active : s.innerSecond}>
                    {children.map(({name, slug, children}) => (
                        <div className={s.innerSecondItem}>
                          <Link href={`/catalog/${slug}`}>
                            <a className={s.secondItem}>
                              {name}
                            </a>
                          </Link>
                          {children.map(({name, slug}) => {
                            if (slug) {
                              return (
                                  <div className={s.innerThirdItem}>
                                    <Link href={`/catalog/${slug}`}>
                                      <a>
                                        {name}
                                      </a>
                                    </Link>
                                  </div>
                              )
                            }
                          })}
                        </div>
                    ))}
                  </div>
                </div>
              </>
          ))}
        </div>
      </div>
  );
};

export default CategoriesModal;