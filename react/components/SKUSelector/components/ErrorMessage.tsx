import React from 'react'
import { FormattedMessage } from 'react-intl'

import { useSKUSelectorCssHandles } from '../SKUSelectorCssHandles'

export const CSS_HANDLES = ['errorMessage'] as const

function ErrorMessage() {
  const { handles } = useSKUSelectorCssHandles()
  const className = `${handles.errorMessage} c-danger`

  return (
    <FormattedMessage id="store/sku-selector.variation.select-an-option">
      {message => (
        <>
          {' '}
          {/* this space is necessary */}
          <span className={className}>{message}</span>
        </>
      )}
    </FormattedMessage>
  )
}

export default ErrorMessage
