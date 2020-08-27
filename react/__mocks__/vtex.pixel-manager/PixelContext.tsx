import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export function Pixel(Comp: any) {
  return function PixelComponent(props: any) {
    return <Comp {...props} push={noop} />
  }
}
