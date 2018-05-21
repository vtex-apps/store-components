import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import VTEXClasses from '../constants/CustomClasses'

class SelectorItem extends PureComponent {
  handleClick = event => {
    event.preventDefault()
    this.props.onClick(this.props.index)
  }

  render() {
    return (
      <div className={`${VTEXClasses.SELECTOR__ITEM} di ba bw1 pointer ${this.props.isSelected ? 'b--black' : 'b--transparent'}`} onClick={this.handleClick}>
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
}

SelectorItem.defaultProps = {
  index: 0,
  children: {},
}

export default SelectorItem