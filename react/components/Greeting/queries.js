import gql from 'graphql-tag'

export const orderFormQuery = gql`
  query {
    minicart @client {
      orderForm
    }
  }
`
