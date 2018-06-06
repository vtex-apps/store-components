import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedNumber } from 'react-intl'

import VTEXClasses from '../constants/CustomClasses'

/**
 * Inherits the components that should be displayed inside the Selector component.
 */
export default class SelectorItem extends PureComponent {
  handleClick = event => {
    event.preventDefault()
    if (this.props.onClick) {
      this.props.onClick(this.props.index)
    }
  }

  render() {
    const { isAvailable, isSelected, children, maxPrice, price } = this.props
    const discount = getDiscount(maxPrice, price)
    return (
      <div
        className={`${VTEXClasses.SELECTOR__ITEM} di ba bw1 pointer flex items-center
        ${isSelected ? 'b--blue' : 'b--transparent'}
        ${!isAvailable && 'bg-light-gray'}`}
        onClick={this.handleClick}>
        <div className="relative">
          <div className={`${!isAvailable && 'o-50'}`}>
            {children}
          </div>
          {discount > 0 && <span className={`${VTEXClasses.SKU_BADGE} b`}><FormattedNumber value={discount} style="percent" /></span>}
        </div>
      </div>
    )
  }
}

SelectorItem.propTypes = {
  /** Index of the item into the selector parent component starting from 0 */
  index: PropTypes.number,
  /** Children components */
  children: PropTypes.node,
  /** Function that is called when the item is clicked */
  onClick: PropTypes.func,
  /** Flag that indicates if the sku is available */
  isAvailable: PropTypes.bool,
  /** Flag that indicates if the current item is selected */
  isSelected: PropTypes.bool,
  /** Max sku price */
  maxPrice: PropTypes.number,
  /** Price of the current sku */
  price: PropTypes.number,
}

SelectorItem.defaultProps = {
  index: 0,
  children: {},
  isAvailable: true,
  isSelected: false,
}

const getDiscount = (maxPrice, price) => {
  let discount = 0
  if (maxPrice && price) {
    discount = 1 - (price / maxPrice)
  }
  return discount
}
