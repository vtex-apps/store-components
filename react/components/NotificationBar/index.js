import React, { memo } from 'react'
import { bool, string, oneOf } from 'prop-types'
import classNames from 'classnames'
import { values } from 'ramda'

import styles from './styles.css'

const getEnumValues = enumObject => values(enumObject).map(({ value }) => value)
const getEnumNames = enumObject => values(enumObject).map(({ name }) => name)

const colorPatterns = {
  ACTION_PRIMARY: {
    name: 'editor.notification-bar.colorPatterns.action_primary',
    value: 'action-primary',
  },
  BASE_INVERTED: {
    name: 'editor.notification-bar.colorPatterns.base_inverted',
    value: 'base-inverted',
  },
}

const NotificationBar = ({
  content,
  colorPattern
}) => {
  const containerClasses = classNames(`${styles.notificationBarContainer}`, {
    [`bg-action-primary c-on-action-primary`]: colorPattern === colorPatterns.ACTION_PRIMARY.value,
    [`bg-base--inverted c-on-base--inverted`]: colorPattern === colorPatterns.BASE_INVERTED.value,
  })
  return content && (
    <div className={containerClasses}>
      <div className={`${styles.notificationBarContent} min-h-large flex items-center justify-center`}>
        {content}
      </div>
    </div>
  ) || null
}

NotificationBar.propTypes = {
  content: string,
  colorPattern: oneOf(getEnumValues(colorPatterns)),
}

NotificationBar.defaultProps = {
  content: '',
  colorPattern: colorPatterns.ACTION_PRIMARY.value
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
    colorPattern: {
      title: 'editor.notification-bar.colorPattern.title',
      description: 'editor.notification-bar.colorPattern.description',
      type: 'string',
      default: colorPatterns.ACTION_PRIMARY.value,
      enum: getEnumValues(colorPatterns),
      enumNames: getEnumNames(colorPatterns),
    },
  },
}

export default memo(NotificationBar)
