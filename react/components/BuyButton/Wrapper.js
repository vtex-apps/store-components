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

const BuyButtonWrapper = props => {
  const {
    intl,
    addToCart,
    showToast,
    orderFormContext,
    onAddStart,
    onAddFinish,
    children,
  } = props

  const valuesFromContext = useContext(ProductContext)

  const buyButtonProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      return props
    }

    const {
      product,
      selectedItem,
      selectedQuantity,
      assemblyOptions,
    } = valuesFromContext

    const sellerId = path(['sellers', 0, 'sellerId'], selectedItem)
    const commertialOffer = path(
      ['sellers', 0, 'commertialOffer'],
      selectedItem
    )

    const available =
      Number.isNaN(+path(['AvailableQuantity'], commertialOffer)) ||
      path(['AvailableQuantity'], commertialOffer) > 0

    const contextSkuItems = product &&
      selectedItem &&
      sellerId && [
        {
          skuId: selectedItem.itemId,
          quantity: selectedQuantity,
          seller: sellerId,
          name: selectedItem.nameComplete,
          price: commertialOffer.Price,
          variant: selectedItem.name,
          brand: product.brand,
          index: 0,
          detailUrl: `/${product.linkText}/p`,
          imageUrl: path(['images', '0', 'imageUrl'], selectedItem),
          listPrice: path(
            ['sellers', '0', 'commertialOffer', 'ListPrice'],
            selectedItem
          ),
          ...transformAssemblyOptions(assemblyOptions, commertialOffer.Price),
        },
      ]

    return {
      ...props,
      skuItems: props.skuItems == null ? contextSkuItems : props.skuItems,
      large: props.large == null ? true : props.large,
      available: props.available == null ? available : props.available,
    }
  }
  const buttonProps = buyButtonProps()
  return (
    <BuyButton
      intl={intl}
      addToCart={addToCart}
      onAddStart={onAddStart}
      onAddFinish={onAddFinish}
      showToast={showToast}
      orderFormContext={orderFormContext}
      {...buttonProps}
    >
      {children || (
        <BuyButtonMessage
          showItemsPrice={props.showItemsPrice}
          skuItems={buttonProps.skuItems}
        />
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

export default compose(
  withAddToCart,
  withOpenMinicart,
  withToast,
  injectIntl,
  orderFormConsumer
)(BuyButtonWrapper)
