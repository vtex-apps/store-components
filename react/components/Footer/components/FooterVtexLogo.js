import React from 'react'
import PropTypes from 'prop-types'

class FooterVtexLogo extends React.Component{
  state = { VTEXIcon: null }

  componentDidMount() {
    const { showInColor } = this.props

    import(`../images/VTEX${showInColor ? '' : '-BW'}.svg`).then(
      VTEXIcon => {
        this.setState({ VTEXIcon })
      }
    )
  }

  render() {
    const { VTEXIcon } = this.state

    const { logoUrl } = this.props

    if (!VTEXIcon) {
      return null
    }

    return (
      <div className="vtex-footer__badge-list vtex-footer__list-container--right-aligned justify-center items-center">
        <span className="vtex-footer__badge">
          <img className="vtex-footer__logo-image" src={logoUrl} />
        </span>
        <span className="vtex-footer__badge nt7-ns">
          <img className="vtex-footer__vtexlogo-form-item" src={VTEXIcon} />
        </span>
      </div>
    )
  }
}

FooterVtexLogo.displayName = 'FooterVtexLogo'

FooterVtexLogo.propTypes = {
  showInColor: PropTypes.bool.isRequired,
  logoUrl: PropTypes.string.isRequired
}

export default FooterVtexLogo
