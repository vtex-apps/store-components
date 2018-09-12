import React, { Component } from 'react'
import PropTypes from 'prop-types'
import footerList from './footerList'
import withImage from './withImage'

const FooterPaymentFormItem = ({ imageSrc }) => {
  if (!imageSrc) {
    return null
  }

  return <img className="vtex-footer__payment-form-item w2 h2" src={imageSrc} />
}

FooterPaymentFormItem.displayName = 'FooterPaymentFormItem'

FooterPaymentFormItem.propTypes = {
  paymentType: PropTypes.string.isRequired,
  showInColor: PropTypes.bool.isRequired,
}

const getImagePathFromProps = ({ paymentType, showInColor }) =>
  `${paymentType}${showInColor ? '' : '-BW'}.svg`

export default footerList(
  withImage(getImagePathFromProps)(FooterPaymentFormItem)
)
