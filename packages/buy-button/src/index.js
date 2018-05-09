import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import Button from '@vtex/styleguide/lib/Button'

import addToCartMutation from './mutations/addToCartMutation.gql'
import orderFormQuery from './queries/orderFormQuery.gql'

/**
 * BuyButton Component. Adds a list of items to the cart.
 */
export class BuyButton extends Component {
  handleAddToCart = () => {
    const {
      data: { orderForm: { orderFormId } },
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
            seller: seller || 1,
          },
        ],
      },
      refetchQueries: [{ query: orderFormQuery }],
    })
    afterClick()
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
  quantity: PropTypes.number.isRequired,
  /** The specification of which product will be added to the cart */
  skuId: PropTypes.number.isRequired,
  /** Which seller is being referenced by the button */
  seller: PropTypes.string.isRequired,
  /** Channel */
  salesChannel: PropTypes.string.isRequired,
  /** Graphql property to call a mutation */
  mutate: PropTypes.func.isRequired,
  /** Function that will be called after the mutation */
  afterClick: PropTypes.func.isRequired,
  // orderFormId: PropTypes.string.isRequired,
  /** Order form used in the buy button */
  orderForm: PropTypes.shape({
    /** User's cart id */
    orderFormId: PropTypes.string.isRequired,
  }),
}
export default compose(
  graphql(orderFormQuery, {
    options: { ssr: false },
  }),
  graphql(addToCartMutation)
)(BuyButton)