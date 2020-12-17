import React from 'react'
import { Button } from 'vtex.styleguide'
import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { callActionValues } from './SchemaTypes'

const CSS_HANDLES = ['infoCardCallActionContainer', 'infoCardCallActionText']

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const CallToAction = ({ mode, text, url, linkTarget }) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  if (mode === callActionValues.NONE) {
    return null
  }

  // eslint-disable-next-line no-shadow
  const ActionWrapper = ({ text, mode }) => {
    if (mode === callActionValues.BUTTON) {
      return <Button onClick={noop}>{text}</Button>
    }

    // Mode is link
    return (
      <p
        className={`${handles.infoCardCallActionText} link t-body b underline c-action-primary`}
      >
        {text}
      </p>
    )
  }

  return (
    <Link
      className={`${handles.infoCardCallActionContainer} mt6 mb6`}
      target={linkTarget}
      to={url}
    >
      <ActionWrapper text={text} mode={mode} />
    </Link>
  )
}

export default CallToAction
