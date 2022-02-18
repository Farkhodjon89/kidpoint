import React, {useEffect, useReducer, useRef, useState} from 'react'
import s from './catalog-main.module.scss'
import FiltersBar from '../FiltersBar/filters-bar'
import FilterCategory from '../FilterCategory/filter-category'
import FilterColor from '../FilterColor/filter-color'
import FilterBrand from '../FilterBrand/filter-brand'
import FilterSize from '../FilterSize/filter-size'
import ProductsList from '../ProductsList/products-list'
import Loader from '../Loader/loader'
import PRODUCTS from '../../queries/products'
import client from '../../apollo/apollo-client'
import {useLazyQuery} from '@apollo/react-hooks'
import InfiniteScroll from 'react-infinite-scroller'
import {
  filterVariables,
  sortProducts,
  reducer,
  catalog,
} from '../../utils/catalog'
import FilterAge from "../FilterAge/filter-age";
import FilterGender from "../FilterGender/filter-gender";
import ShopPrice from "../ShopPrice/shop-price";
import FilterSteps from "../FilterSteps/filter-steps";
import FilterComponents from "../FilterComponents/filter-components";
import {useRouter} from "next/router";


const initialState = {
  filters: {},
  sortValue: 'default',
  products: null,
  pageInfo: null,
}

