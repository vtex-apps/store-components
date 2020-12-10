import React from 'react'

const mockedContext = {
  product: {
    benefits: [],
    brand: 'Billabong',
    brandId: 2000850,
    categories: (3)[
      ('/Clothing/Swimwear/Rashguards/', '/Clothing/Swimwear/', '/Clothing/')
    ],
    categoriesIds: (3)[('/100/2048/2431/', '/100/2048/', '/100/')],
    categoryId: '2431',
    clusterHighlights: [],
    productId: '23087',
    productName: "Billabong Die Cut Loose Fit Short Sleeve Rashguard - Men's",
    productReference: 'billab-rashguard_die_cut_lf_ss',
    selectedSku: '453964',
    titleTag: "Billabong Die Cut Loose Fit Short Sleeve Rashguard - Men's",
  },
  buyButton: {
    clicked: false,
  },
  skuSelector: {
    areAllVariationsSelected: true,
  },
}

export const ProductContext = React.createContext(mockedContext)

export const useProduct = jest.fn(() => mockedContext)

export const useProductDispatch = () => jest.fn()
