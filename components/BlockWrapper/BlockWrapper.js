import React, {useEffect, useState} from 'react';
import s from "../BlockWrapper/BlockWrapper.module.scss";
import Link from "next/link";

const BlockWrapper = ({offers, text}) => {
  const [windowWidth, setWindowWidth] = useState()
  let resizeWindow = () => setWindowWidth(window.innerWidth)
  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])
  return (
      <>
        <h1 className={s.titleBlockWrapper}>{text}</h1>
        <div className={s.wrapper}>
          {offers.map(({title, url, image, mobimage, button, subtitle}, i) => (
              <div className={s.banner} style={{
                background: `url(${
                    windowWidth <= 768 ? mobimage.sourceUrl : image.sourceUrl
                }) no-repeat center`
              }}>
                <div className={s.bannerInner}>
                  {/*<div>*/}
                  {/*  {title} <br/> {subtitle}*/}
                  {/*</div>*/}
                  <Link href={url}>
                    <a>{button}</a>
                  </Link>
                </div>
              </div>
          ))}
        </div>
      </>

  );
};

export default BlockWrapper;