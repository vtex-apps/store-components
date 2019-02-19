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
