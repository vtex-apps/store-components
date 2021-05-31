import { createCssHandlesContext } from 'vtex.css-handles'

import { SEARCH_BAR_CSS_HANDLES } from '../../SearchBar'

const { CssHandlesProvider, useContextCssHandles } = createCssHandlesContext(
  SEARCH_BAR_CSS_HANDLES
)

export {
  CssHandlesProvider as SearchBarCssHandlesProvider,
  useContextCssHandles as useSearchBarCssHandles,
}
