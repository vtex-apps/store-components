import React, { memo } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.native-types"' has no exported membe... Remove this comment to see the full error message
import { formatIOMessage } from 'vtex.native-types'
import { injectIntl } from 'react-intl'

import NotificationContent from './notificationContent'
import styles from './styles.css'

type OwnProps = {
  content?: string
  intl: any
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof NotificationBar.defaultProps

// @ts-expect-error ts-migrate(7022) FIXME: 'NotificationBar' implicitly has type 'any' becaus... Remove this comment to see the full error message
const NotificationBar = ({ content, intl }: Props) => {
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

NotificationBar.defaultProps = {
  content: '',
}

NotificationBar.schema = {
  title: 'admin/editor.notification-bar.title',
}

export default hoistNonReactStatics(
  injectIntl(NotificationBar),
  memo(NotificationBar)
)
