import React from 'react'
import PropTypes from 'prop-types'
import { match, compose, isEmpty, complement } from 'ramda'
import { useCssHandles } from 'vtex.css-handles'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.render-runtime"' has no exported mem... Remove this comment to see the full error message
import { NoSSR } from 'vtex.render-runtime'

import Vimeo from './Vimeo'
import YouTube from './Youtube'

const isNotEmpty = complement(isEmpty)

const isVimeo = compose(isNotEmpty, match(/vimeo/))
const isYoutube = compose(isNotEmpty, match(/youtube|youtu.be/))

const CSS_HANDLES = ['productVideo', 'videoContainer', 'video']

// @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
export function getThumbUrl(url: any, thumbWidth: any) {
  if (isVimeo(url)) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    return Vimeo.getThumbUrl(url, thumbWidth)
  }

  if (isYoutube(url)) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    return YouTube.getThumbUrl(url, thumbWidth)
  }
}

function Video(props: any) {
  const { url } = props
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.productVideo}>
      {isVimeo(url) && (
        <NoSSR>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'Record<string, string>' is not assignable to... Remove this comment to see the full error message */}
          <Vimeo {...props} cssHandles={handles} />
        </NoSSR>
      )}
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'Record<string, string>' is not assignable to... Remove this comment to see the full error message */}
      {isYoutube(url) && <YouTube {...props} cssHandles={handles} />}
    </div>
  )
}

Video.propsTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setThumb: PropTypes.func,
  thumbWidth: PropTypes.number,
  className: PropTypes.string,
  play: PropTypes.bool,
}

export default Video
