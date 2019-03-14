import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import HtmlParser from 'react-html-parser'

import { IconCheck } from 'vtex.store-icons'
import styles from './styles.css'

/**
 * Product Services Component.
 * Render the services of a product.
 */
class ProductServices extends Component {
  render() {
    const { services } = this.props
    return (
      <div className={styles.content}>
        {services
          .filter(item => item.values[0].toLowerCase() === 'enable')
          .map((item, i) => (
            <div key={i} className={'flex-row dib ma2 ph2'}>
              <IconCheck size={20} />
              <span className={`f5`}>{HtmlParser(item.name)}</span>
            </div>
          ))}
      </div>
    )
  }
}

ProductServices.defaultProps = {
  services: [],
}

ProductServices.propTypes = {
  /** Intl object to provides internationalization */
  intl: intlShape.isRequired,
  /** Services that will be displayed on the table */
  services: PropTypes.arrayOf(
    PropTypes.shape({
      /** Service name */
      name: PropTypes.string.isRequired,
      /** Service value */
      values: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
}

export default injectIntl(ProductServices)
