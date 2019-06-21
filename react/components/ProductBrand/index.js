import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { generateBlockClass } from '@vtex/css-handles'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { changeImageUrlSize } from './urlHelpers'

import styles from './productBrand.css'

const BRAND_LOGO_QUERY = gql`
  query Brand($id: Int) {
    brand(id: $id) {
      imageUrl
    }
  }
`

const DISPLAY_MODE = {
  LOGO: 'logo',
  TEXT: 'text',
}

const shouldExcludeBrand = (brandName, brandId, excludeList) => {
  if (Array.isArray(excludeList)) {
    return excludeList.includes(brandName) || excludeList.includes(brandId)
  }
  return false
}

const ProductBrand = ({
  displayMode = DISPLAY_MODE.LOGO,
  fallbackToText = true,
  loadingPlaceholder = DISPLAY_MODE.LOGO,
  /** TODO: decide whether the prop width should be supported
   * It makes sense at surface, but setting both width and height
   * messes with the alignment of the logo, due to how our image
   * server handles resizing. */
  // width,
  height = 100,
  excludeBrands,
  blockClass,
}) => {
  const productContext = useContext(ProductContext)

  const {
    product: { brand: brandName, brandId },
  } = productContext

  /** Certain brands (e.g. placeholder brands) can be filtered out via theme config */
  if (shouldExcludeBrand(brandName, brandId, excludeBrands)) {
    return null
  }

  const BrandContainer = ({ children }) => (
    <div
      className={generateBlockClass(styles.productBrandContainer, blockClass)}
    >
      {children}
    </div>
  )

  const brandNameElement = (
    <span className={generateBlockClass(styles.productBrandName, blockClass)}>
      {brandName}
    </span>
  )

  if (displayMode === DISPLAY_MODE.TEXT) {
    return <BrandContainer>{brandNameElement}</BrandContainer>
  }

  if (!height) {
    console.warn(
      'ProductBrand: It is strongly recommended that the height of the logo should be set, to avoid shifting positions of elements while the logo is loading.'
    )
  }

  return (
    <Query query={BRAND_LOGO_QUERY} ssr={false} variables={{ id: brandId }}>
      {query => {
        const { data } = query
        if (data && data.brand) {
          const { imageUrl } = data.brand
          if (imageUrl) {
            const dpi = (window && window.devicePixelRatio) || 1

            return (
              <BrandContainer>
                <div
                  style={{
                    // width,
                    height,
                  }}
                >
                  {/** TODO: Use a smarter Image component that handles VTEX image resizing etc. */}
                  <img
                    className={generateBlockClass(
                      styles.productBrandImage,
                      blockClass
                    )}
                    src={changeImageUrlSize(
                      `/arquivos/ids${imageUrl}`,
                      // width ? width * dpi : undefined,
                      undefined,
                      height ? height * dpi : undefined
                    )}
                    style={{
                      // width: width || 'auto',
                      height: height || 'auto',
                    }}
                  />
                </div>
              </BrandContainer>
            )
          }

          /** If imageUrl is exactly null, it means no brand
           * logo was uploaded. So it falls back to the brand name,
           * if said fallback is enabled. */
          if (imageUrl === null && fallbackToText) {
            return <BrandContainer>{brandNameElement}</BrandContainer>
          }
        }

        /** Renders an empty spacer in the size of the preferred
         * type (i.e. if most brands have no logo, it should render
         * a placeholder in the size of the brand name text; if
         * most brands do have a logo, it should render a spacer
         * in the size of the predefined image size)
         */
        if (loadingPlaceholder === DISPLAY_MODE.LOGO) {
          return (
            <BrandContainer>
              <div
                style={{
                  // width,
                  height,
                }}
              />
            </BrandContainer>
          )
        }
        if (loadingPlaceholder === DISPLAY_MODE.TEXT && fallbackToText) {
          return (
            <BrandContainer>
              <span className="o-0">{brandNameElement}</span>
            </BrandContainer>
          )
        }

        return null
      }}
    </Query>
  )
}

ProductBrand.propTypes = {
  /** Brand name */
  brandName: PropTypes.string,
  /** Whether it should be displayed as a logo or as a text */
  displayMode: PropTypes.oneOf(Object.values(DISPLAY_MODE)),
  /** Whether the loading placeholder should have the size of the logo or the text */
  loadingPlaceholder: PropTypes.oneOf(Object.values(DISPLAY_MODE)),
  /** Whether it should display the name of the brand if there is no logo */
  fallbackToText: PropTypes.bool,
  /** List of brands that should be hidden, if any */
  excludeBrands: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  /** Height of the logo */
  height: PropTypes.nuber,
  /** CSS Handler */
  blockClass: PropTypes.string,
}

export default ProductBrand
