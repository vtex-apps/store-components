import React from 'react'
import PropTypes from 'prop-types'
import footerList from './footerList'

const FooterPaymentFormItem = ({ paymentType }) => <span>{paymentType}</span>

FooterPaymentFormItem.displayName = 'FooterPaymentFormItem'

FooterPaymentFormItem.propTypes = {
  paymentType: PropTypes.string.isRequired,
}

export default footerList(FooterPaymentFormItem)
