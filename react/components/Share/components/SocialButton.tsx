import React, { Component } from 'react'
import classNames from 'classnames'

import { SOCIAL_NAME_MAP, SOCIAL_COMPONENT_MAP } from '../constants/social'
import styles from '../styles.css'

const SOCIAL_WITH_TITLE = new Set([
  SOCIAL_NAME_MAP.whatsapp,
  SOCIAL_NAME_MAP.twitter,
  SOCIAL_NAME_MAP.telegram,
  SOCIAL_NAME_MAP.pinterest,
])

function getExtraSocialProps({ message, socialEnum }: any) {
  if (!message) return {}

  if (SOCIAL_WITH_TITLE.has(socialEnum)) {
    return { title: message }
  }

  if (socialEnum === SOCIAL_NAME_MAP.facebook) {
    return { quote: message }
  }

  return { body: message }
}

type OwnProps = {
  url: string
  message?: string
  socialEnum: string
  size?: number
  buttonClass?: string
  iconClass?: string
  imageUrl?: string
}

type Props = OwnProps & typeof SocialButton.defaultProps

export default class SocialButton extends Component<Props> {
  static defaultProps = {
    size: 32,
    buttonClass: 'mh1 pointer outline-0 dim',
  }

  render() {
    const {
      url,
      message,
      size,
      socialEnum,
      buttonClass,
      iconClass,
      imageUrl,
    } = this.props

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

    /* Pinterest requires imageUrl for the "media" prop, but
     * it might not be loaded yet */
    if (SocialNetworkName === SOCIAL_NAME_MAP.pinterest && !imageUrl) {
      return icon
    }

    return (
      <SocialComponent
        url={url}
        className={classNames(styles.shareSocialButton, buttonClass)}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'undefined' is not assignable to type 'string... Remove this comment to see the full error message
        media={imageUrl}
        {...additionalProps}
      >
        {icon}
      </SocialComponent>
    )
  }
}
