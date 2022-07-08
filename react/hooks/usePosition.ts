import { useEffect, useState } from 'react'

interface Coordinate {
  latitude: number | undefined
  longitude: number | undefined
}

interface Position {
  coords: Coordinate
  timestamp: number
}

export const usePosition = () => {
  const [position, setPosition] = useState<Coordinate>({
    latitude: undefined,
    longitude: undefined,
  })

  const [error, setError] = useState<boolean | undefined>(undefined)

  const onSuccess = (gelocation: Position) => {
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
    const geo = navigator.geolocation

    if (!navigator || !geo) {
      setError(true)
    }

    geo.getCurrentPosition(onSuccess, onError)
  }, [])

  return { ...position, error }
}
