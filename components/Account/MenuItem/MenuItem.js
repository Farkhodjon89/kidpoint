import React from 'react';
import Link from 'next/link'
import s from './MenuItem.module.scss'

const MenuItem = ({link,label}) => {
  return (
      <li className={s.tab}>
        <Link href={link}>
          <a className={s.label}>{label}</a>
        </Link>
      </li>
  );
};

export default MenuItem;