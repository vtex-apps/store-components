import PropTypes from 'prop-types'

const skuPropType = PropTypes.shape({
  /** Name of the SKU Item */
  name: PropTypes.string.isRequired,
  /** Images of the SKU item */
  images: PropTypes.arrayOf(PropTypes.shape({
    /** URL of source Image */
    imageUrl: PropTypes.string.isRequired,
    /** Brief description of the image */
    imageLabel: PropTypes.string,
  })).isRequired,
  /** SkuID */
  itemId: PropTypes.string.isRequired,
  /** List of products specifications names */
  variations: PropTypes.arrayOf(PropTypes.string),
})

export const SKUSelectorContainerPropTypes = {
  /** Product's slug */
  productSlug: PropTypes.string,
  /** SKU selected */
  skuSelected: skuPropType.isRequired,
  /** List of SKU Items */
  skuItems: PropTypes.arrayOf(skuPropType).isRequired,
  /** Callback that is called when an SKU is selected */
  onSKUSelected: PropTypes.func,
}

const variationPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(skuPropType),
})

export const SKUSelectorPropTypes = {
  /** Selected SKU id */
  selectedId: PropTypes.string.isRequired,
  /** Function to go to the product page of a given sku */
  onSelectSku: PropTypes.func.isRequired,
  /** Name and list of options of the main variation */
  mainVariation: variationPropTypes,
  /** Name and list of options of the secondary variation */
  secondaryVariation: variationPropTypes,
  /** Max price find on the sku list */
  maxSkuPrice: PropTypes.number.isRequired,
}
