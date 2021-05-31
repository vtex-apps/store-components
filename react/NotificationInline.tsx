import React, { memo } from 'react'
import { useIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'

import { SanitizedHTML } from './components/SanitizedHTML'

const CSS_HANDLES = ['notificationContent'] as const

interface Props {
  /** Text to be used in the bar */
  content?: string
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function NotificationInline({ content = '', classes }: Props) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const intl = useIntl()

  if (!content) {
    return null
  }

  return (
    <div className={handles.notificationContent}>
      <SanitizedHTML
        content={formatIOMessage({ id: content, intl }) as string}
      />
    </div>
  )
}

const MemoizedNotificationInline: React.MemoExoticComponent<
  typeof NotificationInline
> & { schema?: Record<string, string> } = memo(NotificationInline)

MemoizedNotificationInline.schema = {
  title: 'admin/editor.notification-bar.title',
}

export default MemoizedNotificationInline
