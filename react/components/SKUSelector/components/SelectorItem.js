import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedNumber } from 'react-intl'
import classNames from 'classnames'

/**
 * Inherits the components that should be displayed inside the Selector component.
 */
export default class SelectorItem extends PureComponent {
  render() {
    const { isAvailable, isSelected, children, maxPrice, price, onClick } = this.props
    const discount = getDiscount(maxPrice, price)

    const rootClasses = classNames('vtex-sku-selector__item di ba bw1 pointer flex items-center relative', {
      'b--action-primary': isSelected,
      'b--transparent': !isSelected,
      'hover-b--muted-2': !isSelected,
      'bg-muted-4': !isAvailable
    })

    return (
      <div className={rootClasses}
        onClick={onClick}>
        <div className={classNames('center b', { 'o-50': !isAvailable })}>
          {children}
        </div>
        {discount > 0 && <span className="vtex-sku-selector__bagde b"><FormattedNumber value={discount} style="percent" /></span>}
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
  /** SKU's ID */
  skuId: PropTypes.string,
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
