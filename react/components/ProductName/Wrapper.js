import * as React from 'react'
import { path } from 'ramda'
import { ProductContext } from 'vtex.product-context'

import ProductName from './index';

const styles = {
  'vtex-product-name__brand--loader': {
    x: 0,
    width: '100%',
    height: '1.631em',
  },
  'vtex-product-name__sku--loader': {
    x: 0,
    y: '2.569em',
    width: '10.311em',
    height: '1.045em',
  },
}

const PorductNameWrapper = () => {
  const { product, selectedItem } = React.useContext(ProductContext)

  return (
    <div>
      <ProductName 
        tag='h1'
        name={path(['productName'], product)}
        skuName={path(['name'], selectedItem)}
        productReference={path(['productReference'], product)}
        brandName={path(['brand'], product)}
        styles={styles}
        className='t-heading-4'
      />
    </div>
  )
}

export default PorductNameWrapper