import React, { memo } from 'react'
import { useIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'

import { SanitizedHTML } from './components/SanitizedHTML'

const CSS_HANDLES = [
  'notificationBarContainer',
  'notificationBarInner',
  'notificationContent',
] as const

interface Props {
  /** Text to be used in the bar */
  content?: string
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function NotificationBar({ content = '', classes }: Props) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const intl = useIntl()

  if (!content) {
    return null
  }

  return (
    <div
      className={`${handles.notificationBarContainer} bg-base--inverted c-on-base--inverted w-100`}
    >
      <div
        className={`${handles.notificationBarInner} min-h-large flex items-center justify-center`}
      >
        <div className={handles.notificationContent}>
          <SanitizedHTML
            content={formatIOMessage({ id: content, intl }) as string}
          />
        </div>
      </div>
    </div>
  )
}

const MemoizedNotificationBar: React.MemoExoticComponent<
  typeof NotificationBar
> & { schema?: Record<string, string> } = memo(NotificationBar)

MemoizedNotificationBar.schema = {
  title: 'admin/editor.notification-bar.title',
}

export default MemoizedNotificationBar
