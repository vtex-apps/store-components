import React from 'react'
import ContentLoader from 'react-content-loader'

import styles from './styles.css'

const ShippingSimulatorLoader = (loaderProps = {}) => (
  <div className={`${styles.shippingContainer}`}>
    <ContentLoader
      className={`${styles.shippingContainerLoader}`}
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
        {...loaderProps[`${styles.shippingZipcodeLabelLoader}`]}
      />
      <rect
        height="100%"
        width="15em"
        x="8em"
        {...loaderProps[`${styles.shippingInputLoader}`]}
      />
    </ContentLoader>
  </div>
)

export default ShippingSimulatorLoader
