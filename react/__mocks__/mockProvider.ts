export const createClientMock = responseMock => ({
  query: () =>
    new Promise(resolve => {
      resolve(responseMock)
    }),
})
