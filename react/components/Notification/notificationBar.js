import React, { memo } from 'react'
import { string } from 'prop-types'
import NotificationContent from './notificationContent'

import styles from './styles.css'

const NotificationBar = ({
  content
}) => {
  return content && (
    <div className={`${styles.notificationBarContainer} bg-base--inverted c-on-base--inverted`}>
      <div className={`${styles.notificationBarInner} min-h-large flex items-center justify-center`}>
        <NotificationContent content={content} />
      </div>
    </div>
  )
}

NotificationBar.propTypes = {
  content: string,
}

NotificationBar.defaultProps = {
  content: '',
}

NotificationBar.schema = {
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

export default memo(NotificationBar)
