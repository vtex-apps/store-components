import PropTypes from 'prop-types'

export const SKUSelectorContainerPropTypes = {
  /** Product's slug */
  productSlug: PropTypes.string,
  /** SKU selected */
  skuSelected: PropTypes.object,
  /** Title which describes the SKU Selector Type */
  title: PropTypes.string.isRequired,
  /** List of SKU Items */
  skuItems: PropTypes.arrayOf(PropTypes.shape({
    /** Name of the SKU Item */
    name: PropTypes.string.isRequired,
    /** Images of the SKU item */
    images: PropTypes.arrayOf(PropTypes.shape({
      /** URL of source Image */
      imageUrl: PropTypes.string.isRequired,
      /** Brief description of the image */
      imageLabel: PropTypes.string,
    })).isRequired,
  })).isRequired,
}