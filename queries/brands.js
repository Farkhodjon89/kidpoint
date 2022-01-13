import gql from 'graphql-tag'

const BRANDS = gql`
  query BRANDS {
    paBrands(first: 100, where: { hideEmpty: true }) {
      nodes {
        name
        slug
        products {
          nodes {
            id
          }
        }
      }
    }
  }
`
export default BRANDS
