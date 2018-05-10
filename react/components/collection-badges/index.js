import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CollectionBadgeItem } from './CollectionBadgeItem'
import VTEXClasses from './CustomClasses'

/**
 * Collection Badges component.
 * Encapsulates and displays a responsive list of Collection Badges.
 */
export default class CollectionBadges extends Component {
  render() {
    return (
      <div className={`${VTEXClasses.COLLECTION_BADGES} relative dib`}>
        <div className="inline-flex absolute w-100 bottom-0">
          {
            this.props.collectionBadgesText.map(collectionBadgeText => (
              <CollectionBadgeItem key={collectionBadgeText}>
                {collectionBadgeText}
              </CollectionBadgeItem>
            ))
          }
        </div>
        {this.props.children}
      </div>
    )
  }
}

CollectionBadges.propTypes = {
  /** Array of collection badges text */
  collectionBadgesText: PropTypes.array.isRequired,
  /** Children component */
  children: PropTypes.node.isRequired,
}

CollectionBadges.defaultProps = {
  collectionBadgesText: [],
}
