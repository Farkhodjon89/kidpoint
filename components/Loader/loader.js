import React from 'react'
import s from './loader.module.scss'

const Loader = () => (
  <div className={s.wrapper}>
    <div className={s.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)

export default Loader
