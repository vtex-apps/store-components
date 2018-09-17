import React, { Component } from 'react'
import PropTypes from 'prop-types'
import footerList from './footerList'
import withImage from './withImage'

/**
 * Shows an image for the payments forms accepted
 */
const FooterPaymentFormItem = ({ imageSrc }) => {
  if (!imageSrc) {
    return null
  }

  return <img className="vtex-footer__payment-form-item w2 h2" src={imageSrc} />
}

FooterPaymentFormItem.displayName = 'FooterPaymentFormItem'

FooterPaymentFormItem.propTypes = {
  /** Indicates which one of the payments forms should the component show its image */
  paymentType: PropTypes.string.isRequired,
  /** If true, the original logo (with color) is used. If not, the grayscale's one */
  showInColor: PropTypes.bool.isRequired,
}

const getImagePathFromProps = ({ paymentType, showInColor }) =>
  `${paymentType}${showInColor ? '' : '-BW'}.svg`

export default footerList(
  withImage(getImagePathFromProps)(FooterPaymentFormItem)
)
