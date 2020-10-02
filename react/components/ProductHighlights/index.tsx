import React from 'react'
import { injectIntl } from 'react-intl'

import { SanitizedHTML } from '../SanitizedHTML'
import styles from './styles.css'

type OwnProps = {
  intl: any
  highlights?: Array<{
    name: string
    values: string[]
  }>
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ProductHighlights.defaultProps

/**
 * Product highlights Component.
 * Render the highlights specifications of a product.
 */
// @ts-expect-error ts-migrate(7022) FIXME: 'ProductHighlights' implicitly has type 'any' beca... Remove this comment to see the full error message
const ProductHighlights = ({ ...props }: Props) => {
  const { highlights } = props

  return (
    <div className={`${styles.highlightContent} pt3 pb5`}>
      {highlights.map((item: any, i: any) => (
        <div
          className={`${styles.itemHighlight} pv2`}
          data-name={item.name}
          data-value={item.values[0]}
          key={i}
        >
          <span
            className={`${styles.highlightTitle} t-body c-on-base fw7 pr3 `}
          >
            <SanitizedHTML content={item.name} />
            {': '}
          </span>
          <span
            className={`${styles.highlightValue} t-body c-muted-1 lh-copy `}
          >
            <SanitizedHTML content={item.values[0]} />
          </span>
        </div>
      ))}
    </div>
  )
}

ProductHighlights.defaultProps = {
  highlights: [],
}

export default injectIntl(ProductHighlights)
