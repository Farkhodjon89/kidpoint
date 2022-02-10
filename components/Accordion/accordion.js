import React, {useState} from 'react'
import s from './accordion.module.scss'
import Link from 'next/link'

const Accordion = ({name, parent, slug, children, setOpen}) => {
  const [expand, setExpand] = useState(false)
  return (
      <div className={s.category1}>
        <div
            onClick={() => setExpand((expand) => !expand)}
            className={`${s.name} ${expand ? s.active : ''}`}
        >
          <Link href={`/catalog/${slug}`}>
            <a onClick={() => setOpen && setOpen(false)}>
              {name}
            </a>
          </Link>
          <img src='/public/icons/arrowUp.svg' alt=''/>
        </div>
        {expand &&
        children.map(({name, slug, children}, i) =>
            children.length > 0 ? (
                <Accordion2
                    name={name}
                    children={children}
                    parent={parent}
                    setOpen={setOpen}
                />
            ) : (
                <Link href={`/catalog/${slug}`} key={i}>
                  <a className={s.link} onClick={() => setOpen && setOpen(false)}>
                    {name}
                  </a>
                </Link>
            )
        )}
      </div>
  )
}
export default Accordion

const Accordion2 = ({name, parent, children, setOpen}) => {
  const [expand, setExpand] = useState(false)
  return (
      <div className={s.category2}>
        <div
            onClick={() => setExpand((expand) => !expand)}
            className={`${s.name} ${expand ? s.active : ''}`}
        >
          {name}
          <img src='/public/icons/arrowUp.svg' alt=''/>
        </div>
        {expand &&
        children.map(({name, slug}, i) => (
            <Link href={`/catalog/${slug}`} key={i}>
              <a className={s.link} onClick={() => setOpen && setOpen(false)}>
                {name}
              </a>
            </Link>
        ))}
      </div>
  )
}
