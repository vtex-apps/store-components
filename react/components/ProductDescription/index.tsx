import React, { memo } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.native-types"' has no exported membe... Remove this comment to see the full error message
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
  'object',
  'embed',
]

const allowedAttributes = {
  ...DEFAULTS.allowedAttributes,
  meta: ['charset', 'name', 'content'],
  object: ['type', 'height', 'width', 'data'],
  embed: ['height', 'width', 'src'],
}

type Props = {
  title?: string
  description?: string
  collapseContent?: boolean
  intl: any
}

/**
 * Product Description Component.
 * Render the description of a product
 */
const ProductDescription = ({
  description,
  collapseContent,
  title,
  intl,
}: Props) => {
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

export default injectIntl(memo(ProductDescription))
