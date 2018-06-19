import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DecreaseIcon from './images/DecreaseIcon'
import Plus from '@vtex/styleguide/lib/icon/Plus'
import { debounce } from 'underscore'

import './global.css'

const iconColor = '#C4C4C4'

/**
 * Quantity selector component.
 */
class QuantitySelector extends Component {
  constructor(props) {
    super(props)
    this.debouncedDecreaseFunction = debounce(() => this.decreaseQuantity(), 1000)
    this.debouncedIncreaseFunction = debounce(() => this.increaseQuantity(), 1000)
    this.state = { currentQuantity: props.currentQuantity }
  }

  handleChange = event => {
    const { maxQuantity, onQuantityChange, onMaxReached } = this.props
    const value = event.target.value
    let quantity = value ? parseInt(value, 10) : 0
    if (quantity > maxQuantity) {
      quantity = maxQuantity
      onMaxReached()
    } else if (quantity < 0) {
      quantity = 1
    }
    onQuantityChange(quantity)
  }

  handleDecreaseButtonClick = (event) => {
    const { currentQuantity } = this.state
    if (currentQuantity > 1) {
      this.setState({ currentQuantity: currentQuantity - 1 })
      event.persist()
      this.debouncedDecreaseFunction()
    }
  }

  handleIncreaseButtonClick = (event) => {
    const { maxQuantity, onMaxReached } = this.props
    const { currentQuantity } = this.state
    if (currentQuantity < maxQuantity) {
      this.setState({ currentQuantity: currentQuantity + 1 })
      event.persist()
      this.debouncedIncreaseFunction()
    } else {
      onMaxReached()
    }
  }

  decreaseQuantity = () => {
    const { onQuantityChange } = this.props
    const { currentQuantity } = this.state
    onQuantityChange(currentQuantity)
  }

  increaseQuantity = () => {
    const { currentQuantity } = this.state
    const { onQuantityChange } = this.props
    onQuantityChange(currentQuantity)
  }

  render() {
    const { currentQuantity } = this.state

    return (
      <div className="flex flex-row">
        <div className="pointer flex items-center justify-center" onClick={(e) => this.handleDecreaseButtonClick(e)}>
          <DecreaseIcon />
        </div>
        <input
          className="vtex-quantity-selector__input ma0 mh1 border-box bw1 br2 b--solid outline-0 near-black b--light-gray hover-b--silver bg-white f6 tc"
          type="number"
          name="quantity"
          value={currentQuantity}
          onChange={this.handleChange}
        />
        <div className="pointer flex items-center justify-center" onClick={(e) => this.handleIncreaseButtonClick(e)}>
          <Plus color={iconColor} />
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
