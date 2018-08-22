import PropTypes from 'prop-types'
import React, { Component } from 'react'

import FooterPaymentFormList from './FooterPaymentFormList'

export default class FooterPaymentFormMatrix extends Component {
  static propTypes = {
    /** Payment forms array */
    paymentForms: PropTypes.arrayOf(
      PropTypes.shape({
        /** Payment form title */
        title: PropTypes.string.isRequired,
        /** Payment types */
        paymentTypes: PropTypes.arrayOf(PropTypes.string.isRequired),
      })
    ),
    /** Determines if the icons are colorful */
    showPaymentFormsInColor: PropTypes.bool,
  }

  render() {
    const { paymentForms, showPaymentFormsInColor } = this.props

    return (
      paymentForms && (
        <div className="vtex-footer__matrix-container vtex-footer__payment-matrix-container">
          {paymentForms.map((paymentFormsItem, index) => (
            <div
              key={`payment-container-${index}`}
              className="vtex-footer__matrix-item vtex-footer__payment-matrix-item">
              <FooterPaymentFormList
                horizontal
                showInColor={showPaymentFormsInColor}
                titleId={paymentFormsItem.title}
                list={paymentFormsItem.paymentTypes.map(paymentType => ({
                  paymentType,
                }))}
              />
            </div>
          ))}
        </div>
      )
    )
  }
}
