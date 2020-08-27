export const DEFAULT_WIDTH = 'auto'
export const DEFAULT_HEIGHT = 'auto'
export const MAX_WIDTH = 3000
export const MAX_HEIGHT = 4000

/**
 * Having the url below as base for the LEGACY file manager,
 * https://storecomponents.vteximg.com.br/arquivos/ids/155472/Frame-3.jpg?v=636793763985400000
 * the following regex will match https://storecomponents.vteximg.com.br/arquivos/ids/155472
 *
 * Also matches urls with defined sizes like:
 * https://storecomponents.vteximg.com.br/arquivos/ids/155473-160-auto
 * @type {RegExp}
 *
 * On the new vtex.file-manager isn't necessary replace the URL, just add the param on the querystring, like:
 * "?width=WIDTH&height=HEIGHT&aspect=true"
 *
 */
const baseUrlRegex = new RegExp(/.+ids\/(\d+)/)

// @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
export function cleanImageUrl(imageUrl: any) {
  const result = baseUrlRegex.exec(imageUrl)

  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (result.length > 0) return result[0]
}

function replaceLegacyFileManagerUrl(imageUrl: any, width: any, height: any) {
  const legacyUrlPattern = '/arquivos/ids/'
  const isLegacyUrl = imageUrl.includes(legacyUrlPattern)

  if (!isLegacyUrl) return imageUrl

  return `${cleanImageUrl(imageUrl)}-${width}-${height}`
}

export function changeImageUrlSize(
  imageUrl: any,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
) {
  if (!imageUrl) return
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
  typeof width === 'number' && (width = Math.min(width, MAX_WIDTH))
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
  typeof height === 'number' && (height = Math.min(height, MAX_HEIGHT))

  const normalizedImageUrl = replaceLegacyFileManagerUrl(
    imageUrl,
    width,
    height
  )

  const queryStringSeparator = normalizedImageUrl.includes('?') ? '&' : '?'

  return `${normalizedImageUrl}${queryStringSeparator}width=${width}&height=${height}&aspect=true`
}
