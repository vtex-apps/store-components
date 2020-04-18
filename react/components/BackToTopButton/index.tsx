import React, { useState, useEffect } from 'react'
import { Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'vtex.store-icons'

import styles from './styles.css'

interface Props {
  displayThreshold?: number
  display?: Display
}

type Display = 'button' | 'caret-icon'

const handleBackTop = () => {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' })
}

const BackToTopButton: StorefrontFC<Props> = props => {
  const [isShowed, setIsShowed] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  function scrollValue() {
    setScrollY(window.pageYOffset)
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', scrollValue)
    }
    watchScroll()
    return () => {
      window.removeEventListener('scroll', scrollValue)
    }
  })

  useEffect(() => {
    if (scrollY > props.displayThreshold!) {
      setIsShowed(true)
    } else {
      setIsShowed(false)
    }
  }, [scrollY, props.displayThreshold])

  return props.display == 'button' ? (
    <div
      className={`${styles.backToTopButtonContainer} ${
        isShowed ? styles.backToTopButtonActive : styles.backToTopButtonHidden
      } z-999 fixed bottom-2 right-2`}
    >
      <Button onClick={handleBackTop} size="regular">
        <FormattedMessage id="store/editor.action-go-to" />
      </Button>
    </div>
  ) : (
    <div
      className={`${styles.backToTopButtonContainer} ${
        isShowed ? styles.backToTopButtonActive : styles.backToTopButtonHidden
      } z-999 fixed bottom-2 right-2`}
    >
      <Button onClick={handleBackTop} size="regular">
        <Icon id="nav-caret--up" size="16" />
      </Button>
    </div>
  )
}

BackToTopButton.defaultProps = {
  displayThreshold: 600,
  display: 'button',
}

export default BackToTopButton
