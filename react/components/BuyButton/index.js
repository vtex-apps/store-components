import PropTypes from 'prop-types'
import React, { useContext, useCallback, useState, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import ContentLoader from 'react-content-loader'
import { compose, pick } from 'ramda'
import { orderFormConsumer } from 'vtex.store-resources/OrderFormContext'

import { Button, ToastContext } from 'vtex.styleguide'

const CONSTANTS = {
  SUCCESS_MESSAGE_ID: 'store/buybutton.buy-success',
  ERROR_MESSAGE_ID: 'store/buybutton.add-failure',
  CHECKOUT_URL: '/checkout/#/cart',
  TOAST_TIMEOUT: 3000,
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
}) => {
  const [isAddingToCart, setAddingToCart] = useState(false)
  const { showToast } = useContext(ToastContext)
  const translateMessage = useCallback(id => intl.formatMessage({ id: id }), [
    intl,
  ])

  const skuItemToMinicartItem = ({
    skuId: id,
    variant: skuName,
    price: sellingPrice,
    ...restSkuItem
  }) => {
    return {
      id,
      sellingPrice,
      skuName,
      ...pick(
        [
          'detailUrl',
          'imageUrl',
          'quantity',
          'seller',
          'name',
          'options',
          'listPrice',
          'brand',
        ],
        restSkuItem
      ),
      index: 1,
    }
  }

  const toastMessage = success => {
    const message = success
      ? translateMessage(CONSTANTS.SUCCESS_MESSAGE_ID)
      : translateMessage(CONSTANTS.ERROR_MESSAGE_ID)
    showToast({ message })
  }

  const handleAddToCart = async event => {
    event.stopPropagation()
    event.preventDefault()

    setAddingToCart(true)
    onAddStart && onAddStart()

    let showToastMessage
    try {
      const minicartItems = skuItems.map(skuItemToMinicartItem)
      const {
        data: { addToCart: linkStateItems },
      } = await addToCart(minicartItems)

      let success = null
      if (!linkStateItems) {
        // minicart does not have link state implemented, calling graphql directly
        const variables = {
          orderFormId: orderFormContext.orderForm.orderFormId,
          items: skuItems.map(skuItem => {
            const { skuId } = skuItem
            return {
              id: parseInt(skuId),
              index: 1,
              ...pick(['quantity', 'seller', 'options'], skuItem),
            }
          }),
        }
        const mutationRes = await orderFormContext.addItem({ variables })
        const { items } = mutationRes.data.addItem
        success = skuItems.filter(
          skuItem => !!items.find(({ id }) => id === skuItem.skuId)
        )
        await orderFormContext.refetch().catch(() => null)
      }

      success =
        success ||
        (linkStateItems &&
          skuItems.filter(
            skuItem => !!linkStateItems.find(({ id }) => id === skuItem.skuId)
          ))

      showToastMessage = () => toastMessage(success && success.length >= 1)
      shouldOpenMinicart && !isOneClickBuy && setMinicartOpen(true)
    } catch (err) {
      console.error(err)
      showToastMessage = () => toastMessage(false)
    }

    setTimeout(() => {
      setAddingToCart(false)
      showToastMessage()
      if (isOneClickBuy) location.assign(CONSTANTS.CHECKOUT_URL)
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
          disabled={!available}
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
  available: PropTypes.bool.isRequired,
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

export default compose(
  withAddToCart,
  withOpenMinicart,
  injectIntl,
  orderFormConsumer
)(BuyButton)
