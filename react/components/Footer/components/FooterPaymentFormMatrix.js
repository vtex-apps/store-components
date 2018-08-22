import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import FooterPaymentFormList from './FooterPaymentFormList'

class FooterPaymentFormMatrix extends Component {
  static propTypes = {
    paymentForms: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        paymentTypes: PropTypes.arrayOf(PropTypes.string.isRequired),
      })
    ),
    showPaymentFormsInColor: PropTypes.bool,
    intl: intlShape.isRequired,
  }

  formatMessage(id) {
    return this.props.intl.formatMessage({ id })
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

export default injectIntl(FooterPaymentFormMatrix)
