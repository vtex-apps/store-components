import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty, compose, pathOr } from 'ramda'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToast } from 'vtex.styleguide'
import { orderFormConsumer } from 'vtex.store-resources/OrderFormContext'
import ProductPrice from '../ProductPrice'
import { graphql } from 'react-apollo'

import { BuyButton } from './index'
import { transformAssemblyOptions } from './assemblyUtils'
import addToCartMutation from './mutations/addToCart.gql'
import setOpenMinicartMutation from './mutations/setOpenMinicart.gql'

const BuyButtonMessage = ({ showItemsPrice, skuItems }) => {
  if (!showItemsPrice) {
    return <FormattedMessage id="store/buy-button.add-to-cart" />
  }

  const totalPrice = skuItems.reduce((acc, item) => {
    const itemPrice = item.price * item.quantity
    const addedAssemblyOptions = pathOr([], ['assemblyOptions', 'added'], item)
    return (
      acc +
      addedAssemblyOptions.reduce(
        (childAcc, option) =>
          childAcc +
          option.item.sellingPrice * option.normalizedQuantity * item.quantity,
        itemPrice
      )
    )
  }, 0)

  return (
    <div className="flex w-100 justify-between items-center">
      <FormattedMessage id="store/buy-button.add-to-cart" />
      <ProductPrice
        showLabels={false}
        showListPrice={false}
        sellingPrice={totalPrice}
      />
    </div>
  )
}

const BuyButtonWrapper = ({
  intl,
  addToCart,
  showToast,
  orderFormContext,
  onAddStart,
  onAddFinish,
  children,
  isOneClickBuy,
  shouldOpenMinicart,
  setMinicartOpen,
  showItemsPrice,
  available: propAvailable,
  skuItems: propSkuItems,
  large: propLarge,
}) => {
  const valuesFromContext = useContext(ProductContext)

  const isEmptyContext = !valuesFromContext || isEmpty(valuesFromContext)

  const product = valuesFromContext && valuesFromContext.product
  const selectedItem = valuesFromContext && valuesFromContext.selectedItem
  const assemblyOptions = valuesFromContext && valuesFromContext.assemblyOptions
  const selectedSeller = path(['selectedItem', 'sellers', 0], valuesFromContext)
  const selectedQuantity =
    valuesFromContext && valuesFromContext.selectedQuantity != null
      ? valuesFromContext.selectedQuantity
      : 1

  const skuItems =
    isEmptyContext || propSkuItems != null
      ? propSkuItems
      : EnhancedBuyButton.mapCatalogItemToCart({
          product,
          selectedItem,
          selectedQuantity,
          selectedSeller,
          assemblyOptions,
        })

  const large = isEmptyContext || propLarge != null ? propLarge : true

  const available =
    isEmptyContext || propAvailable != null
      ? propAvailable
      : selectedSeller &&
        selectedSeller.commertialOffer &&
        selectedSeller.commertialOffer.AvailableQuantity > 0

  return (
    <BuyButton
      intl={intl}
      addToCart={addToCart}
      onAddStart={onAddStart}
      onAddFinish={onAddFinish}
      showToast={showToast}
      orderFormContext={orderFormContext}
      skuItems={skuItems}
      large={large}
      available={available}
      isOneClickBuy={isOneClickBuy}
      shouldOpenMinicart={shouldOpenMinicart}
      setMinicartOpen={setMinicartOpen}
    >
      {children || (
        <BuyButtonMessage showItemsPrice={showItemsPrice} skuItems={skuItems} />
      )}
    </BuyButton>
  )
}

const withAddToCart = graphql(addToCartMutation, {
  name: 'addToCart',
  props: ({ addToCart }) => ({
    addToCart: items => addToCart({ variables: { items } }),
  }),
})

const withOpenMinicart = graphql(setOpenMinicartMutation, {
  name: 'setMinicartOpen',
  props: ({ setMinicartOpen }) => ({
    setMinicartOpen: isOpen => setMinicartOpen({ variables: { isOpen } }),
  }),
})

const EnhancedBuyButton = compose(
  withAddToCart,
  withOpenMinicart,
  withToast,
  injectIntl,
  orderFormConsumer
)(BuyButtonWrapper)

// This function is public available to be used only by vtex.product-summary.
// We do not garantee this API will not change and might happen breaking change anytime.
EnhancedBuyButton.mapCatalogItemToCart = function mapCatalogItemToCart({
  product,
  selectedItem,
  selectedQuantity,
  selectedSeller,
  assemblyOptions,
}) {
  return (
    product &&
    selectedItem &&
    selectedSeller &&
    selectedSeller.commertialOffer && [
      {
        index: 0,
        quantity: selectedQuantity,
        detailUrl: `/${product.linkText}/p`,
        name: product.productName,
        brand: product.brand,
        category:
          product.categories && product.categories.length > 0
            ? product.categories[0]
            : '',
        productRefId: product.productReference,
        seller: selectedSeller.sellerId,
        price: selectedSeller.commertialOffer.Price,
        listPrice: selectedSeller.commertialOffer.ListPrice,
        variant: selectedItem.name,
        skuId: selectedItem.itemId,
        imageUrl: path(['images', '0', 'imageUrl'], selectedItem),
        ...transformAssemblyOptions(
          assemblyOptions,
          selectedSeller.commertialOffer.Price
        ),
      },
    ]
  )
}

export default EnhancedBuyButton
