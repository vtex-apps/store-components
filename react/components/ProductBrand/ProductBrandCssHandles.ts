import { createCssHandlesContext } from 'vtex.css-handles'

import { PRODUCT_BRAND_CSS_HANDLES } from '../../ProductBrand'

const { CssHandlesProvider, useContextCssHandles } = createCssHandlesContext(
  PRODUCT_BRAND_CSS_HANDLES
)

export {
  CssHandlesProvider as ProductBrandCssHandlesProvider,
  useContextCssHandles as useProductBrandCssHandles,
}
