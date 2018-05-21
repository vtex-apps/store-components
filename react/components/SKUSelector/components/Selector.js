import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SelectorItem from './SelectorItem'

import VTEXClasses from '../constants/CustomClasses'

/**
 * Display a list of items and provides the management of the current selected item.
 */
class Selector extends Component {
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
      <div className={`${VTEXClasses.SELECTOR} ma1`}>
        <div className="b fabriga overflow-hidden">
          { `${this.props.title}:` }
        </div>
        <div className="inline-flex flex-wrap"> 
          {
            React.Children.map(this.props.children, (child, index) => {
              if (child.type !== SelectorItem) {
                return child
              } else {
                return React.cloneElement(child, {
                  index: index,
                  isSelected: index === this.state.selectedIndex,
                  onClick: this.handleItemClick,
                })
              }
            })
          }
        </div>
      </div>
    )
  }
}

Selector.propTypes = {
  /** Title of the Selector component. */
  title: PropTypes.string.isRequired,
  /** Function that is called when an item of the Selector is clicked. */
  onItemClick: PropTypes.func,
  /** Children component */
  children: PropTypes.node,
}

Selector.defaultProps = {
  children: {},
}

export default Selector