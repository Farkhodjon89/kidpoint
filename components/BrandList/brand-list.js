import s from './brand-list.module.scss';
import Link from 'next/link';
import {useEffect, useState} from "react";

const BrandList = ({brands}) => {
  const [activeLetter, setActiveLetter] = useState('')
  const [windowWidth, setWindowWidth] = useState()
  let resizeWindow = () => setWindowWidth(window.innerWidth)
  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  let letters = [];
  let brandList = [];
  for (const letter of brands) {
    let list = [];
    letters.push(
        <Link href={`#${letter.letter}`}>
          <a onClick={() => setActiveLetter(letter.letter)} className={activeLetter === letter.letter ? s.active : ''}>
            {letter.letter}
          </a>
        </Link>,
    );
    // console.log(activeLetter);
    if (letter.brands.length != 0) {
      for (const brand of letter.brands) {
        list.push(
            <Link href={'/catalog/?filter_brands=' + brand.slug} key={brand.name}>
              <a>{brand.name}</a>
            </Link>,
        );
      }
      brandList.push(
          <div className={s.brand}>
            <div id={letter.letter} style={{visibility: "hidden"}} className={s.capital}>{letter.letter}</div>
            <div id={letter.letter} style={{visibility: "hidden"}} className={s.capital}>{letter.letter}</div>
            <div id={letter.letter} style={{visibility: "hidden"}} className={s.capital}>{letter.letter}</div>
            <div id={letter.letter} className={s.capital}>{letter.letter}</div>
            <div className={s.links}>{list}</div>
          </div>,
      );
    }
  }

  return (
      <div className={s.wrapper}>
        <div className={s.letters}>{letters}</div>
        <div className={s.brandList}>{brandList}</div>
      </div>
  );
};

export default BrandList;
