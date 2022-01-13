import s from './search-main.module.scss'
import client from '../../apollo/apollo-client'
import {useLazyQuery} from '@apollo/react-hooks'
import PRODUCTS from '../../queries/products'
import React, {useState, useEffect} from 'react'
import ProductsList from "../ProductsList/products-list";
import icons from "../../public/fixture";
import ProductSlider from "../ProductSlider";
import Link from "next/link";

const SearchMain = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loadProducts, {data, loading}] = useLazyQuery(PRODUCTS, {
    client,
  })
  // const [isSearchActive, setIsSearchActive] = useState(true);

  useEffect(() => {
    if (data && searchQuery.length) {
      setSearchResults(data.products.nodes)
    }
  }, [data])

  const searchData = (e) => {
    setSearchResults([])
    setSearchQuery(e.target.value)

    if (e.target.value.length) {
      loadProducts({
        variables: {
          first: 500,
          search: e.target.value,
        },
      })
    }
  }

  return (
      <div className={s.wrapper}>
        <div className={s.inner}>
          <div>Поиск</div>
          <form>
            {/*<label htmlFor="search" dangerouslySetInnerHTML={{ __html: icons.search }} />*/}
            <input
                type='text'
                placeholder='Поиск по сайту'
                value={searchQuery}
                onChange={searchData}
            />
          </form>
        </div>
        <div className={s.searchList}>
          {loading && !searchResults.length ? (
              <div>Загрузка...</div>
          ) : searchQuery.length && !searchResults.length ? (
              <div>Товары не найдены</div>
          ) : searchResults.length ? (
              <ProductsList products={searchResults}/>
          ) : null}
        </div>
      </div>
  )
}

export default SearchMain
