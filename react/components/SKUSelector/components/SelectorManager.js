import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

import SelectorItem from './SelectorItem'

import VTEXClasses from '../constants/CustomClasses'

/**
 * Display a list of items and provides the management of the current selected item.
 */
class SelectorManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
    }
  }

  handleItemClick = itemIndex => {
    this.setState({
      selectedIndex: itemIndex,
    })
    if (this.props.onItemClick) {
      this.props.onItemClick(itemIndex)
    }
  }

  render() {
    return (
      <div className={`${VTEXClasses.SELECTOR_MANAGER} ma1`}>
        <div className="b fabriga overflow-hidden">
          { this.props.title }
        </div>
        <div className="inline-flex flex-wrap"> 
          {
            Children.map(this.props.children, (child, index) => {
              return child.type !== SelectorItem ? child : 
                React.cloneElement(child, {
                  index,
                  isSelected: index === this.state.selectedIndex,
                  onClick: this.handleItemClick,
                })
              }
            )
          }
        </div>
      </div>
    )
  }
}

SelectorManager.propTypes = {
  /** Title of the Selector component. */
  title: PropTypes.string.isRequired,
  /** Function that is called when an item of the Selector Manager is clicked. */
  onItemClick: PropTypes.func,
  /** Children component */
  children: PropTypes.node,
}

SelectorManager.defaultProps = {
  children: {},
}

export default SelectorManager