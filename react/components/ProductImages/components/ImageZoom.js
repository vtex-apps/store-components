import React, { Component } from 'react'
import ReactCursorPosition from 'react-cursor-position'
import { ZoomImagePropTypes } from '../constants/propTypes'
import InnerZoom from './InnerZoom'

export default class ZoomImage extends Component {
  static propTypes = ZoomImagePropTypes

  render() {
    const { src, alt } = this.props
    return (
      <ReactCursorPosition>
        <InnerZoom {...this.props} >
          <img src={src} alt={alt} />
        </InnerZoom>
      </ReactCursorPosition>
    )
  }
}

