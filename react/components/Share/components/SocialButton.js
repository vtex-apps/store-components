import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as ReactShare from 'react-share'

import { SOCIAL_TO_ENUM, SOCIAL_ENUM_TO_COMPONENT } from '../constants/social'

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
  }

  static defaultProps = {
    size: 32,
  }

  render() {
    const { url, message, size, socialEnum } = this.props
    const socialComponentName = SOCIAL_ENUM_TO_COMPONENT[socialEnum]
    const SocialComponent = ReactShare[`${socialComponentName}ShareButton`]
    const SocialIcon = ReactShare[`${socialComponentName}Icon`]
    const additionalProps = message && resolveMessageProp(message, socialEnum)

    return (
      <SocialComponent
        className="vtex-share__social-button"
        url={url}
        {...additionalProps}>
        <SocialIcon className="vtex-share__social-icon" size={size} round />
      </SocialComponent>
    )
  }
}

function resolveMessageProp(message, socialEnum) {
  const titlePropMessage = [
    SOCIAL_TO_ENUM.whatsapp,
    SOCIAL_TO_ENUM.twitter,
    SOCIAL_TO_ENUM.telegram,
  ]

  return titlePropMessage.includes(socialEnum)
    ? { title: message }
    : socialEnum === SOCIAL_TO_ENUM.facebook
      ? { quote: message }
      : { body: message }
}
