import React, { Fragment, useState } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import { Button } from 'vtex.styleguide'
import {
  AddressRules,
  AddressContainer,
  PostalCodeGetter,
} from 'vtex.address-form'
import { StyleguideInput } from 'vtex.address-form/inputs'
import { addValidation, removeValidation } from 'vtex.address-form/helpers'

import ShippingTable from './components/ShippingTable'
import getShippingEstimates from './queries/getShippingEstimates.gql'
import ShippingSimulatorLoader from './Loader'
import styles from './shippingSimulator.css'
import { getNewAddress } from './utils'

const ShippingSimulator = ({
  intl,
  client,
  skuId,
  seller,
  country,
  loaderStyles,
}) => {
  const [address, setAddress] = useState(() =>
    addValidation(getNewAddress(country))
  )
  const [shipping, setShipping] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const handleAddressChange = newAddress => {
    const updatedAddress = {
      ...address,
      ...newAddress,
    }
    setAddress(updatedAddress)
    setIsValid(updatedAddress.postalCode.valid)
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
          postalCode,
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
    return <ShippingSimulatorLoader {...loaderStyles} />
  }

  return (
    <Fragment>
      <div className={`${styles.shippingContainer} t-small c-on-base`}>
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
          className={styles.shippingCTA}
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
