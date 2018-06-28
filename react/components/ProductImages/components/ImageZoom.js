import React, { Component } from 'react'
import ReactCursorPosition from 'react-cursor-position'
import { ImageZoomPropTypes } from '../constants/propTypes'
import InnerZoom from './InnerZoom'

export default class ImageZoom extends Component {
  static propTypes = ImageZoomPropTypes

  render() {
    const { src, alt } = this.props
    return (
      <ReactCursorPosition>
        <InnerZoom {...this.props}>
          <img src={src} alt={alt} />
        </InnerZoom>
      </ReactCursorPosition>
    )
  }
}
