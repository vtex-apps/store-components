import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

import Button from '@vtex/styleguide/lib/Button'

import orderFormQuery from './mutations/orderFormQuery.gql'
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
        orderFormId: orderFormId || '6d500aae2a1c4a3e9a2fa8f5a718b982',
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
    return (
      <Button primary onClick={this.handleAddToCart}>
        <FormattedMessage id="buybutton.text" />
      </Button>
    )
  }
}

BuyButton.propTypes = {
  /** The quantity of products to be added to the cart */
  quantity: PropTypes.number.isRequired,
  /** The specification of wich product will be added to the cart */
  skuId: PropTypes.string.isRequired,
  /** Wich seller is being referenced by the button */
  seller: PropTypes.string.isRequired,
  /** ??? */
  salesChannel: PropTypes.string.isRequired,
  /** Should redirect or not */
  redirect: PropTypes.bool,
  /** intl property to format data */
  intl: intlShape.isRequired,
  /** Graphql property to call a mutation */
  mutate: PropTypes.func.isRequired,
  /** Function that will be called after the mutation */
  afterClick: PropTypes.func.isRequired,
  /** The users cart id */
  orderFormId: PropTypes.string.isRequired,
}

export default injectIntl(
  compose(
    graphql(orderFormQuery, {
      options: { ssr: false },
    }),
    graphql(addToCartMutation)
  )(BuyButton)
)
