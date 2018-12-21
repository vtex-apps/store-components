import React from 'react'
import PropTypes from 'prop-types'

import { CollectionBadgeItem } from './components/CollectionBadgeItem'

import collectionBadges from './collectionBadges.css'

/**
 * Collection Badges component.
 * Encapsulates and displays a responsive list of Collection Badges.
 */
const CollectionBadges = ({ collectionBadgesText, children }) => (
  <div className={`${collectionBadges.container} relative dib h-100`}>
    {children}
    <div className="inline-flex justify-end absolute w-100 bottom-0 left-0">
      {collectionBadgesText.map((collectionBadgeText, index) => (
        <CollectionBadgeItem key={collectionBadgeText + index}>
          {collectionBadgeText}
        </CollectionBadgeItem>
      ))}
    </div>
  </div>
)

CollectionBadges.propTypes = {
  /** Array of collection badges text */
  collectionBadgesText: PropTypes.array.isRequired,
  /** Children component that should be render inside the collection badge item */
  children: PropTypes.node.isRequired,
}

CollectionBadges.defaultProps = {
  collectionBadgesText: [],
}

export default CollectionBadges
