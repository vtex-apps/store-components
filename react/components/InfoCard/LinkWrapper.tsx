import React, { Fragment } from 'react'
// @ts-expect-error ts-migrate(6192) FIXME: All imports in import declaration are unused.
import { bool, node } from 'prop-types'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.render-runtime"' has no exported mem... Remove this comment to see the full error message
import { Link } from 'vtex.render-runtime'

type Props = {
  imageActionUrl?: string
  // @ts-expect-error ts-migrate(2749) FIXME: 'node' refers to a value, but is being used as a t... Remove this comment to see the full error message
  children?: node
  // @ts-expect-error ts-migrate(2749) FIXME: 'bool' refers to a value, but is being used as a t... Remove this comment to see the full error message
  extraCondition?: bool
  linkProps?: object
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
