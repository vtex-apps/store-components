import React from 'react'
import PropTypes from 'prop-types'

import footerList from './footerList'

const FooterLinkItem = ({ url, title }) => (
  <a className="vtex-footer__list-link" href={url}>
    {title}
  </a>
)

FooterLinkItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default footerList(FooterLinkItem)
