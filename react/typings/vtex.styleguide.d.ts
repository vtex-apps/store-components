/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'vtex.styleguide' {
  import type { ComponentType, ChangeEvent } from 'react'

  export const Checkbox: any
  export const Radio: any
  export const NumericStepper: any
  export const Button: any
  export const Modal: any
  export const withToast: any
  export const Tooltip: any
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export const EXPERIMENTAL_Select: any
  export const Dropdown: any
  export const Input: ComponentType<InputProps>
  interface InputProps {
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?: () => void
    placeholder?: string
    name?: string
    type?: string
    error?: boolean
    errorMessage?: string
  }
}
