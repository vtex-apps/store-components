import { useEffect, useState } from 'react'

export const usePosition = () => {
  const [position, setPosition] = useState({
    latitude: undefined,
    longitude: undefined,
  })

  const [error, setError] = useState(undefined)

  const onSuccess = gelocation => {
    const { coords } = gelocation

    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
    setError(false)
  }

  const onError = () => {
    setError(true)
  }

  useEffect(() => {
    const geo = global.navigator.geolocation

    geo.getCurrentPosition(onSuccess, onError)
  }, [])

  return { ...position, error }
}
