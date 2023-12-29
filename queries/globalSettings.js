import gql from 'graphql-tag'

export const HOME_PAGE = gql`
  query HomePage {
    themeGeneralSettings {
      globalOptions {
        slider {
        url
        image {
          sourceUrl
        }
        mobimage {
          sourceUrl
        }
      }
        categories {
          title
          url
          image {
            sourceUrl
          }
        }
        offers {
        url
        image {
          sourceUrl
        }
        mobimage {
          sourceUrl
        }
        button
      }
        
      brands1 {
        url
        image {
          sourceUrl
        }
        mobimage {
          sourceUrl
        }
      }
      brands2 {
        url
        image {
          sourceUrl
        }
        mobimage {
          sourceUrl
        }
      }
      }
    }
  }
`
