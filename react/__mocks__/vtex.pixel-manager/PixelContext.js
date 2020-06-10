import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export function Pixel(Comp) {
  return function PixelComponent(props) {
    return <Comp {...props} push={noop} />
  }
}
