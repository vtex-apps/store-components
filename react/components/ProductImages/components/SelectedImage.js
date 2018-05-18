import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VTEXClasses from '../constants/productImagesClasses'

/**
 * Selected Image component.
 * Display an image.
 */
class SelectedImage extends Component {
  render() {
    const { imageUrl, imageText } = this.props.image

    return (
      <div
        className={`${
          VTEXClasses.SELECTED_IMAGE
        } flex-ns justify-center-ns items-center-ns dn`}>
        <div className="flex justify-center items-center">
          <img src={imageUrl} alt={imageText} />
        </div>
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
