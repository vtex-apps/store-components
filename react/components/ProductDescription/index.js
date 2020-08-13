import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { formatIOMessage } from 'vtex.native-types'

import { SanitizedHTML, DEFAULTS } from '../SanitizedHTML'
import GradientCollapse from '../GradientCollapse/index'

const CSS_HANDLES = [
  'productDescriptionContainer',
  'productDescriptionTitle',
  'productDescriptionText',
]

const allowedTags = [
  ...DEFAULTS.allowedTags,
  'link',
  'body',
  'html',
  'style',
  'link',
  'script',
  'head',
  'meta',
]

const allowedAttributes = {
  ...DEFAULTS.allowedAttributes,
  meta: ['charset', 'name', 'content'],
}

/**
 * Product Description Component.
 * Render the description of a product
 */
const ProductDescription = ({ description, collapseContent, title, intl }) => {
  const handles = useCssHandles(CSS_HANDLES)

  if (!description) {
    return null
  }

  return (
    <div className={handles.productDescriptionContainer}>
      <FormattedMessage id="store/product-description.title">
        {txt => (
          <h2
            className={`${handles.productDescriptionTitle} t-heading-5 mb5 mt0`}
          >
            {title ? formatIOMessage({ id: title, intl }) : txt}
          </h2>
        )}
      </FormattedMessage>

      <div className={`${handles.productDescriptionText} c-muted-1`}>
        {collapseContent ? (
          <GradientCollapse collapseHeight={220}>
            <SanitizedHTML
              content={description}
              allowedTags={allowedTags}
              allowedAttributes={allowedAttributes}
            />
          </GradientCollapse>
        ) : (
          <SanitizedHTML
            content={description}
            allowedTags={allowedTags}
            allowedAttributes={allowedAttributes}
          />
        )}
      </div>
    </div>
  )
}

ProductDescription.propTypes = {
  title: PropTypes.string,
  /** Product description string */
  description: PropTypes.string,
  collapseContent: PropTypes.bool,
  intl: PropTypes.object.isRequired,
}

export default injectIntl(memo(ProductDescription))
