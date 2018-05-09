import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

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
  }

  formatMessage = id => {
    return this.props.intl.formatMessage({ id })
  }

  render() {
    return (
      <label className="vtex-freight-simulator">
        {this.formatMessage('freight.label')}
        <input
          className="vtex-freight-simulator__input"
          name="zipcode"
          type="text"
          onChange={this.handleChange}
          value={this.state.zipcodeValue}
        />
        <button className="vtex-freight-simulator__cta" onClick={this.handleClick}>OK</button>
      </label>
    )
  }
}

export default injectIntl(FreightSimulator)

