import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export function Pixel(Comp) {
  return class PixelComponent extends React.Component {
    render() {
      return <Comp {...this.props} push={noop} />
    }
  }
}
