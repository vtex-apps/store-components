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
  return <div className="tabs"> {props.children} </div>
}

export function Tab(props) {
  return <div className="tab"> {props.children} </div>
}
