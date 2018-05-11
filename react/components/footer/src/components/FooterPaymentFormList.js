import React, { Component } from 'react'
import PropTypes from 'prop-types'
import footerList from './footerList'

class FooterPaymentFormItem extends Component {
  state = {}

  componentDidMount() {
    const { paymentType, showInColor } = this.props

    import(`../images/${paymentType}${showInColor ? '' : '-BW'}.svg`)
      .then(image => {
        this.setState({ image })
      })
  }

  render() {
    const { image } = this.state

    if (!image) {
      return null
    }

    return <img className="vtex-footer__payment-form-item" src={image} />
  }
}
FooterPaymentFormItem.displayName = 'FooterPaymentFormItem'

FooterPaymentFormItem.propTypes = {
  paymentType: PropTypes.string.isRequired,
  showInColor: PropTypes.bool.isRequired,
}

export default footerList(FooterPaymentFormItem)
