import PropTypes from 'prop-types'
import React, { useContext, useCallback, useState, Fragment } from 'react'
import { intlShape, FormattedMessage } from 'react-intl'
import { path } from 'ramda'
import ContentLoader from 'react-content-loader'
import { useRuntime } from 'vtex.render-runtime'
import { usePWA } from 'vtex.store-resources/PWAContext'

import { Button, ToastContext } from 'vtex.styleguide'

const CONSTANTS = {
  SUCCESS_MESSAGE_ID: 'store/buybutton.buy-success',
  OFFLINE_BUY_MESSAGE_ID: 'store/buybutton.buy-offline-success',
  DUPLICATE_CART_ITEM_ID: 'store/buybutton.buy-success-duplicate',
  ERROR_MESSAGE_ID: 'store/buybutton.add-failure',
  SEE_CART_ID: 'store/buybutton.see-cart',
  CHECKOUT_URL: '/checkout/#/cart',
  TOAST_TIMEOUT: 3000,
}

const skuItemToMinicartItem = item => {
  return {
    // Important for the mutation
    id: item.skuId,
    seller: item.seller,
    options: item.options,
    quantity: item.quantity,

    // Fields for optmistic cart
    sellingPrice: item.price,
    skuName: item.variant,
    detailUrl: item.detailUrl,
    imageUrl: item.imageUrl,
    name: item.name,
    listPrice: item.listPrice,
    assemblyOptions: item.assemblyOptions,
    sellingPriceWithAssemblies: item.sellingPriceWithAssemblies,

    // Fields for Analytics
    brand: item.brand,
    category: item.category,
    productRefId: item.productRefId,
  }
}

/**
 * BuyButton Component.
 * Adds a list of sku items to the cart.
 */
export const BuyButton = ({
  isOneClickBuy = false,
  shouldOpenMinicart = false,
  available = true,
  intl,
  addToCart,
  setMinicartOpen,
  skuItems,
  onAddStart,
  onAddFinish,
  orderFormContext,
  children,
  large,
  disabled,
}) => {
  const [isAddingToCart, setAddingToCart] = useState(false)
  const { showToast } = useContext(ToastContext)
  const { settings: { promptOnCustomEvent }, showInstallPrompt } = usePWA()
  const translateMessage = useCallback(id => intl.formatMessage({ id: id }), [
    intl,
  ])
  const orderFormItems = path(['orderForm', 'items'], orderFormContext)

  const resolveToastMessage = (success, isNewItem) => {
    if (!success) return translateMessage(CONSTANTS.ERROR_MESSAGE_ID)
    if (!isNewItem) return translateMessage(CONSTANTS.DUPLICATE_CART_ITEM_ID)

    const isOffline = window && window.navigator && !window.navigator.onLine
    const checkForOffline = (!isOffline)
      ? translateMessage(CONSTANTS.SUCCESS_MESSAGE_ID)
      : translateMessage(CONSTANTS.OFFLINE_BUY_MESSAGE_ID)

    return checkForOffline
  }

  const toastMessage = ({ success, isNewItem }) => {
    const message = resolveToastMessage(success, isNewItem)

    const action = success
      ? {
          label: translateMessage(CONSTANTS.SEE_CART_ID),
          href: '/checkout/#/cart',
        }
      : undefined

    showToast({ message, action })
  }

  const { rootPath = '' } = useRuntime()
  const checkoutUrl = rootPath + CONSTANTS.CHECKOUT_URL

  const handleAddToCart = async event => {
    event.stopPropagation()
    event.preventDefault()

    setAddingToCart(true)
    onAddStart && onAddStart()

    let showToastMessage
    try {
      const minicartItems = skuItems.map(skuItemToMinicartItem)
      const localStateMutationResult = !isOneClickBuy
        ? await addToCart(minicartItems)
        : null
      const linkStateItems =
        localStateMutationResult && localStateMutationResult.data.addToCart
      const callOrderFormDirectly = !linkStateItems

      let success = null
      if (callOrderFormDirectly) {
        const variables = {
          orderFormId: orderFormContext.orderForm.orderFormId,
          items: skuItems.map(item => ({
            id: item.skuId,
            seller: item.seller,
            options: item.options,
            quantity: item.quantity,
          })),
        }
        const mutationRes = await orderFormContext.addItem({ variables })
        const { items } = mutationRes.data.addItem

        success = skuItems.filter(
          skuItem => !!items.find(({ id }) => id === skuItem.skuId)
        )
        await orderFormContext.refetch().catch(() => null)
      }

      const addedItem =
        (linkStateItems &&
        skuItems.filter(
          skuItem => !!linkStateItems.find(({ id }) => id === skuItem.skuId)
        )) || success

      const foundItem =
        orderFormItems &&
        orderFormItems.filter(item => item.id === addedItem[0].skuId).length > 0

      success = addedItem

      showToastMessage = () => toastMessage({
        success: success && success.length >= 1,
        isNewItem: !foundItem,
      })

      /* PWA */
      if (promptOnCustomEvent === "addToCart") {
        showInstallPrompt()
      }
  
      shouldOpenMinicart && !isOneClickBuy && setMinicartOpen(true)
    } catch (err) {
      console.error(err)
      showToastMessage = () => toastMessage(false)
    }

    setTimeout(() => {
      setAddingToCart(false)
      showToastMessage()
      if (isOneClickBuy) {
        location.assign(checkoutUrl)
      }
      onAddFinish && onAddFinish()
    }, 500)
  }

  return (
    <Fragment>
      {!skuItems ? (
        <ContentLoader />
      ) : (
        <Button
          block={large}
          disabled={disabled || !available || (orderFormContext && orderFormContext.loading)}
          onClick={handleAddToCart}
          isLoading={isAddingToCart}
        >
          {available ? (
            children
          ) : (
            <FormattedMessage id="store/buyButton-label-unavailable" />
          )}
        </Button>
      )}
    </Fragment>
  )
}

