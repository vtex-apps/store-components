import React from 'react'
import { FormattedMessage } from 'react-intl'

export const IOMessage = props =>
  props.id ? <FormattedMessage {...props} /> : null
