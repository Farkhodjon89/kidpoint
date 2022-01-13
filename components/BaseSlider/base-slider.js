import React, {useEffect, useState} from 'react'
import s from './base-slider.module.scss'
import Slider from 'react-slick'
import Link from 'next/link'

const BaseSlider = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState()
  let resizeWindow = () => setWindowWidth(window.innerWidth)
  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  const SliderPrevArrow = (props) => (
    <img
      src='/public/icons/arrowLeft.svg'
      alt=''
      onClick={props.onClick}
      className={s.sliderPrevArrow}
    />
  )

  const SliderNextArrow = (props) => (
    <img
      src='/public/icons/arrowRight.svg'
      alt=''
      onClick={props.onClick}
      className={s.sliderNextArrow}
    />
  )

  const settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,

  }

  return (
    <Slider {...settings} className={s.wrapper}>
      {data.map(({  image, title, subtitle, url, mobimage }, i) => (
        <div key={i}>
          <Link href={url}>
            <a style={{ backgroundImage: `url(${
              windowWidth <= 768 ? mobimage.sourceUrl : image.sourceUrl
            })` }} className={s.inner}>
              <div className={s.main}>
                <div className={s.major}>
                  {title && (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: title }} />
                      <div dangerouslySetInnerHTML={{ __html: subtitle }} />
                      <Link href={url}>
                        <a>Перейти к покупкам</a>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </Slider>
  )
}

export default BaseSlider
