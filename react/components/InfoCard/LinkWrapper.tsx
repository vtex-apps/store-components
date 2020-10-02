import React, { Fragment } from 'react'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.render-runtime"' has no exported mem... Remove this comment to see the full error message
import { Link } from 'vtex.render-runtime'

type Props = {
  imageActionUrl?: string
  children?: React.ReactNode
  extraCondition?: boolean
  linkProps?: any
}

const LinkWrapper = ({
  imageActionUrl,
  children,
  extraCondition,
  linkProps = {},
}: Props) => {
  if (!imageActionUrl || imageActionUrl.length === 0 || extraCondition) {
    return <Fragment>{children}</Fragment>
  }

  return (
    <Link {...linkProps} to={imageActionUrl}>
      {children}
    </Link>
  )
}

export default LinkWrapper
