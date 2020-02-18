import React, { memo } from 'react'
import { string } from 'prop-types'
import NotificationContent from './notificationContent'
import { defineMessages } from 'react-intl'

const NotificationInline = ({ content }) => {
  return content && <NotificationContent content={content} />
}

NotificationInline.propTypes = {
  content: string,
}

NotificationInline.defaultProps = {
  content: '',
}

const messages = defineMessages({
  editorNotificationBarTitle: {
    id: 'admin/editor.notification-bar.title',
    from: 'vtex.admin-messages',
  },
  editorNotificationBarDescription: {
    id: 'admin/editor.notification-bar.description',
    from: 'vtex.admin-messages',
  },
  editorNotificationBarContentTitle: {
    id: 'admin/editor.notification-bar.content.title',
    from: 'vtex.admin-messages',
  },
  editorNotificationBarContentDescription: {
    id: 'admin/editor.notification-bar.content.description',
    from: 'vtex.admin-messages',
  },
})

NotificationInline.schema = {
  title: messages.editorNotificationBarTitle.id,
  description: messages.editorNotificationBarDescription.id,
  type: 'object',
  properties: {
    content: {
      title: messages.editorNotificationBarContentTitle.id,
      description: messages.editorNotificationBarContentDescription.id,
      type: 'string',
      default: '',
    },
  },
}

export default memo(NotificationInline)
