import React, { useState, useEffect } from 'react'
import { Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'vtex.store-icons'
import classNames from 'classnames'

import styles from './styles.css'

interface Props {
  displayThreshold?: number
  display?: Display
}

type Display = 'button' | 'caret-icon'

const handleBackTop = () => {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' })
}

const BackToTopButton: StorefrontFC<Props> = ({
  displayThreshold = 600,
  display = 'button',
}) => {
  const [isShowed, setIsShowed] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const backToTopButtonClasses = classNames(
    `${styles.backToTopButtonContainer} z-999 fixed bottom-2 right-2`,
    {
      [`${styles.backToTopButtonHidden}`]: !isShowed,
      [`${styles.backToTopButtonActive}`]: isShowed,
    }
  )

  function scrollValue() {
    setScrollY(window.pageYOffset)
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollValue)
    return () => {
      window.removeEventListener('scroll', scrollValue)
    }
  }, [])

  useEffect(() => {
    if (scrollY > displayThreshold) {
      setIsShowed(true)
    } else {
      setIsShowed(false)
    }
  }, [scrollY, displayThreshold])

  return display == 'button' ? (
    <div className={backToTopButtonClasses}>
      <Button onClick={handleBackTop} size="regular">
        <FormattedMessage id="store/back-to-top.label" />
      </Button>
    </div>
  ) : (
    <div className={backToTopButtonClasses}>
      <Button onClick={handleBackTop} size="regular">
        <Icon id="nav-caret--up" size="16" />
      </Button>
    </div>
  )
}

export default BackToTopButton
