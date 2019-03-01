import React from 'react'
import * as reactTestingLibrary from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import defaultStrings from '../../messages/en-US.json'
const Context = React.createContext({})

export const render = (node, options) => {
  const rendered = reactTestingLibrary.render(
    <IntlProvider messages={defaultStrings} locale="en-US">
      {node}
    </IntlProvider>,
    options
  )

  return {
    ...rendered,
    rerender: newUi =>
      render(newUi, {
        container: rendered.container,
        baseElement: rendered.baseElement,
      }),
  }
}

// re-export everything
export default reactTestingLibrary
