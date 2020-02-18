import React, { useState, useEffect, useCallback } from 'react'
import { Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import styles from './styles.css'

interface Props {
  topPixel?: number
}

const GoTopButton: StorefrontFC<Props> = ({ topPixel = 1000 }) => {
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  )
  const [scrollY, setScrollY] = useState(bodyOffset.top)

  const listener = useCallback(() => {
    setBodyOffset(document.body.getBoundingClientRect())
    setScrollY(-bodyOffset.top)
  }, [setBodyOffset, setScrollY])

  useEffect(() => {
    window.addEventListener('scroll', listener)
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [listener])

  const rigthPosition = scrollY > topPixel ? '10px' : '-100%'

  const handleBackTop = useCallback(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div
      className={`${styles.goTopButtonContainer} z-999 fixed`}
      style={{ right: rigthPosition }}
    >
      <Button onClick={handleBackTop} size="regular">
        <FormattedMessage id="store/editor.action-go-to" />
      </Button>
    </div>
  )
}

GoTopButton.schema = {
  title: 'admin/editor.toTop.title',
  description: 'admin/editor.toTop.description',
  type: 'object',
  properties: {
    topPixel: {
      title: 'admin/editor.toTop.topPixel.title',
      description: 'admin/editor.toTop.topPixel.description',
      type: 'number',
    },
  },
}

export default GoTopButton
