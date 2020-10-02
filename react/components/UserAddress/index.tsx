import React, { useEffect } from 'react'
import { graphql } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.store-resources/QueryAddr... Remove this comment to see the full error message
import ADDRESS_QUERY from 'vtex.store-resources/QueryAddress'

import Container from '../Container'
import AddressInfo from './AddressInfo'

const CSS_HANDLES = ['userAddressContainer']

type Props = {
  variation: 'inline' | 'bar'
  addressQuery: any
  showStreet?: boolean
  showCityAndState?: boolean
  showPostalCode?: boolean
  showPrefix?: boolean
  showIfEmpty?: boolean
}

const UserAddress = ({
  variation,
  addressQuery: addressQueryProp,
  showStreet = true,
  showCityAndState = false,
  showPostalCode = false,
  showPrefix = true,
  showIfEmpty = false,
}: Props) => {
  const { orderForm } = addressQueryProp
  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const handleLocationUpdated = () => addressQueryProp.refetch()

    window.addEventListener('locationUpdated', handleLocationUpdated)

    return () => {
      window.removeEventListener('locationUpdated', handleLocationUpdated)
    }
  }, [addressQueryProp])

  if (
    !orderForm ||
    ((!orderForm.shippingData || !orderForm.shippingData.address) &&
      !showIfEmpty)
  ) {
    return null
  }

  const isInline = variation === 'inline'
  const isInverted = !isInline

  return isInline ? (
    <div
      className={`${handles.userAddressContainer} ph5`}
      style={{
        maxWidth: '30rem',
      }}
    >
      {
        <AddressInfo
          inverted={isInverted}
          inline={isInline}
          orderForm={orderForm}
          showStreet={showStreet}
          showCityAndState={showCityAndState}
          showPostalCode={showPostalCode}
          showPrefix={showPrefix}
          showIfEmpty={showIfEmpty}
        />
      }
    </div>
  ) : (
    <div
      className={`${handles.userAddressContainer} bg-base--inverted c-on-base--inverted flex ph5 pointer pv3 ml3 mr3`}
    >
      <Container className="flex justify-center w-100 left-0">
        <div className="w-100 mw9 flex">
          <AddressInfo
            inverted={isInverted}
            inline={isInline}
            orderForm={orderForm}
            showStreet={showStreet}
            showCityAndState={showCityAndState}
            showPostalCode={showPostalCode}
            showPrefix={showPrefix}
            showIfEmpty={showIfEmpty}
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
