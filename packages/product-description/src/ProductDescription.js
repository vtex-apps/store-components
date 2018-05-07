import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, addLocaleData, FormattedMessage } from 'react-intl'

import VTEXClasses from './CustomClasses'

import enLocale from './locales/en-US.json'
import ptLocale from './locales/pt-BR.json'
import esLocale from './locales/es-AR.json'

addLocaleData([
  { ...enLocale, locale: 'en-US' },
  { ...ptLocale, locale: 'pt-BR' },
  { ...esLocale, locale: 'es-AR' },
])

class ProductDescription extends PureComponent {
  render() {
    return (
      <div className={`${VTEXClasses.PRODUCT_DESCRIPTION} ma2`}>
        <div className="f4 b ttu mb3">
          <FormattedMessage id="product-description.title" />
        </div>
        { this.props.children }
      </div>
    )
  }
}

ProductDescription.propTypes = {
  /** Children component which contains the product description */
  children: PropTypes.node.isRequired,
  /** Intl object to provides internationalization */
  intl: intlShape.isRequired,
}

ProductDescription.defaultProps = {
  children: {},
}

export default injectIntl(ProductDescription)