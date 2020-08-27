import React, { useContext, useCallback, useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { path } from 'ramda'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-content-loader` if i... Remove this comment to see the full error message
import ContentLoader from 'react-content-loader'
import { useRuntime } from 'vtex.render-runtime'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.store-resources/PWAContex... Remove this comment to see the full error message
import { usePWA } from 'vtex.store-resources/PWAContext'
import { useCssHandles } from 'vtex.css-handles'
import useProduct from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.styleguide"' has no exported member ... Remove this comment to see the full error message
import { Button, ToastContext, Tooltip } from 'vtex.styleguide'

import useMarketingSessionParams from './hooks/useMarketingSessionParams'

const CONSTANTS = {
  SUCCESS_MESSAGE_ID: 'store/buybutton.buy-success',
  SELECT_SKU_ERROR_ID: 'store/buybutton.select-sku-variations',
  OFFLINE_BUY_MESSAGE_ID: 'store/buybutton.buy-offline-success',
  DUPLICATE_CART_ITEM_ID: 'store/buybutton.buy-success-duplicate',
  ERROR_MESSAGE_ID: 'store/buybutton.add-failure',
  SEE_CART_ID: 'store/buybutton.see-cart',
  TOAST_TIMEOUT: 3000,
}

const CSS_HANDLES = ['buyButtonContainer', 'buyButtonText']

const isTooltipNeeded = ({ showTooltipOnSkuNotSelected, skuSelector }: any) => {
  if (showTooltipOnSkuNotSelected && !skuSelector.areAllVariationsSelected) {
    return {
      showTooltip: true,
      labelId: CONSTANTS.SELECT_SKU_ERROR_ID,
    }
  }

  return {
    showTooltip: false,
  }
}

const skuItemToMinicartItem = (item: any) => {
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

const useCallCartFinishIfPending = (
  orderFormContext: any,
  isAddingToCart: any,
  addToCartAndFinish: any
) => {
  const orderFormLoading = orderFormContext && orderFormContext.loading

  useEffect(() => {
    if (!orderFormLoading && isAddingToCart) {
      addToCartAndFinish()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderFormLoading])
}

type Props = {
  skuItems?: Array<{
    skuId: string
    quantity: number
    seller?: string | number
    name: string
    price: number
    variant?: string
    brand: string
    options?: Array<{
      id: string
      quantity: number
      assemblyId: string
      seller?: string
    }>
  }>
  children: React.ReactNode
  isOneClickBuy?: boolean
  shouldOpenMinicart?: boolean
  shouldAddToCart?: boolean
  large?: boolean
  intl: any
  available?: boolean
  showTooltipOnSkuNotSelected?: boolean
  showToast?: (...args: any[]) => any
  onAddStart?: (...args: any[]) => any
  onAddFinish?: (...args: any[]) => any
  addToCart: (...args: any[]) => any
  setMinicartOpen: (...args: any[]) => any
  orderFormContext?: any
  disabled?: boolean
  customToastURL?: string
  checkoutUrl?: string
}

/**
 * BuyButton Component.
 * Adds a list of sku items to the cart.
 */
export const BuyButton = ({
  intl,
  large,
  addToCart,
  skuItems,
  onAddStart,
  onAddFinish,
  setMinicartOpen,
  available = true,
  orderFormContext,
  isOneClickBuy = false,
  children,
  disabled: disabledProp,
  shouldAddToCart = true,
  shouldOpenMinicart = false,
  showTooltipOnSkuNotSelected = true,
  checkoutUrl,
  customToastURL = checkoutUrl,
}: Props) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [isAddingToCart, setAddingToCart] = useState(false)
  const { showToast } = useContext(ToastContext)
  const {
    skuSelector = {
      areAllVariationsSelected: true,
    },
  } = useProduct()

  const dispatch = useProductDispatch()
  const { settings = {}, showInstallPrompt } = usePWA() || {}
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'rootPath' does not exist on type 'Runtim... Remove this comment to see the full error message
  const { rootPath = '' } = useRuntime()
  const { promptOnCustomEvent } = settings
  const translateMessage = useCallback(id => intl.formatMessage({ id }), [intl])
  const orderFormItems = path(['orderForm', 'items'], orderFormContext)
  const { utmParams, utmiParams } = useMarketingSessionParams()

  const resolveToastMessage = (success: any, isNewItem: any) => {
    if (!success) return translateMessage(CONSTANTS.ERROR_MESSAGE_ID)
    if (!isNewItem) return translateMessage(CONSTANTS.DUPLICATE_CART_ITEM_ID)

    const isOffline = window && window.navigator && !window.navigator.onLine
    const checkForOffline = !isOffline
      ? translateMessage(CONSTANTS.SUCCESS_MESSAGE_ID)
      : translateMessage(CONSTANTS.OFFLINE_BUY_MESSAGE_ID)

    return checkForOffline
  }

  const toastMessage = ({ success, isNewItem }: any) => {
    const message = resolveToastMessage(success, isNewItem)

    const action = success
      ? {
          label: translateMessage(CONSTANTS.SEE_CART_ID),
          href: rootPath + customToastURL,
        }
      : undefined

    showToast({ message, action })
  }

  const fullCheckoutUrl = rootPath + checkoutUrl

  const beforeAddToCart = (event: any) => {
    event.stopPropagation()
    event.preventDefault()

    setAddingToCart(true)
    onAddStart && onAddStart()
  }

  const addToCartAndFinish = async () => {
    let showToastMessage: any

    try {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      const minicartItems = skuItems.map(skuItemToMinicartItem)
      const localStateMutationResult = !isOneClickBuy
        ? await addToCart(minicartItems)
        : null

      const linkStateItems =
        localStateMutationResult && localStateMutationResult.data.addToCart

      const callOrderFormDirectly = !linkStateItems

      let success: any = null

      if (callOrderFormDirectly) {
        const variables = {
          orderFormId: orderFormContext.orderForm.orderFormId,
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          items: skuItems.map(item => ({
            id: item.skuId,
            seller: item.seller,
            options: item.options,
            quantity: item.quantity,
          })),
          ...(utmParams ? { utmParams } : {}),
          ...(utmiParams ? { utmiParams } : {}),
        }

        const mutationRes = await orderFormContext.addItem({ variables })
        const { items } = mutationRes.data.addItem

        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        success = skuItems.filter(
          skuItem =>
            !!items.find(
              ({ id, seller }: any) =>
                id === skuItem.skuId && seller === skuItem.seller
            )
        )
        await orderFormContext.refetch().catch(() => null)
      }

      const addedItem =
        (linkStateItems &&
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          skuItems.filter(
            skuItem =>
              !!linkStateItems.find(
                ({ id, seller }: any) =>
                  id === skuItem.skuId && seller === skuItem.seller
              )
          )) ||
        success

      const foundItem =
        addedItem.length &&
        orderFormItems &&
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        orderFormItems.filter(
          (item: any) =>
            item.id === addedItem[0].skuId &&
            item.seller === addedItem[0].seller &&
            !item.canHaveAttachment
        ).length > 0

      success = addedItem

      showToastMessage = () =>
        toastMessage({
          success: success && success.length >= 1,
          isNewItem: !foundItem,
        })

      /* PWA */
      if (promptOnCustomEvent === 'addToCart' && showInstallPrompt) {
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
        // eslint-disable-next-line no-restricted-globals
        location.assign(fullCheckoutUrl)
      }

      onAddFinish && onAddFinish()
    }, 500)
  }

  const handleAddToCart = async (event: any) => {
    beforeAddToCart(event)
    await addToCartAndFinish()
  }

  useCallCartFinishIfPending(
    orderFormContext,
    isAddingToCart,
    addToCartAndFinish
  )

  const handleClick = (e: any) => {
    if (dispatch) {
      dispatch({ type: 'SET_BUY_BUTTON_CLICKED', args: { clicked: true } })
    }

    if (skuSelector.areAllVariationsSelected && shouldAddToCart) {
      if (orderFormContext && orderFormContext.loading) {
        // Just call the before add to cart function and the useEffect hook will call the finish part when apropriate
        beforeAddToCart(e)
      } else {
        handleAddToCart(e)
      }
    }
  }

  if (!skuItems) {
    return <ContentLoader />
  }

  const disabled = disabledProp || !available
  const unavailableLabel = (
    <FormattedMessage id="store/buyButton-label-unavailable">
      {message => <span className={handles.buyButtonText}>{message}</span>}
    </FormattedMessage>
  )

  const ButtonWithLabel = (
    <Button
      block={large}
      disabled={disabled}
      onClick={handleClick}
      isLoading={isAddingToCart}
    >
      {available ? children : unavailableLabel}
    </Button>
  )

  const { showTooltip, labelId } = isTooltipNeeded({
    showTooltipOnSkuNotSelected,
    skuSelector,
  })

  const tooltipLabel = showTooltip && (
    <span className={handles.errorMessage}>
      <FormattedMessage id={labelId} />
    </span>
  )

  return !showTooltip ? (
    ButtonWithLabel
  ) : (
    <Tooltip trigger="click" label={tooltipLabel}>
      {ButtonWithLabel}
    </Tooltip>
  )
}

export default BuyButton
