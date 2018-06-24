import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import up from '../images/Up.svg'
import down from '../images/Down.svg'
import previous from '../images/Previous.svg'
import next from '../images/Next.svg'

const getUrl = (inverted, vertical) => {
  if (vertical) {
    if (inverted) {
      return down
    }

    return up
  }

  if (inverted) {
    return next
  }

  return previous
}

const ThumbnailArrow = ({ vertical, inverted }) => {
  const className = classNames('vtex-product-image__thumbnail-arrow', {
    'vtex-product-image__thumbnail-arrow--vertical': vertical,
    'vtex-product-image__thumbnail-arrow--inverted': inverted,
  })

  const url = getUrl(inverted, vertical)

  return <img className={className} src={url} />
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

