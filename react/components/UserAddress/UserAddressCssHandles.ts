import { createCssHandlesContext } from 'vtex.css-handles'

import { USER_ADDRESS_CSS_HANDLES } from '../../UserAddress'

const { CssHandlesProvider, useContextCssHandles } = createCssHandlesContext(
  USER_ADDRESS_CSS_HANDLES
)

export {
  CssHandlesProvider as UserAddressCssHandlesProvider,
  useContextCssHandles as useUserAddressCssHandles,
}
