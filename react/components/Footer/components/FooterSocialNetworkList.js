import PropTypes from 'prop-types'
import React, { Component } from 'react'

import footerList from './footerList'
import withImage from './withImage'

/**
 * Shows an image for an specific social network
 */
const FooterSocialNetworkItem = ({ imageSrc, url }) => {
  if (!imageSrc) {
    return null
  }

  return (
    <a href={url} target="_blank" className="mid-gray">
      <img className="vtex-footer__social-network-item" src={imageSrc} />
    </a>
  )
}

FooterSocialNetworkItem.displayName = 'FooterSocialNetworkItem'

FooterSocialNetworkItem.propTypes = {
  /** For which link should the user be redirected if the image is clicked */
  url: PropTypes.string,
  /** If true, the original logo (with color) is used. If not, the grayscale's one */
  showInColor: PropTypes.bool.isRequired,
  /** Indicates from which social network should the image be displayed */
  socialNetwork: PropTypes.oneOf([
    'Facebook',
    'Twitter',
    'Instagram',
    'Youtube',
  ]),
}
const getImagePathFromProps = ({ socialNetwork, showInColor }) =>
  `${socialNetwork}${showInColor ? '' : '-BW'}.svg`

export default footerList(
  withImage(getImagePathFromProps)(FooterSocialNetworkItem)
)
