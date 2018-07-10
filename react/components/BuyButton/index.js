import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApolloConsumer } from 'react-apollo'
import find from 'lodash/find'
import Button from '@vtex/styleguide/lib/Button'
import { injectIntl, intlShape } from 'react-intl'

import ADD_TO_CART_MUTATION from './mutations/addToCartMutation.gql'
import ORDER_FORM_QUERY from './queries/orderFormQuery.gql'

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
    const event = new Event(success ? CONSTANTS.EVENT_SUCCESS : CONSTANTS.EVENT_ERROR)
    event.detail = {
      success,
      message: success ? '' : this.translateMessage(CONSTANTS.ERROR_MESSAGE_ID),
      err,
    }
    document.dispatchEvent(event)

    this.setState({ isLoading: false })
  }

  handleAddToCart = client => {
    const { skuItems, isOneClickBuy } = this.props
    
    const variables = { 
      items: skuItems.map(skuItem => {
        const { id, quantity, seller } = skuItem;
        return {
          id: parseInt(id),
          index: 1, 
          quantity,
          seller,
        }
      })  
    }

    this.setState({ isLoading: true })

    client
      .query({
        query: ORDER_FORM_QUERY,
      })
      .then(
        queryRes => {
          const {
            data: {
              orderForm: { orderFormId },
            },
          } = queryRes

          variables.orderFormId = orderFormId

          if (isOneClickBuy) {
            location.assign(CONSTANTS.CHECKOUT_URL)
          }

          client
            .mutate({
              mutation: ADD_TO_CART_MUTATION,
              variables,
            })
            .then(
              mutationRes => {
                const { items } = mutationRes.data.addItem
                const success = find(items, { id: skuId })
                this.toastMessage(success)
              },
              mutationErr => {
                this.toastMessage(false, mutationErr)
              }
            )
        },
        queryErr => {
          this.toastMessage(false, queryErr)
        }
      )
  }

  render() {
    const { isLoading } = this.state

    return (
      <ApolloConsumer>
        {client => (
          <div>
            {isLoading ? (
              <Button disabled isLoading={isLoading}>
                {this.props.children}
              </Button>
            ) : (
                <Button primary onClick={() => this.handleAddToCart(client)}>
                  {this.props.children}
                </Button>
              )}
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

BuyButton.propTypes = {
  /** SKU Items to be added to the cart */
  skuItems: PropTypes.arrayOf(
    PropTypes.shape({
      /** Specification of which product will be added to the cart */
      id: PropTypes.string.isRequired,
      /** Quantity of the product sku to be added to the cart */
      quantity: PropTypes.number.isRequired,
      /** Which seller is being referenced by the button */
      seller: PropTypes.number.isRequired,
    }),
  ).isRequired,
  /** Component children that will be displayed inside of the button **/
  children: PropTypes.PropTypes.node.isRequired,
  /** Should redirect to checkout after adding to cart */
  isOneClickBuy: PropTypes.bool,
  /* Internationalization */
  intl: intlShape.isRequired,
}

export default injectIntl(BuyButton)
