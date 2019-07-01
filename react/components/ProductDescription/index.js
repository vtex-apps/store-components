import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import HtmlParser from 'react-html-parser'

import GradientCollapse from '../GradientCollapse/index'

import styles from './styles.css'

/**
 * Product Description Component.
 * Render the description of a product
 */
const ProductDescription = ({ description, collapseContent }) => {
  if (!description) {
    return null
  }

  const descriptionParsed = useMemo(() => HtmlParser(description), [
    description,
  ])

  return (
    <div className={styles.productDescriptionContainer}>
      <FormattedMessage id="store/product-description.title">
        {txt => <h2 className="t-heading-5 mb5 mt0">{txt}</h2>}
      </FormattedMessage>

      <div className="c-muted-1">
        {collapseContent ? (
          <GradientCollapse collapseHeight={220}>
            {descriptionParsed}
          </GradientCollapse>
        ) : (
          descriptionParsed
        )}
      </div>
    </div>
  )
}

ProductDescription.propTypes = {
  /** Product description string */
  description: PropTypes.string,
  collapseContent: PropTypes.bool,
}

export default memo(ProductDescription)
