import React from 'react'
import ContentLoader from 'react-content-loader'

import shippingSimulator from './shippingSimulator.css'

const ShippingSimulatorLoader = (loaderProps = {}) => (
  <div className={`${shippingSimulator.shippingContainer}`}>
    <ContentLoader
      className={`${shippingSimulator.shippingContainerLoader}`}
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
        {...loaderProps[`${shippingSimulator.shippingZipcodeLabelLoader}`]}
      />
      <rect
        height="100%"
        width="15em"
        x="8em"
        {...loaderProps[`${shippingSimulator.shippingInputLoader}`]}
      />
    </ContentLoader>
  </div>
)

export default ShippingSimulatorLoader
