import React, { memo } from 'react'
import { string } from 'prop-types'
import NotificationContent from './notificationContent'

const NotificationInline = ({ content }) => {
  return content && <NotificationContent content={content} />
}

NotificationInline.propTypes = {
  content: string,
}

NotificationInline.defaultProps = {
  content: '',
}

NotificationInline.schema = {
  title: 'editor.notification-bar.title',
  description: 'editor.notification-bar.description',
  type: 'object',
  properties: {
    content: {
      title: 'editor.notification-bar.content.title',
      description: 'editor.notification-bar.content.description',
      type: 'string',
      default: '',
    },
  },
}

export default memo(NotificationInline)
