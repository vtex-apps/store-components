import React, { Fragment, useState, useEffect } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import ContentLoader from 'react-content-loader'
import PropTypes from 'prop-types'
import { Button, Input } from 'vtex.styleguide'
import StyleguideInput from 'vtex.address-form/inputs/StyleguideInput'
import { AddressRules, AddressContainer, PostalCodeGetter, helpers, AddressSummary } from 'vtex.address-form'

import ShippingTable from './components/ShippingTable'
import getShippingEstimates from './queries/getShippingEstimates.gql'

import styles from './styles.css'

const { addValidation } = helpers


const ShippingSimulator = ({ intl, client, seller, country, styles }) => {
  const [address, setAddress] = useState({ addressId: '1', country: country, postalCode: null })

  const handleAddressChange = newAddress => {
    setAddress(newAddress)
  }

  return (
    <Fragment>
      <AddressRules
        country={country}
        shouldUseIOFetching>
        <AddressContainer Input={StyleguideInput} address={addValidation(address)} onChangeAddress={handleAddressChange}>
           <PostalCodeGetter/>
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
