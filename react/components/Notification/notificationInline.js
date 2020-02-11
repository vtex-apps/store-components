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
  editorNotificationbarTitle: {
    id: 'admin/editor.notification-bar.title',
    from: 'vtex.admin-messages'
  },
  editorNotificationbarDescription: {
    id: 'admin/editor.notification-bar.description',
    from: 'vtex.admin-messages'
  },
  editorNotificationbarContentTitle: {
    id: 'admin/editor.notification-bar.content.title',
    from: 'vtex.admin-messages'
  },
  editorNotificationbarContentDescription: {
    id: 'admin/editor.notification-bar.content.description',
    from: 'vtex.admin-messages'
  }
})

NotificationInline.schema = {
  title: messages.editorNotificationbarTitle.id,
  description: messages.editorNotificationbarDescription.id,
  type: 'object',
  properties: {
    content: {
      title: messages.editorNotificationbarContentTitle.id,
      description: messages.editorNotificationbarContentDescription.id,
      type: 'string',
      default: ''
    }
  }
}

export default memo(NotificationInline)
