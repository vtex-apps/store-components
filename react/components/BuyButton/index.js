import React, { Fragment, useState, useEffect } from 'react'
import { path, isEmpty, isNil, pathOr } from 'ramda'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { usePixel } from 'vtex.pixel-manager'
import { usePWA } from 'vtex.store-resources/PWAContext'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'
import { Button } from '@vtex/shoreline'

import BuyButtonWrapper from './Wrapper'
import { mapSkuItemForPixelEvent } from './utils'
import { useMarketingSessionParams } from './hooks/useMarketingSessionParams'
import { useButtonClasses } from './hooks/useButtonClasses'

const CSS_HANDLES = [
  'buyButtonContainer',
  'buyButtonText',
  'buyButtonAsyncText',
  'buyButton',
]

const BuyButton = ({
  isOneClickBuy,
  available,
  disabled,
  skuItems,
  onAddStart,
  onAddFinish,
  intl,
  allSkuVariationsSelected,
  skuSelector,
  seller,
  onClickBehavior,
  onClickEventPropagation,
  text,
  unavailableText,
  customToastUrl,
  customOneClickBuyLink,
  addToCartFeedback,
  renderToastMessage,
  large,
  blockClass,
  displayBuyButton,
  buyButtonBehavior,
  ...props
}) => {
  const [isAddingToCart, setAddingToCart] = useState(false)
  const { handles } = useCssHandles(CSS_HANDLES)
  const { push } = usePixel()
  const { showInstallPrompt = undefined } = usePWA() || {}
  const { addItem } = useOrderForm()
  const dispatch = useProductDispatch()
  const marketingSessionParams = useMarketingSessionParams()
  const buttonClasses = useButtonClasses({ isAddingToCart, large, available })

  const resolveToastMessage = (success) => {
    if (!success) return intl.formatMessage({ id: 'store/buyButton-addToCart-error' })

    if (!isOneClickBuy) {
      return intl.formatMessage({ id: 'store/buyButton-addToCart-success' })
    }

    return intl.formatMessage({ id: 'store/buyButton-oneClickBuy-success' })
  }

  const toastMessage = ({ success, isNewItem }) => {
    if (renderToastMessage) {
      return renderToastMessage({ success, isNewItem })
    }

    return resolveToastMessage(success)
  }

  const handleAddToCart = async (event) => {
    setAddingToCart(true)
    onAddStart && onAddStart()

    if (onClickBehavior === 'ensure-sku-selection' && !allSkuVariationsSelected) {
      dispatch({
        type: 'SET_BUY_BUTTON_CLICKED',
        args: { clicked: true },
      })

      setAddingToCart(false)
      onAddFinish && onAddFinish()
      return
    }

    const pixelEventItems = skuItems.map((skuItem) => {
      return mapSkuItemForPixelEvent(skuItem)
    })

    push({
      event: 'addToCart',
      ecommerce: {
        add: {
          actionField: {
            list: 'Product Detail Page',
          },
          products: pixelEventItems,
        },
      },
    })

    if (onClickEventPropagation === 'disabled') {
      event.stopPropagation()
    }

    let success = false
    let isNewItem = false

    try {
      const variables = {
        items: skuItems.map((skuItem) => {
          return {
            ...skuItem,
            seller: seller || '1',
            ...marketingSessionParams,
          }
        }),
      }

      const { data } = await addItem({ variables })
      success = !isEmpty(data?.addItem?.items)
      isNewItem = data?.addItem?.isNewItem
    } catch (err) {
      console.error(err)
      success = false
    }

    if (addToCartFeedback === 'customEvent') {
      const event = new CustomEvent('addToCartFeedback', {
        detail: { success, isNewItem },
      })
      document.dispatchEvent(event)
    } else {
      // Default toast feedback
      const message = toastMessage({ success, isNewItem })
      if (message) {
        // Handle toast message display
        console.log(message)
      }
    }

    setAddingToCart(false)
    onAddFinish && onAddFinish()

    if (success && isOneClickBuy) {
      if (customOneClickBuyLink) {
        window.location.assign(customOneClickBuyLink)
      } else {
        window.location.assign('/checkout/#/cart')
      }
    }

    if (success && showInstallPrompt) {
      showInstallPrompt()
    }
  }

  const handleClick = (e) => {
    if (buyButtonBehavior === 'alwaysGoToProduct') {
      return
    }

    handleAddToCart(e)
  }

  const shouldDisplayButton = displayBuyButton !== 'displayButtonHover'

  if (!shouldDisplayButton) {
    return null
  }

  const isButtonDisabled = disabled || !available || isAddingToCart

  // Map the current button styling to Shoreline variants
  const getShorelineVariant = () => {
    if (!available) return 'secondary'
    return 'primary'
  }

  const getShorelineSize = () => {
    return large ? 'large' : 'normal'
  }

  const buttonText = (() => {
    if (isAddingToCart) {
      return (
        <FormattedMessage id="store/buyButton-addingToCart" />
      )
    }

    if (!available) {
      return unavailableText || <FormattedMessage id="store/buyButton-unavailable" />
    }

    return text || <FormattedMessage id="store/buyButton-addToCart" />
  })()

  return (
    <div className={`${handles.buyButtonContainer} ${blockClass || ''}`}>
      <BuyButtonWrapper
        available={available}
        disabled={isButtonDisabled}
        isOneClickBuy={isOneClickBuy}
        skuItems={skuItems}
        onClickBehavior={onClickBehavior}
        buyButtonBehavior={buyButtonBehavior}
        customOneClickBuyLink={customOneClickBuyLink}
        {...props}
      >
        <Button
          variant={getShorelineVariant()}
          size={getShorelineSize()}
          disabled={isButtonDisabled}
          loading={isAddingToCart}
          onClick={handleClick}
          className={`${handles.buyButton} ${buttonClasses}`}
          {...props}
        >
          <span className={handles.buyButtonText}>
            {buttonText}
          </span>
        </Button>
      </BuyButtonWrapper>
    </div>
  )
}

BuyButton.defaultProps = {
  available: true,
  disabled: false,
  isOneClickBuy: false,
  displayBuyButton: 'displayButtonAlways',
  onClickBehavior: 'add-to-cart',
  onClickEventPropagation: 'disabled',
  addToCartFeedback: 'toast',
  large: false,
}

export default injectIntl(BuyButton)