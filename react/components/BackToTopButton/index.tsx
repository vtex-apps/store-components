import React, {  useCallback } from 'react'
import { Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import styles from './styles.css'

interface Props {
  topPixel?: number,
  rightPosition?: string,
  bottomPosition?: string
}

const BackToTopButton: StorefrontFC<Props> = (props) => {
  const handleBackTop = useCallback(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div
      className={`${styles.BackToTopButtonContainer} z-999 fixed`}
      style={{ right: props.rightPosition, bottom: props.bottomPosition }}
    >
      <Button onClick={handleBackTop} size="regular">
        <FormattedMessage id="store/editor.action-go-to" />
      </Button>
    </div>
  )
}

BackToTopButton.defaultProps = {
  rightPosition: "0",
  bottomPosition: "2rem"
}

export default BackToTopButton
