export const createItem = ({
  id = '1',
  price = 90,
  quantity = 10,
  customFields = {},
}) => {
  return {
    itemId: id,
    name: `Item ${id}`,
    nameComplete: `Name ${id} Complete`,
    images: [
      {
        imageId: id,
        imageLabel: `${id}-Color`,
        imageTag: 'imageTag',
        imageUrl: `${id}-imageurl.com`,
        imageText: `${id}-imageText`,
      },
      {
        imageId: `${id}-2`,
        imageLabel: `${id}-Color`,
        imageTag: 'imageTag2',
        imageUrl: `${id}-imageurl2.com`,
        imageText: `${id}-imageText2`,
      },
      {
        imageId: `${id}-3`,
        imageLabel: `${id}-Color`,
        imageTag: 'imageTag3',
        imageUrl: `${id}-imageurl3.com`,
        imageText: `${id}-imageText3`,
      },
    ],
    sellers: [
      {
        sellerId: id,
        sellerName: 'Store Name',
        commertialOffer: {
          AvailableQuantity: quantity,
          ListPrice: price + 10,
          Price: price,
        },
      },
    ],
    ...customFields,
  }
}

export const createProduct = ({ customFields = {} }) => {
  return {
    cacheId: 'product-slug',
    productName: 'Product Name',
    productId: '1',
    description: 'Product Description',
    titleTag: 'Product Name',
    metaTagDescription: null,
    linkText: 'product-slug',
    categories: [
      '/Category A/',
      '/Category A/Category B/',
      '/Category A/Category B/Category C/',
    ],
    categoryId: '1',
    categoriesIds: ['/1/2/3/', '/1/2/', '/1/'],
    brand: 'Brand',
    categoryTree: [
      { id: '1', name: 'Category A', href: 'category-a' },
      { id: '2', name: 'Category B', href: 'category-a/category-b' },
      { id: '3', name: 'Category C', href: 'category-a/category-b/category-c' },
    ],
    items: [createItem({})],
    ...customFields,
  }
}
