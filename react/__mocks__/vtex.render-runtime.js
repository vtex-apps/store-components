/* eslint react/prop-types:0 */

import React from 'react'

const runtime = {
  amp: false,
  setQuery: jest.fn(),
  account: 'account',
  hints: { mobile: false },
  culture: { currency: 'USD' },
  query: 'foo',
  navigate: jest.fn(),
}

export const withRuntimeContext = Comp =>
  function WrappedRuntimeContext(props) {
    return <Comp {...props} runtime={runtime} />
  }

export const Link = ({ children }) => <a href="dummy">{children}</a>

export const NoSSR = ({ children }) => (
  <div className="NoSSR-mock">{children}</div>
)

export const ExtensionPoint = ({ id }) => (
  <div className={`extension-point-${id}`} />
)

export const useRuntime = () => runtime

export const useChildBlock = () => true

export const useExperimentalLazyImagesContext = () => {
  return {
    lazyLoad: false,
  }
}
