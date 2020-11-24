/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'vtex.native-types' {
  import { ComponentType } from 'react'
  import { MessageDescriptor } from 'react-intl'

  export const IOMessage: ComponentType<{
    id: string
    values: Record<string, any>
    ['data-testid']: string
  }>

  export const formatIOMessage: (
    adaptedMessageDescriptor: MessageDescriptor & {
      intl: IntlShape
    },
    values?: Record<string, string | number>
  ) => string
}
