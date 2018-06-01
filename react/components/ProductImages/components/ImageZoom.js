import React, { Component } from 'react'
import ReactCursorPosition from 'react-cursor-position'
import { ZoomImagePropTypes } from '../constants/propTypes'
import Zoom from './Zoom'

export default class ZoomImage extends Component {
  render() {
    return (
      <ReactCursorPosition>
        <Zoom {...this.props} />
      </ReactCursorPosition>
    )
  }
}

ZoomImage.propTypes = ZoomImagePropTypes
