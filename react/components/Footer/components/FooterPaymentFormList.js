import React from 'react'
import PropTypes from 'prop-types'

import footerList from './footerList'
import ImageLoader from './ImageLoader'

const FooterPaymentFormItem = ({ paymentType, showInColor }) => (
  <ImageLoader imageName={`${paymentType}${showInColor ? '' : '-BW'}.svg`}>
    {(image, loading) => {
      if (loading) {
        return null
      }

      return <img className="vtex-footer__payment-form-item" src={image} />
    }}
  </ImageLoader>
)

FooterPaymentFormItem.displayName = 'FooterPaymentFormItem'

FooterPaymentFormItem.propTypes = {
  paymentType: PropTypes.string.isRequired,
  showInColor: PropTypes.bool.isRequired,
}

export default footerList(FooterPaymentFormItem)
