import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import useProduct from 'vtex.product-context/useProduct'

const CSS_HANDLES = [
  'productSKUNamesContainer',
  'skuLineClass',
  'skuNameClass',
  'skuValueClass',
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
}

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
function ProductSKUNames(_props: Props) {
  const handles = useCssHandles(CSS_HANDLES)
  const productContext = useProduct()

  const skuVariations = getVariationsFromSelectedItem(productContext)

  if (!skuVariations) {
    return null
  }

  return (
    <div className={`${handles.productSKUNamesContainer} mv0`}>
      {skuVariations.map(sku => {
        return (
          <div className={handles.skuLineClass} key={sku.name}>
            <span className={`${handles.skuNameClass} mr2 b`}>{sku.name}:</span>
            <span className={handles.skuValueClass}>
              {sku.values.join(', ')}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default ProductSKUNames
