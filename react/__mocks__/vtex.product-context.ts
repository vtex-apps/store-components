import React from 'react'

export const ProductContext = React.createContext({
  product: {
    benefits: [],
    brand: 'Billabong',
    brandId: 2000850,
    // @ts-expect-error ts-migrate(7053) FIXME: Property '/Clothing/' does not exist on type 'Numb... Remove this comment to see the full error message
    categories: (3)[
      // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
      ('/Clothing/Swimwear/Rashguards/', '/Clothing/Swimwear/', '/Clothing/')
    ],
    // @ts-expect-error ts-migrate(7053) FIXME: Property '/100/' does not exist on type 'Number'.
    categoriesIds: (3)[('/100/2048/2431/', '/100/2048/', '/100/')],
    categoryId: '2431',
    clusterHighlights: [],
    productId: '23087',
    productName: "Billabong Die Cut Loose Fit Short Sleeve Rashguard - Men's",
    productReference: 'billab-rashguard_die_cut_lf_ss',
    selectedSku: '453964',
    titleTag: "Billabong Die Cut Loose Fit Short Sleeve Rashguard - Men's",
  },
})
