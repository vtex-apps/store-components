const useProduct = jest.fn(() => {
  return {
    product: {},
    buyButton: {
      clicked: false,
    },
    skuSelector: {
      areAllVariationsSelected: true,
    },
  }
})

export default useProduct
