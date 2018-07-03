import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'

import ImageZoom from './ImageZoom'

import VTEXClasses from '../constants/productImagesClasses'

/**
 * Selected Image component.
 * Display an image.
 */
export default class SelectedImage extends Component {
  static propTypes = {
    /** Component is loading or not */
    loading: PropTypes.bool.isRequired,
    /** Image to be displayed */
    image: PropTypes.shape({
      /** URL of the image */
      imageUrl: PropTypes.string.isRequired,
      /** Text that describes the image */
      imageText: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    children: img => img,
  }

  state = {
    showZoom: false,
  }

  renderLoader = () => {
    return (
      <ContentLoader height={500} width={500}>
        {/* Pure SVG */}
        <rect x="0" y="0" rx="0" ry="0" width="500" height="500" />
      </ContentLoader>
    )
  }

  handleMouseEnterImage = () => {
    this.setState({ showZoom: true })
  }

  handleMouseLeaveZoom = () => {
    this.setState({ showZoom: false })
  }

  render() {
    const {
      image: { imageUrl, imageText },
      loading,
    } = this.props
    const { showZoom } = this.state

    if (loading) {
      return this.renderLoader()
    }

    return (
      <div className="w-100 relative">
        <div className={VTEXClasses.SELECTED_IMAGE}>
          <img
            className="w-100"
            onMouseEnter={this.handleMouseEnterImage}
            src={imageUrl}
            alt={imageText}
          />
        </div>
        <div className={`${VTEXClasses.IMAGE_ZOOM_CONTAINER} absolute`}>
          {showZoom && (
            <ImageZoom
              src={imageUrl}
              alt={imageText}
              onMouseLeaveZoom={this.handleMouseLeaveZoom}
            />
          )}
        </div>
      </div>
    )
  }
}
