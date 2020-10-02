import PropTypes from 'prop-types'

type skuShape = {
  name: string
  images: Array<{
    imageUrl: string
    imageLabel?: string
  }>
  itemId: string
  variations?: Array<{
    name?: string
    values?: string[]
  }>
}

// @ts-expect-error ts-migrate(2322) FIXME: Type 'undefined' is not assignable to type '{ imag... Remove this comment to see the full error message
const skuShape: PropTypes.Requireable<skuShape> = PropTypes.shape({
  /** Name of the SKU Item */
  name: PropTypes.string.isRequired,
  /** Images of the SKU item */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      /** URL of source Image */
      imageUrl: PropTypes.string.isRequired,
      /** Brief description of the image */
      imageLabel: PropTypes.string,
    })
  ).isRequired,
  /** SkuID */
  itemId: PropTypes.string.isRequired,
  /** List of products specifications names */
  variations: PropTypes.arrayOf(
    PropTypes.shape({
      /** Variation Name */
      name: PropTypes.string,
      /** Variation Values */
      values: PropTypes.arrayOf(PropTypes.string),
    })
  ),
})

export { skuShape }

/*
(ts-migrate) TODO: Migrate the remaining prop types
...skuShape
*/
type parsedSkuShape = {
  variations?: string[]
}

// @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'string[] | ... Remove this comment to see the full error message
const parsedSkuShape: PropTypes.Requireable<parsedSkuShape> = PropTypes.shape({
  ...skuShape,
  /** List of products specifications names */
  variations: PropTypes.arrayOf(PropTypes.string),
})

export { parsedSkuShape }

type variationShape = {
  name?: string
  options?: Array<{
    image?: {
      imageLabel?: string
      imageUrl?: string
    }
    available?: boolean
    label?: string
    onSelectItem?: (...args: any[]) => any
    impossible?: boolean
  }>
}

// @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
const variationShape: PropTypes.Requireable<variationShape> = PropTypes.shape({
  /** Variation Name */
  name: PropTypes.string,
  /** Options Array */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        imageLabel: PropTypes.string,
        imageUrl: PropTypes.string,
      }),
      available: PropTypes.bool,
      label: PropTypes.string,
      onSelectItem: PropTypes.func,
      impossible: PropTypes.bool,
    })
  ),
})

export { variationShape }
