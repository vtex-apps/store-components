import { changeImageUrlSize } from '../../utils/generateUrl'

type AspectRatio = string | number
const MAX_SIZE = 256

/** Parses ratio values into a multiplier to set the image height.
 * For example, turns "3:4" into 1.333, so the image height will be 
 * 1.333 times its width.
*/
const parseAspectRatio = (input?: AspectRatio | null) => {
  if (!input) {
    return null
  }
  if (typeof input === 'string') {
    if (input === 'auto') { 
      return null
    }
    const separator = ':'
    const data = input.split(separator)
    if (data.length !== 2) {
      return null
    }

    const [ width, height ] = data
    const ratio = parseFloat(height) / parseFloat(width)

    if (typeof ratio !== 'number' || isNaN(ratio)) {
      return null
    }

    return ratio
  }

  if (typeof input === 'number') {
    return input
  }

  return null
}

export const imageUrl = (src: string, size: number, aspectRatio?: AspectRatio) => {
  let width = size
  let height: number | string = 'auto'

  if (aspectRatio && aspectRatio !== 'auto') {
    height = size * (parseAspectRatio(aspectRatio) || 1)

    if (width > MAX_SIZE) {
      height = height / (width / MAX_SIZE) 
      width = MAX_SIZE
    }

    if (height > MAX_SIZE) {
      width = width / (height / MAX_SIZE)
      height = MAX_SIZE
    }

    width = Math.round(width)
    height = Math.round(height)
  } else {
    width = Math.min(MAX_SIZE, width)
  }

  return changeImageUrlSize(src, width, height)
}