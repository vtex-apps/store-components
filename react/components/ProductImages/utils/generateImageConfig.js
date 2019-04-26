import { map } from 'ramda'

import { changeImageUrlSize } from './generateUrl'

const thresholds = [640]
const imageSizes = [1280, 1920]
const thumbnailSize = 160

export default function generateImageConfig (image) {
  return {
    imageUrls: map(size => changeImageUrlSize(image.imageUrl, size), imageSizes),
    thresholds,
    thumbnailUrl: changeImageUrlSize(image.imageUrl, thumbnailSize),
    imageText: image.imageText,
  }
}