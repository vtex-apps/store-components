import React, { memo } from 'react'
import { bool, string, oneOf } from 'prop-types'
import classNames from 'classnames'

import styles from './styles.css'

const NotificationBar = ({
  content
}) => {

  return content && (
    <div className={`${styles.notificationBarContainer} bg-action-primary c-on-action-primary`}>
      <div className={`${styles.notificationBarContent} min-h-large flex items-center justify-center`}>
        {content}
      </div>
    </div>
  ) || null
}

NotificationBar.propTypes = {
  content: string
}

NotificationBar.defaultProps = {
  content: ''
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
