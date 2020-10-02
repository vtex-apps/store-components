import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { graphql } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import ADDRESS_QUERY from 'vtex.store-resources/QueryAddress'

import Container from '../Container'
import AddressInfo from './AddressInfo'

const CSS_HANDLES = ['userAddressContainer']

const UserAddress = ({
  variation,
  addressQuery: addressQueryProp,
  showStreet = true,
  showCityAndState = false,
  showPostalCode = false,
  showPrefix = true,
  showIfEmpty = false,
}) => {
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

UserAddress.propTypes = {
  variation: PropTypes.oneOf(['inline', 'bar']).isRequired,
  addressQuery: PropTypes.object.isRequired,
  showStreet: PropTypes.bool,
  showCityAndState: PropTypes.bool,
  showPostalCode: PropTypes.bool,
  showPrefix: PropTypes.bool,
  showIfEmpty: PropTypes.bool,
}

const withAddressQuery = graphql(ADDRESS_QUERY, {
  name: 'addressQuery',
  options: () => ({ ssr: false }),
})

export default withAddressQuery(UserAddress)
