import PropTypes from 'prop-types'

const skuPropType = variations => {
  return PropTypes.shape({
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
    variations,
  })
}

const variationsForContainer = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string),
  })
)

const variationParsed = PropTypes.shape({
  name: PropTypes.string,
  options: PropTypes.arrayOf(skuPropType(PropTypes.arrayOf(PropTypes.string))),
})

export const variationComponentPropTypes = {
  variation: variationParsed,
  onSelectItem: PropTypes.func,
  maxSkuPrice: PropTypes.number,
  isSelected: PropTypes.func,
}

export const SKUSelectorContainerPropTypes = {
  /** Product's slug */
  productSlug: PropTypes.string,
  /** SKU selected */
  skuSelected: skuPropType(variationsForContainer).isRequired,
  /** List of SKU Items */
  skuItems: PropTypes.arrayOf(skuPropType(variationsForContainer)).isRequired,
  /** Callback that is called when an SKU is selected */
  onSKUSelected: PropTypes.func,
  /** If true, show secondary options (if present), even when main variation is not picked yet. Default to true */
  shouldShowSecondary: PropTypes.bool,
}

export const SKUSelectorPropTypes = {
  /** Function to go to the product page of a given sku */
  onSelectSku: PropTypes.func.isRequired,
  /** Name and list of options of the main variation */
  mainVariation: variationParsed,
  /** Name and list of options of the secondary variation */
  secondaryVariation: variationParsed,
  /** Max price find on the sku list */
  maxSkuPrice: PropTypes.number.isRequired,
  /** If true, show secondary options (if present), even when main variation is not picked yet */
  shouldShowSecondary: PropTypes.bool,
}
