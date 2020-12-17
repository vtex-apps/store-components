import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import useProduct from 'vtex.product-context/useProduct'
import { Modal } from 'vtex.modal-layout'

import ProductImages from '../../ProductImages'
// eslint-disable-next-line jest/no-mocks-import
import { createItem } from '../../__mocks__/productMock'
import HighQualityProductImage from '../../HighQualityProductImage'

const mockUseProduct = useProduct

// This works just like a slot passed to product-iamges
function ModalLayout() {
  return (
    <Modal>
      <HighQualityProductImage />
    </Modal>
  )
}

jest.mock('swiper/react', () => {
  return {
    Swiper({ children }) {
      return <div>{children}</div>
    },
    SwiperSlide({ children }) {
      return <div>{children}</div>
    },
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
})

describe('<ProductImages />', () => {
  const renderComponent = customProps => {
    return render(<ProductImages {...customProps} />)
  }

  it('should render two images (thumb and main image) for each product image', () => {
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

    const { getAllByAltText } = renderComponent(props)

    expect(getAllByAltText('imageText')).toHaveLength(2)
    expect(getAllByAltText('imageText2')).toHaveLength(2)
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

    const { queryByTestId, getAllByAltText } = renderComponent(props)
    const swiper = queryByTestId('thumbnail-swiper')

    expect(swiper.className.includes('db-ns')).toBeTruthy()
    getAllByAltText('imageText')
    getAllByAltText('imageText2')
  })
  it('should show default placeholder when there is NO image', () => {
    const props = {
      images: [],
    }

    const { queryByTestId } = renderComponent(props)

    const defaultPlaceholder = queryByTestId('default-image-placeholder')

    expect(defaultPlaceholder).toBeVisible()
  })

  it('should show custom placeholder when provided and there is NO image', () => {
    const props = {
      images: [],
      placeholder: 'url',
    }

    const { queryByAltText } = renderComponent(props)

    const defaultPlaceholder = queryByAltText('Product image placeholder')

    expect(defaultPlaceholder).toBeVisible()
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

    expect(swiper).toHaveClass('dn')
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
        selectedItem: createItem({ id: 'potato' }),
      }))
      const { queryAllByAltText } = renderComponent({})

      expect(queryAllByAltText('potato-imageText')).toHaveLength(2)
      expect(queryAllByAltText('potato-imageText2')).toHaveLength(2)
      expect(queryAllByAltText('potato-imageText3')).toHaveLength(2)
    })

    it('gives priority to selected image variation sku', () => {
      mockUseProduct.mockImplementation(() => ({
        product: {
          items: [createItem({ id: '123' }), createItem({ id: '456' })],
        },
        skuSelector: {
          selectedImageVariationSKU: '456',
        },
      }))
      const { queryAllByAltText } = renderComponent({})

      expect(queryAllByAltText('456-imageText')).toHaveLength(2)
      expect(queryAllByAltText('456-imageText2')).toHaveLength(2)
      expect(queryAllByAltText('456-imageText3')).toHaveLength(2)
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

      const { queryAllByAltText } = renderComponent(props)

      expect(queryAllByAltText('propImageText')).toHaveLength(2)
      expect(queryAllByAltText('propImageText2')).toHaveLength(2)
    })
  })

  describe('<HighQualityProductImage />', () => {
    it('should render if the modal-trigger is clicked', () => {
      const props = {
        zoomMode: 'open-modal',
        ModalZoom: ModalLayout,
        images: [
          {
            imageUrls: ['url2'],
            thresholds: [1],
            thumbnailUrl: 'url2',
            imageText: 'imageText2',
          },
        ],
      }

      const { getAllByAltText, getByTestId } = render(
        <ProductImages {...props} />
      )

      const images = getAllByAltText('imageText2')

      // 2 for thumb + main image
      expect(images).toHaveLength(2)
      fireEvent.click(getByTestId('modal-trigger'), {
        bubbles: true,
        cancelable: true,
      })

      // 3 for thumb + main image + modal image
      expect(getAllByAltText('imageText2')).toHaveLength(3)
    })

    it('should render 2 img[alt="imageText2"] if img2 trigger is clicked', () => {
      const props = {
        zoomMode: 'open-modal',
        ModalZoom: ModalLayout,
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

      const { getAllByAltText, getAllByTestId } = render(
        <ProductImages {...props} />
      )

      const images = getAllByAltText('imageText2')

      expect(images).toHaveLength(2)
      fireEvent.click(getAllByTestId('modal-trigger')[1], {
        bubbles: true,
        cancelable: true,
      })

      // 3 images with the alt because is one image of the trigger,
      // one image of the thumbs and the image of HighQualityProductImage
      expect(getAllByAltText('imageText2')).toHaveLength(3)
    })
  })
})
