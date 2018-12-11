import find from 'lodash/find'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import ContentLoader from 'react-content-loader'

import {
  contextPropTypes,
  orderFormConsumer,
} from 'vtex.store/OrderFormContext'
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
  };

  state = {
    isLoading: false,
    isAddingToCart: false,
    timeOut: null,
  };

  translateMessage = id => this.props.intl.formatMessage({ id: id });

  toastMessage = success => {
    const message = success
      ? this.translateMessage(CONSTANTS.SUCCESS_MESSAGE_ID)
      : this.translateMessage(CONSTANTS.ERROR_MESSAGE_ID)
    this.props.showToast({ message })
  };

  handleAddToCart = async () => {
    const { skuItems, isOneClickBuy, orderFormContext } = this.props
    this.setState({ isAddingToCart: true })

    const variables = {
      items: skuItems.map(skuItem => {
        const { skuId, quantity, seller } = skuItem
        return {
          id: parseInt(skuId),
          index: 1,
          quantity,
          seller,
        }
      }),
    }

    variables.orderFormId = orderFormContext.orderForm.orderFormId

    if (isOneClickBuy) location.assign(CONSTANTS.CHECKOUT_URL)

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
  };

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
            primary
            block={large}
            disabled={!available}
            onClick={() => this.handleAddToCart()}
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
      seller: PropTypes.number.isRequired,
    })
  ),
  /** Context used to call the add to cart mutation and retrieve the orderFormId **/
  orderFormContext: contextPropTypes,
  /** Component children that will be displayed inside of the button **/
  children: PropTypes.PropTypes.node.isRequired,
  /** Should redirect to checkout after adding to cart */
  isOneClickBuy: PropTypes.bool,
  /** Set style to large */
  large: PropTypes.bool,
  /** Internationalization */
  intl: intlShape.isRequired,
  /** If the product is available or not*/
  available: PropTypes.bool.isRequired,
}

export default withToast(orderFormConsumer(injectIntl(BuyButton)))
