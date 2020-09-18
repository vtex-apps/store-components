import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'productSKUAttributesContainer',
  'skuLineClass',
  'skuNameClass',
  'skuValueClass',
]

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
const ProductSKUAttributes = ({
  className,
  skuVariations,
  tag: Wrapper = 'div',
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  if (!skuVariations) {
    return null
  }

  return (
    <Wrapper
      className={classNames(
        handles.productSKUAttributesContainer,
        'mv0',
        className
      )}
    >
      {skuVariations.map((sku, i) => {
        return (
          <div
            className={classNames(handles.skuLineClass)}
            key={`sku_${i}_${sku.name}`}
          >
            <span className={`${classNames(handles.skuNameClass)} mr2 b`}>
              {sku.name}:
            </span>
            <span className={classNames(handles.skuValueClass)}>
              {sku.values.join(', ')}
            </span>
          </div>
        )
      })}
    </Wrapper>
  )
}

ProductSKUAttributes.propTypes = {
  /** Selected SKU name */
  skuVariations: PropTypes.object,
  /** Component and content loader styles */
  className: PropTypes.string,
  /** Component and content loader styles */
  skuLineClass: PropTypes.string,
  /** Classes to be applied to skuName element */
  skuNameClass: PropTypes.string,
  /** Classes to be applied to skuValue element */
  skuValueClass: PropTypes.string,
  /** HTML tag to be used in the component container */
  tag: PropTypes.oneOf(['div']),
}

export default ProductSKUAttributes
