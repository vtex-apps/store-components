import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import FooterPaymentFormList from './FooterPaymentFormList'

class FooterPaymentFormMatrix extends Component {
  static propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string),
    paymentForms: PropTypes.arrayOf(PropTypes.array),
    showPaymentFormsInColor: PropTypes.bool,
    intl: intlShape.isRequired,
  }

  formatMessage(id) {
    return this.props.intl.formatMessage({ id })
  }

  render() {
    const { titles, paymentForms, showPaymentFormsInColor } = this.props

    return (
      paymentForms && (
        <div className="vtex-footer__matrix-container vtex-footer__payment-matrix-container pb4">
          {titles.map((title, index) => (
            <div
              key={`payment-container-${index}`}
              className="vtex-footer__matrix-item vtex-footer__payment-matrix-item">
              <FooterPaymentFormList
                horizontal
                showInColor={showPaymentFormsInColor}
                titleId={title}
                list={paymentForms[index]}
              />
            </div>
          ))}
        </div>
      )
    )
  }
}

export default injectIntl(FooterPaymentFormMatrix)
