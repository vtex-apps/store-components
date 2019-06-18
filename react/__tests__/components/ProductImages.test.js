import React from 'react'
import { render } from '@vtex/test-tools/react'
import ProductImages from './../../ProductImages'

jest.mock('react-id-swiper/lib/ReactIdSwiper.full', () => {
  return {
    default: jest.fn(),
  }
})

jest.mock('swiper/dist/js/swiper.esm', () => {
  return jest.fn()
})

describe('<ProductImages />', () => {
  const renderComponent = customProps => {
    return render(<ProductImages {...customProps} />)
  }

  it('should be mounted', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeDefined()
  })

  it('should match the snapshot with images', () => {
    const props = {
      images: [
        {
          imageUrls: ['url'],
          thresholds: [1],
          thumbnailUrl: 'url',
          imageText: 'imageText',
        },
      ],
    }
    const { asFragment } = renderComponent(props)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with no images', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with thumbnails in right position', () => {
    const { asFragment } = renderComponent({ position: 'right' })
    expect(asFragment()).toMatchSnapshot()
  })
})
