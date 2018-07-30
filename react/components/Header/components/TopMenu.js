import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { ExtensionPoint, Link } from 'render'
import classNames from 'classnames'

import Logo from '../../../Logo'
import SearchBar from '../../../SearchBar'

const TopMenu = ({ logoUrl, logoTitle, intl, fixed, offsetTop }) => {
  const translate = id => intl.formatMessage({ id: `header.${id}` })

  const classes = classNames(
    'vtex-top-menu',
    {
      'vtex-top-menu--fixed': fixed,
    }
  )

  return (
    <div
      className={classes}
      style={offsetTop >= 0 ? { top: `${offsetTop}px` } : null}
    >
      <div className="vtex-top-menu__logo">
        <Link className="link b f3 near-black tc tl-ns serious-black" to="/">
          <Logo
            url={logoUrl}
            title={logoTitle}
          />
        </Link>
      </div>
      <div className="vtex-top-menu__search-bar">
        <SearchBar
          placeholder={translate('search-placeholder')}
          emptyPlaceholder={translate('search-emptyPlaceholder')}
        />
      </div>
      <div className="vtex-top-menu__icons flex">
        <ExtensionPoint id="login" />
        <ExtensionPoint id="minicart" />
      </div>
    </div>
  )
}

TopMenu.propTypes = {
  logoUrl: PropTypes.string,
  logoTitle: PropTypes.string,
  intl: intlShape.isRequired,
  fixed: PropTypes.bool,
}

TopMenu.defaultProps = {
  fixed: false,
}

export default injectIntl(TopMenu)
