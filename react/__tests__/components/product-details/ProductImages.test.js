import React from 'react'
import { mount } from 'enzyme'

import ProductImages from '../../../ProductImages'

describe('<ProductImages /> component', () => {
  const ProductImagesPropsMock = {}
  const defaultConfiguration = {}

  function renderComponent(customProps) {
    const props = {
      ...ProductImagesPropsMock,
      ...defaultConfiguration,
      ...customProps,
    }

    const component = mount(<ProductImages {...props} />)

    return {
      component,
    }
  }

  it('should be mounted without breaking', () => {
    const { component } = renderComponent()
    expect(component).toBeTruthy()
  })

  it('should hide thumbnail slider if the number of images is not greater than one', () => {
    const { component } = renderComponent({
      images: [{ imageUrl: '', imageText: '' }],
    })
    expect(component.find('.slick-list')).toBeUndefined
  })

  describe('<ThumbnailSlider /> component', () => {
    const MAX_VISIBLE_ITEMS = 4
    const NUM_OF_VISIBLE_ITEMS = 2
    const INVALID_NUM_OF_VISIBLE_ITEMS = 10

    it(`should display at most ${MAX_VISIBLE_ITEMS} thumbnail items at same time`, () => {
      const { component } = renderComponent()
      expect(component.find('.slick-active').length).toBeLessThanOrEqual(
        MAX_VISIBLE_ITEMS
      )
    })

    it(`should display ${NUM_OF_VISIBLE_ITEMS} thumbnail items that is passed as a prop, since that this number is less than or equal to ${MAX_VISIBLE_ITEMS}`, () => {
      const { component } = renderComponent({
        thumbnailMaxVisibleItems: NUM_OF_VISIBLE_ITEMS,
      })
      expect(component.find('.slick-active').length).toBe(NUM_OF_VISIBLE_ITEMS)
    })

    it(`should display the entire image of thumbnails if this number is less than the ${NUM_OF_VISIBLE_ITEMS} that is passed as a prop`, () => {
      const images = [
        { imageUrl: '', imageText: '' },
        { imageUrl: '', imageText: '' },
      ]
      const { component } = renderComponent({
        images,
        thumbnailMaxVisibleItems: INVALID_NUM_OF_VISIBLE_ITEMS,
      })
      expect(component.find('.slick-active').length).toBe(images.length)
    })
  })
})
