import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import VTEXClasses from '../constants/CustomClasses'

/**
 * Inherits the components that should be displayed inside the Selector component.
 */
class SelectorItem extends PureComponent {
  handleClick = event => {
    event.preventDefault()
    if (this.props.onClick) {
      this.props.onClick(this.props.index)
    }
  }

  render() {
    return (
      <div className={`${VTEXClasses.SELECTOR__ITEM} di ba bw1 pointer flex items-center ${this.props.isSelected ? 'b--blue' : 'b--transparent'}`} onClick={this.handleClick}>
        { this.props.children }
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
}

SelectorItem.defaultProps = {
  index: 0,
  children: {},
}

export default SelectorItem