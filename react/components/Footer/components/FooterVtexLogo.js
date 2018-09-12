import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withImage from './withImage'

class FooterVtexLogo extends Component {
  render() {
    const { logoUrl, imageSrc } = this.props

    if (!imageSrc) {
      return null
    }

    return (
      <div className="vtex-footer__badge-list vtex-footer__list-container--right-aligned justify-center items-center">
        <span className="vtex-footer__badge">
          <img className="vtex-footer__logo-image" src={logoUrl} />
        </span>
        <span className="vtex-footer__badge nt7-ns">
          <img className="vtex-footer__vtexlogo-form-item" src={imageSrc} />
        </span>
      </div>
    )
  }
}

FooterVtexLogo.displayName = 'FooterVtexLogo'

FooterVtexLogo.propTypes = {
  showInColor: PropTypes.bool.isRequired,
  logoUrl: PropTypes.string.isRequired,
}

const getImagePathFromProps = ({ showInColor }) =>
  `VTEX${showInColor ? '' : '-BW'}.svg`

export default withImage(getImagePathFromProps)(FooterVtexLogo)
