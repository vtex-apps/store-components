import React from 'react'
import classNames from 'classnames'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-content-loader` if i... Remove this comment to see the full error message
import ContentLoader from 'react-content-loader'

import productPrice from './styles.css'

const ProductPriceLoader = (loaderProps = {}) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'loaderClass' does not exist on type '{}'... Remove this comment to see the full error message
  const { loaderClass, ...props } = loaderProps

  return (
    <div
      className={classNames(
        productPrice.priceContainer,
        productPrice.priceLoaderContainer,
        loaderClass
      )}
    >
      <ContentLoader
        style={{
          width: '100%',
          height: '100%',
        }}
        width={300}
        height={70}
        preserveAspectRatio="xMinYMin meet"
        {...props}
      >
        <rect
          height="0.75em"
          width="50%"
          x="25%"
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          {...loaderProps[productPrice.listPriceLoader]}
        />
        {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
        <rect {...loaderProps[productPrice.sellingPriceLabelLoader]} />
        <rect
          height="1em"
          width="70%"
          x="15%"
          y="1.25em"
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          {...loaderProps[productPrice.sellingPriceLoader]}
        />
        <rect
          height="0.75em"
          width="80%"
          x="10%"
          y="2.75em"
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          {...loaderProps[productPrice.installmentsPriceLoader]}
        />
        {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
        <rect {...loaderProps[productPrice.savingsPriceLoader]} />
      </ContentLoader>
    </div>
  )
}

export default ProductPriceLoader
