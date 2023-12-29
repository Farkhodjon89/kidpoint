import React from 'react'
import s from './index.module.scss'

const Wait = () => {
  return (
    <div className={s.wrapper}>
      <img src='/header/logo.svg' alt='' />
      <div className={s.ldsRipple}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Wait