BuyButton.propTypes = {
  /** SKU Items to be added to the cart */
  skuItems: PropTypes.arrayOf(
    PropTypes.shape({
      /** Specification of which product will be added to the cart */
      skuId: PropTypes.string.isRequired,
      /** Quantity of the product sku to be added to the cart */
      quantity: PropTypes.number.isRequired,
      /** Which seller is being referenced by the button */
      seller: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      /* Sku name */
      name: PropTypes.string.isRequired,
      /* Sku price */
      price: PropTypes.number.isRequired,
      /* Sku variant */
      variant: PropTypes.string,
      /* Sku brand */
      brand: PropTypes.string.isRequired,
      /* Sku options. In delivery, for examples, are the pizza options */
      options: PropTypes.arrayOf(
        PropTypes.shape({
          /* Option id */
          id: PropTypes.string.isRequired,
          /* Option quantity */
          quantity: PropTypes.number.isRequired,
          /* Option assembly id */
          assemblyId: PropTypes.string.isRequired,
          /* Option seller */
          seller: PropTypes.string,
        })
      ),
    })
  ),
  /** Component children that will be displayed inside of the button **/
  children: PropTypes.node.isRequired,
  /** Should redirect to checkout after adding to cart */
  isOneClickBuy: PropTypes.bool,
  /** Should open the Minicart after click */
  shouldOpenMinicart: PropTypes.bool,
  /** Set style to large */
  large: PropTypes.bool,
  /** Internationalization */
  intl: intlShape.isRequired,
  /** If the product is available or not*/
  available: PropTypes.bool,
  /** Function used to show toasts (messages) to user */
  showToast: PropTypes.func,
  /** Function to be called on the start of add to cart click event */
  onAddStart: PropTypes.func,
  /** Function to be called on the end of add to cart event */
  onAddFinish: PropTypes.func,
  /** Add to cart mutation */
  addToCart: PropTypes.func.isRequired,
  /** Open Minicart mutation */
  setMinicartOpen: PropTypes.func.isRequired,
  /** The orderFormContext object */
  orderFormContext: PropTypes.object,
  /** If the button is disabled or not */
  disabled: PropTypes.bool,
}

export default BuyButton
