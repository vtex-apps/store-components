import React, { Fragment, useState } from 'react'
import { injectIntl } from 'react-intl'
import { useApolloClient } from 'react-apollo'
import { Button } from 'vtex.styleguide'
import {
  AddressRules,
  AddressContainer,
  PostalCodeGetter,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.address-form' or its corr... Remove this comment to see the full error message
} from 'vtex.address-form'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.address-form/inputs' or i... Remove this comment to see the full error message
import { StyleguideInput } from 'vtex.address-form/inputs'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.address-form/helpers' or ... Remove this comment to see the full error message
import { addValidation, removeValidation } from 'vtex.address-form/helpers'

import ShippingTable from './components/ShippingTable'
import getShippingEstimates from './queries/getShippingEstimates.gql'
import ShippingSimulatorLoader from './Loader'
import styles from './shippingSimulator.css'
import { getNewAddress } from './utils'

type Props = {
  intl: any
  skuId?: string
  seller?: string
  country: string
  styles?: any
}

// eslint-disable-next-line react/prop-types
const ShippingSimulator = ({
  intl,
  skuId,
  seller,
  country,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'loaderStyles' does not exist on type 'Pr... Remove this comment to see the full error message
  loaderStyles,
}: Props) => {
  const client = useApolloClient()
  const [address, setAddress] = useState(() =>
    addValidation(getNewAddress(country))
  )

  const [shipping, setShipping] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const handleAddressChange = (newAddress: any) => {
    const updatedAddress = {
      ...address,
      ...newAddress,
    }

    setAddress(updatedAddress)
    setIsValid(updatedAddress.postalCode.valid)
  }

  const handleClick = (e: any) => {
    e && e.preventDefault()
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
            <PostalCodeGetter onSubmit={handleClick} />
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
      {/* @ts-expect-error ts-migrate(2769) FIXME: Type 'null' is not assignable to type '{ logistics... Remove this comment to see the full error message */}
      <ShippingTable shipping={shipping} />
    </Fragment>
  )
}

export default injectIntl(ShippingSimulator)
