import React from 'react'
import { render } from '@vtex/test-tools/react'
import ProductImages from './../../ProductImages'
import 'jest-canvas-mock'
import useProduct from 'vtex.product-context/useProduct'
import { createItem } from '../../__mocks__/productMock'

const mockUseProduct = useProduct

jest.mock('react-id-swiper/lib/ReactIdSwiper.full', () => {
  return {
    default: ({ children }) => {
      return <div>{children}</div>
    },
  }
})

jest.mock('swiper/dist/js/swiper.esm', () => {
  return {
    Pagination: 'Pagination',
    Navigation: 'Navigation',
  }
})

// This Image mock only call set onload function after user sets the src property in object
class FakeImage {
  onload = null
  set src(newSrc) {
    this.onload && this.onload()
  }
}

beforeEach(() => {
  window.Image = FakeImage
  window.HTMLCanvasElement.prototype.getContext = () => ({
    drawImage: jest.fn(),
  })
})

describe('<ProductImages />', () => {
  const renderComponent = customProps => {
    return render(<ProductImages {...customProps} />)
  }

  it('should render three canvas for each image', () => {
    const props = {
      images: [
        {
          imageUrls: ['url'],
          thresholds: [1],
          thumbnailUrl: 'url',
          imageText: 'imageText',
        },
        {
          imageUrls: ['url2'],
          thresholds: [1],
          thumbnailUrl: 'url2',
          imageText: 'imageText2',
        },
      ],
    }
    const { queryAllByTestId } = renderComponent(props)
    expect(queryAllByTestId('canvas-imageText').length).toBe(3)
    expect(queryAllByTestId('canvas-imageText2').length).toBe(3)
  })
  it('should show thumbs when there is more than one image', () => {
    const props = {
      images: [
        {
          imageUrls: ['url'],
          thresholds: [1],
          thumbnailUrl: 'url',
          imageText: 'imageText',
        },
        {
          imageUrls: ['url2'],
          thresholds: [1],
          thumbnailUrl: 'url2',
          imageText: 'imageText2',
        },
      ],
    }
    const { queryByTestId, getByAltText } = renderComponent(props)
    const swiper = queryByTestId('thumbnail-swiper')
    expect(swiper.className.includes('db-ns')).toBeTruthy()
    getByAltText('imageText')
    getByAltText('imageText2')
  })
  it('should NOT show thumbs when there is one image', () => {
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
    const { queryByTestId } = renderComponent(props)

    const swiper = queryByTestId('thumbnail-swiper')
    expect(swiper.className.includes('db-ns')).toBeFalsy()
    expect(swiper.className.includes('dn')).toBeTruthy()
  })

  describe('test logic to thumbnail orientation', () => {
    it('should render with correct classes when vertical', () => {
      const props = {
        thumbnailsOrientation: 'vertical',
        images: [
          {
            imageUrls: ['url'],
            thresholds: [1],
            thumbnailUrl: 'url',
            imageText: 'imageText',
          },
          {
            imageUrls: ['url2'],
            thresholds: [1],
            thumbnailUrl: 'url2',
            imageText: 'imageText2',
          },
        ],
      }
      const { queryByTestId } = renderComponent(props)

      const swiper = queryByTestId('thumbnail-swiper')
      expect(swiper.className.includes('absolute')).toBeTruthy()
      expect(swiper.className.includes('w-20')).toBeTruthy()
    })
    it('default orientation should be vertical', () => {
      const props = {
        images: [
          {
            imageUrls: ['url'],
            thresholds: [1],
            thumbnailUrl: 'url',
            imageText: 'imageText',
          },
          {
            imageUrls: ['url2'],
            thresholds: [1],
            thumbnailUrl: 'url2',
            imageText: 'imageText2',
          },
        ],
      }
      const { queryByTestId } = renderComponent(props)

      const swiper = queryByTestId('thumbnail-swiper')
      expect(swiper.className.includes('absolute')).toBeTruthy()
      expect(swiper.className.includes('w-20')).toBeTruthy()
    })
    it('should render with correct classes when horizontal', () => {
      const props = {
        thumbnailsOrientation: 'horizontal',
        images: [
          {
            imageUrls: ['url'],
            thresholds: [1],
            thumbnailUrl: 'url',
            imageText: 'imageText',
          },
          {
            imageUrls: ['url2'],
            thresholds: [1],
            thumbnailUrl: 'url2',
            imageText: 'imageText2',
          },
        ],
      }
      const { queryByTestId } = renderComponent(props)

      const swiper = queryByTestId('thumbnail-swiper')
      expect(swiper.className.includes('absolute')).toBeFalsy()
      expect(swiper.className.includes('w-20')).toBeFalsy()
    })
    it('should render with correct classes when vertical and position left', () => {
      const props = {
        thumbnailsOrientation: 'vertical',
        position: 'left',
        images: [
          {
            imageUrls: ['url'],
            thresholds: [1],
            thumbnailUrl: 'url',
            imageText: 'imageText',
          },
          {
            imageUrls: ['url2'],
            thresholds: [1],
            thumbnailUrl: 'url2',
            imageText: 'imageText2',
          },
        ],
      }
      const { queryByTestId } = renderComponent(props)

      const swiper = queryByTestId('thumbnail-swiper')
      expect(swiper.className.includes('absolute')).toBeTruthy()
      expect(swiper.className.includes('w-20')).toBeTruthy()
      expect(swiper.className.includes('left')).toBeTruthy()
      expect(swiper.className.includes('right')).toBeFalsy()
    })
    it('should render with correct classes when vertical and position right', () => {
      const props = {
        thumbnailsOrientation: 'vertical',
        position: 'right',
        images: [
          {
            imageUrls: ['url'],
            thresholds: [1],
            thumbnailUrl: 'url',
            imageText: 'imageText',
          },
          {
            imageUrls: ['url2'],
            thresholds: [1],
            thumbnailUrl: 'url2',
            imageText: 'imageText2',
          },
        ],
      }
      const { queryByTestId } = renderComponent(props)

      const swiper = queryByTestId('thumbnail-swiper')
      expect(swiper.className.includes('absolute')).toBeTruthy()
      expect(swiper.className.includes('w-20')).toBeTruthy()
      expect(swiper.className.includes('left')).toBeFalsy()
      expect(swiper.className.includes('right')).toBeTruthy()
    })
  })

  describe('test with product context', () => {
    it('render properly with product in context', () => {
      mockUseProduct.mockImplementation(() => ({
        selectedItem: createItem({}),
      }))
      const { queryAllByTestId } = renderComponent({})
      expect(queryAllByTestId('canvas-imageText').length).toBe(3)
      expect(queryAllByTestId('canvas-imageText2').length).toBe(3)
      expect(queryAllByTestId('canvas-imageText3').length).toBe(3)
    })
    it('give priority to prop items if product in context', () => {
      mockUseProduct.mockImplementation(() => ({
        selectedItem: createItem({}),
      }))
      const props = {
        images: [
          {
            imageUrls: ['url'],
            thresholds: [1],
            thumbnailUrl: 'url',
            imageText: 'propImageText',
          },
          {
            imageUrls: ['url2'],
            thresholds: [1],
            thumbnailUrl: 'url2',
            imageText: 'propImageText2',
          },
        ],
      }
      const { queryAllByTestId } = renderComponent(props)
      expect(queryAllByTestId('canvas-propImageText').length).toBe(3)
      expect(queryAllByTestId('canvas-propImageText2').length).toBe(3)
    })
  })
})
