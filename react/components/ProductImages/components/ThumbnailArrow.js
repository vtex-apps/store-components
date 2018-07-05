import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import up from '../images/Up.svg'
import down from '../images/Down.svg'
import previous from '../images/Previous.svg'
import next from '../images/Next.svg'

const getImage = (inverted, vertical) => {
  if (vertical) {
    return inverted ? down : up
  }

  return inverted ? next : previous
}

const ThumbnailArrow = ({ vertical, inverted, onClick }) => {
  const className = classNames('vtex-product-image__thumbnail-arrow', {
    'vtex-product-image__thumbnail-arrow--vertical': vertical,
    'vtex-product-image__thumbnail-arrow--inverted': inverted,
  })

  const url = getImage(inverted, vertical)

  return <img className={className} src={url} onClick={onClick} />
}

ThumbnailArrow.defaultProps = {
  vertical: false,
  inverted: false,
}

ThumbnailArrow.propTypes = {
  vertical: PropTypes.bool,
  inverted: PropTypes.bool,
}

export default ThumbnailArrow
