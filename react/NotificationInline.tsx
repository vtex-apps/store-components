import React, { memo } from 'react'

import NotificationContent from './components/NotificationContent'

interface Props {
  content?: string
}

function NotificationInline({ content = '' }: Props) {
  if (!content) {
    return null
  }

  return <NotificationContent content={content} />
}

const MemoizedNotificationInline: React.MemoExoticComponent<
  typeof NotificationInline
> & { schema?: Record<string, string> } = memo(NotificationInline)

MemoizedNotificationInline.schema = {
  title: 'admin/editor.notification-bar.title',
}

export default MemoizedNotificationInline
