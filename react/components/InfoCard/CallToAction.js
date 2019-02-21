import React from 'react'
import { Button } from 'vtex.styleguide'
import { Link } from 'vtex.render-runtime'
import styles from './infoCard.css'

const ActionWrapper = ({ mode, text }) => {
  if (mode === 'button') {
    return (
      <Button size="small" onClick={() => {}}>{text}</Button>
    )
  }

  // Mode is link
  return <p className="link t-body b underline c-action-primary">{text}</p>
}

const CallToAction = ({ mode, text, url }) => {
  if (mode === 'none') {
    return null
  }

  return (
    <Link className={`${styles.infoCardCallActionContainer} mt6 mb6`} to={url}>
      <ActionWrapper text={text} mode={mode} />
    </Link>
  )
}

export default CallToAction