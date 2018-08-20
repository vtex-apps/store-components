import PropTypes from 'prop-types'
import React from 'react'

import footerList from './footerList'

export const FooterLinkItem = ({ url, title }) => (
  <a className="vtex-footer__list-link" href={url}>
    {title}
  </a>
)

FooterLinkItem.displayName = 'FooterLinkItem'

FooterLinkItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default footerList(FooterLinkItem)
