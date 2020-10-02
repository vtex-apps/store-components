import React from 'react'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/kaisermann/Projects/VTEX/store-compon... Remove this comment to see the full error message
import { addValidation, removeValidation } from './helpers'
import { StyleguideInput } from './inputs'

const AddressRules = (props: any) => (
  <div className="address-rules-mock">{props.children}</div>
)

const AddressContainer = (props: any) => (
  <div className="address-container-mock">{props.children}</div>
)

const PostalCodeGetter = (props: any) => (
  <div className="postal-code-getter-mock">{props.children}</div>
)

export {
  AddressRules,
  AddressContainer,
  PostalCodeGetter,
  addValidation,
  removeValidation,
  StyleguideInput,
}
