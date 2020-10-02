import React, { Fragment } from 'react'
import { useIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Button } from 'vtex.styleguide'
import {
  AddressRules,
  AddressContainer,
  PostalCodeGetter,
} from 'vtex.address-form'
import { StyleguideInput } from 'vtex.address-form/inputs'

import ShippingTable from './components/ShippingTable'
import ShippingSimulatorLoader from './Loader'
import styles from './shippingSimulator.css'

const ShippingSimulator = ({
  /* eslint-disable react/prop-types */
  skuId,
  seller,
  country,
  loading,
  loaderStyles,
  onAddressChange,
  address,
  isValid,
  onCalculateShipping,
  shipping,
  /* eslint-enable react/prop-types */
}) => {
  const intl = useIntl()

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
            onChangeAddress={onAddressChange}
            autoCompletePostalCode
            disabled={loading}
          >
            <PostalCodeGetter onSubmit={onCalculateShipping} />
          </AddressContainer>
        </AddressRules>
        <Button
          onClick={onCalculateShipping}
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
  skuId: PropTypes.string,
  seller: PropTypes.string,
  country: PropTypes.string.isRequired,
  /** Component and content loader styles */
  styles: PropTypes.object,
}

export default ShippingSimulator
