import { MessageDescriptor as StandardMessageDescriptor } from 'react-intl'

declare module 'react-intl' {
  export interface MessageDescriptor extends StandardMessageDescriptor {
    from?: string
  }
}