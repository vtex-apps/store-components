import React, { memo } from 'react'
import { useIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'

import NotificationContent from './notificationContent'

interface Props {
  content?: string
}

const CSS_HANDLES = [
  'notificationBarContainer',
  'notificationBarInner',
] as const

function NotificationBar({ content = '' }: Props) {
  const intl = useIntl()
  const handles = useCssHandles(CSS_HANDLES)

  if (!content) {
    return null
  }

  return (
    <div
      className={`${handles.notificationBarContainer} bg-base--inverted c-on-base--inverted w-100`}
    >
      <div
        className={`${handles.notificationBarInner} min-h-large flex items-center justify-center`}
      >
        <NotificationContent content={formatIOMessage({ id: content, intl })} />
      </div>
    </div>
  )
}

NotificationBar.schema = {
  title: 'admin/editor.notification-bar.title',
}

export default memo(NotificationBar)
