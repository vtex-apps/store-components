import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CollectionBadgeItem } from './CollectionBadgeItem'
import VTEXClasses from './CustomClasses'

import './collection-badges.css'

/** 
 * Collection Badges component.
 * Encapsulates and displays a responsive list of Collection Badges. 
 */
export class CollectionBadges extends Component {
  render() {
    return (
      <div className={`${VTEXClasses.COLLECTION_BADGES} relative dib`}>
        <div className="inline-flex absolute w-100 bottom-0">
          {
            this.props.collectionBadgesText.map((collectionBadgeText, index) => (
              <CollectionBadgeItem key={index} text={collectionBadgeText} />
            ))
          }
        </div>
        { this.props.children }
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
