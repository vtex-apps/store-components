import { useState, useRef } from 'react'

const useZoom = (container, maxScale) => {
  const [style, setStyle] = useState({ x: 0, y: 0, scale: 1 })
  const [isActive, setIsActive] = useState(false)

  const rect = useRef(null)

  const getClientRect = () => {
    if (rect.current) {
      return rect.current
    } else if (container.current) {
      rect.current = container.current.getBoundingClientRect()
    }

    return rect.current
  }

  const clamp = (val, bound) => {
    return Math.min(0, Math.max(val, bound))
  }

  const getPointer = ({ pageX, pageY }) => {
    const { left, top, width, height } = getClientRect()
    return {
      x: clamp(left - pageX, -width),
      y: clamp(top - pageY, -height),
    }
  }

  const zoom = e => {
    setStyle({
      ...style,
      scale: maxScale,
      ...getPointer(e),
    })
    setIsActive(true)
  }

  const out = () => {
    setStyle({ x: 0, y: 0, scale: 1 })
    setIsActive(false)
  }

  const pan = ({ movementX, movementY }) => {
    const { width, height } = getClientRect()
    const { x, y } = style

    if (isActive) {
      setStyle({
        ...style,
        x: clamp(x - movementX, -width),
        y: clamp(y - movementY, -height),
      })
    }
  }

  const { x, y, scale } = style

  return {
    zoom,
    out,
    pan,
    isActive,
    style: {
      transition: 'transform 100ms ease-out',
      transform: `translate(${Math.floor(x)}px, ${Math.floor(
        y
      )}px) scale(${scale})`,
      transformOrigin: '0 0',
      willChange: 'transform',
    },
  }
}

export default useZoom
