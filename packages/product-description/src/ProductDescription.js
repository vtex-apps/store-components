import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import VTEXClasses from './CustomClasses'

class ProductDescription extends PureComponent {
  render() {
    return (
      <div className={`${VTEXClasses.PRODUCT_DESCRIPTION} ma2`}>
        <div className="f4 b ttu mb3">
          { this.props.intl.formatMessage({ id: 'product-description' }) }
        </div>
        { this.props.children }
      </div>
    )
  }
}

ProductDescription.propTypes = {
  /** Children component which contains the product description */
  children: PropTypes.node.isRequired,
  /** Internacionalization */
  intl: intlShape.isRequired,
}

ProductDescription.defaultProps = {
  children: {},
}

export default injectIntl(ProductDescription)