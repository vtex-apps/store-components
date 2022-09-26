import { renderHook } from '@vtex/test-tools/react'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'

import { useCommercialOffer } from '../../utils/useCommercialOffer'

let mockEnableDefaultSeller = true

jest.mock('vtex.render-runtime', () => {
  return {
    useRuntime: jest.fn(() => ({
      getSettings() {
        return {
          enableDefaultSeller: mockEnableDefaultSeller,
        }
      },
    })),
  }
})

const ctx = {
  selectedItem: {
    sellers: [
      {
        sellerDefault: false,
        commertialOffer: 1000,
      },
      {
        sellerDefault: true,
        commertialOffer: 2000,
      },
    ],
  },
} as unknown as Partial<ProductContextState>

test('Should return the commercial offer from the defaultSeller', () => {
  const { result } = renderHook(() => useCommercialOffer(ctx))

  expect(result.current).toBe(2000)
})

test('Should return the commercial offer from the first seller', () => {
  mockEnableDefaultSeller = false
  const { result } = renderHook(() => useCommercialOffer(ctx))

  expect(result.current).toBe(1000)
})