const CatalogMain = ({
                       category, categories,
                       categoryParent,
                       products,
                       pageInfo,
                       onSale,
                       index,
                       brands,
                       // sizes,
                       // colors,
                       activeTerms,
                     }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    pageInfo,
    products,
    activeTerms,
  })

  const [prevSortValue, setPrevSortValue] = useState('default')

  const router = useRouter()


  const filterValues = (type, value) => {
    const arrayValuesFor = ['brands', 'colors', 'sizes', 'age', 'gender', 'steps', 'components']

    if (value === '' || value == null) {
      const filters = {...state.filters}
      delete filters[type]

      dispatch({
        type: 'SET_FILTERS',
        filters,
      })

      return
    }

    if (arrayValuesFor.includes(type)) {
      let options = state.filters[type] || []

      if (options.includes(value)) {
        options = options.filter((x) => x !== value)
      } else {
        options = [...options, value]
      }

      dispatch({
        type: 'SET_FILTER_VALUE',
        filter: type,
        value: options,
      })
    } else {
      dispatch({
        type: 'SET_FILTER_VALUE',
        filter: type,
        value: value,
      })
    }
  }

  const [loadProducts, {data, loading, called}] = useLazyQuery(PRODUCTS, {client})

  const loadMore = () => {
    if (!loading && state.pageInfo.hasNextPage) {
      loadProducts({
        variables: {
          categories: index === 'index' ? (category ? [category.slug] : null) : [router.query.parent],
          onSale: !!onSale,
          after: state.pageInfo.endCursor,
          ...filterVariables(state.filters),
          orderBy: [{
            field: state.sortValue === 'lowToHigh' || state.sortValue === 'highToLow' ? 'PRICE' : 'DATE',
            order: state.sortValue === 'lowToHigh' ? 'ASC' : 'DESC'
          }]
        },
      })
    }
  }

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'SET_PRODUCTS_AND_PAGE_INFO',
        products: state.sortValue !== prevSortValue ? [...data.products.nodes] : [...state.products, ...data.products.nodes],
        pageInfo: data.products.pageInfo,
        activeTerms: data.products.activeTerms,
      })
      setPrevSortValue(state.sortValue)
    }
  }, [data])

  const useIsMount = () => {
    const isMountRef = useRef(true)

    useEffect(() => {
      isMountRef.current = false
    }, [])

    return isMountRef.current
  }

  const isMount = useIsMount()

  if (typeof window !== 'undefined') {
    useEffect(() => {
      const {filters} = catalog.init()

      if (Object.keys(filters).length) {
        dispatch({
          type: 'SET_FILTERS',
          filters: filters,
        })
      }
    }, [window.location.search])
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = catalog.buildQuery({}, state.filters)
      const location = `${window.location.pathname}${query ? '?' : ''}${query}`
      window.history.replaceState(null, '', location)
    }

    if (!isMount) {
      loadProducts({
        variables: {
          onSale: !!onSale,
          categories: category ? [category.slug] : null,
          ...filterVariables(state.filters),
          orderBy: [{
            field: state.sortValue === 'lowToHigh' || state.sortValue === 'highToLow' ? 'PRICE' : 'DATE',
            order: state.sortValue === 'lowToHigh' ? 'ASC' : 'DESC'
          }]
        },
      })
    }

    // console.log({
    //   categories: category ? [category.slug] : null,
    //   ...filterVariables(state.filters),
    // })
  }, [state.filters])

  useEffect(() => {
    if (!isMount) {
      loadProducts({
        variables: {
          categories: category ? [category.slug] : null,
          ...filterVariables(state.filters),
          orderBy: [{
            field: state.sortValue === 'lowToHigh' || state.sortValue === 'highToLow' ? 'PRICE' : 'DATE',
            order: state.sortValue === 'lowToHigh' ? 'ASC' : 'DESC'
          }]
        },
      })
    }
  }, [state.sortValue])

  let minPrice = 0;
  let maxPrice = 9200000;

  return (
      <div className={s.wrapper}>
        <div className={s.top}>
          <FiltersBar
              category={categoryParent || category}
              sizes={state.activeTerms && state.activeTerms.paSizes}
              colors={state.activeTerms && state.activeTerms.paColors}
              age={state.activeTerms && state.activeTerms.paVozrasts}
              brands={state.activeTerms && state.activeTerms.paBrands}
              gender={state.activeTerms && state.activeTerms.paGenders}
              steps={state.activeTerms && state.activeTerms.paStupens}
              components={state.activeTerms && state.activeTerms.paKomponenties}
              filterValues={filterValues}
              minPrice={minPrice}
              maxPrice={maxPrice}
              filters={state.filters}
              dispatch={dispatch}
              activeSortValue={state.sortValue}
              categories={categories}
          />
        </div>
        <div className={s.left}>
          <FilterCategory category={category} categories={categories}/>
          <FilterBrand filterValues={filterValues}
                       active={state.filters.brands}
                       brands={state.activeTerms && state.activeTerms.paBrands}
          />
          <FilterGender
              filterValues={filterValues}
              active={state.filters.gender}
              gender={state.activeTerms && state.activeTerms.paGenders}/>
          <FilterColor
              colors={state.activeTerms && state.activeTerms.paColors}
              active={state.filters.colors}
              filterValues={filterValues}
          />
          <FilterSize
              sizes={state.activeTerms && state.activeTerms.paSizes}
              active={state.filters.sizes}
              filterValues={filterValues}
          />
          <FilterAge
              age={state.activeTerms && state.activeTerms.paVozrasts}
              active={state.filters.age}
              filterValues={filterValues}/>
          <FilterSteps
              steps={state.activeTerms && state.activeTerms.paStupens}
              active={state.filters.steps}
              filterValues={filterValues}/>
          <FilterComponents
              components={state.activeTerms && state.activeTerms.paKomponenties}
              active={state.filters.components}
              filterValues={filterValues}/>
          <ShopPrice
              minPrice={minPrice}
              maxPrice={maxPrice}
              filterValues={filterValues}
          />
        </div>


        <div className={s.right}>
          {/*<div className={s.rightTop}>*/}
          {/*  Сортировать:*/}
          {/*  <select*/}
          {/*      onChange={(e) =>*/}
          {/*          dispatch({*/}
          {/*            type: 'SET_SORTING',*/}
          {/*            sortValue: e.target.value,*/}
          {/*          })*/}
          {/*      }*/}
          {/*  >*/}
          {/*    <option value='default'> по умолчанию</option>*/}
          {/*    <option value='highToLow'> по убыванию</option>*/}
          {/*    <option value='lowToHigh'> по возрастанию</option>*/}
          {/*  </select>*/}
          {/*</div>*/}
          {loading && !state.products.length ? (
              <Loader/>
          ) : !state.products.length ? (
              <div className={s.empty}> Товары не найдены </div>
          ) : (
              <InfiniteScroll
                  pageStart={0}
                  loadMore={loadMore}
                  hasMore={!loading && state.pageInfo.hasNextPage}
                  initialLoad={false}
              >
                <ProductsList products={state.products} catalog={'catalog'}/>
                {/*<div className={s.button}>*/}
                {/*  <button onClick={loadMore} className={loading ? s.none : s.loadButton}>Загрузить еще</button>*/}
                {/*</div>*/}
                {loading && <Loader/>}
              </InfiniteScroll>
          )}
        </div>
      </div>
  )
}

export default CatalogMain
