function getSlideListWidth(slick) {
  return slick && slick.innerSlider && slick.innerSlider.list.clientWidth
}

function getItemWidth(slick) {
  const { innerSlider: { list: { childNodes: [{ childNodes }] } } } = slick
  if (childNodes) {
    const slideNodes = Array.from(childNodes)
    let firstItem = null
    slideNodes.map(node => {
      const attrs = Array.from(node.attributes)
      attrs.map(attr => {
        if (attr.nodeName === 'data-index' && attr.nodeValue === '0') {
          firstItem = node
        }
      })
    })
    return firstItem && firstItem.childNodes && firstItem.childNodes[0].clientWidth
  }
  return null
}

/**
 * Returns the correct number of items to be inside the slider without reduce the width of item.
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
