import { get } from 'lodash.get'

function getSlideListWidth(slick) {
  return slick && slick.innerSlider && slick.innerSlider.list.clientWidth
}

function getItemWidth(slick) {
  const slidesNodeList = get(slick, 'innerSlider.list.childNodes[0].childNodes')
  if (slidesNodeList) {
    const slidesArray = Array.from(slidesNodeList)
    slidesArray.map(slide => {
      const attributes = Array.from(slide.attributes)
      attributes.map(attr => {
        if (attr.nodeName === 'data-index' && attr.nodeValue === '0') {
          return get(slide, 'childNodes[0].clientWidth')
        }
      })
    })
  }
  return null
}

/**
 * Returns the correct number of items to be inside the slider without reduce the item width.
 */
export default function getItemsPerPage(slick, defaultItemWidth, actualItemsPerPage) {
  const slideListWidth = getSlideListWidth(slick)
  if (slideListWidth) {
    const shelfItemWidth = getItemWidth(slick) || defaultItemWidth
    const maxItemsPerPage = Math.floor(slideListWidth / shelfItemWidth)
    if (actualItemsPerPage >= maxItemsPerPage) {
      return maxItemsPerPage || 1
    }
  }
  return actualItemsPerPage
}
