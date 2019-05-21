import { useState } from 'react'

const clamp = (a, max) =>
  Math.min(a, 0) === a ? Math.min(a, max) : Math.max(a, 0)

const useZoom = (container, maxScale) => {
  const [style, setStyle] = useState({ x: 0, y: 0, scale: 1 })
  const [isActive, setIsActive] = useState(false)

  const getPointer = ({ pageX, pageY }) => {
    const {
      left,
      top,
      height,
      width,
    } = container.current.getBoundingClientRect()
    return { x: clamp(left - pageX, width), y: clamp(top - pageY, height) }
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
    const { height, width } = container.current.getBoundingClientRect()
    const { x, y } = style

    if (isActive) {
      setStyle({
        ...style,
        x: clamp(x - movementX, width),
        y: clamp(y - movementY, height),
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
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      willChange: 'transform',
      transformOrigin: '0 0',
    },
  }
}

export default useZoom
