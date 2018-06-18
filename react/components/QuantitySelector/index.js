import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DecreaseIcon from './images/DecreaseIcon'
import Plus from '@vtex/styleguide/lib/icon/Plus'

import './global.css'

/**
 * Quantity selector component.
 */
class QuantitySelector extends Component {
  handleChange = event => {
    const { maxQuantity, onQuantityChange, onMaxReached } = this.props
    const value = event.target.value
    let quantity = value ? parseInt(value, 10) : 0
    if (quantity > maxQuantity) {
      quantity = maxQuantity
      onMaxReached()
    } else if (quantity < 0) {
      quantity = 0
    }
    onQuantityChange(quantity)
  }

  handleDecreaseButtonClick = () => {
    const { currentQuantity, onQuantityChange } = this.props
    if (currentQuantity > 0) {
      onQuantityChange(currentQuantity - 1)
    }
  }

  handleIncreaseButtonClick = () => {
    const { currentQuantity, maxQuantity, onQuantityChange, onMaxReached } = this.props
    if (currentQuantity < maxQuantity) {
      onQuantityChange(currentQuantity + 1)
    } else {
      onMaxReached()
    }
  }

  render() {
    const { currentQuantity } = this.props

    return (
      <div className="flex flex-row">
        <div className="pointer flex items-center justify-center" onClick={this.handleDecreaseButtonClick}>
          <DecreaseIcon />
        </div>
        <input
          className="vtex-quantity-selector__input ma0 mh1 border-box bw1 br2 b--solid outline-0 near-black b--light-gray hover-b--silver bg-white f6 tc"
          type="number"
          name="quantity"
          value={currentQuantity}
          onChange={this.handleChange}
        />
        <div className="pointer flex items-center justify-center" onClick={this.handleIncreaseButtonClick}>
          <Plus color="#C4C4C4" />
        </div>
      </div>
    )
  }
}

QuantitySelector.propTypes = {
  /** Product's maximum quantity that the client can buy */
  maxQuantity: PropTypes.number.isRequired,
  /** Current quantity to be setted as the initial value */
  currentQuantity: PropTypes.number.isRequired,
  /** Called when the client set the quantity selector */
  onQuantityChange: PropTypes.func.isRequired,
  /** Define if can buy more items than the maximum limit */
  onMaxReached: PropTypes.func.isRequired,
}

QuantitySelector.defaultProps = {
  currentQuantity: 0,
}

export default QuantitySelector
