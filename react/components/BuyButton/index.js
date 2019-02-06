import find from 'lodash/find'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import ContentLoader from 'react-content-loader'
import { compose, pick } from 'ramda'
import { Pixel } from 'vtex.pixel-manager/PixelContext'

import {
  contextPropTypes,
  orderFormConsumer,
} from 'vtex.store-resources/OrderFormContext'
import { Button, withToast } from 'vtex.styleguide'

import buyButton from './styles.css'

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
  };

  state = {
    isLoading: false,
    isAddingToCart: false,
    timeOut: null,
  };

  translateMessage = id => this.props.intl.formatMessage({ id: id })

  toastMessage = success => {
    const message = success
      ? this.translateMessage(CONSTANTS.SUCCESS_MESSAGE_ID)
      : this.translateMessage(CONSTANTS.ERROR_MESSAGE_ID)
    this.props.showToast({ message })
  }

  handleAddToCart = async () => {
    const { skuItems, isOneClickBuy, orderFormContext, push } = this.props
    this.setState({ isAddingToCart: true })

    const variables = {
      items: skuItems.map(skuItem => {
        const { skuId } = skuItem
        return {
          id: parseInt(skuId),
          index: 1,
          ...pick(['quantity', 'seller', 'options'], skuItem),
        }
      }),
    }

    variables.orderFormId = orderFormContext.orderForm.orderFormId

    if (isOneClickBuy) location.assign(CONSTANTS.CHECKOUT_URL)

    push({
      event: 'addToCart',
      items: skuItems,
    })

    await orderFormContext.addItem({ variables }).then(
      mutationRes => {
        const { items } = mutationRes.data.addItem
        const success = skuItems.map(skuItem =>
          find(items, { id: skuItem.skuId })
        )

        orderFormContext.refetch()
        this.toastMessage(success.length >= 1)
      },
      () => {
        this.toastMessage(false)
      }
    )
    this.setState({ isAddingToCart: false })
  }

  render() {
    const { children, skuItems, available, large } = this.props
    const loading = this.state.isLoading || !skuItems
    const { isAddingToCart } = this.state

    return (
      <div className={buyButton.container}>
        {loading ? (
          <ContentLoader />
        ) : (
          <Button
            primary
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
      </div>
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
      seller: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      variant: PropTypes.string,
      brand: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        assemblyId: PropTypes.string.isRequired,
        seller: PropTypes.string.isRequired,
      }))
    })
  ),
  /** Context used to call the add to cart mutation and retrieve the orderFormId **/
  orderFormContext: contextPropTypes,
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
}

export default compose(
  withToast,
  orderFormConsumer,
  injectIntl,
  Pixel,
)(BuyButton)
