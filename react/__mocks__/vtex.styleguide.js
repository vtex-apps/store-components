import React, { Fragment } from 'react'

export function Button(props) {
  return <button type="button"> {props.children} </button>
}

export function withToast(Comp) {
  return Comp
}
