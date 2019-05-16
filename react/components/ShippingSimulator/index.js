import React, { Fragment, useState } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import { Button } from 'vtex.styleguide'
import { StyleguideInput } from 'vtex.address-form/inputs/'
import {
  AddressRules,
  AddressContainer,
  PostalCodeGetter,
} from 'vtex.address-form'
import { addValidation, removeValidation } from 'vtex.address-form/helpers/'

import ShippingTable from './components/ShippingTable'
import getShippingEstimates from './queries/getShippingEstimates.gql'
import ShippingSimulatorLoader from './Loader'
import shippingSimulator from './shippingSimulator.css'
import { getNewAddress } from './utils'

const ShippingSimulator = ({
  intl,
  client,
  skuId,
  seller,
  country,
  styles,
}) => {
  const [address, setAddress] = useState(addValidation(getNewAddress(country)))
  const [shipping, setShipping] = useState({})
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const handleAddressChange = newAddress => {
    setAddress({
      ...address,
      ...newAddress,
    })
    const { postalCode } = address
    setIsValid(postalCode.valid)
  }

  const handleClick = e => {
    e.preventDefault()
    setLoading(true)
    const { postalCode } = removeValidation(address)
    client
      .query({
        query: getShippingEstimates,
        variables: {
          country,
          postalCode: postalCode,
          items: [
            {
              quantity: '1',
              id: skuId,
              seller,
            },
          ],
        },
      })
      .then(result => {
        setShipping(result.data.shipping)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (!seller || !skuId) {
    return <ShippingSimulatorLoader {...styles} />
  }

  return (
    <Fragment>
      <div
        className={`${shippingSimulator.shippingContainer} t-small c-on-base`}
      >
        <AddressRules country={country} shouldUseIOFetching>
          <AddressContainer
            Input={StyleguideInput}
            address={address}
            onChangeAddress={handleAddressChange}
            autoCompletePostalCode
          >
            <PostalCodeGetter />
          </AddressContainer>
        </AddressRules>
        <Button
          onClick={handleClick}
          className={`${shippingSimulator.shippingCTA}`}
          disabled={!isValid}
          size="small"
          type="submit"
          block
          isLoading={loading}
        >
          {intl.formatMessage({ id: 'store/shipping.label' })}
        </Button>
      </div>
      <ShippingTable shipping={shipping} />
    </Fragment>
  )
}

ShippingSimulator.propTypes = {
  intl: intlShape.isRequired,
  client: PropTypes.object,
  skuId: PropTypes.string,
  seller: PropTypes.string,
  country: PropTypes.string.isRequired,
  /** Component and content loader styles */
  styles: PropTypes.object,
}

export default compose(
  withApollo,
  injectIntl
)(ShippingSimulator)
