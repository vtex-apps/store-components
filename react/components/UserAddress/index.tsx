import React from 'react'
import { graphql } from 'react-apollo'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.store-resources/QueryAddr... Remove this comment to see the full error message
import ADDRESS_QUERY from 'vtex.store-resources/QueryAddress'

import Container from '../Container'
import AddressInfo from './AddressInfo'

type Props = {
  variation: 'inline' | 'bar'
  addressQuery: any
}

const UserAddress = ({ variation, addressQuery: addressQueryProp }: Props) => {
  const { orderForm } = addressQueryProp
  const { shippingData } = orderForm || {}

  if (!orderForm || !shippingData || !shippingData.address) {
    return null
  }

  const isInline = variation === 'inline'
  const isInverted = !isInline

  return isInline ? (
    <div
      className="ph5"
      style={{
        maxWidth: '30rem',
      }}
    >
      {
        <AddressInfo
          inverted={isInverted}
          inline={isInline}
          orderForm={orderForm}
        />
      }
    </div>
  ) : (
    <div className="bg-base--inverted c-on-base--inverted flex ph5 pointer pv3">
      <Container className="flex justify-center w-100 left-0">
        <div className="w-100 mw9 flex">
          <AddressInfo
            inverted={isInverted}
            inline={isInline}
            orderForm={orderForm}
          />
        </div>
      </Container>
    </div>
  )
}

const withAddressQuery = graphql(ADDRESS_QUERY, {
  name: 'addressQuery',
  options: () => ({ ssr: false }),
})

// @ts-expect-error ts-migrate(2345) FIXME: Type 'PropsWithChildren<Partial<DataProps<{}, {}>>... Remove this comment to see the full error message
export default withAddressQuery(UserAddress)
