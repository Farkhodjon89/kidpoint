export const filterVariables = (filters) => {
  const result = {
    first: 6,
    filters: [],
  }

  if (filters.categories && filters.categories.length) {
    result.categories = filters.categories
  }

  if (filters.colors && filters.colors.length) {
    result.filters.push({
      taxonomy: 'PACOLOR',
      terms: Array.isArray(filters.colors) ? filters.colors : [filters.colors],
    })
  }

  if (filters.sizes && filters.sizes.length) {
    result.filters.push({
      taxonomy: 'PASIZE',
      terms: Array.isArray(filters.sizes) ? filters.sizes : [filters.sizes],
    })
  }

  if (filters.brands && filters.brands.length) {
    result.filters.push({
      taxonomy: 'PABRAND',
      terms: Array.isArray(filters.brands) ? filters.brands : [filters.brands],
    })
  }

  return result
}

export const sortProducts = (products, sortValue) => {
  if (sortValue === 'default') {
    return [...products].sort(() => Math.random() - 0.5)
  }
  if (sortValue === 'highToLow') {
    return [...products].sort((a, b) => {
      return b.regularPrice - a.regularPrice
    })
  }
  if (sortValue === 'lowToHigh') {
    return [...products].sort((a, b) => {
      return a.regularPrice - b.regularPrice
    })
  }
  return products
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.filters,
        products: [],
      }
    case 'SET_FILTER_VALUE':
      return {
        ...state,
        filters: { ...state.filters, [action.filter]: action.value },
        products: [],
      }
    case 'RESET_FILTERS':
      return {
        ...state,
        products: [],
        filters: {},
      }
    case 'RESET':
      return state.init ? initialState : state
    case 'SET_PRODUCTS':
      return { ...state, products: action.products }
    case 'SET_PRODUCTS_AND_PAGE_INFO':
      return {
        ...state,
        products: action.products,
        pageInfo: action.pageInfo,
        activeTerms: action.activeTerms,
      }
    case 'SET_SORTING':
      return {
        ...state,
        sortValue: action.sortValue,
      }
    default:
      throw new Error()
  }
}

import queryString from 'query-string'

function parseQueryOptions(location) {
  const query = queryString.parse(location)
  const optionValues = {}

  if (typeof query.page === 'string') {
    optionValues.page = parseFloat(query.page)
  }
  if (typeof query.limit === 'string') {
    optionValues.limit = parseFloat(query.limit)
  }
  if (typeof query.sort === 'string') {
    optionValues.sort = query.sort
  }

  return optionValues
}

function parseQueryFilters(location) {
  const query = queryString.parse(location, { arrayFormat: 'comma' })
  const filterValues = {}

  const multipleFilters = ['colors', 'sizes', 'brands']

  Object.keys(query).forEach((param) => {
    const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/)

    if (!mr) {
      return
    }

    const filterSlug = mr[1]

    if (multipleFilters.includes(filterSlug) && !Array.isArray(query[param])) {
      filterValues[filterSlug] = [query[param]]
    } else {
      filterValues[filterSlug] = query[param]
    }
  })

  return filterValues
}

function parseQuery(location) {
  return [parseQueryOptions(location), parseQueryFilters(location)]
}

function buildQuery(options, filters) {
  const params = {}

  if (options.page !== 1) {
    params.page = options.page
  }

  if (options.limit !== 10) {
    params.limit = options.limit
  }

  if (options.sort !== 'default') {
    params.sort = options.sort
  }

  Object.keys(filters)
    .filter((x) => !!filters[x])
    .forEach((filterSlug) => {
      params[`filter_${filterSlug}`] = filters[filterSlug]
    })

  return queryString.stringify(params, { encode: false, arrayFormat: 'comma' })
}

function init() {
  const [options, filters] = parseQuery(
    typeof window !== 'undefined' ? window.location.search : ''
  )

  return { options, filters }
}

export const catalog = {
  parseQueryOptions,
  parseQueryFilters,
  parseQuery,
  buildQuery,
  init,
}
