import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApolloConsumer } from 'react-apollo'
import find from 'lodash/find'
import Button from '@vtex/styleguide/lib/Button'
import { injectIntl, intlShape } from 'react-intl'

import ADD_TO_CART_MUTATION from './mutations/addToCartMutation.gql'
import ORDER_FORM_QUERY from './queries/orderFormQuery.gql'

const EVENT = {
  SUCCESS: 'item:add',
  ERROR: 'message:error',
}

/**
 * BuyButton Component. Adds a list of items to the cart.
 */
export class BuyButton extends Component {
  state = {
    isLoading: false,
  }

  translateMessage = id => this.props.intl.formatMessage({ id: id })

  toastMessage = (success, err) => {
    const event = new Event(success ? EVENT.SUCCESS : EVENT.ERROR)
    event.detail = {
      success,
      message: success ? '' : this.translateMessage('buybutton.add-failure'),
      err,
    }
    document.dispatchEvent(event)

    this.setState({ isLoading: false })
  }

  handleAddToCart = client => {
    const { quantity, seller, skuId } = this.props

    const variables = {
      items: [
        {
          id: parseInt(skuId),
          index: 1,
          quantity,
          seller,
        },
      ],
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

          client
            .mutate({
              mutation: ADD_TO_CART_MUTATION,
              variables,
            })
            .then(
              mutationRes => {
                const { items } = mutationRes.data.addItem
                this.toastMessage(find(items, { id: skuId }))
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

BuyButton.defaultProps = {
  quantity: 1,
  seller: 1,
}

BuyButton.propTypes = {
  /** Specification of which product will be added to the cart */
  skuId: PropTypes.string.isRequired,
  /** Component children that will be displayed inside of the button **/
  children: PropTypes.PropTypes.node.isRequired,
  /** Quantity of the product sku to be added to the cart */
  quantity: PropTypes.number,
  /** Which seller is being referenced by the button */
  seller: PropTypes.number,
  /* Internationalization */
  intl: intlShape.isRequired,
}

export default injectIntl(BuyButton)
