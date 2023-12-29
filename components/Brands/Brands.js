import React, {useEffect, useState} from 'react';
import s from './Brands.module.scss'
import Link from 'next/link'

const Brands = ({brands1, brands2}) => {
  const [windowWidth, setWindowWidth] = useState()
  let resizeWindow = () => setWindowWidth(window.innerWidth)
  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  const brandsLeft = brands1.filter((_, index) => index !== 0)
  const brandsLeftFirstItem = brands1.filter((_, index) => index === 0)
  const brandsRight = brands2.filter((_, index) => index !== 8)
  const brandsRightSecondItem = brands2.filter((_, index) => index === 8)

  return (
      <>
        <h1 className={s.titleBrands}>Бренды</h1>
        <div className={s.wrapper}>
          <div className={s.brands1}>
            <div className={s.brands1LeftSide}>
                {brandsLeftFirstItem.map(({url, image, mobimage}) => (
                    <div className={s.brand1LeftSideItem}>
                      <Link href={url}>
                        <a><img src={windowWidth <= 440 ? mobimage.sourceUrl : image.sourceUrl}/></a>
                      </Link>
                    </div>
                ))}
            </div>
            <div className={s.brands1RightSide}>
              {brandsLeft.map(({url, image, mobimage}, i) => (
                  <div className={s.brand1RightSideItem}>
                    <Link href={url}>
                      <a><img src={windowWidth <= 440 ? mobimage.sourceUrl : image.sourceUrl}/></a>
                    </Link>
                  </div>
              ))}
            </div>
          </div>

          <div className={s.brands2}>
            <div className={s.brands2LeftSide}>
              {brandsRight.map(({url, image, mobimage}, i) => (
                  <div className={s.brand2LeftSideItem}>
                    <Link href={url}>
                      <a><img src={windowWidth <= 440 ? mobimage.sourceUrl : image.sourceUrl}/></a>
                    </Link>
                  </div>
              ))}
            </div>
            <div className={s.brands2RightSide}>
              {brandsRightSecondItem.map(({url, image, mobimage}) => (
                  <div className={s.brand2RightSideItem}>
                    <Link href={url}>
                      <a><img src={windowWidth <= 440 ? mobimage.sourceUrl : image.sourceUrl}/></a>
                    </Link>
                  </div>
              ))}
            </div>
          </div>

          <Link href={'/brands'}>
            <div className={s.allBrands}>
              <button>Все бренды</button>
            </div>
          </Link>
        </div>
      </>

  );
};

export default Brands;