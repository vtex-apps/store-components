/* eslint react/prop-types:0 */
import React, { forwardRef } from 'react'

export const ToastContext = React.createContext({ showToast: jest.fn() })

export function withToast(Comp: any) {
  return function WrappedWithToast(props: any) {
    return <Comp {...props} showToast={jest.fn()} />
  }
}

export function Tabs(props: any) {
  return <div className="tabs-mock"> {props.children} </div>
}

export function Tab(props: any) {
  return <div className="tab-mock"> {props.children} </div>
}

export function Spinner(props: any) {
  return <div className="spinner-mock"> {props.children} </div>
}

export function Dropdown(props: any) {
  const { onChange, options } = props
  let { value } = props

  if (value === null) {
    value = undefined
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select value={value} onChange={onChange}>
      {options.map((op: any) => (
        <option key={op.value} value={op.value}>
          {op.label}
        </option>
      ))}
    </select>
  )
}

export const Input = forwardRef(function Input(
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'label' does not exist on type '{ childre... Remove this comment to see the full error message
  { label, error, errorMessage, isLoading, prefix, suffix, ...props },
  ref
) {
  return (
    <label>
      {label}
      {prefix}
      <input
        data-isloading={isLoading}
        data-error={error}
        data-errormessage={errorMessage}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'HTMLInpu... Remove this comment to see the full error message
        ref={ref}
        {...props}
      />
      {suffix}
    </label>
  )
})

export const Button = jest.fn(
  ({ isLoading, variation, block, children, ...props }) => {
    return (
      <button
        data-variation={variation}
        data-isloading={isLoading}
        data-block={block}
        {...props}
      >
        {children}
      </button>
    )
  }
)
