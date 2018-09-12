import React, { Component } from 'react'

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

export default function withImage(getImageFilename) {
  return WrappedComponent => {
    class WithImage extends Component {
      static displayName = `WithImage(${getDisplayName(WrappedComponent)})`

      state = {}

      componentDidMount() {
        const imageName = getImageFilename(this.props)
        import(`../images/${imageName}`).then(imageSrc => {
          this.setState({ imageSrc })
        })
      }

      render() {
        const { imageSrc } = this.state
        return <WrappedComponent {...this.props} imageSrc={imageSrc} />
      }
    }

    return WithImage
  }
}
