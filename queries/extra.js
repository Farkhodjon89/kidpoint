import gql from 'graphql-tag'

const EXTRA = gql`
  query EXTRA($id: ID!) {
    post(id: $id, idType: SLUG) {
      content
    }
  }
`
export default EXTRA
