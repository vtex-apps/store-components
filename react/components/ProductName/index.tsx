import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-content-loader` if i... Remove this comment to see the full error message
import ContentLoader from 'react-content-loader'
import classNames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'productNameContainer',
  'productBrand',
  'productSku',
  'productReference',
  'productNameLoader',
  'productNameBrandLoader',
  'productNameSkuLoader',
]

type Props = {
  name?: string
  skuName?: string
  showSku?: boolean
  productReference?: string
  showProductReference?: boolean
  brandName?: string
  showBrandName?: boolean
  styles?: any
  className?: string
  brandNameClass?: string
  skuNameClass?: string
  productReferenceClass?: string
  loaderClass?: string
  tag?: 'div' | 'h1' | 'h2' | 'h3'
}

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
const ProductName = ({
  productReferenceClass,
  brandNameClass,
  skuNameClass,
  loaderClass,
  className,
  name,
  styles,
  skuName,
  showSku = false,
  brandName,
  showBrandName = false,
  productReference,
  showProductReference = false,
  tag: Wrapper = 'div',
}: Props) => {
  const handles = useCssHandles(CSS_HANDLES)

  const Loader = (loaderProps = {}) => (
    <div
      className={classNames(
        handles.productNameContainer,
        handles.productNameLoader,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
        loaderProps.className
      )}
    >
      <ContentLoader
        style={{
          width: '100%',
          height: '100%',
        }}
        width={456}
        height={100}
        preserveAspectRatio="xMinYMin meet"
        {...loaderProps}
      >
        <rect
          height="1.125em"
          width="75%"
          x="15%"
          // @ts-expect-error ts-migrate(7053) FIXME: No index signature with a parameter of type 'strin... Remove this comment to see the full error message
          {...loaderProps[handles.productNameBrandLoader]}
        />
        <rect
          height="1.125em"
          width="50%"
          x="25%"
          y="1.75em"
          // @ts-expect-error ts-migrate(7053) FIXME: No index signature with a parameter of type 'strin... Remove this comment to see the full error message
          {...loaderProps[handles.productNameSkuLoader]}
        />
      </ContentLoader>
    </div>
  )

  if (!name) {
    return <Loader className={loaderClass} {...styles} />
  }

  return (
    <Wrapper
      className={classNames(handles.productNameContainer, 'mv0', className)}
    >
      <span className={classNames(handles.productBrand, brandNameClass)}>
        {name} {showBrandName && brandName && `- ${brandName}`}
      </span>
      {showSku && skuName && (
        <span className={classNames(handles.productBrand, skuNameClass)}>
          {skuName}
        </span>
      )}
      {showProductReference && productReference && (
        <span
          className={classNames(
            handles.productReference,
            productReferenceClass
          )}
        >
          {`REF: ${productReference}`}
        </span>
      )}
    </Wrapper>
  )
}

export default ProductName
