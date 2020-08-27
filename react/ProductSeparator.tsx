import React from 'react'

export default function ProductSeparator() {
  // @ts-expect-error ts-migrate(2322) FIXME: Property 'size' does not exist on type 'DetailedHT... Remove this comment to see the full error message
  return <hr className="o-30" size="1" />
}
