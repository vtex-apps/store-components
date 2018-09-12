import PropTypes from 'prop-types'
import React, { Component } from 'react'

import footerList from './footerList'
import withImage from './withImage'

const FooterSocialNetworkItem = ({ imageSrc, url }) => {
  if (!imageSrc) {
    return null
  }

  return (
    <a href={url} target="_blank" style={{ color: '#727273' }}>
      <img className="vtex-footer__social-network-item" src={imageSrc} />
    </a>
  )
}

FooterSocialNetworkItem.displayName = 'FooterSocialNetworkItem'

FooterSocialNetworkItem.propTypes = {
  url: PropTypes.string,
  showInColor: PropTypes.bool.isRequired,
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
