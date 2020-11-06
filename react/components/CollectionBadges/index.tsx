import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { CollectionBadgeItem } from './components/CollectionBadgeItem'

export type Props = {
  collectionBadgesText?: string[]
}

const HANDLES = ['collectionContainer'] as const

const CollectionBadges: FC<Props> = ({
  collectionBadgesText = [],
  children,
}) => {
  const handles = useCssHandles(HANDLES)

  return (
    <div className={`${handles.collectionContainer} relative dib w-100`}>
      {children}
      <div className="inline-flex justify-end absolute w-100 bottom-0 left-0">
        {collectionBadgesText.map((collectionBadgeText, index) => (
          <CollectionBadgeItem key={`${collectionBadgeText}-${index}`}>
            {collectionBadgeText}
          </CollectionBadgeItem>
        ))}
      </div>
    </div>
  )
}

export default CollectionBadges
