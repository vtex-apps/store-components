import React from 'react'
import PropTypes from 'prop-types'

import footerList from './footerList'
import ImageLoader from './ImageLoader'

const FooterSocialNetworkItem = ({ socialNetwork, showInColor, url }) => (
  <ImageLoader imageName={`${socialNetwork}${showInColor ? '' : '-BW'}.svg`}>
    {(image, loading) => {
      if (loading) {
        return null
      }

      return (
        <a href={url} target="_blank">
          <img className="vtex-footer__social-network-item" src={image} />
        </a>
      )
    }}
  </ImageLoader>
)

FooterSocialNetworkItem.displayName = 'FooterSocialNetworkItem'

FooterSocialNetworkItem.propTypes = {
  url: PropTypes.string.isRequired,
  showInColor: PropTypes.bool.isRequired,
  socialNetwork: PropTypes.oneOf([
    'Facebook',
    'Twitter',
    'Instagram',
    'Youtube',
  ]),
}

export default footerList(FooterSocialNetworkItem)

