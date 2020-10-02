import React from 'react'
import { FormattedMessage } from 'react-intl'

export const formatIOMessage = ({ id }: any) => id

export const IOMessage = (props: any) => {
  if (props.id) {
    return <FormattedMessage {...props} />
  }

  if (props['data-testid']) {
    return <div>{props['data-testid']}</div>
  }

  if (props.children) {
    return props.children(null)
  }

  return null
}
