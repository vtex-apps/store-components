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
  EVENT_SUCCESS: 'item:add',
  EVENT_ERROR: 'message:error',
  ERROR_MESSAGE_ID: 'buybutton.add-failure',
  CHECKOUT_URL: '/checkout/#/cart',
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
  }

  translateMessage = id => this.props.intl.formatMessage({ id: id })

  toastMessage = (success, err) => {
    const event = new Event(
      success ? CONSTANTS.EVENT_SUCCESS : CONSTANTS.EVENT_ERROR
    )
    event.detail = {
      success,
      message: success ? '' : this.translateMessage(CONSTANTS.ERROR_MESSAGE_ID),
      err,
    }
    document.dispatchEvent(event)

    this.setState({ isLoading: false })
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
          this.toastMessage(success)
        },
        mutationErr => {
          this.toastMessage(false, mutationErr)
        }
      )
  }

  render() {
    const { isLoading } = this.state

    return (
      <Fragment>
        {isLoading ? (
          <Button disabled isLoading={isLoading}>
            {this.props.children}
          </Button>
        ) : (
          <Button primary onClick={() => this.handleAddToCart()}>
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
