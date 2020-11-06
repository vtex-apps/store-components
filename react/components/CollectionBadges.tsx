import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'

export type Props = {
  collectionBadgesText?: string[]
}

const HANDLES = ['collectionContainer', 'item'] as const

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
          <div
            key={`${collectionBadgeText}-${index}`}
            className={`${handles.item} mh1 pa2 bg-blue white tc`}
          >
            {collectionBadgeText}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollectionBadges
