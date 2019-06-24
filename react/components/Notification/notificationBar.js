import React, { memo } from 'react'
import { string } from 'prop-types'
import NotificationContent from './notificationContent'
import hoistNonReactStatics from 'hoist-non-react-statics'

import styles from './styles.css'

const NotificationBar = ({ content }) => {
  return (
    content && (
      <div
        className={`${
          styles.notificationBarContainer
        } bg-base--inverted c-on-base--inverted w-100`}
      >
        <div
          className={`${
            styles.notificationBarInner
          } min-h-large flex items-center justify-center`}
        >
          <NotificationContent content={content} />
        </div>
      </div>
    )
  )
}

NotificationBar.propTypes = {
  content: string,
}

NotificationBar.defaultProps = {
  content: '',
}

NotificationBar.schema = {
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

export default hoistNonReactStatics(NotificationBar, memo(NotificationBar))
