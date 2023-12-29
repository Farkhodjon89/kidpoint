import s from './brand-list.module.scss';
import Link from 'next/link';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const BrandList = ({brands, brands2}) => {
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
  let letters2 = []
  let brandList2 = [];
  for (const letter2 of brands2) {
    let list2 = [];
    letters2.push(
        <Link href={`#${letter2.letter}`}>
          <a onClick={() => setActiveLetter(letter2.letter)} className={activeLetter === letter2.letter ? s.active : ''}>
            {letter2.letter}
          </a>
        </Link>,
    );
    // console.log(activeLetter);
    if (letter2.brands.length != 0) {
      for (const brand of letter2.brands) {
        list2.push(
            <Link href={'/catalog/?filter_brands=' + brand.slug} key={brand.name}>
              <a>{brand.name}</a>
            </Link>,
        );
      }
      brandList2.push(
          <div className={s.brand}>
            <div id={letter2.letter} style={{visibility: "hidden"}} className={s.capital}>{letter2.letter}</div>
            <div id={letter2.letter} className={s.capital}>{letter2.letter}</div>
            <div className={s.links}>{list2}</div>
          </div>,
      );
    }
  }

  return (
      <div className={s.wrapper}>
          <div className={s.letters}>{letters}</div>
          {/*<div className={s.letters}>{letters2}</div>*/}
        <div className={s.brandList}>{brandList}</div>
        <div className={s.russianLetters}>А-Я</div>
        <div className={s.brandList}>{brandList2}</div>
      </div>
  );
};

export default BrandList;
