import React from 'react'

export function Button(props) {
  return <button type="button"> {props.children} </button>
}

export function Input(props) {
  return <input {...props} />
}

export function withToast(Comp) {
  return Comp
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
