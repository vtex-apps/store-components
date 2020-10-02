import React from 'react'

import { CollectionBadgeItem } from './components/CollectionBadgeItem'
import styles from './styles.css'

type OwnProps = {
  collectionBadgesText: any[]
  children: React.ReactNode
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof CollectionBadges.defaultProps

/**
 * Collection Badges component.
 * Encapsulates and displays a responsive list of Collection Badges.
 */
// @ts-expect-error ts-migrate(7022) FIXME: 'CollectionBadges' implicitly has type 'any' becau... Remove this comment to see the full error message
const CollectionBadges = ({ collectionBadgesText, children }: Props) => (
  <div className={`${styles.collectionContainer} relative dib w-100`}>
    {children}
    <div className="inline-flex justify-end absolute w-100 bottom-0 left-0">
      {collectionBadgesText.map((collectionBadgeText: any, index: any) => (
        <CollectionBadgeItem key={collectionBadgeText + index}>
          {collectionBadgeText}
        </CollectionBadgeItem>
      ))}
    </div>
  </div>
)

CollectionBadges.defaultProps = {
  collectionBadgesText: [],
}

export default CollectionBadges
