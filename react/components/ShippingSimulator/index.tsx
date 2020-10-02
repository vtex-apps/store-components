import React, { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { Button } from 'vtex.styleguide'
import {
  AddressRules,
  AddressContainer,
  PostalCodeGetter,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.address-form' or its corr... Remove this comment to see the full error message
} from 'vtex.address-form'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.address-form/inputs' or i... Remove this comment to see the full error message
import { StyleguideInput } from 'vtex.address-form/inputs'

import ShippingTable from './components/ShippingTable'
import ShippingSimulatorLoader from './Loader'
import styles from './shippingSimulator.css'

type Props = {
  skuId?: string
  seller?: string
  country: string
  styles?: any
}

const ShippingSimulator = ({
  /* eslint-disable react/prop-types */
  skuId,
  seller,
  country,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Props'.
  loading,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'loaderStyles' does not exist on type 'Pr... Remove this comment to see the full error message
  loaderStyles,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'onAddressChange' does not exist on type ... Remove this comment to see the full error message
  onAddressChange,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'address' does not exist on type 'Props'.
  address,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isValid' does not exist on type 'Props'.
  isValid,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'onCalculateShipping' does not exist on t... Remove this comment to see the full error message
  onCalculateShipping,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shipping' does not exist on type 'Props'... Remove this comment to see the full error message
  shipping,
}: Props) => {
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

export default ShippingSimulator
