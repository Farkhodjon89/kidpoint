import gql from 'graphql-tag'
import { _Product, _SimpleProduct, _VariableProduct } from './fragments'

const PRODUCTS = gql`
  query PRODUCTS(
    $first: Int
    $after: String
    $categories: [String]
    $filters: [ProductTaxonomyFilterInput]
    $minPrice: Float
    $maxPrice: Float
    $onSale: Boolean
    $search: String
    $sku: String
    $orderBy: [ProductsOrderbyInput]
  ) {
    products(
      first: $first
      after: $after
      where: {
        # orderby: { field: PRICE, order: DESC }
        status: "publish"
        stockStatus: IN_STOCK
        onSale: $onSale
        minPrice: $minPrice
        maxPrice: $maxPrice
        categoryIn: $categories
        taxonomyFilter: { and: $filters }
        search: $search,
        sku: $sku,
        orderby: $orderBy
      }
    ) {
      activeTerms {
        paColors {
          name
          slug
          color
        }
        paSizes {
          name
          slug
        }
        paVozrasts {
          name
          slug
        }
        paCollections {
          name
          slug
        }
        paBrands {
         name
         slug
        }
       paGenders {
        name
        slug
      }
      pwbBrands {
        name
        slug
        parent
      }
      paKomponenties {
        name
        slug
      }
      paStupens {
        name
        slug
      }
        
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ..._Product
        ... on SimpleProduct {
          ..._SimpleProduct
        }
        ... on VariableProduct {
          ..._VariableProduct
        }
      }
    }
  }
  ${_Product}
  ${_SimpleProduct}
  ${_VariableProduct}
`

export default PRODUCTS
