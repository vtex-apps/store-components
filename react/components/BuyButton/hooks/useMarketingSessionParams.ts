import { useEffect, useState } from 'react'
import { path, pathOr } from 'ramda'

const getUtmParams = (publicFields: any) => ({
  source: path(['utm_source', 'value'], publicFields),
  medium: path(['utm_medium', 'value'], publicFields),
  campaign: path(['utm_campaign', 'value'], publicFields),
})

const getUtmiParams = (publicFields: any) => ({
  campaign: path(['utmi_cp', 'value'], publicFields),
  page: path(['utmi_p', 'value'], publicFields),
  part: path(['utmi_pc', 'value'], publicFields),
})

const getSessionPromiseFromWindow = () =>
  // @ts-expect-error ts-migrate(2339) FIXME: Property '__RENDER_8_SESSION__' does not exist on ... Remove this comment to see the full error message
  !window.__RENDER_8_SESSION__ || !window.__RENDER_8_SESSION__.sessionPromise
    ? Promise.resolve(null)
    : // @ts-expect-error ts-migrate(2339) FIXME: Property '__RENDER_8_SESSION__' does not exist on ... Remove this comment to see the full error message
      window.__RENDER_8_SESSION__.sessionPromise

const useMarketingSessionParams = () => {
  const [utmParams, setUtmParams] = useState(undefined)
  const [utmiParams, setUtmiParams] = useState(undefined)

  useEffect(() => {
    getSessionPromiseFromWindow()
      .then((data: any) => {
        const publicFields = pathOr(
          {},
          ['response', 'namespaces', 'public'],
          data
        )

        if (Object.keys(publicFields).length === 0) {
          return
        }

        // @ts-expect-error ts-migrate(2345) FIXME: Type '{ source: unknown; medium: unknown; campaign... Remove this comment to see the full error message
        setUtmParams(getUtmParams(publicFields))
        // @ts-expect-error ts-migrate(2345) FIXME: Type '{ campaign: unknown; page: unknown; part: un... Remove this comment to see the full error message
        setUtmiParams(getUtmiParams(publicFields))
      })
      .catch(() => {
        // Do nothing!
      })
  }, [])

  return { utmParams, utmiParams }
}

export default useMarketingSessionParams
