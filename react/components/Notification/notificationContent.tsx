import React, { memo } from 'react'

import { SanitizedHTML } from '../SanitizedHTML'
import styles from './styles.css'

type OwnProps = {
  content?: string
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof NotificationContent.defaultProps

// @ts-expect-error ts-migrate(7022) FIXME: 'NotificationContent' implicitly has type 'any' be... Remove this comment to see the full error message
const NotificationContent = ({ content }: Props) => {
  return (
    <div className={styles.notificationContent}>
      <SanitizedHTML content={content} />
    </div>
  )
}

NotificationContent.defaultProps = {
  content: '',
}

export default memo(NotificationContent)
