import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { withApollo, compose } from 'react-apollo'

import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

import ShippingTable from './components/ShippingTable'
import getShippingEstimates from './queries/getShippingEstimates.gql'

import './global.css'

/**
 * Shipping simulator component
 *
 * Display an input for the zipcode
 */
class ShippingSimulator extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    client: PropTypes.object,
    skuId: PropTypes.string.isRequired,
    sellerId: PropTypes.string.isRequired,
  }

  state = {
    zipcodeValue: '',
    shipping: {},
    loading: false,
  }

  handleChange = e => {
    let zipcodeValue = e.target.value || ''

    zipcodeValue = zipcodeValue.replace(/\D/g, '')

    if (zipcodeValue.length > 8) {
      zipcodeValue = zipcodeValue.substring(0, 8)
    }

    if (zipcodeValue.length > 5) {
      zipcodeValue = zipcodeValue.replace(/(\d{5})(\d+)/, '$1-$2')
    }

    this.setState({
      zipcodeValue,
    })
  }

  handleClick = e => {
    e.preventDefault()

    const { skuId, sellerId } = this.props

    this.setState({
      loading: true,
    })

    this.props.client.query({
      query: getShippingEstimates,
      variables: {
        country: 'BRA', // TODO @lucasecdb: get country of user instead of hard-coding
        postalCode: this.state.zipcodeValue,
        items: [
          {
            quantity: '1',
            id: skuId,
            seller: sellerId,
          },
        ],
      },
    }).then(result => {
      this.setState({
        shipping: result.data.shipping,
      })
    }).catch(error => {
      console.error(error)
    }).finally(() => {
      this.setState({
        loading: false,
      })
    })
  }

  formatMessage = id => {
    return this.props.intl.formatMessage({ id })
  }

  render() {
    const { shipping, zipcodeValue, loading } = this.state

    return (
      <Fragment>
        <label className="vtex-shipping-simulator f7">
          {this.formatMessage('shipping.label')}
          <Input
            className="vtex-shipping-simulator__input"
            name="zipcode"
            type="text"
            onChange={this.handleChange}
            value={zipcodeValue}
          />
          <Button
            className="vtex-shipping-simulator__cta"
            onClick={this.handleClick}
            disabled={zipcodeValue.length < 9}
            isLoading={loading}
          >
            OK
          </Button>
        </label>

        <ShippingTable shipping={shipping} />
      </Fragment>
    )
  }
}

export default compose(
  withApollo,
  injectIntl
)(ShippingSimulator)
