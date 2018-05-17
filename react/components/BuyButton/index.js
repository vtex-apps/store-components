import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import find from 'lodash/find'
import Button from '@vtex/styleguide/lib/Button'

import addToCartMutation from './mutations/addToCartMutation.gql'
import orderFormQuery from './queries/orderFormQuery.gql'

/**
 * BuyButton Component. Adds a list of items to the cart.
 */
export class BuyButton extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: false }
  }
  static defaultProps = {
    quantity: 1,
    seller: 1,
  }
  handleAddToCart = () => {
    this.setState({ isLoading: !this.state.isLoading })
    const {
      data: {
        orderForm: { orderFormId },
      },
      mutate,
      quantity,
      seller,
      skuId,
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
    }).then(res => {
      const { items } = res.data.addItem
      if (find(items, { id: skuId })) {
        document.dispatchEvent(new Event('item:add'))
        this.setState({ isLoading: !this.state.isLoading })
      }
    }, (err) => {
      if (err) {
        document.dispatchEvent(new Event('item:fail'))
        this.setState({ isLoading: !this.state.isLoading })
      }
    })
  }

  render() {
    const { isLoading } = this.state
    return (
      <div>
        {
          (isLoading) ? (
            <Button disabled isLoading={isLoading}>
              {this.props.children}
            </Button>
          ) : (
            <Button primary onClick={this.handleAddToCart}>
              {this.props.children}
            </Button>
          )
        }
      </div>
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
