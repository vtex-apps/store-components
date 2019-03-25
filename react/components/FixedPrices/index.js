import fixedPrice from './global.css'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class FixedPrices extends Component {

  /**
   * prop types of FixedPrices component
   */
  static propTypes = {
    fixedPriceList: PropTypes.arrayOf(
      PropTypes.shape({
        taggedPrice: PropTypes.number,
        price: PropTypes.number,
        listPrice: PropTypes.number,
        quantity: PropTypes.number
      })
    ),
    showFixedPrices: PropTypes.bool,
  }

  /**
   * default properties of the FixedPrices component
   */
  static defaultProps = {
    fixedPriceList: [],
    showFixedPrices: true,
  }

  /**
   * get minimum quantity as range
   * format `${last-min-quantity | 0}-${current-min quantity}`
   * e.g.`0-15`
   */
  getQuantityRange = (fixedPrices, index) => {
    if (!fixedPrices) return `0 - 0`

    let current = fixedPrices[index]
    let next = fixedPrices.length >= index + 1 ? fixedPrices[index + 1] : {}

    let nextQuantity = next ? `${Number(next.quantity) - 1}` : ''
    return `${current.quantity} - ${nextQuantity}`
  }

  getFixedPrices = fixedPrices => {

    const tableBodyClasses = `${fixedPrice.bodyContent} fl w-50 pa1`
    const tableBodyContentClasses = `${fixedPrice.bodyContentText} bg-white tl pb1 bb b--black-10`

    return fixedPrices.map((fixedPrice, index) => (
      <Fragment>
        <div
          key={`${index}`}
          className={tableBodyClasses}
        >
          <div className={tableBodyContentClasses}>
            {this.getQuantityRange(fixedPrices, index)}
          </div>
        </div>
        <div className={tableBodyClasses}>
          <div className={tableBodyContentClasses}>{fixedPrice.price}</div>
        </div>
      </Fragment>
    ))
  }

  render() {
    const { fixedPriceList, showFixedPrices } = this.props

    const tableHeaderClasses = `${fixedPrice.header} fl w-50 pa1 b`
    const tableHeaderTextClasses = `${fixedPrice.headerText} bg-white tl pb1 bb b--black-10`

    return showFixedPrices && fixedPriceList.length > 0 ? (
      <Fragment>
        <div className={tableHeaderClasses}>
          <div className={tableHeaderTextClasses}>Quantity</div>
        </div>
        <div className={tableHeaderClasses}>
          <div className={tableHeaderTextClasses}>Price</div>
        </div>
        {this.getFixedPrices(fixedPriceList)}
      </Fragment>
    ) : (
        <div />
      )
  }
}
export default FixedPrices
