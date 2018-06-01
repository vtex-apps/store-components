import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImageZoom from './ImageZoom'

import VTEXClasses from '../constants/productImagesClasses'

/**
 * Selected Image component.
 * Display an image.
 */
class SelectedImage extends Component {
  constructor(props) {
    super(props)
    this.state = { showZoom: false }
  }

  handleMouseEnterImage = () => {
    this.setState({ showZoom: true })
  }

  handleMouseLeaveZoom = () => {
    this.setState({ showZoom: false })
  }

  render() {
    const { imageUrl, imageText } = this.props.image
    const { showZoom } = this.state

    return (
      <div>
        <div
          className={`${
            VTEXClasses.SELECTED_IMAGE
          } flex-ns justify-center-ns items-center-ns dn`}>
          <div className="flex justify-center items-center">
            <img onMouseEnter={this.handleMouseEnterImage} src={imageUrl} alt={imageText} />
          </div>
        </div>

        {showZoom &&
          <ImageZoom src={imageUrl} alt={imageText} onMouseLeaveZoom={this.handleMouseLeaveZoom} />
        }
      </div>
    )
  }
}

SelectedImage.propTypes = {
  /** Image to be displayed */
  image: PropTypes.shape({
    /** URL of the image */
    imageUrl: PropTypes.string.isRequired,
    /** Text that describes the image */
    imageText: PropTypes.string.isRequired,
  }).isRequired,
}

export default SelectedImage
