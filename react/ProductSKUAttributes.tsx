import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'

const CSS_HANDLES = [
  'productSKUAttributesContainer',
  'attributeLine',
  'attributeName',
  'attributeValue',
] as const

const getVariationsFromSelectedItem = (
  productContext: ReturnType<typeof useProduct>
) => {
  if (
    !productContext ||
    !productContext.product ||
    !productContext.skuSelector ||
    !productContext.selectedItem
  ) {
    return null
  }

  const { selectedImageVariationSKU } = productContext.skuSelector

  if (selectedImageVariationSKU) {
    const selected = productContext.product.items.find(item => {
      return item.itemId === selectedImageVariationSKU
    })

    if (selected) {
      return selected.variations
    }
  }

  return productContext.selectedItem.variations
}

interface Props {
  blockClass?: string
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
function ProductSKUAttributes({ classes }: Props) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const productContext = useProduct()

  const skuVariations = getVariationsFromSelectedItem(productContext)

  if (!skuVariations) {
    return null
  }

  return (
    <div className={`${handles.productSKUAttributesContainer} mv0`}>
      {skuVariations.map(sku => {
        return (
          <div className={handles.attributeLine} key={sku.name}>
            <span className={`${handles.attributeName} mr2 b`}>
              {sku.name}:
            </span>
            <span className={handles.attributeValue}>
              {sku.values.join(', ')}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default ProductSKUAttributes
