import React from 'react'
import ContentLoader from 'react-content-loader'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['shippingContainer', 'shippingContainerLoader', 'shippingZipcodeLabelLoader', 'shippingInputLoader']

const ShippingSimulatorLoader = (loaderProps = {}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const shippingCodeLoaderProps = loaderProps[handles.shippingZipcodeLabelLoader] || {}
  const shippingInputLoaderProps = loaderProps[handles.shippingInputLoader] || {}
  return (
    <div className={handles.shippingContainer}>
      <ContentLoader
        className={handles.shippingContainerLoader}
        style={{
          width: '100%',
          height: '100%',
        }}
        width={500}
        height={40}
        preserveAspectRatio="xMinYMin meet"
        {...loaderProps}
      >
        <rect
          height="100%"
          width="7em"
          {...shippingCodeLoaderProps}
        />
        <rect
          height="100%"
          width="15em"
          x="8em"
          {...shippingInputLoaderProps}
        />
      </ContentLoader>
    </div>
  )
}

export default ShippingSimulatorLoader
