import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { SOCIAL_NAME_MAP, SOCIAL_COMPONENT_MAP } from '../constants/social'
import styles from '../styles.css'

const SOCIAL_WITH_TITLE = new Set([
  SOCIAL_NAME_MAP.whatsapp,
  SOCIAL_NAME_MAP.twitter,
  SOCIAL_NAME_MAP.telegram,
  SOCIAL_NAME_MAP.pinterest,
])

function getExtraSocialProps({ message, socialEnum }) {
  if (!message) return {}

  if (SOCIAL_WITH_TITLE.has(socialEnum)) {
    return { title: message }
  }

  if (socialEnum === SOCIAL_NAME_MAP.facebook) {
    return { quote: message }
  }

  return { body: message }
}

export default class SocialButton extends Component {
  static propTypes = {
    /** Share URL */
    url: PropTypes.string.isRequired,
    /** Message to be shared */
    message: PropTypes.string,
    /** Social Network Enum */
    socialEnum: PropTypes.string.isRequired,
    /** Button size in pixels */
    size: PropTypes.number,
    /** Classes to be applied to social button */
    buttonClass: PropTypes.string,
    /** Classes to be applied to icon of the button */
    iconClass: PropTypes.string,
    /** Image url to share in social medias */
    imageUrl: PropTypes.string,
  }

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
        media={imageUrl}
        {...additionalProps}
      >
        {icon}
      </SocialComponent>
    )
  }
}
