import React, { Component, Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import ShippingTable from './components/ShippingTable'

import './global.css'

/**
 * Shipping simulator component
 *
 * Display an input for the zipcode
 */
class ShippingSimulator extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  state = {
    zipcodeValue: '',
    shippingOptionList: [],
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

    // TODO: call graphql
    this.setState({
      shippingOptionList: [
        {
          name: 'Super Expressa',
          value: 65.99,
          eta: 4,
        },
        {
          name: 'Expressa',
          value: 45,
          eta: 7,
        },
        {
          name: 'Econômica',
          value: 0,
          eta: 20,
        },
        {
          name: 'Retirada Rápida',
        },
      ],
    })
  }

  formatMessage = id => {
    return this.props.intl.formatMessage({ id })
  }

  render() {
    const { shippingOptionList, zipcodeValue } = this.state

    return (
      <Fragment>
        <label className="vtex-shipping-simulator">
          {this.formatMessage('shipping.label')}
          <input
            className="vtex-shipping-simulator__input"
            name="zipcode"
            type="text"
            onChange={this.handleChange}
            value={zipcodeValue}
          />
          <button
            className="vtex-shipping-simulator__cta"
            onClick={this.handleClick}
            disabled={zipcodeValue.length < 9}>
            OK
          </button>
        </label>

        <ShippingTable shippingOptionList={shippingOptionList} />
      </Fragment>
    )
  }
}

export default injectIntl(ShippingSimulator)
