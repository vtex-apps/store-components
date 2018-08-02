import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import { Button } from 'vtex.styleguide'
import { injectIntl, intlShape } from 'react-intl'
import {
  orderFormConsumer,
  contextPropTypes,
} from 'vtex.store/OrderFormContext'

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
  }

  state = {
    isLoading: false,
    timeOut: null,
  }

  translateMessage = id => this.props.intl.formatMessage({ id: id })

  toastMessage = success => {
    const { orderFormContext } = this.props
    const text = success
      ? this.translateMessage(CONSTANTS.SUCCESS_MESSAGE_ID)
      : this.translateMessage(CONSTANTS.ERROR_MESSAGE_ID)

    const message = {
      isSuccess: success,
      text,
    }

    orderFormContext.updateToastMessage(message)

    const timeOut = window.setTimeout(() => {
      orderFormContext.updateToastMessage({ isSuccess: null, text: null })
      this.setState({ timeOut: null })
    }, CONSTANTS.TOAST_TIMEOUT)

    this.setState({ isLoading: false, timeOut })
  }

  handleAddToCart = () => {
    const { skuItems, isOneClickBuy, orderFormContext } = this.props

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

    this.setState({ isLoading: true })

    variables.orderFormId = orderFormContext.orderForm.orderFormId

    if (isOneClickBuy) location.assign(CONSTANTS.CHECKOUT_URL)

    orderFormContext
      .updateOrderForm({
        variables,
      })
      .then(
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
  }

  render() {
    const { isLoading } = this.state

    return (
      <Fragment>
        {isLoading ? (
          <Button disabled size="small" isLoading={isLoading}>
            {this.props.children}
          </Button>
        ) : (
          <Button primary size="small" onClick={() => this.handleAddToCart()}>
            {this.props.children}
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
  ).isRequired,
  /** Context used to call the add to cart mutation and retrieve the orderFormId **/
  orderFormContext: contextPropTypes,
  /** Component children that will be displayed inside of the button **/
  children: PropTypes.PropTypes.node.isRequired,
  /** Should redirect to checkout after adding to cart */
  isOneClickBuy: PropTypes.bool,
  /* Internationalization */
  intl: intlShape.isRequired,
}

export default orderFormConsumer(injectIntl(BuyButton))
