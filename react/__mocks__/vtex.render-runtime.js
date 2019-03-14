import React from 'react'

export const withRuntimeContext = Comp => props => (
  <Comp {...props} runtime={{ hints: { mobile: false } }} />
)

export const Link = ({ children }) => <a>{children}</a>

export const NoSSR = ({ children }) => (
  <div className="NoSSR-mock">{children}</div>
)
