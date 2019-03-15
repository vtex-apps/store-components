/* eslint react/prop-types:0 */

import React from 'react'

export const withRuntimeContext = Comp =>
  function WrappedRuntimeContext(props) {
    return <Comp {...props} runtime={{ hints: { mobile: false } }} />
  }

export const Link = ({ children }) => <a>{children}</a>

export const NoSSR = ({ children }) => (
  <div className="NoSSR-mock">{children}</div>
)
