import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CollectionBadgeItem } from './CollectionBadgeItem'
import VTEXClasses from './CustomClasses'

import './collection-badges.css'

export class CollectionBadges extends Component {
  render() {
    return (
      <div className={`${VTEXClasses.COLLECTION_BADGES} relative dib`}>
        <div className="inline-flex absolute w-100 bottom-0">
          {
            this.props.collectionBadges.map((collectionBadge, index) => (
              <CollectionBadgeItem key={index} {...collectionBadge} />
            ))
          }
        </div>
        { this.props.children }
      </div>
    )
  }
}

CollectionBadges.propTypes = {
  /** Array of collection badges */
  collectionBadges: PropTypes.arrayOf(PropTypes.shape({
    /** Text of the collection badge */
    text: PropTypes.string.isRequired,
  })).isRequired,
  /** Children component */
  children: PropTypes.node.isRequired,
}

CollectionBadges.defaultProps = {
  collectionBadges: [],
}
