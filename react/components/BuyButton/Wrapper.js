import * as React from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty, compose } from 'ramda'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToast } from 'vtex.styleguide'
import { orderFormConsumer } from 'vtex.store-resources/OrderFormContext'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { BuyButton } from './index'

const BuyButtonWrapper = ({ 
  intl,
  addToCart,
  showToast,
  orderFormContext,
  onAddStart,
  onAddFinish,
  ...props 
}) => {
  const valuesFromContext = React.useContext(ProductContext)

  const buyButtonProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) return props

    const { product, selectedItem, selectedQuantity } = valuesFromContext

    const sellerId = path(['sellers', 0, 'sellerId'], selectedItem)
    const commertialOffer = path(
      ['sellers', 0, 'commertialOffer'],
      selectedItem
    )

    const showBuyButton =
      Number.isNaN(+path(['AvailableQuantity'], commertialOffer)) ||
      path(['AvailableQuantity'], commertialOffer) > 0

    return {
      skuItems: selectedItem &&
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
          },
        ],
      large: true,
      available: showBuyButton,
    }
  }

  const { available, ...restProps } = buyButtonProps()

  if (!available) return null

  return (
    <BuyButton
      intl={intl}
      addToCart={addToCart}
      onAddStart={onAddStart}
      onAddFinish={onAddFinish}
      showToast={showToast}
      orderFormContext={orderFormContext}
      { ...restProps }
    >
      <FormattedMessage id="store/buy-button.add-to-cart" />
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
