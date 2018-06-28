import PropTypes from 'prop-types'

export const ImageZoomPropTypes = {
  /** URL of the image */
  src: PropTypes.string.isRequired,
  /** Text that describes the image */
  alt: PropTypes.string.isRequired,
  /* Function to be called when the mouse leaves the zoom */
  onMouseLeaveZoom: PropTypes.func.isRequired,
}
