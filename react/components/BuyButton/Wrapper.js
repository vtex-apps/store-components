import React from 'react'
import { path } from 'ramda'
import { Link } from 'vtex.render-runtime'

const BuyButtonWrapper = ({
  available,
  disabled,
  isOneClickBuy,
  skuItems,
  onClickBehavior,
  buyButtonBehavior,
  customOneClickBuyLink,
  children,
  ...props
}) => {
  const skuItem = path([0], skuItems)
  const linkState = skuItem
    ? {
        skuId: skuItem.id,
        seller: skuItem.seller,
        quantity: skuItem.quantity,
      }
    : null

  const shouldRenderLink = () => {
    // Render as link when going to product page or when one-click buy with custom link
    return (
      buyButtonBehavior === 'alwaysGoToProduct' ||
      (isOneClickBuy && customOneClickBuyLink) ||
      (onClickBehavior === 'go-to-product-page')
    )
  }

  const getLinkProps = () => {
    if (buyButtonBehavior === 'alwaysGoToProduct') {
      return {
        page: 'store.product',
        params: { slug: skuItem?.itemId },
        query: linkState ? `skuId=${linkState.skuId}` : '',
      }
    }

    if (isOneClickBuy && customOneClickBuyLink) {
      return {
        href: customOneClickBuyLink,
      }
    }

    if (onClickBehavior === 'go-to-product-page') {
      return {
        page: 'store.product',
        params: { slug: skuItem?.itemId },
        query: linkState ? `skuId=${linkState.skuId}` : '',
      }
    }

    return {}
  }

  // If we should render as a link, wrap the button in a Link component
  if (shouldRenderLink() && !disabled && available) {
    return (
      <Link {...getLinkProps()} {...props}>
        {children}
      </Link>
    )
  }

  // Otherwise, render the button directly
  return children
}

BuyButtonWrapper.defaultProps = {
  available: true,
  disabled: false,
  isOneClickBuy: false,
  onClickBehavior: 'add-to-cart',
  buyButtonBehavior: 'default',
}

export default BuyButtonWrapper