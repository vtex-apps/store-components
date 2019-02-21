import React from 'react'

export function withRuntimeContext(Comp) {
  return Comp
}

export const Link = ({ children }) => <a>{children}</a>

export const NoSSR = ({ children }) => (
  <div className="NoSSR-mock">{children}</div>
)
