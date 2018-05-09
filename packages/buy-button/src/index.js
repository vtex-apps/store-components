import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import Button from '@vtex/styleguide/lib/Button'

import addToCartMutation from './mutations/addToCartMutation.gql'
import orderFormQuery from './queries/orderFormQuery.gql'

/**
 * BuyButton Component. Adds a list of items to the cart.
 */
class BuyButton extends Component {
  static defaultProps = {
    quantity: 1,
    seller: 1,
  }
  handleAddToCart = event => {
    const {
      data: {
        orderForm: { orderFormId },
      },
      mutate,
      quantity,
      seller,
      skuId,
      afterClick,
    } = this.props

    mutate({
      variables: {
        orderFormId,
        items: [
          {
            id: parseInt(skuId),
            index: 1,
            quantity,
            seller,
          },
        ],
      },
      refetchQueries: [{ query: orderFormQuery }],
    })
    afterClick(event)
  }

  render() {
    return (
      <Button primary onClick={this.handleAddToCart}>
        {this.props.children}
      </Button>
    )
  }
}

BuyButton.propTypes = {
  /** Message that will be displayed inside of the button **/
  children: PropTypes.PropTypes.node.isRequired,
  /** The quantity of products to be added to the cart */
  quantity: PropTypes.number,
  /** The specification of which product will be added to the cart */
  skuId: PropTypes.string.isRequired,
  /** Which seller is being referenced by the button */
  seller: PropTypes.number,
  /** Graphql property to call a mutation */
  mutate: PropTypes.func.isRequired,
  /** Function that will be called after the mutation */
  afterClick: PropTypes.func.isRequired,
  /** Property that contains OrderForm response */
  data: PropTypes.shape({
    /** Order form used in the buy button */
    orderForm: PropTypes.shape({
      /** User's cart id */
      orderFormId: PropTypes.string.isRequired,
    }),
  }),
}
export default compose(
  graphql(orderFormQuery, {
    options: { ssr: false },
  }),
  graphql(addToCartMutation),
)(BuyButton)
