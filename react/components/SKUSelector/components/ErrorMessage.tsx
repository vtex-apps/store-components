import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { injectIntl, InjectedIntlProps, defineMessages } from 'react-intl'

const messages = defineMessages({
  selectOption: {
    id: 'store/sku-selector.variation.select-an-option',
    defaultMessage: ''
  },
})

const CSS_HANDLES = ['errorMessage'] as const

function ErrorMessage({ intl }: InjectedIntlProps) {
  const handles = useCssHandles(CSS_HANDLES)
  const className = `${handles.errorMessage} c-danger`

  return (
    <span className={className}>
      {intl.formatMessage(messages.selectOption)}
    </span>
  )
}

export default injectIntl(ErrorMessage)
