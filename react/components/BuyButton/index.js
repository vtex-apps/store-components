import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import ContentLoader from 'react-content-loader'
import { compose, pick } from 'ramda'
import { orderFormConsumer } from 'vtex.store-resources/OrderFormContext'

import { Button, withToast } from 'vtex.styleguide'

const CONSTANTS = {
  SUCCESS_MESSAGE_ID: 'buybutton.buy-success',
  ERROR_MESSAGE_ID: 'buybutton.add-failure',
  CHECKOUT_URL: '/checkout/#/cart',
  TOAST_TIMEOUT: 3000,
}

/**
 * BuyButton Component.
 * Adds a list of sku items to the cart.
 */
export class BuyButton extends Component {
  static defaultProps = {
    isOneClickBuy: false,
    available: true,
  }

  state = {
    isLoading: false,
    isAddingToCart: false,
    timeOut: null,
  }

  translateMessage = id => this.props.intl.formatMessage({ id: id })

  toastMessage = success => {
    const message = success
      ? this.translateMessage(CONSTANTS.SUCCESS_MESSAGE_ID)
      : this.translateMessage(CONSTANTS.ERROR_MESSAGE_ID)
    this.props.showToast({ message })
  }

  skuItemToMinicartItem = ({
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
        ],
        restSkuItem
      ),
      index: 1,
    }
  }

  handleAddToCart = async event => {
    event.stopPropagation()
    event.preventDefault()

    const {
      addToCart,
      skuItems,
      isOneClickBuy,
      onAddStart,
      onAddFinish,
      orderFormContext,
    } = this.props
    this.setState({ isAddingToCart: true })
    onAddStart && onAddStart()

    let showToastMessage = null

    try {
      const minicartItems = skuItems.map(this.skuItemToMinicartItem)
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

      if (isOneClickBuy) location.assign(CONSTANTS.CHECKOUT_URL)
      showToastMessage = () => this.toastMessage(success && success.length >= 1)
    } catch (err) {
      console.error(err)
      showToastMessage = () => this.toastMessage(false)
    }

    setTimeout(
      () =>
        this.setState({ isAddingToCart: false }, () => {
          showToastMessage()
          onAddFinish && onAddFinish()
        }),
      500
    )
  }

  render() {
    const { children, skuItems, available, large } = this.props
    const loading = this.state.isLoading || !skuItems
    const { isAddingToCart } = this.state

    return (
      <Fragment>
        {loading ? (
          <ContentLoader />
        ) : (
          <Button
            block={large}
            disabled={!available}
            onClick={this.handleAddToCart}
            isLoading={isAddingToCart}
          >
            {available ? (
              children
            ) : (
              <FormattedMessage id="buyButton-label-unavailable" />
            )}
          </Button>
        )}
      </Fragment>
    )
  }
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
  /** Set style to large */
  large: PropTypes.bool,
  /** Internationalization */
  intl: intlShape.isRequired,
  /** If the product is available or not*/
  available: PropTypes.bool.isRequired,
  /** Function used to show toasts (messages) to user */
  showToast: PropTypes.func.isRequired,
  /** Function to be called on the start of add to cart click event */
  onAddStart: PropTypes.func,
  /** Function to be called on the end of add to cart event */
  onAddFinish: PropTypes.func,
  /** Add to cart mutation */
  addToCart: PropTypes.func.isRequired,
}

export const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($items: [MinicartItem]) {
    addToCart(items: $items) @client
  }
  `

const withMutation = graphql(
  ADD_TO_CART_MUTATION,
  {
    props: ({ mutate }) => ({
      addToCart: items => mutate({ variables: { items } }),
    }),
  }
)

export default compose(
  withMutation,
  withToast,
  injectIntl,
  orderFormConsumer
)(BuyButton)
