import gql from 'graphql-tag'

const TOPCOLORS = gql`
  query TOPCOLORS($terms: [String]) {
    products(
      first: 100
      where: {
        taxonomyFilter: { and: { taxonomy: PATOPVARIATION, terms: $terms } }
        status: "publish"
        stockStatus: IN_STOCK
      }
    ) {
      nodes {
        slug
        ... on VariableProduct {
          paColors {
            nodes {
              color
              name
            }
          }
        }
      }
    }
  }
`
export default TOPCOLORS
