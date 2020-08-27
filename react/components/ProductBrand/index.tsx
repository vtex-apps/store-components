import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import { ProductContext } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

import { changeImageUrlSize } from './urlHelpers'
import brandLogoQuery from './productBrand.gql'

const DISPLAY_MODE = {
  LOGO: 'logo',
  TEXT: 'text',
}

const CSS_HANDLES = [
  'productBrandContainer',
  'productBrandName',
  'productBrandLogo',
  'productBrandLogoWrapper',
  'productBrandLogoLink',
  'productBrandLogoSpacer',
  'productBrandNameSpacer',
]

const shouldExcludeBrand = (brandName: any, brandId: any, excludeList: any) => {
  if (Array.isArray(excludeList)) {
    return excludeList.includes(brandName) || excludeList.includes(brandId)
  }

  return false
}

const useBrandInfoProps = (brandName: any, brandId: any) => {
  const productContext = useContext(ProductContext)
  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  const product = productContext && productContext.product

  if ((brandName && brandId) || !product) {
    return { brandName, brandId }
  }

  return { brandName: product.brand, brandId: product.brandId }
}

type Props = {
  brandName?: string
  brandId?: number
  displayMode?: any // TODO: PropTypes.oneOf(Object.values(DISPLAY_MODE))
  loadingPlaceholder?: any // TODO: PropTypes.oneOf(Object.values(DISPLAY_MODE))
  fallbackToText?: boolean
  excludeBrands?: Array<number | string>
  height?: number
  blockClass?: string
  logoWithLink?: boolean
}

const ProductBrand = ({
  displayMode = DISPLAY_MODE.LOGO,
  fallbackToText = true,
  loadingPlaceholder = DISPLAY_MODE.LOGO,
  /** TODO: decide whether the prop width should be supported
   * It makes sense at surface, but setting both width and height
   * messes with the alignment of the logo, due to how our image
   * server handles resizing. */
  height = 100,
  excludeBrands,
  logoWithLink,
  brandName: brandNameProp,
  brandId: brandIdProp,
}: Props) => {
  const { brandName, brandId } = useBrandInfoProps(brandNameProp, brandIdProp)
  const handles = useCssHandles(CSS_HANDLES)

  if (!brandName || !brandId) {
    return null
  }

  /** Certain brands (e.g. placeholder brands) can be filtered out via theme config */
  if (shouldExcludeBrand(brandName, brandId, excludeBrands)) {
    return null
  }

  const brandNameElement = (
    <span className={`${handles.productBrandName}`}>{brandName}</span>
  )

  const BrandContainer = ({ children }: any) => (
    <div className={`${handles.productBrandContainer}`}>{children}</div>
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
    <Query query={brandLogoQuery} ssr={false} variables={{ id: brandId }}>
      {(query: any) => {
        const { data } = query

        if (data && data.brand) {
          const { imageUrl, slug } = data.brand

          if (imageUrl) {
            const dpi = (window && window.devicePixelRatio) || 1
            const logoLink = `/${slug}/b`
            const logoImage = (
              <img
                className={`${handles.productBrandLogo}`}
                src={changeImageUrlSize(
                  `/arquivos/ids${imageUrl}`,
                  undefined,
                  // @ts-expect-error ts-migrate(2345) FIXME: Type 'number' is not assignable to type 'string | ... Remove this comment to see the full error message
                  height ? height * dpi : undefined
                )}
                alt={brandName}
                style={{
                  height: height || 'auto',
                }}
              />
            )

            return (
              <BrandContainer>
                <div
                  style={{
                    height,
                  }}
                  className={`${handles.productBrandLogoWrapper}`}
                >
                  {/** TODO: Use a smarter Image component that handles VTEX image resizing etc. */}
                  {logoWithLink ? (
                    <a
                      href={logoLink}
                      className={`${handles.productBrandLogoLink}`}
                      data-testid="logo-redirect"
                    >
                      {' '}
                      {logoImage}{' '}
                    </a>
                  ) : (
                    logoImage
                  )}
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
                  height,
                }}
                className={`${handles.productBrandLogoSpacer}`}
              />
            </BrandContainer>
          )
        }

        if (loadingPlaceholder === DISPLAY_MODE.TEXT && fallbackToText) {
          return (
            <BrandContainer>
              <span className={`${handles.productBrandNameSpacer} o-0`}>
                {brandNameElement}
              </span>
            </BrandContainer>
          )
        }

        return null
      }}
    </Query>
  )
}

export default ProductBrand
