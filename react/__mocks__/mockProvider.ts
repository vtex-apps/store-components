export const createClientMock = (responseMock: any) => ({
  query: () =>
    new Promise(resolve => {
      resolve(responseMock)
    }),
})
