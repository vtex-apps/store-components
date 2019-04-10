/* eslint react/prop-types:0 */

import React from 'react'

export const withRuntimeContext = Comp =>
  function WrappedRuntimeContext(props) {
    return <Comp {...props} runtime={{ hints: { mobile: false } }} />
  }

export const Link = ({ children }) => <a href="dummy">{children}</a>

export const NoSSR = ({ children }) => (
  <div className="NoSSR-mock">{children}</div>
)

export const useRuntime = () => {
  return { setQuery: jest.fn(), account: 'account' }
}
