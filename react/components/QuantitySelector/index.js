import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LessIcon from './images/LessIcon'
import PlusIcon from './images/PlusIcon'

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

  render() {
    const { currentQuantity } = this.props

    return (
      <div className="flex flex-row">
        <div className="flex items-center justify-center relative pr1">
          <LessIcon />
        </div>
        <input
          className="ma0 border-box bw1 br2 b--solid outline-0 near-black b--light-gray hover-b--silver bg-white f6 tc"
          type="number"
          name="quantity"
          value={currentQuantity}
          onChange={this.handleChange}
        />
        <PlusIcon />
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

export default QuantitySelector
