import React, { useCallback, useState, useEffect } from 'react'
import { Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import styles from './styles.css'
import { Icon } from 'vtex.store-icons'

interface Props {
  displayThreshold?: number
  rightPosition?: string
  bottomPosition?: string
  display?: boolean
}

const BackToTopButton: StorefrontFC<Props> = props => {
  const handleBackTop = useCallback(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  const [isShowed, setIsShowed] = useState(false)
  const [scrollY, setScrollY] = useState(0)
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
  })

  function scrollValue() {
    setScrollY(window.pageYOffset)
  }

  return !props.display ? (
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
  rightPosition: '2rem',
  bottomPosition: '2rem',
  displayThreshold: 600,
  display: false,
}

export default BackToTopButton
