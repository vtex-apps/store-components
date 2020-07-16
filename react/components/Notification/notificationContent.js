import React, { memo } from 'react'
import { string } from 'prop-types'

import { SanitizedHTML } from '../../modules/sanitizedHTML'
import styles from './styles.css'

const NotificationContent = ({ content }) => {
  return (
    <div className={styles.notificationContent}>
      <SanitizedHTML content={content} />
    </div>
  )
}

NotificationContent.propTypes = {
  content: string,
}

NotificationContent.defaultProps = {
  content: '',
}

export default memo(NotificationContent)
