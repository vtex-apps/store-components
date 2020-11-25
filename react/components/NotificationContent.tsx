import React, { memo } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { SanitizedHTML } from './SanitizedHTML'

interface Props {
  content: string
}

const CSS_HANDLES = ['notificationContent'] as const

function NotificationContent({ content }: Props) {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.notificationContent}>
      <SanitizedHTML content={content} />
    </div>
  )
}

export default memo(NotificationContent)
