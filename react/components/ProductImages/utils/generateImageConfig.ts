import { changeImageUrlSize } from './generateUrl'

const thumbnailSize = 160

export default function generateImageConfig(image: any) {
  return {
    imageUrl: image.imageUrl,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '160' is not assignable to parame... Remove this comment to see the full error message
    thumbnailUrl: changeImageUrlSize(image.imageUrl, thumbnailSize),
    imageText: image.imageText,
    imageLabel: image.imageLabel,
  }
}
