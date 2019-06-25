import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty, compose } from 'ramda'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToast } from 'vtex.styleguide'
import { orderFormConsumer } from 'vtex.store-resources/OrderFormContext'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { BuyButton } from './index'

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

    const { product, selectedItem, state } = valuesFromContext

    const sellerId = path(['sellers', 0, 'sellerId'], selectedItem)
    const commertialOffer = path(
      ['sellers', 0, 'commertialOffer'],
      selectedItem
    )

    const available =
      Number.isNaN(+path(['AvailableQuantity'], commertialOffer)) ||
      path(['AvailableQuantity'], commertialOffer) > 0

    const contextSkuItems = selectedItem &&
      sellerId && [
        {
          skuId: selectedItem.itemId,
          quantity: state.selectedQuantity,
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
        },
      ]

    return {
      ...props,
      skuItems: props.skuItems == null ? contextSkuItems : props.skuItems,
      large: props.large == null ? true : props.large,
      available: props.available == null ? available : props.available,
    }
  }

  return (
    <BuyButton
      intl={intl}
      addToCart={addToCart}
      onAddStart={onAddStart}
      onAddFinish={onAddFinish}
      showToast={showToast}
      orderFormContext={orderFormContext}
      {...buyButtonProps()}
    >
      {children || <FormattedMessage id="store/buy-button.add-to-cart" />}
    </BuyButton>
  )
}

export const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($items: [MinicartItem]) {
    addToCart(items: $items) @client
  }
`

export const OPEN_CART_MUTATION = gql`
  mutation setMinicartOpen($isOpen: Boolean!) {
    setMinicartOpen(isOpen: $isOpen) @client
  }
`

const withAddToCart = graphql(ADD_TO_CART_MUTATION, {
  name: 'addToCart',
  props: ({ addToCart }) => ({
    addToCart: items => addToCart({ variables: { items } }),
  }),
})

const withOpenMinicart = graphql(OPEN_CART_MUTATION, {
  name: 'setMinicartOpen',
  props: ({ setMinicartOpen }) => ({
    setMinicartOpen: isOpen => setMinicartOpen({ variables: { isOpen } }),
  }),
})

const withMutation = graphql(ADD_TO_CART_MUTATION, {
  props: ({ mutate }) => ({
    addToCart: items => mutate({ variables: { items } }),
  }),
})

export default compose(
  withMutation,
  withAddToCart,
  withOpenMinicart,
  withToast,
  injectIntl,
  orderFormConsumer
)(BuyButtonWrapper)
