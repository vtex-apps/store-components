import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import Button from '@vtex/styleguide/lib/Button'

import addToCartMutation from './mutations/addToCartMutation.gql'

/**
 * BuyButton Component. Adds a list of itens to the cart.
 */
class BuyButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleAddToCart = this.handleAddToCart.bind(this)
  }
  handleAddToCart() {
    const {
      mutate,
      quantity,
      seller,
      skuId,
      afterClick,
      orderFormId,
    } = this.props

    mutate({
      variables: {
        orderFormId: orderFormId,
        items: [
          {
            id: parseInt(skuId),
            index: 1,
            quantity: quantity,
            seller: seller || 1,
          },
        ],
      },
    })
    afterClick()
  }

  render() {
    const { textMessage } = this.props

    return (
      <Button primary onClick={this.handleAddToCart}>
        {textMessage}
      </Button>
    )
  }
}

BuyButton.propTypes = {
  /** Message that will be displayed inside of the button **/
  textMessage: PropTypes.string.isRequired,
  /** The quantity of products to be added to the cart */
  quantity: PropTypes.number.isRequired,
  /** The specification of wich product will be added to the cart */
  skuId: PropTypes.string.isRequired,
  /** Wich seller is being referenced by the button */
  seller: PropTypes.string.isRequired,
  /** ??? */
  salesChannel: PropTypes.string.isRequired,
  /** Graphql property to call a mutation */
  mutate: PropTypes.func.isRequired,
  /** Function that will be called after the mutation */
  afterClick: PropTypes.func.isRequired,
  /** The users cart id */
  orderFormId: PropTypes.string.isRequired,
}

export default graphql(addToCartMutation)(BuyButton)
