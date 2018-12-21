import React, { Component } from 'react'
import { FormattedNumber } from 'react-intl'
import PropTypes from 'prop-types'

import discountBadge from './discountBadge.css'

/**
 * The discount badge component. It receives the product's list and selling prices
 * and calculates the discount percent to show it in the product's sumary.
 */
class DiscountBadge extends Component {
  calculateDiscountTax(listPrice, sellingPrice) {
    return (listPrice - sellingPrice) / listPrice
  }

  render() {
    const { listPrice, sellingPrice, label } = this.props
    const percent = this.calculateDiscountTax(listPrice, sellingPrice)
    return (
      <div className="vtex-discount-badge relative dib w-100">
        {percent ? (
          <div className={`${discountBadge.content} relative dib w-100`}>
            {label === '' && '-'}
            <FormattedNumber value={percent} style="percent" /> {label}
          </div>
        ) : null}
        {this.props.children}
      </div>
    )
  }
}

DiscountBadge.propTypes = {
  /** The product's default price */
  listPrice: PropTypes.number.isRequired,
  /** The product's price with discount */
  sellingPrice: PropTypes.number.isRequired,
  /** Label to track the discount percent */
  label: PropTypes.string,
  /** Image element */
  children: PropTypes.node.isRequired,
}

DiscountBadge.defaultProps = {
  label: '',
}

export default DiscountBadge
