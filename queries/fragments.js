import gql from 'graphql-tag'

export const _Product = gql`
  fragment _Product on Product {
    id
    databaseId
    sku
    slug
    name
    onSale
    type
    status
    description
    image {
      sourceUrl
    }
   
   
    
    productCategories(where: { orderby: TERM_ID }) {
      nodes {
        name
        slug
      }
    }
  }
`

export const _SimpleProduct = gql`
  fragment _SimpleProduct on SimpleProduct {
    id
    databaseId
    stockQuantity
    woocsRegularPrice
    woocsSalePrice
    paColors {
      nodes {
        name
        color
      }
    }
    paSizes {
      nodes {
        name
      }
    }
    paVesUpakovkis {
      nodes {
        name 
        slug
      }
    }
    paRazmerUpakovkis {
      nodes {
        name
        slug
      }
    }
    
  }
`

export const _VariableProduct = gql`
  fragment _VariableProduct on VariableProduct {
    id
    databaseId
    woocsRegularPrice
    woocsSalePrice
    paColors {
      nodes {
        name
        color
      }
    }
    paSizes {
      nodes {
        name
      }
    }
    variations(where: { stockStatus: IN_STOCK }) {
      nodes {
        id
        databaseId
        stockQuantity
        sku
        name
        image {
          sourceUrl
        }
        color: attributes(where: { taxonomy: "pa_color" }) {
          nodes {
            value
            color
          }
        }
        size: attributes(where: { taxonomy: "pa_size" }) {
          nodes {
            value
          }
        }
      }
    }
  }
`
