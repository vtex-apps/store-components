import React, { memo } from 'react'
import { string } from 'prop-types'
import NotificationContent from './notificationContent'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { formatIOMessage } from 'vtex.native-types'
import { injectIntl, defineMessages } from 'react-intl'

import styles from './styles.css'

const messages = defineMessages({
  editorNotificationbarTitle: {
    id: 'admin/editor.notification-bar.title',
    from: 'vtex.admin-messages',
  },
  editorNotificationbarDescription: {
    id: 'admin/editor.notification-bar.description',
    from: 'vtex.admin-messages',
  },
  editorNotificationbarContentTitle: {
    id: 'admin/editor.notification-bar.content.title',
    from: 'vtex.admin-messages',
  },
  editorNotificationbarContentDescription: {
    id: 'admin/editor.notification-bar.content.description',
    from: 'vtex.admin-messages',
  },
})

const NotificationBar = ({ content, intl }) => {
  return (
    content && (
      <div
        className={`${styles.notificationBarContainer} bg-base--inverted c-on-base--inverted w-100`}
      >
        <div
          className={`${styles.notificationBarInner} min-h-large flex items-center justify-center`}
        >
          <NotificationContent
            content={formatIOMessage({ id: content, intl })}
          />
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
  title: messages.editorNotificationbarTitle.id,
}

export default hoistNonReactStatics(
  injectIntl(NotificationBar),
  memo(NotificationBar)
)
