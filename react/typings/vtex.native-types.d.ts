/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'vtex.native-types' {
  import { ComponentType } from 'react'

  export const IOMessage: ComponentType<{
    id: string
    values: Record<string, any>
    ['data-testid']: string
  }>
}
