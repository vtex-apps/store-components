import React from 'react'
import classNames from 'classnames'

import { SOCIAL_NAME_MAP, SOCIAL_COMPONENT_MAP } from './social'
import styles from './styles.css'

const SOCIAL_WITH_TITLE = new Set([
  SOCIAL_NAME_MAP.whatsapp,
  SOCIAL_NAME_MAP.twitter,
  SOCIAL_NAME_MAP.telegram,
  SOCIAL_NAME_MAP.pinterest,
])

function getExtraSocialProps({
  message,
  socialEnum,
}: {
  message?: string
  socialEnum: string
}) {
  if (!message) return {}

  if (SOCIAL_WITH_TITLE.has(socialEnum)) {
    return { title: message }
  }

  if (socialEnum === SOCIAL_NAME_MAP.facebook) {
    return { quote: message }
  }

  return { body: message }
}

interface Props {
  /** Share URL */
  url: string
  /** Message to be shared */
  message?: string
  /** Social Network Enum */
  socialEnum: string
  /** Button size in pixels */
  size?: number
  /** Classes to be applied to social button */
  buttonClass?: string
  /** Classes to be applied to icon of the button */
  iconClass?: string
  /** Image url to share in social medias */
  imageUrl?: string
}

function SocialButton({
  url,
  message,
  socialEnum,
  size = 32,
  buttonClass = 'mh1 pointer outline-0 dim',
  iconClass,
  imageUrl,
}: Props) {
  const {
    SocialNetworkName,
    SocialComponent,
    SocialIcon,
  } = SOCIAL_COMPONENT_MAP[socialEnum]

  const additionalProps = getExtraSocialProps({ message, socialEnum })

  const icon = (
    <SocialIcon
      round
      size={size}
      className={classNames(styles.shareSocialIcon, iconClass)}
    />
  )

  /** Pinterest requires imageUrl for the "media" prop, but
   * it might not be loaded yet */
  if (SocialNetworkName === SOCIAL_NAME_MAP.pinterest && !imageUrl) {
    return icon
  }

  return (
    <SocialComponent
      url={url}
      className={classNames(styles.shareSocialButton, buttonClass)}
      media={imageUrl ?? ''}
      {...additionalProps}
    >
      {icon}
    </SocialComponent>
  )
}

export default SocialButton
