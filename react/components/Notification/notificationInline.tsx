import React, { memo } from 'react'

import NotificationContent from './notificationContent'

interface Props {
  content?: string
}

function NotificationInline({ content = '' }: Props) {
  if (!content) {
    return null
  }

  return <NotificationContent content={content} />
}

NotificationInline.schema = {
  title: 'admin/editor.notification-bar.title',
}

export default memo(NotificationInline)
