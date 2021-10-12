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
import { addValidation, removeValidation } from 'vtex.address-form/helpers'
import {
  useOrderShipping,
  OrderShippingProvider,
} from 'vtex.order-shipping/OrderShipping'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

import { getNewAddress } from './utils'
import ShippingSimulator from './index'
import getShippingEstimates from './queries/getShippingEstimates.gql'
import ShippingSimulatorLoader from './Loader'
import { getDefaultSeller } from '../../utils/sellers'

const useAddressState = (country, postalCode) => {
  const [address, setAddress] = useState(() =>
    addValidation(getNewAddress(country, postalCode))
  )

  const [isValid, setIsValid] = useState(!!postalCode)

  const updateAddress = newAddress => {
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
  onShippingAddressUpdate = _ => {},
  initialPostalCode = undefined,
  shouldUpdateOrderForm,
  pricingMode,
  selectedQuantity,
}) => {
  const [shipping, setShipping] = useState(null)
  const [loading, setLoading] = useState(false)

  const { address, updateAddress, isValid } = useAddressState(
    country,
    initialPostalCode
  )

  const client = useApolloClient()

  const handleCalculateShipping = useCallback(
    e => {
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
                quantity: selectedQuantity,
                id: skuId,
                seller,
              },
            ],
          },
        })
        .then(result => {
          setShipping(result.data.shipping)
        })
        .then(() => {
          if (!shouldUpdateOrderForm) return

          return onShippingAddressUpdate?.(rawAddress)
        })
        .catch(error => {
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
      selectedQuantity,
      onShippingAddressUpdate,
      shouldUpdateOrderForm,
    ]
  )

  const isMountedRef = useRef(false)

  useEffect(() => {
    if (isMountedRef.current) {
      isMountedRef.current = false
    }
  }, [seller])

  useEffect(() => {
    if (isMountedRef.current) {
      return
    }

    isMountedRef.current = true

    if (!address || !isValid) {
      return
    }

    handleCalculateShipping()
  }, [handleCalculateShipping, address, isValid])

  return (
    <ShippingSimulator
      skuId={skuId}
      seller={seller}
      country={country}
      loaderStyles={loaderStyles}
      loading={loading}
      address={address}
      isValid={isValid}
      shipping={shipping}
      pricingMode={pricingMode}
      selectedQuantity={selectedQuantity}
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
  pricingMode,
  selectedQuantity,
}) => {
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
      pricingMode={pricingMode}
      selectedQuantity={selectedQuantity}
    />
  )
}

const OrderFormLoader = props => {
  const { loading } = useOrderForm()

  if (loading) {
    return <ShippingSimulatorLoader {...props.loaderStyles} />
  }

  return props.children
}

const ShippingSimulatorWrapper = props => {
  const { culture } = useRuntime()
  const productContext = useContext(ProductContext)

  const country = props.country || culture.country
  const skuId = props.skuId || productContext?.selectedItem?.itemId
  const selectedQuantity = productContext?.selectedQuantity?.toString()

  const { pricingMode } = props

  let sellerId = props.seller

  if (!sellerId) {
    const defaultSeller = getDefaultSeller(
      productContext?.selectedItem?.sellers
    )

    if (defaultSeller) {
      sellerId = defaultSeller.sellerId
    }
  }

  const { shouldUpdateOrderForm = true } = props

  if (
    window.__RUNTIME__?.settings?.['vtex.store']
      ?.enableOrderFormOptimization !== true
  ) {
    return (
      <BaseShippingSimulatorWrapper
        country={country}
        skuId={skuId}
        seller={sellerId}
        pricingMode={pricingMode}
        selectedQuantity={selectedQuantity}
        loaderStyles={props.loaderStyles}
      />
    )
  }

  return (
    <OrderShippingProvider>
      <OrderFormLoader>
        <ShippingSimulatorWithOrderForm
          country={country}
          seller={sellerId}
          skuId={skuId}
          loaderStyles={props.loaderStyles}
          pricingMode={pricingMode}
          selectedQuantity={selectedQuantity}
          shouldUpdateOrderForm={shouldUpdateOrderForm}
        />
      </OrderFormLoader>
    </OrderShippingProvider>
  )
}

export default ShippingSimulatorWrapper
