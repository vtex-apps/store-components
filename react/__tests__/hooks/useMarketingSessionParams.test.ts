import { renderHook, act } from '@testing-library/react-hooks'

import useMarketingSessionParams from '../../components/BuyButton/hooks/useMarketingSessionParams'

const fakeSessionWithData = {
  response: {
    namespaces: {
      public: {
        utm_source: {
          value: 'utmSource',
        },
        utm_medium: {
          value: 'utmMedium',
        },
        utm_campaign: {
          value: 'utmCampaign',
        },
        utmi_cp: {
          value: 'utmiCampaign',
        },
        utmi_p: {
          value: 'utmiPage',
        },
        utmi_pc: {
          value: 'utmiPart',
        },
      },
    },
  },
}

const fakeSessionNoData = {
  response: {
    namespaces: {
      public: {},
    },
  },
}

test('if session has correct data, get and format input correctly', async () => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property '__RENDER_8_SESSION__' does not exist on ... Remove this comment to see the full error message
  window.__RENDER_8_SESSION__ = {}
  // @ts-expect-error ts-migrate(2339) FIXME: Property '__RENDER_8_SESSION__' does not exist on ... Remove this comment to see the full error message
  window.__RENDER_8_SESSION__.sessionPromise = new Promise(resolve =>
    resolve(fakeSessionWithData)
  )
  const { result } = renderHook(() => useMarketingSessionParams())

  // eslint-disable-next-line no-return-await
  await act(async () => await Promise.resolve())

  const { utmParams, utmiParams } = result.current

  expect(utmParams).toMatchObject({
    source: 'utmSource',
    medium: 'utmMedium',
    campaign: 'utmCampaign',
  })
  expect(utmiParams).toMatchObject({
    campaign: 'utmiCampaign',
    page: 'utmiPage',
    part: 'utmiPart',
  })
})

test('if session does not have data, leave object as undefined', async () => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property '__RENDER_8_SESSION__' does not exist on ... Remove this comment to see the full error message
  window.__RENDER_8_SESSION__ = {}
  // @ts-expect-error ts-migrate(2339) FIXME: Property '__RENDER_8_SESSION__' does not exist on ... Remove this comment to see the full error message
  window.__RENDER_8_SESSION__.sessionPromise = new Promise(resolve =>
    resolve(fakeSessionNoData)
  )
  const { result } = renderHook(() => useMarketingSessionParams())

  // eslint-disable-next-line no-return-await
  await act(async () => await Promise.resolve())

  const { utmParams, utmiParams } = result.current

  expect(utmParams).toBeUndefined()
  expect(utmiParams).toBeUndefined()
})

test('if session promise rejects, everything still works, response is undefined', async () => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property '__RENDER_8_SESSION__' does not exist on ... Remove this comment to see the full error message
  window.__RENDER_8_SESSION__ = {}
  // @ts-expect-error ts-migrate(2339) FIXME: Property '__RENDER_8_SESSION__' does not exist on ... Remove this comment to see the full error message
  window.__RENDER_8_SESSION__.sessionPromise = new Promise((_, reject) =>
    reject()
  )
  const { result } = renderHook(() => useMarketingSessionParams())

  // eslint-disable-next-line no-return-await
  await act(async () => await Promise.resolve())

  const { utmParams, utmiParams } = result.current

  expect(utmParams).toBeUndefined()
  expect(utmiParams).toBeUndefined()
})
