import { createCssHandlesContext } from 'vtex.css-handles'

import { SKU_SELECTOR_CSS_HANDLES } from './Wrapper'

const { CssHandlesProvider, useContextCssHandles } = createCssHandlesContext(
  SKU_SELECTOR_CSS_HANDLES
)

export {
  CssHandlesProvider as SKUSelectorCssHandlesProvider,
  useContextCssHandles as useSKUSelectorCssHandles,
}
