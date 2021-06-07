import React, { FC } from 'react'
import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'

import { ProductBrandCssHandlesProvider } from './components/ProductBrand/ProductBrandCssHandles'
import ProductBrandName, {
  CSS_HANDLES as ProductBrandNameCssHandles,
} from './components/ProductBrand/ProductBrandName'
import { changeImageUrlSize } from './utils/imgUrlHelpers'
import brandLogoQuery from './graphql/productBrand.gql'

type DisplayModeOptions = 'logo' | 'text'
type WithLinkOptions = 'none' | 'logo' | 'text' | 'logoAndText'

interface ProductBrandQueryVariables {
  id: number
}

interface ProductBrandQueryResult {
  brand?: {
    imageUrl: string | null
    slug: string
  }
}

export const PRODUCT_BRAND_CSS_HANDLES = [
  'productBrandContainer',
  'productBrandLogo',
  'productBrandLogoWrapper',
  'productBrandLogoLink',
  'productBrandLogoSpacer',
  'productBrandNameSpacer',
  ...ProductBrandNameCssHandles,
] as const

export interface ProductBrandProps {
  /** The brand name. If no value is declared, the product context should provide the data. */
  brandName?: string
  /** The brand ID.  If no value is declared, the product context should provide the data. */
  brandId?: number
  /** This will define if the product brand will be displayed by text or logo */
  displayMode?: DisplayModeOptions
  /** This will define if the loading placeholder should have the size of the logo or the text */
  loadingPlaceholder?: DisplayModeOptions
  /** This prop should only be used when `displayMode` is set to `logo`.
   * It defines what should be done when the Product Brand was set to display a brand logo
   * but no image was registered in the VTEX admin's Catalog
   * */
  fallbackToText?: boolean
  /** The brand names or brand IDs listed in the array will never be displayed by the Brand component.
   * It is usually useful to hide default or test brand names/logos on the store front
   * */
  excludeBrands?: Array<string | number>
  /** It sets the logo height. It should only be used when `displayMode` is set to `logo` */
  height?: number
  /** @deprecated use withLink instead */
  logoWithLink?: boolean
  /** Defines the scenarios in which the product brand should have a link that leads to its website. */
  withLink?: WithLinkOptions
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof PRODUCT_BRAND_CSS_HANDLES>
  blockClass?: string
}

const shouldExcludeBrand = (
  brandName: string,
  brandId: number,
  excludeList: ProductBrandProps['excludeBrands']
) => {
  if (Array.isArray(excludeList)) {
    return excludeList.includes(brandName) || excludeList.includes(brandId)
  }

  return false
}

const useBrandInfoProps = (
  brandName: string | undefined,
  brandId: number | undefined
) => {
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
  withLink = 'none',
  brandName: brandNameProp,
  brandId: brandIdProp,
  classes,
}: ProductBrandProps) {
  const { brandName, brandId } = useBrandInfoProps(brandNameProp, brandIdProp)
  const { handles, withModifiers } = useCssHandles(PRODUCT_BRAND_CSS_HANDLES, {
    classes,
  })

  const { data, loading, error } = useQuery<
    ProductBrandQueryResult,
    ProductBrandQueryVariables
  >(brandLogoQuery, {
    variables: { id: Number(brandId) },
    ssr: false,
  })

  const logoHasLink =
    withLink === 'logo' || withLink === 'logoAndText' || Boolean(logoWithLink)

  const nameHasLink = withLink === 'text' || withLink === 'logoAndText'

  if (!brandName || !brandId) {
    return null
  }

  /** Certain brands (e.g. placeholder brands) can be filtered out via theme config */
  if (shouldExcludeBrand(brandName, Number(brandId), excludeBrands)) {
    return null
  }

  const brandNameElement = (
    <ProductBrandCssHandlesProvider
      handles={handles}
      withModifiers={withModifiers}
    >
      <ProductBrandName
        brandName={brandName}
        withLink={nameHasLink}
        slug={data?.brand?.slug}
      />
    </ProductBrandCssHandlesProvider>
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

  if (imageUrl === null && !fallbackToText) {
    return null
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
        {logoHasLink ? (
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
