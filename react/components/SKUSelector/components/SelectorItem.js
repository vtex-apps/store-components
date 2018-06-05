import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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
    return (
      <div
        className={`${VTEXClasses.SELECTOR__ITEM} di ba bw1 pointer
        ${this.props.isSelected ? 'b--black' : 'b--transparent'}
        ${!this.props.isAvailable && 'bg-light-gray'}`}
        onClick={this.handleClick}>
        <div className={`${!this.props.isAvailable && 'o-50'}`}>
          {this.props.children}
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
  /** Flag that indicates if the sku in available */
  isAvailable: PropTypes.bool,
  /** Flag that indicates if the current item is selected */
  isSelected: PropTypes.bool,
}

SelectorItem.defaultProps = {
  index: 0,
  children: {},
  isAvailable: true,
  isSelected: false,
}
