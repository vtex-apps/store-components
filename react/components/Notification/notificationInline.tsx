import React, { memo } from 'react'

import NotificationContent from './notificationContent'

type OwnProps = {
  content?: string
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof NotificationInline.defaultProps

// @ts-expect-error ts-migrate(7022) FIXME: 'NotificationInline' implicitly has type 'any' bec... Remove this comment to see the full error message
const NotificationInline = ({ content }: Props) => {
  return content && <NotificationContent content={content} />
}

NotificationInline.defaultProps = {
  content: '',
}

NotificationInline.schema = {
  title: 'admin/editor.notification-bar.title',
  description: 'admin/editor.notification-bar.description',
  type: 'object',
  properties: {
    content: {
      title: 'admin/editor.notification-bar.content.title',
      description: 'admin/editor.notification-bar.content.description',
      type: 'string',
      default: '',
    },
  },
}

export default memo(NotificationInline)
