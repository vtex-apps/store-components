import React from 'react'
import PropTypes from 'prop-types'
import * as ReactShare from 'react-share'

import { SOCIAL_ENUM_TO_COMPONENT } from '../constants/social'

export function SocialButton({ url, size, socialEnum }) {
  const socialComponentName = SOCIAL_ENUM_TO_COMPONENT[socialEnum]
  const SocialComponent = ReactShare[`${socialComponentName}ShareButton`]
  const SocialIcon = ReactShare[`${socialComponentName}Icon`]

  return (
    <SocialComponent className="vtex-share__social-button" url={url}>
      <SocialIcon className="vtex-share__social-icon" size={size} round />
    </SocialComponent>
  )
}

SocialButton.defaultProps = {
  size: 32,
}

SocialButton.propTypes = {
  url: PropTypes.string.isRequired,
  socialEnum: PropTypes.string.isRequired,
  size: PropTypes.number,
}
