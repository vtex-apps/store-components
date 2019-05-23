import { useState, useRef } from 'react'

const useZoom = (container, maxScale) => {
  const [style, setStyle] = useState({ x: 0, y: 0, scale: 1 })
  const [isActive, setIsActive] = useState(false)

  const rect = useRef(null)

  const getClientRect = () => {
    if (rect.current) {
      return rect.current
    } else if (container.current) {
      const {
        left,
        top,
        width,
        height,
      } = container.current.getBoundingClientRect()

      rect.current = {
        left,
        top,
        width,
        height,
      }
    }

    return rect.current
  }

  const getPointer = ({ pageX, pageY }) => {
    const { left, top, width, height } = getClientRect()
    return {
      x: Math.max(left - pageX, -width),
      y: Math.max(top - pageY, -height),
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
        x: Math.max(x - movementX, -width),
        y: Math.max(y - movementY, -height),
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
    },
  }
}

export default useZoom
