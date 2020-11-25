import React, { PropsWithChildren, FC } from 'react'
import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

import { changeImageUrlSize } from './utils/imgUrlHelpers'
import brandLogoQuery from './graphql/productBrand.gql'

type DisplayModeOptions = 'logo' | 'text'

export interface Props {
  /** Brand name */
  brandName: string
  /** Brand id */
  brandId: number
  /** Whether it should be displayed as a logo or as a text */
  displayMode?: DisplayModeOptions
  /** Whether the loading placeholder should have the size of the logo or the text */
  loadingPlaceholder?: DisplayModeOptions
  /** Whether it should display the name of the brand if there is no logo */
  fallbackToText?: boolean
  /** List of brands that should be hidden, if any */
  excludeBrands?: Array<string | number>
  /** Height of the logo */
  height?: number
  /** CSS Handler */
  blockClass: string
  logoWithLink: boolean
}

interface ProductBrandQueryVariables {
  id: number
}

interface ProductBrandQueryResult {
  brand: {
    imageUrl: string | null
    slug: string
  }
}

const CSS_HANDLES = [
  'productBrandContainer',
  'productBrandName',
  'productBrandLogo',
  'productBrandLogoWrapper',
  'productBrandLogoLink',
  'productBrandLogoSpacer',
  'productBrandNameSpacer',
] as const

const shouldExcludeBrand = (
  brandName: string,
  brandId: number,
  excludeList: Props['excludeBrands']
) => {
  if (Array.isArray(excludeList)) {
    return excludeList.includes(brandName) || excludeList.includes(brandId)
  }

  return false
}

const useBrandInfoProps = (brandName: string, brandId: number) => {
  const productContext = useProduct()
  const product = productContext?.product

  if ((brandName && brandId) || !product) {
    return { brandName, brandId }
  }

  return { brandName: product.brand, brandId: Number(product.brandId) }
}

/**
 * The `ProductBrand` is a VTEX block that displays either the **name** or the **logo** of a **product's brand**.
 */
function ProductBrand({
  displayMode = 'logo',
  fallbackToText = true,
  loadingPlaceholder = 'logo',
  /** TODO: decide whether the prop width should be supported
   * It makes sense at surface, but setting both width and height
   * messes with the alignment of the logo, due to how our image
   * server handles resizing. */
  height = 100,
  excludeBrands,
  logoWithLink,
  brandName: brandNameProp,
  brandId: brandIdProp,
}: PropsWithChildren<Props>) {
  const { brandName, brandId } = useBrandInfoProps(brandNameProp, brandIdProp)
  const handles = useCssHandles(CSS_HANDLES)

  const { data, loading, error } = useQuery<
    ProductBrandQueryResult,
    ProductBrandQueryVariables
  >(brandLogoQuery, {
    variables: { id: Number(brandId) },
    ssr: false,
  })

  if (!brandName || !brandId) {
    return null
  }

  /** Certain brands (e.g. placeholder brands) can be filtered out via theme config */
  if (shouldExcludeBrand(brandName, Number(brandId), excludeBrands)) {
    return null
  }

  const brandNameElement = (
    <span className={`${handles.productBrandName}`}>{brandName}</span>
  )

  const BrandContainer: FC = ({ children }) => (
    <div className={`${handles.productBrandContainer}`}>{children}</div>
  )

  if (displayMode === 'text') {
    return <BrandContainer>{brandNameElement}</BrandContainer>
  }

  if (!height) {
    console.warn(
      'ProductBrand: It is strongly recommended that the height of the logo should be set, to avoid shifting positions of elements while the logo is loading.'
    )
  }

  if (loading) {
    /** Renders an empty spacer in the size of the preferred
     * type (i.e. if most brands have no logo, it should render
     * a placeholder in the size of the brand name text; if
     * most brands do have a logo, it should render a spacer
     * in the size of the predefined image size)
     */
    if (loadingPlaceholder === 'logo') {
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

    if (loadingPlaceholder === 'text' && fallbackToText) {
      return (
        <BrandContainer>
          <span className={`${handles.productBrandNameSpacer} o-0`}>
            {brandNameElement}
          </span>
        </BrandContainer>
      )
    }

    return null
  }

  if (error || !data?.brand) {
    return null
  }

  const { imageUrl, slug } = data.brand

  /** If imageUrl is exactly null, it means no brand
   * logo was uploaded. So it falls back to the brand name,
   * if said fallback is enabled. */
  if (imageUrl === null && fallbackToText) {
    return <BrandContainer>{brandNameElement}</BrandContainer>
  }

  const dpi = window?.devicePixelRatio ?? 1
  const logoLink = `/${slug}/b`

  const logoImageSrc = changeImageUrlSize({
    imageUrl: `/arquivos/ids${imageUrl}`,
    height: height ? height * dpi : undefined,
  })

  const logoImage = (
    <img
      className={`${handles.productBrandLogo}`}
      src={logoImageSrc}
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

export default ProductBrand
