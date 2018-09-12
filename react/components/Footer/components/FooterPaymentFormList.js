import React, { Component } from 'react'
import PropTypes from 'prop-types'
import footerList from './footerList'
import withImage from './withImage'

class FooterPaymentFormItem extends Component {
  render() {
    const { imageSrc } = this.props

    if (!imageSrc) {
      return null
    }

    return <img className="vtex-footer__payment-form-item" src={imageSrc} />
  }
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
