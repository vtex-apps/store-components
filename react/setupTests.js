window.__RUNTIME__ = {
  settings: {
    'vtex.store': {
      enableOrderFormOptimization: false,
      enableDefaultSeller: true,
    },
  },
}

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
}

global.navigator.geolocation = mockGeolocation
