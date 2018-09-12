import PropTypes from 'prop-types'
import React, { Component } from 'react'

import footerList from './footerList'
import withImage from './withImage'

class FooterSocialNetworkItem extends Component {
  render() {
    const { imageSrc } = this.props

    if (!imageSrc) {
      return null
    }

    return (
      <a href={this.props.url} target="_blank" style={{ color: '#727273' }}>
        <img className="vtex-footer__social-network-item" src={imageSrc} />
      </a>
    )
  }
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
