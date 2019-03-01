import React from 'react'

export const withContext = (WrappedComponent, context, contextPropTypes) => {
  return class App extends React.Component {
    static childContextTypes = contextPropTypes
    getChildContext() {
      return context
    }

    render() {
      return <WrappedComponent {...this.props} {...context} />
    }
  }
}
