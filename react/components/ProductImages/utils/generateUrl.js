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

function getParamFromUrl(url, name) {
  return (url?.split(`${name}=`)[1] || '')?.split('&')[0]
}

export function cleanImageUrl(imageUrl) {
  const cleanUrlResult = baseUrlRegex.exec(imageUrl)
  const vParam = getParamFromUrl(imageUrl, 'v')

  if (cleanUrlResult && cleanUrlResult.length > 0) {
    return {
      cleanUrl: cleanUrlResult[0],
      vParam,
    }
  }

  return { cleanUrl: imageUrl }
}

function replaceLegacyFileManagerUrl(imageUrl, width, height) {
  const legacyUrlPattern = '/arquivos/ids/'
  const isLegacyUrl = imageUrl.includes(legacyUrlPattern)

  if (!isLegacyUrl) return imageUrl

  const { vParam, cleanUrl } = cleanImageUrl(imageUrl)

  return vParam
    ? `${cleanUrl}-${width}-${height}?v=${vParam}`
    : `${cleanUrl}-${width}-${height}`
}

export function changeImageUrlSize(
  imageUrl,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
) {
  if (!imageUrl) return
  typeof width === 'number' && (width = Math.min(width, MAX_WIDTH))
  typeof height === 'number' && (height = Math.min(height, MAX_HEIGHT))

  const normalizedImageUrl = replaceLegacyFileManagerUrl(
    imageUrl,
    width,
    height
  )

  const queryStringSeparator = normalizedImageUrl.includes('?') ? '&' : '?'

  return `${normalizedImageUrl}${queryStringSeparator}width=${width}&height=${height}&aspect=true`
}
