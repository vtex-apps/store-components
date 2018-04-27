import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VTEXClasses from './CustomClasses'

/** 
 * Collection Badge Item.
 * Displays a text which identifies the collection item.
 */
export class CollectionBadgeItem extends Component {
  render() {
    return (
      <div className={`${VTEXClasses.COLLECTION_BADGE_ITEM} w-50 fl ml1 mr1 pa2 bg-blue white fabriga tc`}>
        { this.props.text }
      </div>
    )
  }
}

CollectionBadgeItem.propTypes = {
  /* Text to be displayed into the collection badge item */
  text: PropTypes.string.isRequired,
}

CollectionBadgeItem.defaultProps = {
  text: '',
}
