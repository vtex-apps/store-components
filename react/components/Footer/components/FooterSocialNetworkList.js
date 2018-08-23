import PropTypes from 'prop-types'
import React, { Component } from 'react'

import footerList from './footerList'

class FooterSocialNetworkItem extends Component {
  state = {}

  componentDidMount() {
    const { socialNetwork, showInColor } = this.props

    import(`../images/${socialNetwork}${showInColor ? '' : '-BW'}.svg`).then(
      image => {
        this.setState({ image })
      }
    )
  }

  render() {
    const { image } = this.state

    if (!image) {
      return null
    }

    return (
      <a href={this.props.url} target="_blank" style={{color: '#727273'}}>
        <img className="vtex-footer__social-network-item" src={image} />
      </a>
    )
  }
}

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
