import React from 'react'
import { addValidation, removeValidation } from './helpers'
import { StyleguideInput } from './inputs'

const AddressRules = props => <div>{props.children}</div>

const AddressContainer = props => <div>{props.children}</div>

const PostalCodeGetter = props => <div>{props.children}</div>

export {AddressRules, AddressContainer, PostalCodeGetter, addValidation, removeValidation, StyleguideInput}