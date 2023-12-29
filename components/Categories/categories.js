import React from 'react';
import s from "../Categories/categories.module.scss";
import Link from "next/link";

const Categories = ({categories}) => {

  return (
      <>
        <h1 className={s.titleCategories}>Популярные категории</h1>
        <div className={s.wrapper}>
          {categories.map(({title, url, image}) => (
              <div className={s.category}>
                <Link href={`/catalog${url}`}>
                  <a>
                    <div
                        className={s.image}
                        style={{
                          backgroundImage: `url(${image.sourceUrl})`,
                          backgroundSize: 'cover'
                        }}
                    ></div>
                    <div className={s.title}>{title}</div>
                  </a>
                </Link>
              </div>
          ))}
        </div>
      </>

  );
};

export default Categories;