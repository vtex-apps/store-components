import React, { Fragment } from 'react'
import { Link } from 'vtex.render-runtime'

const LinkWrapper = ({ imageActionUrl, children, extraCondition, linkProps }) => {
  if (!imageActionUrl || imageActionUrl.length === 0 || extraCondition) {
    return (
      <Fragment>{children}</Fragment>
    )
  }

  return (
    <Link {...linkProps} to={imageActionUrl}>
      {children}
    </Link>
  )
}

export default LinkWrapper