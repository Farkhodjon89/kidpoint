import gql from "graphql-tag";

export const CustomerFragment = gql`
  fragment _Customer on Customer {
    id
    databaseId
    firstName
    lastName
    email
    billing {
      address1
      city
      phone
    }
  }
`;

export const CUSTOMER = gql`
  query Customer($customerId: Int) {
    customer(customerId: $customerId) {
      ..._Customer
    }
  }
  ${CustomerFragment}
`;

export const CUSTOMER_ORDERS = gql`
query CustomerOrders($customerId: Int) {
  orders(first: 50, where: {customerId: $customerId}) {
    nodes {
      databaseId
      date
      status
      customerNote
      total
      paymentMethodTitle
      billing {
        address1
      }
      lineItems {
        nodes {
          product {
            ... on SimpleProduct {
              price(format: RAW)
            }
            ... on VariableProduct {
              price(format: RAW)
            }
            name
            image {
              sourceUrl
            }
          }
          quantity
          total
          color: metaData(key: "pa_color") {
            value
          }
          size: metaData(key: "pa_size") {
            value
          }
        }
      }
    }
  } 
}
`;

export const CUSTOMER_ORDER = gql`
query CustomerOrder($orderId: ID!) {
  order(id: $orderId, idType: DATABASE_ID) {
    databaseId
    date
    total
    paymentMethodTitle
    subtotal
    shippingTotal
    status
    shipping {
      address1
    }
    billing {
      firstName
      phone
    }
    customerNote
    lineItems {
      nodes {
        quantity
        subtotal
        product {
          name
        }
      }
    }
  }
}
`;