import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { ExtensionPoint, Link } from 'render'
import classNames from 'classnames'
import { IconCaretDown } from 'vtex.styleguide'

import Logo from '../../../Logo'
import SearchBar from '../../../SearchBar'

const MENU_LABEL = 'MENU'
const LOGO_WIDTH_TABLET = 141
const LOGO_WIDTH_MOBILE = 30
const LOGO_WIDTH_DESKTOP = 197.2
const LOGO_HEIGHT_TABLET = 64
const LOGO_HEIGHT_MOBILE = 30
const LOGO_HEIGHT_DESKTOP = 70.8
const MINICART_ICON_SIZE_MOBILE = 20
const MINICART_ICON_SIZE_DESKTOP = 30
const LOGIN_ICON_SIZE_MOBILE = 20
const LOGIN_ICON_SIZE_DESKTOP = 30

class TopMenu extends Component {
  state = {
    searchMode: false,
  }

  toogleSearchMode = () => this.setState({ searchMode: !this.state.searchMode })

  translate = id => this.props.intl.formatMessage({ id: `header.${id}` })

  renderLogo(mobileMode, logoUrl, logoTitle) {
    const isTabletMode = global.__RUNTIME__.hints.tablet
    return (
      <div className="vtex-top-menu__logo w-20-m w-30-l flex justify-center">
        <Link to="/">
          <Logo
            showLabel={!mobileMode}
            url={logoUrl}
            title={logoTitle}
            width={isTabletMode ? LOGO_WIDTH_TABLET : (mobileMode ? LOGO_WIDTH_MOBILE : LOGO_WIDTH_DESKTOP)}
            height={isTabletMode ? LOGO_HEIGHT_TABLET : (mobileMode ? LOGO_HEIGHT_MOBILE : LOGO_HEIGHT_DESKTOP)}
            color="#FFF"
          />
        </Link>
      </div>
    )
  }

  renderMobileMenu() {
    return (
      <div className="vtex-mobile-menu flex items-center dn-m pa4 white f5 pointer">
        <span className="mt1">
          {MENU_LABEL}
        </span>
        <div className="ml3">
          <IconCaretDown size={10} color="#FFF" />
        </div>
      </div>
    )
  }

  renderSearchBar(mobileMode, searchMode) {
    const classes = classNames(
      'vtex-top-menu__search-bar flex w-40-m pa2-m',
      {
        'w-100': searchMode,
      }
    )
    return (
      <div className={classes}>
        <SearchBar
          isMobileMode={mobileMode}
          isSearchMode={searchMode}
          toogleSearchMode={this.toogleSearchMode}
          placeholder={this.translate('search-placeholder')}
          emptyPlaceholder={this.translate('search-emptyPlaceholder')}
        />
      </div>
    )
  }

  renderIcons(mobileMode) {
    return (
      <div className="vtex-top-menu__icons flex justify-center items-center w-30-m">
        <div className="mr7">
          <ExtensionPoint
            id="login"
            iconSize={mobileMode ? LOGIN_ICON_SIZE_MOBILE : LOGIN_ICON_SIZE_DESKTOP}
            iconLabel={!mobileMode ? this.translate('topMenu.login.icon.label') : ''}
          />
        </div>
        <ExtensionPoint
          id="minicart"
          iconColor="#FFF"
          iconSize={mobileMode ? MINICART_ICON_SIZE_MOBILE : MINICART_ICON_SIZE_DESKTOP}
          iconLabel={!mobileMode ? this.translate('topMenu.minicart.icon.label') : ''}
        />
      </div>
    )
  }

  render() {
    const { logoUrl, logoTitle, fixed, offsetTop } = this.props
    const mobileMode = global.__RUNTIME__.hints.mobile && !global.__RUNTIME__.hints.tablet
    const { searchMode } = this.state
    const classes = classNames(
      'vtex-top-menu bg-near-black flex justify-center pv6',
      {
        'vtex-top-menu--fixed': fixed,
      }
    )
    return (
      <div className={classes} style={{ top: `${offsetTop || 0}px` }}>
        <div className="flex w-100 justify-between-m items-center">
          {!searchMode && this.renderLogo(mobileMode, logoUrl, logoTitle)}
          {!searchMode && mobileMode && this.renderMobileMenu()}
          {this.renderSearchBar(mobileMode, searchMode)}
          {!searchMode && this.renderIcons(mobileMode)}
        </div>
      </div>
    )
  }
}

TopMenu.propTypes = {
  logoUrl: PropTypes.string,
  logoTitle: PropTypes.string,
  intl: intlShape.isRequired,
  fixed: PropTypes.bool,
  offsetTop: PropTypes.number,
}

TopMenu.defaultProps = {
  fixed: false,
}

export default injectIntl(TopMenu)
