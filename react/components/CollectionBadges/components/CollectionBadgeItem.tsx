import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'

const HANDLES = ['item'] as const

/**
 * Collection Badge Item.
 * Displays a collection badge item.
 */
const CollectionBadgeItem: FC = ({ children }) => {
  const handles = useCssHandles(HANDLES)

  return (
    <div className={`${handles.item} mh1 pa2 bg-blue white tc`}>{children}</div>
  )
}

export { CollectionBadgeItem }
