import React from 'react'

export const useCssHandles = cssHandles => {
  const handles = {}
  cssHandles.forEach(handle => {
    handles[handle] = handle
  })

  return handles
}

export const withCssHandles = () => Comp => {
  return class extends React.Component {
    static displayName = 'withCssHandles'
    render() {
      return <Comp cssHandles={{}} {...this.props} />
    }
  }
}
