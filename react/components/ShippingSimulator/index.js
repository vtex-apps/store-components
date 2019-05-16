import React, { Fragment, useState, useEffect } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import ContentLoader from 'react-content-loader'
import PropTypes from 'prop-types'
import { Button, Input } from 'vtex.styleguide'
import { StyleguideInput } from 'vtex.address-form/inputs'
import { AddressRules, AddressContainer, PostalCodeGetter, helpers, AddressSubmitter } from 'vtex.address-form'

import ShippingTable from './components/ShippingTable'
import getShippingEstimates from './queries/getShippingEstimates.gql'

import styles from './styles.css'

const { addValidation, removeValidation } = helpers

const ShippingSimulator = ({ intl, client, seller, country, styles }) => {
  const [address, setAddress] = useState(addValidation(
    {
      addressId: '1',
      country: country,
      postalCode: null,
      number: '20',
      addressQuery: null
    }))

  const [isValid, setIsValid] = useState(false)

  const handleAddressChange = newAddress => {
    setAddress({
      ...address,
      ...newAddress,
    })
    console.log(address)
  }

  const handleSubmit = (valid, address) => {
    console.log(valid)
    console.log(address)
  }

  return (
    <Fragment>
      <AddressRules
        country={country}
        shouldUseIOFetching>
        <AddressContainer
          Input={StyleguideInput}
          address={address}
          onChangeAddress={handleAddressChange}
          autoCompletePostalCode>
          <PostalCodeGetter />
          <AddressSubmitter onSubmit={handleSubmit}>
            {handleSubmit => (
              <Button size="small" type="submit" block onClick={handleSubmit}>
                Ok
              </Button>
            )}
          </AddressSubmitter>
        </AddressContainer>
      </AddressRules>
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
