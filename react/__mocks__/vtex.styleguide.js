import React from 'react'

export function Button(props) {
  return (
    <button type="button" {...props}>
      {props.children}
    </button>
  )
}

export function Input(props) {
  return <input {...props} />
}

export function withToast(Comp) {
  return class extends React.Component {
    render() {
      return <Comp {...this.props} showToast={jest.fn()} />
    }
  }
}

export function Tabs(props) {
  return <div className="tabs-mock"> {props.children} </div>
}

export function Tab(props) {
  return <div className="tab-mock"> {props.children} </div>
}

export function Spinner(props) {
  return <div className="spinner-mock"> {props.children} </div>
}
