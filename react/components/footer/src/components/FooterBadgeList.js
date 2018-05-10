import React from 'react'
import PropTypes from 'prop-types'

import footerList from './footerList'

const FooterBadgeItem = ({ image }) => (
  <img src={image} />
)

FooterBadgeItem.displayName = 'FooterBadgeItem'

FooterBadgeItem.propTypes = {
  image: PropTypes.string.isRequired,
}

export default footerList(FooterBadgeItem)

