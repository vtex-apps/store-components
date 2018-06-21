import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import VTEXClasses from './CustomClasses'

/**
 * Collection Badge Item.
 * Displays a collection badge item.
 */
export class CollectionBadgeItem extends PureComponent {
  render() {
    return (
      <div className={`${VTEXClasses.COLLECTION_BADGE_ITEM} mh1 pa2 bg-blue white tc`}>
        {this.props.children}
      </div>
    )
  }
}

CollectionBadgeItem.propTypes = {
  /** Children component that should be render inside the collection badge item */
  children: PropTypes.node.isRequired,
}

CollectionBadgeItem.defaultProps = {
  children: {},
}
