function getSlideListWidth(slick) {
  return slick && slick.innerSlider && slick.innerSlider.list.clientWidth
}

function getItemWidth(slick) {
  if (slick) {
    const nodes = slick.innerSlider.list.childNodes[0].childNodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].attributes.length; j++) {
        const attr = nodes[i].attributes[j]
        if (attr.nodeName === 'data-index' && attr.nodeValue === '0' && nodes[i].childNodes[0]) {
          return nodes[i].childNodes[0].clientWidth
        }
      }
    }
  }
  return null
}

/**
 * Returns the correct number of items to be inside the slider without reduce the width of item.
 */
export function getCorrectItemsPerPage(slick, defaultItemWidth, actualItemsPerPage) {
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
