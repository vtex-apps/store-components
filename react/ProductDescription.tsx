import React, { memo } from 'react'
import type { MemoExoticComponent, PropsWithChildren } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { formatIOMessage } from 'vtex.native-types'
import { useProduct } from 'vtex.product-context'

import { SanitizedHTML, DEFAULTS } from './components/SanitizedHTML'
import GradientCollapse from './components/GradientCollapse'

const CSS_HANDLES = [
  'productDescriptionContainer',
  'productDescriptionTitle',
  'productDescriptionText',
] as const

type Props = {
  /** Description fallback */
  description?: string
  /** Section title */
  title?: string
  /** Define if content should start collapsed or not */
  collapseContent?: boolean
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

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

/**
 * Product Description Component.
 * Render the description of a product
 */
function ProductDescription(props: PropsWithChildren<Props>) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes: props.classes })
  const intl = useIntl()
  const { product } = useProduct()

  const description = props.description ?? product?.description

  if (!description) {
    return null
  }

  const { collapseContent = true, title } = props

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

const MemoizedProductDescription: MemoExoticComponent<
  typeof ProductDescription
> & { schema?: Record<string, string> } = memo(ProductDescription)

MemoizedProductDescription.schema = {
  title: 'admin/editor.product-description.title',
}

export default MemoizedProductDescription
