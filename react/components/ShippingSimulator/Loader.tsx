import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-content-loader` if i... Remove this comment to see the full error message
import ContentLoader from 'react-content-loader'

import styles from './shippingSimulator.css'

const ShippingSimulatorLoader = (loaderProps = {}) => (
  <div className={styles.shippingContainer}>
    <ContentLoader
      className={styles.shippingContainerLoader}
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
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        {...loaderProps[styles.shippingZipcodeLabelLoader]}
      />
      <rect
        height="100%"
        width="15em"
        x="8em"
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        {...loaderProps[styles.shippingInputLoader]}
      />
    </ContentLoader>
  </div>
)

export default ShippingSimulatorLoader
