import React from 'react'
import s from './base-brands.module.scss'
import Link from 'next/link'
import {useEffect,useState} from "react";

const BaseBrands = ({title, url, image, mobimage, button, subtitle}) => {
  const [windowWidth, setWindowWidth] = useState()
  let resizeWindow = () => setWindowWidth(window.innerWidth)
  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])
  return (
      <>
        <h1 className={s.titleBaseBrands}>Клиентские дни</h1>
        <div
            className={s.banner}
            style={{
              background: `url(${
                  windowWidth <= 768 ? mobimage .sourceUrl : image.sourceUrl
              }) no-repeat center`,
              backgroundSize: 'cover'
            }}
        >
          <div className={s.bannerInner}>
            <div>
              {title} <br/> {subtitle}
            </div>
            <Link href={url}>
              <a>{button}</a>
            </Link>
          </div>
        </div>
        {/* <div className={s.title}>Наши бренды</div>
      <div className={s.brands}>
        {data.map((r, i) => (
          <div key={i}>
            <img src={r} alt='' />
          </div>
        ))}
      </div> */}
      </>
  )
}

export default BaseBrands
