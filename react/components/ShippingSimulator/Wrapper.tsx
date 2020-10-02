import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import { ProductContext } from 'vtex.product-context'
import { useRuntime } from 'vtex.render-runtime'
import { useApolloClient } from 'react-apollo'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.address-form/helpers' or ... Remove this comment to see the full error message
import { addValidation, removeValidation } from 'vtex.address-form/helpers'
import {
  useOrderShipping,
  OrderShippingProvider,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.order-shipping/OrderShipp... Remove this comment to see the full error message
} from 'vtex.order-shipping/OrderShipping'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.order-manager/OrderForm' ... Remove this comment to see the full error message
import { useOrderForm } from 'vtex.order-manager/OrderForm'

import { getNewAddress } from './utils'
import ShippingSimulator from './index'
import getShippingEstimates from './queries/getShippingEstimates.gql'
import ShippingSimulatorLoader from './Loader'

const useAddressState = (country: any, postalCode: any) => {
  const [address, setAddress] = useState(() =>
    addValidation(getNewAddress(country, postalCode))
  )

  const [isValid, setIsValid] = useState(!!postalCode)

  const updateAddress = (newAddress: any) => {
    const updatedAddress = {
      ...address,
      ...newAddress,
    }

    setAddress(updatedAddress)
    setIsValid(updatedAddress.postalCode.valid)
  }

  return { address, updateAddress, isValid }
}

const BaseShippingSimulatorWrapper = ({
  country,
  seller,
  skuId,
  loaderStyles,
  onShippingAddressUpdate = (_: any) => {},
  initialPostalCode = undefined,
  shouldUpdateOrderForm,
}: any) => {
  const [shipping, setShipping] = useState(null)
  const [loading, setLoading] = useState(false)

  const { address, updateAddress, isValid } = useAddressState(
    country,
    initialPostalCode
  )

  const client = useApolloClient()

  const handleCalculateShipping = useCallback(
    (e) => {
      e && e.preventDefault()
      setLoading(true)
      const rawAddress = removeValidation(address)

      client
        .query({
          query: getShippingEstimates,
          variables: {
            country,
            postalCode: rawAddress.postalCode,
            items: [
              {
                quantity: '1',
                id: skuId,
                seller,
              },
            ],
          },
        })
        .then((result) => {
          setShipping(result.data.shipping)
        })
        .then(() => {
          if (!shouldUpdateOrderForm) return

          return onShippingAddressUpdate?.(rawAddress)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [
      address,
      client,
      country,
      seller,
      skuId,
      onShippingAddressUpdate,
      shouldUpdateOrderForm,
    ]
  )

  const isMountedRef = useRef(false)

  useEffect(() => {
    if (isMountedRef.current) {
      return
    }

    isMountedRef.current = true

    if (!address || !isValid) {
      return
    }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    handleCalculateShipping()
  }, [handleCalculateShipping, address, isValid])

  return (
    <ShippingSimulator
      skuId={skuId}
      seller={seller}
      country={country}
      // @ts-expect-error ts-migrate(2322) FIXME: Property 'loaderStyles' does not exist on type 'In... Remove this comment to see the full error message
      loaderStyles={loaderStyles}
      loading={loading}
      address={address}
      isValid={isValid}
      shipping={shipping}
      onAddressChange={updateAddress}
      onCalculateShipping={handleCalculateShipping}
    />
  )
}

const ShippingSimulatorWithOrderForm = ({
  country,
  skuId,
  seller,
  loaderStyles,
  shouldUpdateOrderForm,
}: any) => {
  const { updateSelectedAddress } = useOrderShipping()
  const { orderForm } = useOrderForm()

  const selectedAddress = orderForm?.shipping?.selectedAddress

  return (
    <BaseShippingSimulatorWrapper
      skuId={skuId}
      seller={seller}
      country={country}
      loaderStyles={loaderStyles}
      initialPostalCode={
        orderForm?.canEditData || selectedAddress?.isDisposable
          ? selectedAddress?.postalCode
          : undefined
      }
      onShippingAddressUpdate={updateSelectedAddress}
      shouldUpdateOrderForm={shouldUpdateOrderForm}
    />
  )
}

const OrderFormLoader = (props: any) => {
  const { loading } = useOrderForm()

  if (loading) {
    return <ShippingSimulatorLoader {...props.loaderStyles} />
  }

  return props.children
}

const ShippingSimulatorWrapper = (props: any) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'culture' does not exist on type 'Runtime... Remove this comment to see the full error message
  const { culture } = useRuntime()
  const productContext = useContext(ProductContext)

  const country = props.country || culture.country
  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  const skuId = props.skuId || productContext?.selectedItem?.itemId
  const seller =
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    props.seller || productContext?.selectedItem?.sellers?.[0]?.sellerId

  const { shouldUpdateOrderForm = true } = props

  if (
    // @ts-expect-error ts-migrate(2339) FIXME: Property '__RUNTIME__' does not exist on type 'Win... Remove this comment to see the full error message
    window.__RUNTIME__?.settings?.['vtex.store']
      ?.enableOrderFormOptimization !== true
  ) {
    return (
      <BaseShippingSimulatorWrapper
        country={country}
        skuId={skuId}
        seller={seller}
        loaderStyles={props.loaderStyles}
      />
    )
  }

  return (
    <OrderShippingProvider>
      <OrderFormLoader>
        <ShippingSimulatorWithOrderForm
          country={country}
          seller={seller}
          skuId={skuId}
          loaderStyles={props.loaderStyles}
          shouldUpdateOrderForm={shouldUpdateOrderForm}
        />
      </OrderFormLoader>
    </OrderShippingProvider>
  )
}

export default ShippingSimulatorWrapper
