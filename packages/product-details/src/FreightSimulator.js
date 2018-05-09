import React, { Component, Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import FreightTable from './components/FreightTable'

import './freight-simulator.css'

/**
 * Freight simulator component
 *
 * Display an input for the zipcode
 */
class FreightSimulator extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  state = {
    zipcodeValue: '',
    freightOptionList: [],
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
      freightOptionList: [
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
    const { freightOptionList, zipcodeValue } = this.state

    return (
      <Fragment>
        <label className="vtex-freight-simulator">
          {this.formatMessage('freight.label')}
          <input
            className="vtex-freight-simulator__input"
            name="zipcode"
            type="text"
            onChange={this.handleChange}
            value={zipcodeValue}
          />
          <button
            className="vtex-freight-simulator__cta"
            onClick={this.handleClick}
            disabled={zipcodeValue.length < 9}
          >
            OK
          </button>
        </label>

        <FreightTable freightOptionList={freightOptionList} />
      </Fragment>
    )
  }
}

export default injectIntl(FreightSimulator)

