/* eslint react/prop-types:0 */

import React from 'react'

const runtime = {
  amp: false,
  setQuery: jest.fn(),
  account: 'account',
  hints: { mobile: false },
  culture: { currency: 'USD' },
}

export const withRuntimeContext = (Comp: any) =>
  function WrappedRuntimeContext(props: any) {
    return <Comp {...props} runtime={runtime} />
  }

export const Link = ({ children }: any) => <a href="dummy">{children}</a>

export const NoSSR = ({ children }: any) => (
  <div className="NoSSR-mock">{children}</div>
)

export const ExtensionPoint = ({ id }: any) => (
  <div className={`extension-point-${id}`} />
)

export const useRuntime = () => runtime

export const useChildBlock = () => true

export const useExperimentalLazyImagesContext = () => {
  return {
    lazyLoad: false,
  }
}
