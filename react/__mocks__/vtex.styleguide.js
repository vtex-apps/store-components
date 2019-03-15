/* eslint react/prop-types:0 */
import React, { forwardRef } from 'react'

export function withToast(Comp) {
  return function WrappedWithToast(props) {
    return <Comp {...props} showToast={jest.fn()} />
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

export const Input = forwardRef(function Input({ label, error, errorMessage, isLoading, ...props }, ref) {
  return (
    <label>
      {label}
      <input
        data-isloading={isLoading}
        data-error={error}
        data-errormessage={errorMessage}
        ref={ref}
        {...props} />
    </label>
  )
})

export const Button = jest.fn(({ isLoading, variation, ...props }) => {
  return (
    <button
      data-variation={variation}
      data-isloading={isLoading}
      {...props} />
  )
})
