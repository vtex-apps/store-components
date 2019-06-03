import React from 'react'
import { FormattedMessage } from 'react-intl'

export const formatIOMessage = ({ id }) => id

export const IOMessage = props => {
  if (props.id) {
    return <FormattedMessage {...props} />
  }
  if (props.testId) {
    return <div>{props.testId}</div>
  }
  return null
}
  
